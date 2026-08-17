// ==========================================
// Result Report - CarIntel
// Staggered scroll reveal animations
// ==========================================

(function () {
    "use strict";

    var reveals = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

        reveals.forEach(function (el, i) {
            el.style.transitionDelay = (i % 4) * 90 + "ms";
            observer.observe(el);
        });
    } else {
        reveals.forEach(function (el) {
            el.classList.add("visible");
        });
    }
})();
