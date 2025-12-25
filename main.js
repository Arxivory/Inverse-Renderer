import { computeLoss } from "./engine/LossEvaluator.js";
import { Optimizer } from "./engine/optimizer.js";
import { loadSceneFromJSON } from "./engine/SceneLoader.js";
import { SceneState } from "./engine/SceneState.js";
import { initOffScreenRenderer, rendererOffScreen } from "./renderer/offscreenRenderer.js";
import { init, setupScene, startRenderLoop, setupControls, setActiveCamera, syncCameraAspect } from "./renderer/renderer.js";
import { loadReferenceImage } from "./utils/imageReferenceLoader.js";

const container = document.getElementById('scene-container');

init(container);

initOffScreenRenderer(256, 256);

await loadReferenceImage('targetImages/Target 1.png', 256, 256);

setupScene();

await loadSceneFromJSON('sceneData/scene1.json');

setActiveCamera(SceneState.camera);
syncCameraAspect();

setupControls();

const optimizer = new Optimizer(2, 0.5);

let pixels = rendererOffScreen();
let loss = computeLoss(pixels);
const lossSpan = document.getElementById('current-loss');
lossSpan.innerText = loss;

function optimize() {

    optimizer.optimize();

    pixels = rendererOffScreen();
    loss = computeLoss(pixels);

    lossSpan.innerText = loss;
}

const runOptimButton = document.getElementById('run-optimization');

runOptimButton.addEventListener("click", optimize);

startRenderLoop();