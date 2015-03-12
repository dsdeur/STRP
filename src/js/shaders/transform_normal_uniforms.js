var config = {
    color: [ 255, 70, 220 ],
    speed1: 0.021,
    level:  0.3,
    var1: 1.0,
    var2: 0.033,
    speed2: 0.09
};

var uniforms = {
    bt: {
        type: "f",
        value: 0.0
    },
    t: {
        type: "f",
        value: 0.0
    },
    var1: {
        type: "f",
        value: config.var1
    },
    var2: {
        type: "f",
        value: config.var2
    },
    level: {
        type: "f",
        value: config.level
    },
    len: {
        type:"f",
        value: 0
    }
};

module.exports = uniforms;
