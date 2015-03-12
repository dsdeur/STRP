var Scene = require('./scene.js');
var Blob = require('./blob.js');
var Converter = require('./configConverter.js');
var Socket = require('./socket.js');

module.exports = function(scene) {
    var self = this;
    this.scene = scene;
    this.blobs = [];

    this.socket = new Socket("ws://127.0.0.1:8520", {
        'new_data': this.newData
    });

    // New data handler
    this.newData = function(data) {
        // Process data
        // New blobs
        // Adjust groups
    };

    this.newBlob = function(data) {
        var config = Converter.getConfig(data);
        var blob = new Blob(config);
        this.blobs.push(blob);
        this.scene.add(this.blobs[this.blobs.length-1].object);
    };

    this.render = function() {
        requestAnimationFrame(self.render)

        for(var i = 0, len = self.blobs.length; i < len; i++) {
            self.blobs[i].animate();
        }

        self.scene.render();
    };
}
