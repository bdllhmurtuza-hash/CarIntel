import os
import re
from datetime import datetime

from flask import Flask, redirect, render_template, request, session, url_for

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "carintel-prototype-dev-key")

# Field keys collected by the evaluation wizard. These map 1:1 onto the
# payload the CarIntel ML pipeline (XGBoost model + preprocessing + SHAP)
# will consume once the backend is wired to it.
VEHICLE_FIELDS = [
    "make", "model", "year", "vehicle_age", "kilometers",
    "fuel_type", "transmission", "seller_type",
]


@app.template_filter("inr")
def inr_format(value):
    """Format a number with Indian digit grouping (1,00,000)."""
    try:
        n = int(float(value))
    except (TypeError, ValueError):
        return str(value)
    s = str(n)
    if len(s) <= 3:
        return s
    last3 = s[-3:]
    rest = s[:-3]
    groups = []
    while rest:
        groups.insert(0, rest[-2:])
        rest = rest[:-2]
    return ",".join(groups + [last3])


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/evaluate", methods=["GET", "POST"])
def evaluate():
    if request.method == "POST":
        # UI layer only for now: persist the submitted vehicle details and
        # move on to the report. The valuation pipeline will later replace
        # the placeholder section of result.html.
        vehicle = {field: request.form.get(field, "") for field in VEHICLE_FIELDS}

        # The client sends kilometers pre-formatted (e.g. "1,00,000");
        # normalise to digits before storing.
        vehicle["kilometers"] = re.sub(r"\D", "", vehicle.get("kilometers", ""))

        # Defense in depth: client-side validation normally guarantees all
        # fields, but never trust the form blindly.
        if not vehicle.get("make") or not vehicle.get("model"):
            return redirect(url_for("evaluate"))
        for field in ("year", "kilometers", "fuel_type", "transmission", "seller_type"):
            if not vehicle.get(field):
                return redirect(url_for("evaluate"))

        # Derive vehicle age from the model year server-side.
        if vehicle.get("year"):
            try:
                vehicle["vehicle_age"] = str(max(0, datetime.now().year - int(vehicle["year"])))
            except ValueError:
                vehicle["vehicle_age"] = ""

        session["vehicle"] = vehicle
        return redirect(url_for("result"))
    return render_template("evaluate.html")


@app.route("/result")
def result():
    vehicle = session.get("vehicle", {})
    return render_template("result.html", vehicle=vehicle)


if __name__ == "__main__":
    app.run(debug=True)
