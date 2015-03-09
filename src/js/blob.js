var THREE = require('three');

module.exports = function(config) {
    this.config = config ? config : randomConfig();
    var t = 0;
    var bt = 0;

    this.init = function() {
        // Create the object
        this.geometry = new THREE.SphereGeometry(Math.floor(Math.random() * 15) + 6, 40, 40);
        this.material = new THREE.MeshPhongMaterial({ambient: 0xff0000, color: 0xff0000})
        this.object = new THREE.Mesh(this.geometry, this.material);

        // Shadow options
        this.object.castShadow = true;
        this.object.receiveShadow = true;

        // Store vertices positions
        var ballVertices = this.object.geometry.vertices;
        var vertex;
        for(var i = 0, len = this.object.geometry.vertices.length; i < len; i++) {
            vertex = this.object.geometry.vertices[i];
            vertex.ox = vertex.x;
            vertex.oy = vertex.y;
            vertex.oz = vertex.z;
        }

        // Randomize the position
        this.object.position.x = Math.floor(Math.random() * 500) + -250;
        this.object.position.y = Math.floor(Math.random() * 500) + -250;
        this.object.position.z = Math.floor(Math.random() * 700) + -350;


        // Apply this color
        this.object.material.ambient.r = this.object.material.color.r = this.config.color[0] / 255;
        this.object.material.ambient.g = this.object.material.color.g = this.config.color[1] / 255;
        this.object.material.ambient.b = this.object.material.color.b = this.config.color[2] / 255;
    };

    // Change the blob position
    this.move = function(x, y) {
        this.object.position.x = x;
        this.object.position.y = y;
    };

    // Animate the blob shape
    this.animate = function() {
        var vertex;
        var scale;

        // Get the config vars
        t += this.config.speed1;
        bt += this.config.speed2;
        var level = this.config.level;
        var multiplyRatio = this.config.multiplyRatio;
        var var1 = this.config.var1;
        var var2 = this.config.var2;

        // Reposition the vertices
        for(var i = 0, len = this.object.geometry.vertices.length; i < len; i++) {
            vertex = this.object.geometry.vertices[i];
            scale = Math.sin(t + i * ((1 + i)/(1 + i * var2)) * var1/40) * Math.sin(bt + i/ len) * level;
            vertex.x = vertex.ox + vertex.ox * scale;
            vertex.y = vertex.oy + vertex.oy * scale;
            vertex.z = vertex.oz + vertex.oz * scale;
        }

        // Set the vertices for updating
        this.object.geometry.verticesNeedUpdate = true;
        this.object.geometry.normalsNeedUpdate = true;
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
