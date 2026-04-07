import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class DistrictDetailsComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const density = (data.uavCount / data.areaSize).toFixed(1);

        return (
            `
            <div class="row">
                <div class="col-md-5">
                    <div class="card mb-3" style="border-radius: 0; border: 1px solid #4a235a;">
                        <div class="card-body">
                            <h2 class="card-title" style="color: #4a235a; font-weight: bold;">${data.title}</h2>
                            <p class="card-text">${data.description}</p>
                            <ul class="list-group list-group-flush mb-3">
                                <li class="list-group-item" style="border-color: #4a235a;">Площадь: ${data.areaSize} кв.км</li>
                                <li class="list-group-item" style="border-color: #4a235a;">Заявок БПЛА: ${data.uavCount}</li>
                                <li class="list-group-item" style="border-color: #4a235a;">Дата контроля: ${data.controlDate}</li>
                                <li class="list-group-item" style="border-color: #4a235a; font-weight: bold; color: #4a235a;">
                                    Расчетная плотность: ${density} ед/кв.км
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-md-7">
                    <div id="model-container" style="width: 100%; height: 350px; background-color: #f8f9fa; border: 2px solid #4a235a;"></div>
                    
                    <div class="text-center mt-2 p-2" style="border: 1px solid #4a235a;">
                        <span style="color: #4a235a; font-weight: bold; display: block; margin-bottom: 5px;">Управление камерой:</span>
                        <div class="btn-group" role="group" aria-label="Управление камерой">
                            <button id="btn-front" type="button" class="btn btn-square btn-sm">Спереди</button>
                            <button id="btn-back" type="button" class="btn btn-square btn-sm">Сзади</button>
                            <button id="btn-left" type="button" class="btn btn-square btn-sm">Слева</button>
                            <button id="btn-right" type="button" class="btn btn-square btn-sm">Справа</button>
                            <button id="btn-zoom-in" type="button" class="btn btn-square btn-sm">+</button>
                            <button id="btn-zoom-out" type="button" class="btn btn-square btn-sm">-</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        );
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.init3DModel();
    }

    init3DModel() {
        const container = document.getElementById('model-container');
        if (!container) return;
        
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8f9fa); 

        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
        camera.position.set(0, 2, 5); 

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 10);
        scene.add(directionalLight);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const loader = new GLTFLoader();
        loader.load('models/uav_drone.glb', function (gltf) {
            const model = gltf.scene;
            
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            
            scene.add(model);
        }, undefined, function (error) {
            console.error('Не найдена модель. Показываем куб.', error);
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshStandardMaterial({ color: 0x4a235a });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
        });

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();

        document.getElementById('btn-front').addEventListener('click', () => camera.position.set(0, 2, 5));
        document.getElementById('btn-back').addEventListener('click', () => camera.position.set(0, 2, -5));
        document.getElementById('btn-left').addEventListener('click', () => camera.position.set(-5, 2, 0));
        document.getElementById('btn-right').addEventListener('click', () => camera.position.set(5, 2, 0));
        document.getElementById('btn-zoom-in').addEventListener('click', () => { camera.position.z -= 1; });
        document.getElementById('btn-zoom-out').addEventListener('click', () => { camera.position.z += 1; });
    }
}