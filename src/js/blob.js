var THREE = require('three');
var Boid = require('./boid.js');
var vsnormal = require('./shaders/transform_normal.vs');
var fsnormal = require('./shaders/transform_normal.fs');
var vswireframe = require('./shaders/transform_wireframe.vs');
var fswireframe = require('./shaders/transform_wireframe.fs');
var TransformUniforms = require('./shaders/transform_normal_uniforms.js');
var TransformAttributes = require('./shaders/transform_normal_attributes.js');

module.exports = function(config, group) {
    this.config = config ? config : randomConfig();
    this.group = group;
    this.x = 0;
    this.y = 0;

    this.init = function() {
        this.initBoid();

        // Create the object
        this.geometry = new THREE.SphereGeometry(10, Math.floor(Math.random() * 35) + 5, Math.floor(Math.random() * 35) + 5);
        this.geometry.computeVertexNormals();

        this.attributes = new TransformAttributes();
    	this.uniforms = new TransformUniforms(config);

        if(this.config.wireframe) {
            this.material = new THREE.ShaderMaterial({
                uniforms: this.uniforms,
                attributes: this.attributes,
                vertexShader: vswireframe,
                fragmentShader: fswireframe,
            });

        } else {
            this.material = new THREE.ShaderMaterial({
                uniforms: this.uniforms,
                attributes: this.attributes,
                vertexShader: vsnormal,
                fragmentShader: fsnormal,
            });
        }
        //this.material = new THREE.MeshPhongMaterial({ambient: 0xff0000, color: 0xff0000, wireframe: config.wireframe})

        this.object = new THREE.Mesh(this.geometry, this.material);

        //Get attributes
        var values = this.attributes.displacement.value;
        var ox = this.attributes.ox.value;
        var oy = this.attributes.oy.value;
        var oz = this.attributes.oz.value;

        // Store vertices positions
        var vertices = this.object.geometry.vertices;
        for(var i = 0, len = vertices.length; i < len; i++) {
            values.push(i)
            ox.push(vertices[i].x);
            oy.push(vertices[i].y);
            oz.push(vertices[i].z);
        }

        this.uniforms.len.value = vertices.length;
    };

    this.initBoid = function() {
        this.boid = new Boid();
        this.boid.init(this.group, 0, 0);
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

        this.x = 0;
        this.y = 0;

        this.x = position.x;
        this.y = position.y;
        this.reposition();
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
    };

    this.init();
}
