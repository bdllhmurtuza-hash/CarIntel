console.log('Swift evaluation viewer loaded');

import * as THREE from '/static/vendor/build/three.module.js';
import { GLTFLoader } from '/static/vendor/examples/jsm/loaders/GLTFLoader.js';

const wrapper = document.getElementById('swift-model-wrapper');
let container = document.getElementById('swift-model-container');

if (!container && wrapper) {
    container = document.createElement('div');
    container.id = 'swift-model-container';
    container.style.width = '100%';
    container.style.height = '100%';
    wrapper.appendChild(container);
}

if (!container) {
    console.error('swift-model-container not found');
} else {

    const scene = new THREE.Scene();
    scene.background = null;


    // CAMERA
    const camera = new THREE.PerspectiveCamera(
        26,
        container.clientWidth / container.clientHeight,
        0.1,
        2000
    );

    camera.position.set(0, 1.4, 13);



    // RENDERER
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    });

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
        550,
        350
    );

    container.appendChild(renderer.domElement);



    // ENVIRONMENT REFLECTIONS
    const reflectionStudio = new THREE.Scene();

    // No visible environment background
    reflectionStudio.background = null;


    const reflectionPanelMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
    });


    function addReflectionPanel(width, height, position, rotation) {

        const panel = new THREE.Mesh(
            new THREE.PlaneGeometry(width, height),
            reflectionPanelMaterial
        );

        panel.position.set(
            position.x,
            position.y,
            position.z
        );

        panel.rotation.set(
            rotation.x,
            rotation.y,
            rotation.z
        );

        reflectionStudio.add(panel);
    }


    addReflectionPanel(
        16,
        5,
        {x:0, y:8.5, z:0},
        {x:Math.PI/2, y:0, z:0}
    );


    addReflectionPanel(
        6,
        10,
        {x:-10.5, y:2.5, z:2},
        {x:0, y:Math.PI/2, z:0}
    );


    addReflectionPanel(
        5,
        8,
        {x:10.5, y:3.5, z:-4},
        {x:0, y:-Math.PI/2, z:0}
    );


    const pmremGenerator =
        new THREE.PMREMGenerator(renderer);


    scene.environment =
        pmremGenerator.fromScene(reflectionStudio).texture;


    scene.environmentIntensity = 3.6;


    pmremGenerator.dispose();



    // LIGHTING

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            1.6
        );

    scene.add(ambientLight);



    const keyLight =
        new THREE.DirectionalLight(
            0xffffff,
            3
        );

    keyLight.position.set(
        9,
        13,
        12
    );

    scene.add(keyLight);



    const fillLight =
        new THREE.DirectionalLight(
            0xdfeeff,
            2.2
        );

    fillLight.position.set(
        -15,
        8,
        -10
    );

    scene.add(fillLight);



    const rimLight =
        new THREE.DirectionalLight(
            0x8ec5ff,
            2.4
        );

    rimLight.position.set(
        0,
        9,
        -17
    );

    scene.add(rimLight);



    // LOAD SWIFT

    const loader = new GLTFLoader();


    loader.load(
        '/static/models/swift.glb',

        (gltf)=>{

            const car = gltf.scene;


            const boundingBox =
                new THREE.Box3()
                .expandByObject(car);


            const center =
                boundingBox.getCenter(
                    new THREE.Vector3()
                );


            car.position.x -= -0.;
            car.position.z -= center.z;
            car.position.y -= boundingBox.min.y
            car.position.y += 0.15;


            // Move car below CarIntel logo
            car.position.x -= 0.1;

            // Side profile: front of car faces right side of the page
            car.rotation.set(
                0,
                Math.PI / 2,
                0
            );


            // Correct the model’s intrinsic aspect ratio so it reads naturally in side profile
            car.scale.set(1.0, 1.12, 0.9);

            scene.add(car);

            console.log(container.clientWidth, container.clientHeight);
            console.log(car.position);
            console.log(car.scale);

            camera.lookAt(
                0,
                0.8,
                0
            );


            window.swiftModel = car;

            console.log(
                'Swift loaded successfully'
            );

        },


        (xhr)=>{

            console.log(
                'Swift loading:',
                Math.round(
                    (xhr.loaded / xhr.total) * 100
                ) + '%'
            );

        },


        (error)=>{

            console.error(
                'Swift model failed',
                error
            );

        }
    );



    // ANIMATION

    function animate(){

        requestAnimationFrame(animate);

        renderer.render(
            scene,
            camera
        );

    }

    animate();



    // RESPONSIVE

    window.addEventListener(
        'resize',
        ()=>{

            const width =
                container.clientWidth;

            const height =
                container.clientHeight;


            camera.aspect =
                width / height;


            camera.updateProjectionMatrix();


            renderer.setSize(
                width,
                height
            );

        }
    );

}