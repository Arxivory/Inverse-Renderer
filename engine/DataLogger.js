export class DataLogger {
    constructor() {
        this.records = [];
    }

    log(iteration, loss) {
        this.records.push({
            iteration,
            loss,
            time: performance.now()
        });
    }

    reset() {
        this.records = [];
    }

    getData() {
        return this.records;
    }
}