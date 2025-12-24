import { init, setupScene, startRenderLoop } from "./renderer/renderer.js";
import { loadTestObject } from "./engine/SceneLoader.js";

const container = document.getElementById('scene-container');

init(container);
setupScene();

loadTestObject();

startRenderLoop();