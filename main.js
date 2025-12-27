import { computeLoss } from "./engine/LossEvaluator.js";
import { Optimizer } from "./engine/optimizer.js";
import { loadSceneFromJSON } from "./engine/SceneLoader.js";
import { SceneState } from "./engine/SceneState.js";
import { initOffScreenRenderer, rendererOffScreen } from "./renderer/offscreenRenderer.js";
import { init, setupScene, startRenderLoop, setupControls, setActiveCamera, syncCameraAspect } from "./renderer/renderer.js";
import { loadReferenceImage } from "./utils/imageReferenceLoader.js";
import { ParameterVector } from "./engine/ParameterVector.js";
import { plotLoss } from "./engine/LossPlot.js";
import { DataLogger } from "./engine/DataLogger.js";

const container = document.getElementById('scene-container');

init(container);

initOffScreenRenderer(256, 256);

await loadReferenceImage('targetImages/Target Image.png', 256, 256);

setupScene();

await loadSceneFromJSON('sceneData/scene1.json');

setActiveCamera(SceneState.camera);
syncCameraAspect();

setupControls();

let pixels = rendererOffScreen();
let loss = computeLoss(pixels);
const lossSpan = document.getElementById('current-loss');
lossSpan.innerText = loss;

const logger = new DataLogger();


function optimize() {
    logger.reset();

    optimizer.optimize(selectedLossType);

    pixels = rendererOffScreen();
    loss = computeLoss(pixels, selectedLossType);

    lossSpan.innerText = loss;

    plotLoss(logger.getData());
}

const runOptimButton = document.getElementById('run-optimization');
const learningRateSlider = document.getElementById('learning-rate');
const maxIterationInput = document.getElementById('max-iterations');

let learningRate = learningRateSlider.value;
let iterations = maxIterationInput.value;

const cameraCheckbox = document.getElementById('opt-camera');
const lightCheckbox = document.getElementById('opt-light');
const objectsCheckbox = document.getElementById('opt-objects');
const lossTypes = document.getElementsByName('loss-type');
let selectedLossType = "l2";

const parameterVector = new ParameterVector();

cameraCheckbox.addEventListener("change", function() {
    if (this.checked)
        parameterVector.setGroupActive("camera", true);
    else
        parameterVector.setGroupActive("camera", false);
});

lightCheckbox.addEventListener("change", function() {
    if (this.checked)
        parameterVector.setGroupActive("light", true);
    else
        parameterVector.setGroupActive("light", false);
});

objectsCheckbox.addEventListener("change", function() {
    if (this.checked)
        parameterVector.setGroupActive("object", true);
    else
        parameterVector.setGroupActive("object", false);
});

const optimizer = new Optimizer(parameterVector, iterations, learningRate, logger);

lossTypes.forEach(lossTypeRadio => {
    lossTypeRadio.addEventListener("change", function() {
        selectedLossType = this.value;
    })
})

runOptimButton.addEventListener("click", optimize);
learningRateSlider.addEventListener("change", (event) => {
    optimizer.learningRate = event.target.value;
});
maxIterationInput.addEventListener("change", (event) => {
    optimizer.iterations = event.target.value;
});


startRenderLoop();