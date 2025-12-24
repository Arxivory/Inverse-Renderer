import * as THREE from 'three';
import { getScene, getActiveCamera, getRenderer } from './renderer';

let renderTarget = null;
let width = 256;
let height = 256;
let pixelBuffer = null;

export function initOffScreenRenderer(w = 256, h = 256) {
    width = w;
    height = h;

    renderTarget = new THREE.WebGLRenderTarget(width, height, {
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType
    });

    pixelBuffer = new Uint8Array(width * height * 4);
}

export function rendererOffScreen() {
    const renderer = getRenderer();
    const scene = getScene();
    const camera = getCamera();

    if (!renderTarget) 
        throw new Error("Offscreen renderer not initialized.");

    const prevTarget = renderer.getRenderTarget();

    renderer.setRenderTarget(renderTarget);
    renderer.renderer(scene, camera);

    renderer.readRenderTargetPixels(
        renderTarget,
        0, 0,
        width, height,
        pixelBuffer
    );

    renderer.setRenderTarget(prevTarget);

    return pixelBuffer;
}