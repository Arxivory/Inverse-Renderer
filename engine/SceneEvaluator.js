import { rendererOffScreen } from "../renderer/offscreenRenderer";
import { syncScene } from "./SceneSynchronizer";
import { computeLoss } from "./LossEvaluator";
import { getAspectRatio } from "../renderer/renderer";

export function evaluateScene() {
    const aspect = getAspectRatio();

    syncScene({
        aspect,
        syncCamera: true
    });

    const pixels = rendererOffScreen();
    return computeLoss(pixels);
}