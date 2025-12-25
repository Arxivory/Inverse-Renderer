import { FiniteDifferenceGradient } from "./GradientComputer.js";

export class Optimizer {
    constructor(parameterVector, iterations, learningRate) {
        this.iterations = iterations;
        this.learningRate = learningRate;
        this.parameterVector = parameterVector;
        this.gradient = null;
        this.build();
    }

    build() {
        this.gradient = new FiniteDifferenceGradient();
        this.parameterVector.build();
    }

    optimize() {
        for (let i = 0; i < this.iterations; i++) {
            const gradients = this.gradient.compute(this.parameterVector);

            for (let j = 0; j < this.parameterVector.getLength(); j++) {
                const currentVal = this.parameterVector.getValue(j);

                this.parameterVector.setValue(j, currentVal - this.learningRate * gradients[j]);
            }
        }
    }

}