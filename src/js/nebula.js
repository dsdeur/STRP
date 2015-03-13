var Scene = require('./scene.js');
var Blob = require('./blob.js');
var Converter = require('./configConverter.js');
var Socket = require('./socket.js');
var Flock = require('./flock.js');
var Stats = require('./lib/Stats.js');

var stats = new Stats();
stats.setMode(2); // 0: fps, 1: ms

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

module.exports = function(scene) {
    var self = this;
    this.scene = scene;
    this.flocks = {};

    this.socket = new Socket("ws://127.0.0.1:8520", {
        'new_data': this.newData
    });

    // New data handler
    this.newData = function(data) {
        // Process data
        // New blobs
        // Adjust groups
    };

    this.newFlock = function(group) {
        var flock = new Flock();
        this.flocks[group] = flock;
    }

    this.newBlob = function(data, group) {
        var config = Converter.getConfig(data);
        var blob = new Blob(config, group);

        if(!this.flocks.hasOwnProperty(group)) {
            this.newFlock(group);
        }

        this.flocks[group].addBoid(blob);
        this.scene.add(blob.object);
    };

    this.render = function() {
        stats.begin();

        for (var key in self.flocks) {
            if (self.flocks.hasOwnProperty(key)) {
                self.flocks[key].run();
            }
        }

        stats.end();

        self.scene.render();
        requestAnimationFrame(self.render)
    };
}
