// ==========================================
// Hero Animation - CarIntel v2
// Cinematic BMW Hero
// ==========================================

console.log("HERO ANIMATION LOADED");

window.addEventListener("carModelReady", () => {
    console.log("BMW is ready!");

    const camera = window.heroCamera;
    const car = window.carModel;
    const heroFrontFillLight = window.heroFrontFillLight;
    const heroLight1 = window.heroLight1;

    if (!camera || !car) {
        console.warn("Hero animation could not start.");
        return;
    }

    // -----------------------
    // Initial Positions & Light States
    // -----------------------

    const startCameraZ = camera.position.z;
    const startCameraY = camera.position.y;

    const startCarY = car.position.y;
    const startCarRotY = car.rotation.y;
    const startCarRotX = car.rotation.x;

    // Save initial light positions and intensities
    let frontFillInitial = null;
    if (heroFrontFillLight) {
        frontFillInitial = {
            x: heroFrontFillLight.position.x,
            y: heroFrontFillLight.position.y,
            z: heroFrontFillLight.position.z,
            intensity: heroFrontFillLight.intensity
        };
    }
    let light1Initial = null;
    if (heroLight1) {
        light1Initial = {
            intensity: heroLight1.intensity
        };
    }

    // -----------------------
    // Scroll Targets
    // -----------------------

    let targetCameraZ = startCameraZ;
    let targetCameraY = startCameraY;

    let targetCarY = startCarY;
    let targetCarRotY = startCarRotY;

    // -----------------------
    // Current Values
    // -----------------------

    let currentCameraZ = startCameraZ;
    let currentCameraY = startCameraY;

    let currentCarY = startCarY;
    let currentCarRotY = startCarRotY;

    // -----------------------
    // Scroll Controller
    // -----------------------

    window.addEventListener("scroll", () => {
        const progress = Math.min(window.scrollY / 700, 1);
        targetCameraZ = startCameraZ - progress * 6.0;
        targetCameraY = startCameraY - progress * 0.45;
        targetCarY = startCarY + progress * 0.65;
        targetCarRotY = startCarRotY + progress * 0.35;
    });

    // -----------------------
    // Animation
    // -----------------------

    let time = 0;

    function animateHero() {
        requestAnimationFrame(animateHero);
        time += 0.02;
        const easing = 0.10;

        // Smooth scroll interpolation
        currentCameraZ += (targetCameraZ - currentCameraZ) * easing;
        currentCameraY += (targetCameraY - currentCameraY) * easing;
        currentCarY += (targetCarY - currentCarY) * easing;
        currentCarRotY += (targetCarRotY - currentCarRotY) * easing;

        // -----------------------
        // Idle Motion (amplitudes increased)
        // -----------------------
        const breathe = Math.sin(time) * 0.08;
        const cameraFloat = Math.sin(time * 0.9) * 0.06;
        const bodySwayY = Math.sin(time * 0.45) * 0.03;
        const bodyRoll = Math.sin(time * 0.7) * 0.012;

        // -----------------------
        // Apply Camera
        // -----------------------
        camera.position.z = currentCameraZ;
        camera.position.y = currentCameraY + cameraFloat;

        // -----------------------
        // Apply Car
        // -----------------------
        car.position.y = currentCarY + breathe;
        car.rotation.y = currentCarRotY + bodySwayY;
        car.rotation.x = startCarRotX + bodyRoll;

        // -----------------------
        // Cinematic Studio Light Animation
        // -----------------------
        if (heroFrontFillLight && frontFillInitial) {
            // Animate x position around initial
            heroFrontFillLight.position.x = frontFillInitial.x + Math.sin(time * 0.25) * 10;
            // Intensity between ~0.8 and 1.2, base at 1
            heroFrontFillLight.intensity = 1 + Math.sin(time * 0.25) * 0.2;
            // y,z remain unchanged (use initial)
            heroFrontFillLight.position.y = frontFillInitial.y;
            heroFrontFillLight.position.z = frontFillInitial.z;
        }
        if (heroLight1 && light1Initial) {
            // Subtle intensity animation
            heroLight1.intensity = 0.9 + Math.sin(time * 0.35 + 1.5) * 0.12;
        }
    }

    animateHero();
});