import { evaluateScene } from "./SceneEvaluator.js";

export class FiniteDifferenceGradient {
    constructor() {
    }

    compute(params, lossType) {
        const gradients = new Array(params.getLength()).fill(0);
        const parameters = params;

        for (let i = 0; i < params.getLength(); i++) {
            const step = parameters.parameters[i].step;

            const original = parameters.getValue(i);

            parameters.setValue(i, original + step);
            const lossPlus = evaluateScene(this.lossType, lossType);

            parameters.setValue(i, original - step);
            const lossMinus = evaluateScene(this.lossType, lossType);

            parameters.setValue(i, original);

            gradients[i] = (lossPlus - lossMinus) / (2 * step);
        }

        return gradients;
    }
}