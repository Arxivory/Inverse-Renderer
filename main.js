import { computeLoss } from "./engine/LossEvaluator.js";
import { Optimizer } from "./engine/optimizer.js";
import { SceneState } from "./engine/SceneState.js";
import { rendererOffScreen } from "./renderer/offscreenRenderer.js";
import { startRenderLoop, stopRenderLoop, disposeScene } from "./renderer/renderer.js";
import { loadReferenceImage, resetReferenceImage } from "./utils/imageReferenceLoader.js";
import { ParameterVector } from "./engine/ParameterVector.js";
import { plotLoss } from "./engine/LossPlot.js";
import { DataLogger } from "./engine/DataLogger.js";
import { initScene1, initScene2 } from "./renderer/sceneDataLoader.js";

let container = document.getElementById('scene-container');

const imageSets = {
    scene1: [
        "targetImages/scene1/Scene-1-Image-1.png"
    ],
    scene2: [
        "targetImages/scene2/Scene-2-Image-1.png",
        "targetImages/scene2/Scene-2-Image-2.png",
        "targetImages/scene2/Scene-2-Image-3.png"
    ]
};

const sceneSelect = document.getElementById('scene-select');
const imageSelect = document.getElementById('image-select');
const imagePrev = document.getElementById('reference-image');

await initScene1(container);

updateImages("scene1");

function updateImages(scene) {
    imageSelect.innerHTML = "";

    imageSets[scene].forEach((path, index) => {
        const option = document.createElement("option");
        option.value = path;
        option.textContent = `Image ${index + 1}`;
        imageSelect.appendChild(option);
    })

    imagePrev.src = imageSets[scene][0];
}

sceneSelect.addEventListener("change", async (event) => {
    stopRenderLoop();
    disposeScene();
    resetReferenceImage();
    SceneState.reset();

    updateImages(event.target.value);

    if (event.target.value === "scene1") 
        await initScene1(container);
    else 
        await initScene2(container);

    const newParameterVector = new ParameterVector();
    optimizer.updateParameterVector(newParameterVector);
    
    startRenderLoop();
});

imageSelect.addEventListener("change", async (e) => {
    imagePrev.src = e.target.value;
    resetReferenceImage();
    await loadReferenceImage(e.target.value, 256, 256);
})

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