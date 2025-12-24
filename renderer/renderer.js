import * as THREE from 'three';
import { OrbitControls } from
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/jsm/controls/OrbitControls.js';


let container;
let width, height;
let fov = 45, nearClip = 0.1, farClip = 1000;
let scene, camera, renderer, controls;

export function init(canvas) {
    if (!container) container = canvas;

    width = container.clientWidth;
    height = container.clientHeight;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(fov, width / height, nearClip, farClip);
    camera.position.set(3, 3, 3);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height, false);
    container.appendChild(renderer.domElement);

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
    setupLighting();
    setupGridHelper();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

export function startRenderLoop() {
    animate();
}