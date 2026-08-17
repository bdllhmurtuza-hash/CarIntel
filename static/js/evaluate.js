// ==========================================
// Evaluate Wizard - CarIntel
// Selection-driven flow: Brand → Model →
// Details → Technical options → Review
// ==========================================

(function () {
    "use strict";

    var form = document.getElementById("evalForm");
    if (!form) return;

    var LOGO_BASE =
        (document.body.getAttribute("data-static") || "/static/") + "img/logos/";

    // -----------------------
    // Brand & model data (Indian market)
    // logo = official brand logo SVG in static/img/logos/
    // dark = logo artwork is dark → render as white via CSS invert
    // models = [name, silhouette style]
    // -----------------------

    var BRANDS = [
        { name: "Maruti Suzuki", logo: "maruti-suzuki.svg", models: [["Alto K10", "hatch"], ["Celerio", "hatch"], ["Wagon R", "tall"], ["Swift", "hatch"], ["Baleno", "hatch"], ["Dzire", "sedan"], ["Ciaz", "sedan"], ["Ignis", "tall"], ["Ertiga", "mpv"], ["XL6", "mpv"], ["Vitara", "suv"],["S-Presso", "cross"], ["Eeco", "van"]] },
        { name: "Hyundai", logo: "hyundai.svg", models: [["Santro", "hatch"], ["Grand i10 Nios", "hatch"], ["i20", "hatch"], ["Aura", "sedan"], ["i10", "hatchback"], ["Venue", "suv"], ["Creta", "suv"], ["Tucson", "suvx"], ["Elentra", "sedan"], ["Verna", "sedan"]] },
        { name: "Tata", logo: "tata.svg", models: [["Tiago", "hatch"], ["Altroz", "hatch"], ["Tigor", "sedan"], ["Nexon", "suv"], ["Hexa", "suv"], ["Harrier", "suvx"], ["Safari", "suvx"]] },
        { name: "Mahindra", logo: "mahindra.svg", models: [["KUV100", "cross"], ["XUV300", "suv"], ["Bolero", "offroad"], ["Scorpio", "suvx"], ["Alturas", "suvx"], ["XUV500", "offroad"], ["Thar", "offroad"], ["Marazzo", "mpv"]] },
        { name: "Kia", logo: "kia.svg", models: [ ["Seltos", "suv"], ["Carnival", "mpv"]] },
        { name: "Toyota", logo: "toyota.svg", models: [["Glanza", "hatch"], ["Innova Crysta", "mpv"], ["Fortuner", "suvx"], ["Camry", "lux"]] },
        { name: "Honda", logo: "honda.svg", models: [["Amaze", "sedan"], ["City", "sedan"],["Jazz", "hatch"], ["Civic", "lux"], ["CR-V", "suvx"], ["WR-V", "lux"]] },
        { name: "Volkswagen", logo: "volkswagen.svg", models: [["Polo", "hatch"], ["Vento", "sedan"]] },
        { name: "Renault", logo: "renault.svg", models: [["Kwid", "cross"], ["Triber", "mpv"], ["Duster", "suv"]] },
        { name: "MG", logo: "mg.svg", models: [["Hector", "suvx"]] },
        { name: "Skoda", logo: "skoda.svg", models: [["Rapid", "sedan"], ["Octavia", "lux"], ["Superb", "lux"]] },
        { name: "Ford", logo: "ford.svg", models: [["Figo", "hatch"], ["Aspire", "sedan"], ["Freestyle", "cross"], ["EcoSport", "suv"], ["Endeavour", "suvx"]] },
        { name: "Nissan", logo: "nissan.svg", models: [["Kicks", "suv"], ["X-Trail", "suv"]] },
        { name: "Jeep", logo: "jeep.svg", models: [["Compass", "suv"], ["Wrangler", "offroad"]] },
        { name: "BMW", logo: "bmw.svg", models: [["3 Series", "coupe"], ["5 Series", "lux"], ["6 Series", "lux"], ["7 Series", "lux"], ["X1", "suv"], ["X3", "suv"],["X4", "suvx"], ["X5", "suvx"], ["z4", "coupe"]] },
        { name: "Mercedes-Benz", logo: "mercedes-benz.svg", models: [["C-Class", "lux"], ["E-Class", "lux"], ["S-Class", "lux"], ["CLS", "suv"], ["GLS", "suvx"]] },
        { name: "Audi", logo: "audi.svg", models: [["A4", "lux"], ["A6", "lux"], ["A8", "lux"],["Q7", "suvx"]] },
        { name: "Volvo", logo: "volvo.svg", models: [ ["S90", "lux"], ["XC40", "suv"], ["XC60", "suvx"], ["XC90", "suvx"]] },
        { name: "Porsche", logo: "porsche.svg", models: [["Cayenne", "coupe"], ["Macan", "coupe"], ["Panamera", "coupe"]] },
        { name: "Mini", logo: "mini.svg", models: [["Cooper", "hatch"]] },
        { name: "Jaguar", logo: "jaguar.svg", models: [["F-Pace", "coupe"], ["XF", "sedan"], ["XE", "sedan"]] },
        { name: "Land Rover", logo: "landrover.svg", models: [["Range Rover", "suvx"]] },
        { name: "Lexus", logo: "lexus.svg", models: [["NX", "suv"], ["RX", "suv"], ["ES", "suv"]] },
        { name: "Bentley", logo: "bentley.svg", models: [["Continental", "lux"]] },
        { name: "Datsun", logo: "datsun.svg", models: [["Go", "lux"], ["RediGO", "lux"]] },
        { name: "Isuzu", logo: "isuzu.svg", models: [["D-Max", "hatch"], ["MUX", "sedan"]] },

    ];

    var CAR_IMAGES = {
        "Swift": "maruti_swift.png",
        "Wagon R": "maruti_wagonr.png",
        "S-Presso": "maruti_spresso.png",
        "Baleno": "maruti_baleno.png",
        "Dzire": "maruti_dzire.png",
        "Celerio": "maruti_celerio.png",
        "Alto K10": "maruti_alto.png",
        "Ertiga": "maruti_ertiga.png",
        "XL6": "maruti_xl6.png",
        "Eeco": "maruti_eeco.png",
        "Ciaz": "maruti_ciaz.png",
        "Vitara": "maruti_vitara.png",
        "Ignis": "maruti_ignis.png",
        // Hyundai
        "Santro": "hyundai_santro.png",
        "Grand i10 Nios": "hyundaigrand_i10.png",
        "i20": "hyundai_i20.png",
        "Aura": "hyundai_aura.png",
        "Creta": "hyundai_creta.png",
        "Verna": "hyundai_verna.png",
        "Venue": "hyundai_venue.png",
        "i10": "hyundai_i10.png",
        "Tucson": "hyundai_tucson.png",
        "Santro": "hyundai_santro.png",
        "Elentra": "hyundai_elentra.png",
        // Tata
        "Tiago": "tata_tiago.png",
        "Altroz": "tata_altroz.png",
        "Tigor": "tata_tigor.png",
        "Harrier": "tata_harrier.png",
        "Nexon": "tata_nexon.png",
        "Safari": "tata_safari.png",
        "Hexa": "tata_hexa.png",
        //kia
        "Seltos": "kia_seltos.png",
        "Carnival": "kia_carnival.png",
        //Toyota
        "Glanza": "toyota_glanza.png",
        "Innova Crysta": "toyota_innova.png",
        "Camry": "toyota_camry.png",
        "Fortuner": "toyota_fortuner.png",
        //Honda
        "Amaze": "honda_amaze.png",
        "City": "honda_city.png",
        "Jazz": "honda_jazz.png",
        "Civic": "honda_civic.png",
        "CR-V": "honda_crv.png",
        "WR-V": "honda_wrv.png",
        //Volkswagen
        "Polo": "vw_polo.png",
        "Vento": "vw_vento.png",
        //Renault
        "Kwid": "renault_kwid.png",
        "Triber": "renault_triber.png",
        "Duster": "renault_duster.png",
        //MG
        "Hector": "mg_hector.png",
        //Skoda
        "Rapid": "skoda_rapid.png",
        "Octavia": "skoda_octavia.png",
        "Superb": "skoda_superb.png",
        //Nissan
        "Kicks": "nissan_kicks.png",
        "X-Trail": "nissan_x-trail.png",
        //Jeep
        "Compass": "jeep_compass.png",
        "Wrangler": "jeep_wrangler.png",
        //BMW
        "3 Series": "bmw_3series.png",
        "5 Series": "bmw_5.png",
        "6 Series": "bmw_6series.png",
        "7 Series": "bmw_7series.png",
        "X1": "bmw_x1.png",
        "X3": "bmw_x3.png",
        "X4": "bmw_x4.png",
        "X5": "bmw_x5.png",
        "z4": "bmw_z4.png",
        //Mercedes-Benz
        "C-Class": "mercedes_c-class.png",
        "E-Class": "mercedes_e-class.png",
        "S-Class": "mercedes_s-class.png",
        "CLS": "mercedes_cls.png",
        "GLS": "mercedes_gle.png",
        //Audi
        "A4": "audi_a4.png",
        "A6": "audi_a6.png",
        "A8": "audi_a8.png",
        "Q7": "audi_q7.png",
        //Mahindra
        "KUV100": "mahindra_kuv100.png",
        "XUV300": "mahindra_xuv300.png",
        "Bolero": "mahindra_bolero.png",
        "Scorpio": "mahindra_scorpio.png",
        "Alturas": "mahindra_alturas.png",
        "XUV500": "mahindra_xuv500.png",
        "Thar": "mahindra_thar.png",
        "Marazzo": "mahindra_marazzo.png",
        //Ford
        "Figo": "ford_figo.png",
        "Aspire": "ford_aspire.png",
        "Freestyle": "ford_freestyle.png",
        "EcoSport": "ford_ecosport.png",
        "Endeavour": "ford_endeavour.png",
        //Volvo
        "S90": "volvo_s90.png",
        "XC40": "volvo_xc40.png",
        "XC60": "volvo_xc60.png",
        "XC90": "volvo_xc90.png",
        //Porsche
        "Cayenne": "porsche_cayenne.png",
        "Macan": "porsche_macan.png",
        "Panamera": "porsche_panamera.png",
        //Mini
        "Cooper": "mini_cooper.png",
        //Jaguar
        "F-Pace": "jaguar_fpace.png",
        "XF": "jaguar_xf.png",
        "XE": "jaguar_xe.png",










    };

    // -----------------------
    // Premium side-profile silhouettes (CarIntel design language)
    // One consistent drawing language: 200x90 viewBox, wheel arch
    // cutouts at the same geometry, rim rings + hubs, ground line.
    // -----------------------

    var WHEELS =
        '<circle cx="40" cy="70" r="8" fill="none" stroke="currentColor" stroke-width="2.6"/>' +
        '<circle cx="156" cy="70" r="8" fill="none" stroke="currentColor" stroke-width="2.6"/>' +
        '<circle cx="40" cy="70" r="3.4"/>' +
        '<circle cx="156" cy="70" r="3.4"/>';

    var SILHOUETTES = {
        // Small hatchbacks — Swift, Baleno, i20
        hatch:
            '<svg viewBox="0 0 200 90" aria-hidden="true"><path d="M22 60V47C22 42 25 38 31 34L47 27C61 23 79 22 92 23.5L124 32C138 36.5 147 42 151 48L168 53.5C172.5 55.5 174 57.5 174 60A18 18 0 0 0 138 60L58 60A18 18 0 0 0 22 60Z"/>' + WHEELS + '<path d="M13 82h174" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".28"/></svg>',
        // Tall hatches — Wagon R, Ignis, Comet EV
        tall:
            '<svg viewBox="0 0 200 90" aria-hidden="true"><path d="M22 60V49C22 44 25 40 30 36L42 26C52 21.5 66 19.5 82 20L118 25.5C134 29 146 36 151 43L168 51C172 53.5 174 56 174 60A18 18 0 0 0 138 60L58 60A18 18 0 0 0 22 60Z"/>' + WHEELS + '<path d="M13 82h174" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".28"/></svg>',
        // Compact sedans — Dzire, Verna, City
        sedan:
            '<svg viewBox="0 0 200 90" aria-hidden="true"><path d="M22 59V51L34 51C42 40 48 33 55 28.5C67 24 81 22.5 93 23.5L123 32C139 37 149 44 153 50.5L167 54C171 56 172.5 57.5 173 59L174 59A18 18 0 0 0 138 59L58 59A18 18 0 0 0 22 59Z"/>' + WHEELS + '<path d="M13 82h174" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".28"/></svg>',
        // Luxury / sport sedans — 3 Series, A6, C-Class, Camry
        lux:
            '<svg viewBox="0 0 200 90" aria-hidden="true"><path d="M22 58V50L34 49.5C40 42 46 36 54 31C64 26 74 24 84 24.5L120 31C138 36 149 44 153 51L167 53C171 55 172 56.5 173 58L174 58A18 18 0 0 0 138 58L58 58A18 18 0 0 0 22 58Z"/>' + WHEELS + '<path d="M13 82h174" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".28"/></svg>',
        // Fastbacks & sports — Mustang, EV6, e-tron GT
        coupe:
            '<svg viewBox="0 0 200 90" aria-hidden="true"><path d="M22 58V49L36 49C46 40 54 32 64 27.5C76 23.5 88 23 98 24.5L130 33C146 38.5 154 46 156 52L171 55C172.5 56 173 57 174 58A18 18 0 0 0 138 58L58 58A18 18 0 0 0 22 58Z"/>' + WHEELS + '<path d="M13 82h174" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".28"/></svg>',
        // Raised compact crossovers — Punch, Exter, Kiger, Fronx
        cross:
            '<svg viewBox="0 0 200 90" aria-hidden="true"><path d="M22 62V49C22 44 25 40 30 36L44 28C56 24 72 22.5 86 23.5L120 32C136 36.5 147 43 152 49L170 55C173 57 174 59.5 174 62A18 18 0 0 0 138 62L58 62A18 18 0 0 0 22 62Z"/>' + WHEELS + '<path d="M13 82h174" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".28"/></svg>',
        // Compact SUVs — Creta, Venue, Brezza, Nexon
        suv:
            '<svg viewBox="0 0 200 90" aria-hidden="true"><path d="M22 62V48C22 42 26 38 32 34L46 26C58 21.5 74 20 88 21L120 29.5C136 34 148 41 153 48L172 54.5C174 57 175 59.5 175 62L174 62A18 18 0 0 0 138 62L58 62A18 18 0 0 0 22 62Z"/>' + WHEELS + '<path d="M13 82h174" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".28"/></svg>',
        // Mid / large SUVs — Fortuner, Harrier, XUV700, Safari
        suvx:
            '<svg viewBox="0 0 200 90" aria-hidden="true"><path d="M22 63V47C22 41 25 37 32 33L48 25C62 20.5 82 19.5 98 20.5L134 30C150 35 160 42 164 49L175 55C176.5 57.5 177 60 177 63L174 63A18 18 0 0 0 138 63L58 63A18 18 0 0 0 22 63Z"/>' + WHEELS + '<path d="M13 82h174" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".28"/></svg>',
        // MUV / MPV — Ertiga, Innova, Carens
        mpv:
            '<svg viewBox="0 0 200 90" aria-hidden="true"><path d="M22 62V50C22 45 25 41 30 37L40 26C50 21 64 19 82 19.5L126 25C142 28.5 154 35 159 42L172 50C174.5 53 176 57 176 62L174 62A18 18 0 0 0 138 62L58 62A18 18 0 0 0 22 62Z"/>' + WHEELS + '<path d="M13 82h174" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".28"/></svg>',
        // Off-roaders — Thar, Jimny, Wrangler, Bolero
        offroad:
            '<svg viewBox="0 0 200 90" aria-hidden="true"><path d="M22 63V50C22 45 25 41 30 38L40 30C46 26.5 54 25 64 25.5L104 29C120 31.5 130 37 134 43L154 50C159 52.5 162 56 162 63L174 63A18 18 0 0 0 138 63L58 63A18 18 0 0 0 22 63Z"/>' + WHEELS + '<path d="M13 82h174" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".28"/></svg>',
        // Pickups — Hilux
        pickup:
            '<svg viewBox="0 0 200 90" aria-hidden="true"><path d="M22 62L22 46L118 46C124 46 128 44.5 130 41L134 32C136 28 140 26 146 25.5L158 26C164 26.5 167 29 168 32.5L170 40L174 46L174 62A18 18 0 0 0 138 62L58 62A18 18 0 0 0 22 62Z"/>' + WHEELS + '<path d="M13 82h174" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".28"/></svg>'
    };

    var CHECK_ICON =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M4 12.5l5 5L20 6.5"/></svg>';

    // -----------------------
    // Element refs
    // -----------------------

    var panels = Array.prototype.slice.call(form.querySelectorAll(".step-panel"));
    var dots = Array.prototype.slice.call(document.querySelectorAll(".step-dot"));
    var fill = document.getElementById("progressFill");
    var backBtn = document.getElementById("backBtn");
    var nextBtn = document.getElementById("nextBtn");
    var submitBtn = document.getElementById("submitBtn");
    var brandGrid = document.getElementById("brandGrid");
    var brandSearch = document.getElementById("brandSearch");
    var modelGrid = document.getElementById("modelGrid");
    var modelHint = document.getElementById("modelHint");
    var selectedBrandBar = document.getElementById("selectedBrandBar");
    var selectedBrandBadge = document.getElementById("selectedBrandBadge");
    var selectedBrandName = document.getElementById("selectedBrandName");
    var changeBrandBtn = document.getElementById("changeBrandBtn");
    var yearSelect = document.getElementById("year");
    var ageBadge = document.getElementById("ageBadge");
    var vehicleAgeInput = document.getElementById("vehicleAge");
    var kmInput = document.getElementById("kilometers");
    var kmPresets = document.getElementById("kmPresets");
    var aiLoader = document.getElementById("aiLoader");
    var loaderMsg = document.getElementById("loaderMsg");
    var loaderFill = document.getElementById("loaderFill");

    var totalSteps = panels.length;
    var current = 1;
    var selectedBrand = null;
    var submitLocked = false;

    // -----------------------
    // Helpers
    // -----------------------

    function findBrand(name) {
        for (var i = 0; i < BRANDS.length; i++) {
            if (BRANDS[i].name === name) return BRANDS[i];
        }
        return null;
    }

    function logoHTML(brand, small, id) {
    // `id` keeps the selected-brand badge reference alive across re-renders.

    var largeLogoClass = "";

    if (brand.name === "Lexus") largeLogoClass = " logo-large-lexus";
    else if (brand.name === "BMW") largeLogoClass = " logo-large-bmw";
    else if (brand.name === "Maruti Suzuki") largeLogoClass = " logo-large-maruti";
    else if (brand.name === "Hyundai") largeLogoClass = " logo-large-hyundai";
    else if (brand.name === "Jaguar") largeLogoClass = " logo-large-jaguar";
    else if (brand.name === "Skoda") largeLogoClass = " logo-large-jaguar";

    return '<span' + (id ? ' id="' + id + '"' : "") +
        ' class="brand-logo-tile' + (small ? " sm" : "") + largeLogoClass + '">' +
        '<img src="' + LOGO_BASE + brand.logo + '" alt="" draggable="false">' +
        "</span>";
}

function silhouetteHTML(style, model) {
    if (CAR_IMAGES[model]) {
        return '<span class="model-icon"><img src="/static/cars/' + CAR_IMAGES[model] + '" alt="' + model + '" draggable="false"></span>';
    }

    return '<span class="model-icon">' + (SILHOUETTES[style] || SILHOUETTES.hatch) + "</span>";
}

    function escapeHTML(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }

    function formatINR(num) {
        return Number(num).toLocaleString("en-IN");
    }

    // -----------------------
    // Brand gallery
    // -----------------------

    function renderBrands() {
        var q = brandSearch.value.trim().toLowerCase();
        // Source of truth is the state var, not the DOM: filtering the selected
        // brand out destroys its radio, so the DOM alone can't restore it.
        var prevValue = selectedBrand || "";
        var html = "";

        BRANDS.forEach(function (brand) {
            if (q && brand.name.toLowerCase().indexOf(q) === -1) return;
            html +=
                '<label class="brand-card">' +
                '<input type="radio" name="make" value="' + brand.name + '"' +
                (brand.name === prevValue ? " checked" : "") + ">" +
                logoHTML(brand) +
                '<span class="brand-name">' + brand.name + "</span>" +
                '<span class="brand-count">' + brand.models.length + " models</span>" +
                '<span class="brand-check">' + CHECK_ICON + "</span>" +
                "</label>";
        });

        brandGrid.innerHTML = html ||
            '<p class="empty-state">No brands match “' + escapeHTML(brandSearch.value) + '”.</p>';
        bindGroup(".brand-card");

        // Restore the active card if the chosen brand is still visible
        if (prevValue) {
            var input = brandGrid.querySelector('input[name="make"][value="' + prevValue + '"]');
            if (input) input.closest(".brand-card").classList.add("active");
        }

        onBrandChange();
    }

    brandSearch.addEventListener("input", renderBrands);

    // -----------------------
    // Model gallery
    // -----------------------

    function renderModels() {
        var brand = findBrand(selectedBrand);
        if (!brand) {
            modelGrid.innerHTML = "";
            return;
        }

        // Preserve the user's model pick across re-renders
        var prevValue = form.querySelector('input[name="model"]:checked')
            ? form.querySelector('input[name="model"]:checked').value
            : "";

        // Header bar with brand logo
        selectedBrandBadge.outerHTML = logoHTML(brand, true, "selectedBrandBadge");
        selectedBrandBadge = document.getElementById("selectedBrandBadge");
        selectedBrandName.textContent = brand.name;
        selectedBrandBar.hidden = false;
        modelHint.textContent = brand.name + " models we track — pick yours.";

        var html = brand.models.map(function (item) {
            var model = item[0];
            var style = item[1];
            return (
                '<label class="model-card">' +
                '<input type="radio" name="model" value="' + model + '"' +
                (model === prevValue ? " checked" : "") + ">" +
                silhouetteHTML(style, model) +
                '<span class="model-name">' + model + "</span>" +
                '<span class="brand-check">' + CHECK_ICON + "</span>" +
                "</label>"
            );
        }).join("");

        modelGrid.innerHTML = html;
        bindGroup(".model-card");

        // Restore the active card
        if (prevValue && brand.models.some(function (m) { return m[0] === prevValue; })) {
            var input = modelGrid.querySelector('input[name="model"][value="' + prevValue + '"]');
            if (input) input.closest(".model-card").classList.add("active");
        }
    }

    function onBrandChange() {
        var checked = form.querySelector('input[name="make"]:checked');
        // Only overwrite when a brand is actually selected; otherwise keep the
        // previous pick so clearing a search filter can restore it.
        if (checked) selectedBrand = checked.value;
        renderModels();
        refreshNext();
    }

    changeBrandBtn.addEventListener("click", function () {
        goTo(1);
    });

    // -----------------------
    // Year + age
    // -----------------------

    var thisYear = new Date().getFullYear();
    for (var y = thisYear; y >= 1995; y--) {
        var opt = document.createElement("option");
        opt.value = y;
        opt.textContent = y;
        yearSelect.appendChild(opt);
    }

    function updateAge() {
        if (!yearSelect.value) {
            ageBadge.hidden = true;
            vehicleAgeInput.value = "";
            return;
        }
        var age = Math.max(0, thisYear - Number(yearSelect.value));
        vehicleAgeInput.value = age;
        ageBadge.textContent = age === 0 ? "Brand new" : age + " yr" + (age > 1 ? "s" : "") + " old";
        ageBadge.hidden = false;
    }

    yearSelect.addEventListener("change", function () {
        updateAge();
        refreshNext();
    });

    // -----------------------
    // Kilometers input (Indian comma formatting) + presets
    // -----------------------

    function kmDigits() {
        return kmInput.value.replace(/\D/g, "");
    }

    function paintKm() {
        var digits = kmDigits();
        var formatted = digits ? formatINR(digits) : "";

        // Preset highlight reflects the raw digits
        var chips = kmPresets.querySelectorAll(".preset-chip");
        Array.prototype.forEach.call(chips, function (chip) {
            chip.classList.toggle("active", chip.getAttribute("data-km") === digits);
        });

        if (formatted === kmInput.value) return;

        // Rewrite the value without throwing the caret to the end
        var before = kmInput.value.slice(0, kmInput.selectionStart || 0);
        var rawBefore = (before.match(/\d/g) || []).length;

        kmInput.value = formatted;

        var pos = 0;
        var seen = 0;
        while (pos < formatted.length && seen < rawBefore) {
            if (/\d/.test(formatted.charAt(pos))) seen++;
            pos++;
        }
        try { kmInput.setSelectionRange(pos, pos); } catch (e) { /* noop */ }
    }

    kmInput.addEventListener("input", function () {
        paintKm();
        refreshNext();
    });

    kmPresets.addEventListener("click", function (e) {
        var chip = e.target.closest(".preset-chip");
        if (!chip) return;
        kmInput.value = formatINR(chip.getAttribute("data-km"));
        paintKm();
        refreshNext();
    });

    // -----------------------
    // Radio group binding (cards & chips)
    // -----------------------

    function bindGroup(selector) {
        var radios = form.querySelectorAll(selector + " input[type=radio]");
        Array.prototype.forEach.call(radios, function (radio) {
            radio.addEventListener("change", function () {
                var group = form.querySelectorAll('input[name="' + radio.name + '"]');
                Array.prototype.forEach.call(group, function (r) {
                    var host = r.closest(selector);
                    if (host) host.classList.toggle("active", r.checked);
                });
                if (radio.name === "make") onBrandChange();
                else refreshNext();
            });
        });
    }

    bindGroup(".pill");
    bindGroup(".choice-pill");

    // -----------------------
    // Validation
    // -----------------------

    function validateStep(step) {
        var panel = panels[step - 1];

        // Step 1: any brand card selected
        if (step === 1) {
            return !!(form.querySelector('input[name="make"]:checked'));
        }
        // Step 2: any model card selected
        if (step === 2) {
            return !!(form.querySelector('input[name="model"]:checked'));
        }

        var fields = Array.prototype.slice.call(panel.querySelectorAll(".field"));
        var ok = true;

        fields.forEach(function (field) {
            var select = field.querySelector("select");
            var radios = field.querySelectorAll('input[type="radio"]');
            var textInput = field.querySelector('input[type="text"]');
            var valid = true;

            if (select) {
                valid = select.value.trim() !== "";
            } else if (radios.length) {
                valid = Array.prototype.some.call(radios, function (r) { return r.checked; });
            } else if (textInput) {
                valid = textInput.value.replace(/\D/g, "").length > 0;
            }

            field.classList.toggle("invalid", !valid);
            if (!valid) ok = false;
        });

        return ok;
    }

    function refreshNext() {
        nextBtn.classList.toggle("ready", validateStep(current));
    }

    // -----------------------
    // Review summary
    // -----------------------

    function getFieldValue(name) {
        var el = form.querySelector('[name="' + name + '"]');
        if (!el) return "";
        if (el.type === "radio") {
            var checked = form.querySelector('[name="' + name + '"]:checked');
            return checked ? checked.value : "";
        }
        return el.value;
    }

    function renderReview() {
        var wrap = document.getElementById("reviewSummary");
        if (!wrap) return;

        var make = getFieldValue("make");
        var model = getFieldValue("model");
        var brand = findBrand(make);
        var year = getFieldValue("year");

        var html = "";

        // Hero card
        if (brand) {
            html +=
                '<div class="review-hero">' +
                logoHTML(brand) +
                '<div class="review-hero-info">' +
                '<p class="review-hero-sub">' + (year || "") + (year ? " · " : "") + (getFieldValue("fuel_type") || "") + "</p>" +
                '<h3 class="review-hero-title">' + (make || "—") + " " + (model || "") + "</h3>" +
                "</div>" +
                "</div>";
        }

        var groups = [
            {
                step: 1,
                title: "Your Car",
                keys: [
                    { key: "make", label: "Brand" },
                    { key: "model", label: "Model" },
                    { key: "year", label: "Manufacturing Year" },
                    { key: "vehicle_age", label: "Vehicle Age" }
                ]
            },
            {
                step: 3,
                title: "Usage",
                keys: [
                    { key: "kilometers", label: "Kilometers Driven" }
                ]
            },
            {
                step: 4,
                title: "Technical",
                keys: [
                    { key: "fuel_type", label: "Fuel Type" },
                    { key: "transmission", label: "Transmission" },
                    { key: "seller_type", label: "Seller Type" }
                ]
            }
        ];

        groups.forEach(function (group) {
            html +=
                '<div class="review-group">' +
                '<div class="review-group-head">' +
                "<h3>" + group.title + "</h3>" +
                '<button type="button" class="edit-btn" data-goto="' + group.step + '">Edit</button>' +
                "</div>" +
                '<dl class="review-grid">';

            group.keys.forEach(function (item) {
                var val = getFieldValue(item.key);
                html +=
                    '<div class="review-item">' +
                    "<dt>" + item.label + "</dt>" +
                    "<dd>" + (val ? val : "—") + "</dd>" +
                    "</div>";
            });

            html += "</dl></div>";
        });

        wrap.innerHTML = html;

        Array.prototype.forEach.call(wrap.querySelectorAll(".edit-btn"), function (btn) {
            btn.addEventListener("click", function () {
                goTo(Number(btn.getAttribute("data-goto")));
            });
        });
    }

    // -----------------------
    // Navigation
    // -----------------------

    function goTo(step) {
        if (step < 1 || step > totalSteps) return;
        current = step;

        panels.forEach(function (p, i) {
            p.classList.toggle("active", i === step - 1);
        });

        dots.forEach(function (d, i) {
            var n = i + 1;
            d.classList.toggle("active", n === step);
            d.classList.toggle("done", n < step);
            d.classList.toggle("blocked", n > step);
            d.disabled = n > step;
            d.setAttribute("aria-disabled", n > step ? "true" : "false");
            d.setAttribute("aria-current", n === step ? "step" : "false");
        });

        fill.style.width = ((step - 1) / (totalSteps - 1)) * 100 + "%";
        backBtn.style.visibility = step === 1 ? "hidden" : "visible";
        nextBtn.hidden = step === totalSteps;
        submitBtn.hidden = step !== totalSteps;

        if (step === 2) renderModels();
        if (step === 5) renderReview();
        refreshNext();

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    backBtn.addEventListener("click", function () {
        goTo(current - 1);
    });

    nextBtn.addEventListener("click", function () {
        if (validateStep(current)) {
            goTo(current + 1);
        } else {
            var firstInvalid = form.querySelector(".step-panel.active .field.invalid");
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
            } else {
                // Card-only steps: gently nudge the panel
                panels[current - 1].classList.add("nudge");
                setTimeout(function () {
                    panels[current - 1].classList.remove("nudge");
                }, 450);
            }
        }
    });

    dots.forEach(function (dot, i) {
        dot.addEventListener("click", function () {
            var n = i + 1;
            if (n < current) goTo(n);
        });
    });

    // -----------------------
    // AI loading sequence
    // -----------------------

    var LOADER_STEPS = [
        "Analyzing 15,000+ vehicle records…",
        "Matching similar vehicles…",
        "Running XGBoost valuation model…",
        "Generating AI explanation…",
        "Preparing valuation report…"
    ];

    var STEP_MS = 480;
    var FADE_MS = 180;

    function runLoader(done) {
        aiLoader.hidden = false;
        document.body.classList.add("loader-open");

        var i = 0;
        loaderMsg.textContent = LOADER_STEPS[0];
        loaderMsg.classList.add("in");

        var total = LOADER_STEPS.length * STEP_MS;
        var start = Date.now();

        var progress = setInterval(function () {
            var elapsed = Date.now() - start;
            loaderFill.style.width = Math.min(100, (elapsed / total) * 100) + "%";
            if (elapsed >= total) {
                clearInterval(progress);
                loaderFill.style.width = "100%";
                setTimeout(done, 420);
            }
        }, 60);

        var steps = setInterval(function () {
            i++;
            if (i >= LOADER_STEPS.length) {
                clearInterval(steps);
                return;
            }
            loaderMsg.classList.remove("in");
            setTimeout(function () {
                loaderMsg.textContent = LOADER_STEPS[i];
                loaderMsg.classList.add("in");
            }, FADE_MS);
        }, STEP_MS);
    }

    // -----------------------
    // Submit
    // -----------------------

    form.addEventListener("submit", function (e) {
        var firstInvalidStep = 0;
        for (var s = 1; s <= totalSteps; s++) {
            if (!validateStep(s)) {
                firstInvalidStep = s;
                break;
            }
        }
        if (firstInvalidStep) {
            e.preventDefault();
            goTo(firstInvalidStep);
            return;
        }

        if (submitLocked) {
            e.preventDefault();
            return;
        }
        submitLocked = true;

        // Premium loading screen, then hand over to the native POST.
        e.preventDefault();
        submitBtn.disabled = true;
        runLoader(function () {
            form.submit();
        });
    });

    // -----------------------
    // Initialise
    // -----------------------

    renderBrands();
    goTo(1);
})();
