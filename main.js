import { loadSceneFromJSON } from "./engine/SceneLoader.js";
import { SceneState } from "./engine/SceneState.js";
import { init, setupScene, startRenderLoop, setupControls, setActiveCamera, syncCameraAspect } from "./renderer/renderer.js";

const container = document.getElementById('scene-container');

init(container);

setupScene();

await loadSceneFromJSON('sceneData/scene1.json');

setActiveCamera(SceneState.camera);
syncCameraAspect();

setupControls();

startRenderLoop();