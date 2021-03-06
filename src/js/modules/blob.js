var THREE = require('three');
var Boid = require('./boid.js');
var vsnormal = require('./../shaders/transform_normal.vs');
var fsnormal = require('./../shaders/transform_normal.fs');
var TransformUniforms = require('./../shaders/transform_normal_uniforms.js');
var TransformAttributes = require('./../shaders/transform_normal_attributes.js');

module.exports = function(config, group, id) {
    this.config = config ? config : randomConfig();
    this.group = group;
    this.x = 0;
    this.y = 0;
    this.id = id;

    this.init = function() {
        log("New blob in group: " + group);

        this.initBoid();

        // Create the object
        this.geometry = new THREE.SphereGeometry(15, Math.floor(Math.random() * 35) + 5, Math.floor(Math.random() * 35) + 5);
        this.geometry.computeVertexNormals();

        this.attributes = new TransformAttributes();
    	this.uniforms = new TransformUniforms(config);


        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            attributes: this.attributes,
            vertexShader: vsnormal,
            fragmentShader: fsnormal,
            wireframe: this.config.wireframe
        });


        this.object = new THREE.Mesh(this.geometry, this.material);

        //Get attributes
        var values = this.attributes.displacement.value;
        var ox = this.attributes.ox.value;
        var oy = this.attributes.oy.value;
        var oz = this.attributes.oz.value;

        // Store vertices positions
        var vertices = this.object.geometry.vertices;
        for(var i = 0, len = vertices.length; i < len; i++) {
            values.push(i);
            ox.push(vertices[i].x);
            oy.push(vertices[i].y);
            oz.push(vertices[i].z);
        }

        this.uniforms.len.value = vertices.length;
    };

    this.initBoid = function() {
        this.boid = new Boid();
        this.boid.init(this.group, window.vrRegionX, 0, this.initOrientation);
    };

    // Animate the blob shape
    this.animate = function() {
        // Time based
        this.uniforms.t.value += this.config.speed1;
        this.uniforms.bt.value += this.config.speed2;
    };

    this.update = function(boids) {
        this.animate();
        var position = this.boid.run(boids);
        this.reposition(position.x, position.y);


        this.x = position.x - window.vrRegionX;
        this.y = position.y - window.vrRegionY;

        this.reposition();
    };

    this.changeGroup = function(group) {
        this.group = group;
        this.boid.group = group;
    };

    // Change the blob position
    this.reposition = function() {
        this.object.position.x = this.x;
        this.object.position.y = this.y;
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
    }

    this.init();


    function log(message) {
        console.log('%c ' + message, 'background: #33FFCC; color: #0033FF');
    }
}
