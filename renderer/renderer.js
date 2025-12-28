import * as THREE from 'three';
import { OrbitControls } from
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { SceneState } from '../engine/SceneState.js';
import { syncScene } from '../engine/SceneSynchronizer.js';

let container;
let width, height;
let scene, camera, renderer, controls;

export function init(canvas) {
    if (!container) container = canvas;

    width = container.clientWidth;
    height = container.clientHeight;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    //renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(width, height, false);
    container.appendChild(renderer.domElement);

}

export function syncCameraAspect() {
    SceneState.camera.sync(width / height);
}

export function setActiveCamera(cameraEntity) {
    camera = cameraEntity.camera;
}

export function setupControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
}

function setupLighting() {
    const pointLighting = new THREE.PointLight(0xffffff);
    pointLighting.position.set(5, 5, 5);

    const ambientLighting = new THREE.AmbientLight(0xffffff, 0.3);

    scene.add(pointLighting);
    scene.add(ambientLighting);
}

function setupGridHelper() {
    const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
    scene.add(gridHelper);
}

export function setupScene() {
    setupGridHelper();
}

export function addToScene(object) {
    scene.add(object);
}

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    const aspect = width / height;
    syncScene({aspect, syncCamera: false});

    renderer.render(scene, camera);
}

export function startRenderLoop() {
    animate();
}

export function getScene() {
    return scene;
}

export function getRenderer() {
    return renderer;
}

export function getActiveCamera() {
    return camera;
}

export function getAspectRatio() {
    return width / height;
}