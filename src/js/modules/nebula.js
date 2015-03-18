var Scene = require('./scene.js');
var Blob = require('./blob.js');
var Converter = require('./configConverter.js');
var Socket = require('./socket.js');
var Flock = require('./flock.js');
var Stats = require('./../lib/Stats.js');
var _ = require('lodash');



module.exports = function(scene) {
    var self = this;
    this.scene = scene;
    this.flock = new Flock();

    if(window.DEBUGGING) {
        this.stats = new Stats();
        this.stats.setMode(2); // 0: fps, 1: ms

        // align top-left
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '0px';
        this.stats.domElement.style.top = '0px';

        document.body.appendChild(this.stats.domElement);
    }

    this.handleInput = function(data) {
        // Process data
        // New blobs
        // Adjust groups
        var blobs = data['nodes'];
        var newId = data['userId'];

        var blob = _.filter(blobs, {userId: newId})[0];
        self.newBlob(blob['input_data'], blob['cluster'], 180);
    };

    this.socket = new Socket("ws://127.0.0.1:8888", self.handleInput);

    this.newBlob = function(data, group, orientation) {
        var config = Converter.getConfig(data);
        var blob = new Blob(config, group, orientation);

        this.flock.addBoid(blob);
        this.scene.add(blob.object);
    };

    this.debugRender = function() {
        self.stats.begin();

        self.flock.run();

        self.stats.end();

        self.scene.render();
        requestAnimationFrame(self.debugRender);
    };

    this.render = function() {
        requestAnimationFrame(self.render)

        self.flock.run();
        self.scene.render();
    };
}
