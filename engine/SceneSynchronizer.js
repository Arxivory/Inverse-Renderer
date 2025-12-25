import { SceneState } from "./SceneState.js";

export function syncScene({aspect, syncCamera = false}) {
    if (SceneState.camera && syncCamera)
        SceneState.camera.sync(aspect);

    for (const obj of SceneState.objects)
        obj.syncToMesh();

    for (const light of SceneState.lights)
        light.sync();
}