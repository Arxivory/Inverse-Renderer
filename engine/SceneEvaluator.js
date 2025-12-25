import { rendererOffScreen } from "../renderer/offscreenRenderer.js";
import { syncScene } from "./SceneSynchronizer.js";
import { computeLoss } from "./LossEvaluator.js";
import { getAspectRatio } from "../renderer/renderer.js";

export function evaluateScene() {
    const aspect = getAspectRatio();

    syncScene({
        aspect,
        syncCamera: true
    });

    const pixels = rendererOffScreen();
    return computeLoss(pixels);
}