import { init, setupScene, startRenderLoop } from "./renderer/renderer.js";

const container = document.getElementById('scene-container');

init(container);
setupScene();

startRenderLoop();