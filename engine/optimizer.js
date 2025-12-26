import { FiniteDifferenceGradient } from "./GradientComputer.js";
import { evaluateScene } from "./SceneEvaluator.js";

export class Optimizer {
    constructor(parameterVector, iterations, learningRate, logger = null) {
        this.iterations = iterations;
        this.learningRate = learningRate;
        this.parameterVector = parameterVector;
        this.gradient = new FiniteDifferenceGradient();
        this.logger = logger;
    }

    optimize() {
        for (let i = 0; i < this.iterations; i++) {
            const gradients = this.gradient.compute(this.parameterVector);

            const lr = this.learningRate / (1 + 0.1 * i);

            for (let j = 0; j < this.parameterVector.getLength(); j++) {
                const currentVal = this.parameterVector.getValue(j);
                const maxGrad = 10.0;
                const g = Math.max(-maxGrad, Math.min(maxGrad, gradients[j]));

                this.parameterVector.setValue(j, currentVal - lr * g);
            }

            if (this.logger) {
                const loss = evaluateScene();
                this.logger.log(i, loss);
            }
        }
    }

}