var THREE = require('three');

function rgbToVector(rgb) {
    var r = rgb[0]/255;
    var g = rgb[1]/255;
    var b = rgb[2]/255;

    return new THREE.Vector3(r,g,b);
}

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

    this.color = {
        type:"v3",
        value: rgbToVector(config.color)
    }
};
