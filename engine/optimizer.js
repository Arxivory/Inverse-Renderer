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

            for (let j = 0; j < this.parameterVector.getLength(); j++) {
                const currentVal = this.parameterVector.getValue(j);

                this.parameterVector.setValue(j, currentVal - this.learningRate * gradients[j]);
            }

            if (this.logger) {
                const loss = evaluateScene();
                this.logger.log(i, loss);
            }
        }
    }

}