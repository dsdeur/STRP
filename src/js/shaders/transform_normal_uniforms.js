var THREE = require('three');

function hexToVector(hex) {
    rgb = hexToRgb(hex);

    var r = rgb[0]/255;
    var g = rgb[1]/255;
    var b = rgb[2]/255;

    return new THREE.Vector3(r,g,b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return rgb = [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ];
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
        value: hexToVector('#' + config.color)
    }
};
