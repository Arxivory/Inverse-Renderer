import { FiniteDifferenceGradient } from "./GradientComputer.js";
import { ParameterVector } from "./ParameterVector.js";

export class Optimizer {
    constructor(iterations, learningRate) {
        this.iterations = iterations;
        this.learningRate = learningRate;
        this.parameterVector = null;
        this.gradient = null;
        this.build();
    }

    build() {
        this.gradient = new FiniteDifferenceGradient();
        this.parameterVector = new ParameterVector();
    }

    optimize() {
        for (let i = 0; i < this.iterations; i++) {
            const gradients = this.gradient.compute(this.parameterVector);

            for (let j = 0; j < this.parameterVector.getLength(); j++) {
                const currentVal = this.parameterVector.getValue(i);
                this.parameterVector.setValue(i, currentVal - this.learningRate * gradients[j]);
            }
        }
    }

}