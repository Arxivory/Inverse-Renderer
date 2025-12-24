export class ParameterDescriptor {
    constructor({ get, set, min = -Infinity, max = Infinity, step = 1e-2 }) {
        this.get = get;
        this.set = set;
        this.min = min;
        this.max = max;
        this.step = step;
    }
}