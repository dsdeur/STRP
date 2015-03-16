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
    this.flock = new Flock();


    this.socket = new Socket("ws://127.0.0.1:8888", function(data) {
        // Process data
        // New blobs
        // Adjust groups
        console.log(data);
    });

    // this.newFlock = function(group) {
    //     var flock = new Flock();
    //     this.flocks[group] = flock;
    // }

    this.newBlob = function(data, group) {
        var config = Converter.getConfig(data);
        var blob = new Blob(config, group);

        this.flock.addBoid(blob);
        this.scene.add(blob.object);
    };

    this.render = function() {
        stats.begin();

        self.flock.run();

        stats.end();

        self.scene.render();
        requestAnimationFrame(self.render)
    };
}
