import * as THREE from 'three';
import { OrbitControls } from
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { SceneState } from '../engine/SceneState.js';
import { syncScene } from '../engine/SceneSynchronizer.js';

let container;
let width, height;
let scene, camera, renderer, controls;
let animationId;

export function init(canvas) {
    if (!container) container = canvas;

    width = container.clientWidth;
    height = container.clientHeight;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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

export function addToScene(object) {
    scene.add(object);
}

function animate() {
    animationId = requestAnimationFrame(animate);

    controls.update();

    const aspect = width / height;
    syncScene({aspect, syncCamera: false});

    renderer.render(scene, camera);
}

export function startRenderLoop() {
    animate();
}

export function stopRenderLoop() {
    if (animationId) cancelAnimationFrame(animationId);
}

export function disposeScene() {
    if (!scene) return;

    scene.traverse((object) => {
        if (!object.isMesh) return;

        object.geometry?.dispose();

        if (object.material) {
            if (Array.isArray(object.material)) {
                object.material.forEach(m => m.dispose());
            } else {
                object.material.dispose();
            }
        }
    });

    renderer?.dispose();

    if (renderer?.domElement?.parentNode)
        renderer.domElement.parentNode.removeChild(renderer.domElement);

    scene = null;
    camera = null;
    controls?.dispose();

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