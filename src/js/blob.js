var THREE = require('three');
var vs = require('./shaders/transform_normal.vs');
var fs = require('./shaders/transform_normal.fs');
var transformUniforms = require('./shaders/transform_normal_uniforms.js');
var transformAttributes = require('./shaders/transform_normal_attributes.js');

module.exports = function(config) {
    this.config = config ? config : randomConfig();
    var t = 0;
    var bt = 0;

    this.init = function() {
        // Create the object
        this.geometry = new THREE.SphereGeometry(50, 40, 40);
        // this.geometry = new THREE.SphereGeometry(Math.floor(Math.random() * 15) + 6, 40, 40);

        var shader = THREE.ShaderLib.phong;
        var normalUniforms = THREE.UniformsUtils.clone(shader.uniforms);
        this.uniforms = THREE.UniformsUtils.merge([normalUniforms, transformUniforms]);
        this.attributes = transformAttributes;

        this.material = new THREE.MeshPhongMaterial({ambient: 0xff0000, color: 0xff0000, wireframe: config.wireframe})
        this.material = new THREE.ShaderMaterial({
            uniforms: normalUniforms,
            //attributes: this.attributes,
            vertexShader: shader.vertexShader,
            fragmentShader: shader.fragmentShader,
        });
        // console.log(JSON.stringify(normalUniforms));
        console.log(this.material, this.material['__webglShader']);
        this.object = new THREE.Mesh(this.geometry, this.material);

        // Shadow options
        // this.object.castShadow = true;
        // this.object.receiveShadow = true;

        // Get attributes
        // var values = this.attributes.displacement.value;
        // var ox = this.attributes.ox.value;
        // var oy = this.attributes.oy.value;
        // var oz = this.attributes.oz.value;

        // Store vertices positions
        // var vertices = this.object.geometry.vertices;
        // for(var i = 0, len = vertices.length; i < len; i++) {
        //     values.push(i)
        //     ox.push(vertices[i].x);
        //     oy.push(vertices[i].y);
        //     oz.push(vertices[i].z);
        // }

        // Randomize the position
        // this.object.position.x = 0; //Math.floor(Math.random() * 500) + -250;
        // this.object.position.y = 100; //Math.floor(Math.random() * 500) + -250;
        // this.object.position.z = 0; //Math.floor(Math.random() * 700) + -350;


        // Apply this color
        // this.object.material.ambient.r = this.object.material.color.r = this.config.color[0] / 255;
        // this.object.material.ambient.g = this.object.material.color.g = this.config.color[1] / 255;
        // this.object.material.ambient.b = this.object.material.color.b = this.config.color[2] / 255;
    };

    // Change the blob position
    this.move = function(x, y) {
        this.object.position.x = x;
        this.object.position.y = y;
    };

    // Animate the blob shape
    this.animate = function() {
        // this.uniforms.t.value += config.speed1;
        // this.uniforms.bt.value += config.speed2;
    };

    // Return a random config
    function randomConfig() {
        var tempconfig = {
            color: [ 0, 128, 255 ],
            speed1: .0141,
            level:  .75,
            var1: .35,
            var2: 0,
            speed2: .09
        };

        tempconfig.color[0] = Math.random() * 255;
        tempconfig.color[1] = Math.random() * 255;
        tempconfig.color[2] = Math.random() * 255;
        tempconfig.level = Math.random();
        tempconfig.var1 = Math.random();
        tempconfig.var2 = Math.random();
        tempconfig.speed1 = Math.random() * .2;
        tempconfig.speed2 = Math.random() * .2;

        return tempconfig;
    };

    this.init();
}
