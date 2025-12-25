import { evaluateScene } from "./SceneEvaluator.js";

export class FiniteDifferenceGradient {
    constructor(epsilon = 1e-3) {
        this.epsilon = epsilon;
    }

    compute(params) {
        const gradients = new Array(params.getLength()).fill(0);
        const parameters = params;

        for (let i = 0; i < params.getLength(); i++) {
            const original = parameters.getValue(i);

            parameters.setValue(i, original + this.epsilon);
            const lossPlus = evaluateScene();

            parameters.setValue(i, original - this.epsilon);
            const lossMinus = evaluateScene();

            parameters.setValue(i, original);

            gradients[i] = (lossPlus - lossMinus) / (2 * this.epsilon);
        }

        return gradients;
    }
}