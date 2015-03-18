// ATTRIBUTES -----------------------------------------
var TransformAttributes = function() {
    this.displacement = {
		type: 'f', // a float
		value: [] // an empty array
	};

    this.ox = {
        type: 'f',
        value: []
    };

    this.oy = {
        type: 'f',
        value: []
    };

    this.oz = {
        type: 'f',
        value: []
    };
};


// UNIFORMS -------------------------------------------
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


var TransformUniforms = function(config) {
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


// VECTOR SHADER --------------------------------------
var vectorShader = "uniform float t; uniform float bt; uniform float var1; uniform float var2; uniform float level; uniform float len; attribute float ox; attribute float oy; attribute float oz; attribute float displacement; varying vec3 vNormal; void main() { vNormal = normal; float scale = 1.0 + sin(t + displacement * ((1.0 + displacement)/(1.0 + displacement * var2)) * var1/40.0) * sin(bt * displacement/len) * level; float x = ox * scale; float y = oy * scale; float z = oz * scale; vec3 newPosition = position + position * scale; gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0); }";


// FRAGMENT SHADER ------------------------------------
var fragmentShader = "varying vec3 vNormal; uniform vec3 color; void main() { vec3 light = vec3(0.5,0.2,1.0); light = normalize(light); float dProd = max(0.0, dot(vNormal, light)); gl_FragColor = vec4(dProd, dProd, dProd, 1.0) * vec4(color, 1.0); }";
