import { init, setupScene, startRenderLoop } from "./renderer.js";

const container = document.getElementById('scene-container');

init(container);
setupScene();
startRenderLoop();