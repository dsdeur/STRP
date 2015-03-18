var Blob = function(config) {
    this.config = config ? config : randomConfig();
    this.x = 0;
    this.y = 0;

    this.init = function() {
        // Create the object
        this.geometry = new THREE.SphereGeometry(50, Math.floor(Math.random() * 35) + 5, Math.floor(Math.random() * 35) + 5);
        this.geometry.computeVertexNormals();

        this.attributes = new TransformAttributes();
    	this.uniforms = new TransformUniforms(config);

        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            attributes: this.attributes,
            vertexShader: vectorShader,
            fragmentShader: fragmentShader,
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

    // Animate the blob shape
    this.animate = function() {
        // Time based
        this.uniforms.t.value += this.config.speed1;
        this.uniforms.bt.value += this.config.speed2;
    };

    this.reconfigure = function(config) {
        // Set wireframe
        this.object.material.wireframe = config.wireframe;

        // Set speeds
        this.config.speed1 = config.speed1;
        this.config.speed2 = config.speed2;

        // Set uniforms
        this.uniforms.var1.value = config.var1;
        this.uniforms.var2.value = config.var2;
        this.uniforms.level.value = config.level;
        this.uniforms.color.value = hexToVector('#' + config.color);
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
