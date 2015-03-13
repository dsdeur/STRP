module.exports = function(config) {
    this.bt = {
        type: "f",
        value: 0.0
    };

    this.t = {
        type: "f",
        value: 0.0
    };

    this.var1 = {
        type: "f",
        value: config.var1
    };

    this.var2 = {
        type: "f",
        value: config.var2
    };

    this.level = {
        type: "f",
        value: config.level
    };

    this.len = {
        type:"f",
        value: 0
    };
};
