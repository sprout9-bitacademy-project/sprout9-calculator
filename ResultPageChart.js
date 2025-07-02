export default class ResultPageChart {
    static ctx;
    static config;

    constructor(ctx, config) {
        this.ctx = ctx;
        this.config = config;
    }

    plotChart() {
        new Chart(this.ctx, this.config);
    }
}