import { loadReferenceImage } from "../utils/imageReferenceLoader.js";
import { loadSceneFromJSON } from "../engine/SceneLoader.js";
import { init, setActiveCamera, setupControls, syncCameraAspect } from "./renderer.js";
import { SceneState } from "../engine/SceneState.js";
import { initOffScreenRenderer } from "./offscreenRenderer.js";

export async function initScene1(container) {
    init(container);

    initOffScreenRenderer(256, 256);
    
    await loadReferenceImage('../targetImages/scene1/Target Image.png', 256, 256);

    await loadSceneFromJSON('../sceneData/scene1.json');

    setActiveCamera(SceneState.camera);
    syncCameraAspect();

    setupControls();

}

export async function initScene2(container) {
    init(container);
    
    initOffScreenRenderer(256, 256);
    
    await loadReferenceImage('../targetImages/scene2/Image 1.png', 256, 256);

    await loadSceneFromJSON('sceneData/scene2.json');

    setActiveCamera(SceneState.camera);
    syncCameraAspect();

    setupControls();
}

