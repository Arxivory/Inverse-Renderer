import { evaluateScene } from "./SceneEvaluator.js";

export function testSensitivity({
    target,
    property,
    deltas
}) {
    const originalValue = target[property];
    const results = [];

    for (const delta of deltas) {
        target[property] = originalValue + delta;

        const loss = evaluateScene();

        results.push({
            delta,
            loss
        })
    }

    target[property] = originalValue;

    return results;
}