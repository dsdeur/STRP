var Scene = require('./scene.js');
var Blob = require('./blob.js');

module.exports = function(scene) {
    var self = this;
    this.scene = scene;
    this.blobs = [];

    this.newBlob = function() {
        var blob = new Blob();
        this.blobs.push(blob);
        this.scene.add(this.blobs[this.blobs.length-1].object);
    };

    this.render = function() {
        requestAnimationFrame(self.render)

        for(var i = 0, len = self.blobs.length; i < len; i++) {
            self.blobs[i].animate();
        }

        self.scene.render();
    }
}
