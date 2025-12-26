export class ParameterDescriptor {
    constructor({ get, set, min = -Infinity, max = Infinity, step = 1e-2, active = true, group = "default" }) {
        this.get = get;
        this.set = set;
        this.min = min;
        this.max = max;
        this.step = step;
        this.active = active;
        this.group = group;
    }
}