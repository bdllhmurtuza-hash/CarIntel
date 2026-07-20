console.log("NEW CAR VIEWER LOADED");

import * as THREE from '/static/vendor/build/three.module.js';
import { GLTFLoader } from '/static/vendor/examples/jsm/loaders/GLTFLoader.js';

const container = document.getElementById("car-container");

console.log("Car Viewer Loaded");

if (!container) {
    console.error("car-container not found");
}

const scene = new THREE.Scene();
scene.background = null;


const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);


// Hero shot camera position
camera.position.set(23, 8, 42);


const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);

container.appendChild(renderer.domElement);

// Expose Three.js objects for hero animations
window.heroScene = scene;
window.heroCamera = camera;
window.heroRenderer = renderer;


// Lights
scene.add(new THREE.AmbientLight(0xffffff, 1.5));

const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
light1.position.set(8, 6, 2);
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xffffff, 1);
light2.position.set(-5, 4, -4);
scene.add(light2);

const sideLight1 = new THREE.DirectionalLight(0xffffff, 0.4);
sideLight1.position.set(-10, 5, 15);
scene.add(sideLight1);

const sideLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
sideLight2.position.set(10, 3, -15);
scene.add(sideLight2);

// Front face fill light
const frontFillLight = new THREE.DirectionalLight(0xffffff, 0.8);
frontFillLight.position.set(0, 4, 20);
scene.add(frontFillLight);

// Interior window fill lights
const windowLight1 = new THREE.PointLight(0xffffff, 2, 20);
windowLight1.position.set(8, 5, 8);
scene.add(windowLight1);

const windowLight2 = new THREE.PointLight(0xffffff, 1.5, 20);
windowLight2.position.set(-8, 5, 8);
scene.add(windowLight2);

// Expose hero lights for cinematic animations
window.heroAmbientLight = scene.children.find(obj => obj.isAmbientLight);
window.heroFrontFillLight = frontFillLight;
window.heroLight1 = light1;
window.heroLight2 = light2;
window.heroSideLight1 = sideLight1;
window.heroSideLight2 = sideLight2;
window.heroWindowLight1 = windowLight1;
window.heroWindowLight2 = windowLight2;


// Animation
function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();


// Load BMW
const loader = new GLTFLoader();


loader.load(
    "/static/models/bmw.glb",

    (gltf) => {

        console.log("BMW Loaded!");

        const car = gltf.scene;


        // Calculate original size
        let box = new THREE.Box3().setFromObject(car);

        let size = box.getSize(
            new THREE.Vector3()
        );


        let maxSize = Math.max(
            size.x,
            size.y,
            size.z
        );


        // Automatic scaling
        const desiredSize = 130;

        const scale = desiredSize / maxSize;


        car.scale.set(
            scale,
            scale,
            scale
        );


        // Recalculate after scaling
        box = new THREE.Box3().setFromObject(car);


        const center = box.getCenter(
            new THREE.Vector3()
        );


        // Center model
        car.position.sub(center);


        // Lower car slightly inside glass box
        car.position.set(3, 0.2, 0);


        // Slight cinematic 3/4 angle
        car.rotation.y = -Math.PI * 0.57;


        scene.add(car);

        // Cabin illumination lights
        const cabinLight1 = new THREE.PointLight(0xffffff, 1.5, 10);
        cabinLight1.position.set(0, 4, 3);
        car.add(cabinLight1);

        const cabinLight2 = new THREE.PointLight(0xffffff, 1, 8);
        cabinLight2.position.set(0, 3, -2);
        car.add(cabinLight2);

        window.carModel = car;

        // Notify animation system that the model is ready
        window.dispatchEvent(new Event('carModelReady'));


        // Focus camera on car
        camera.lookAt(
            new THREE.Vector3(0, 2, 0)
        );


        console.log(car);
        console.log("BMW SIZE:", size);
        console.log("BMW SCALE:", scale);

    },


    (xhr) => {

        console.log(
            Math.round((xhr.loaded / xhr.total) * 100) + "% loaded"
        );

    },


    (error) => {

        console.error("BMW failed to load");
        console.error(error);

    }

);



window.addEventListener("resize", () => {

    camera.aspect =
        container.clientWidth /
        container.clientHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

});


console.log("CAR VIEWER VERSION 4 LOADED");