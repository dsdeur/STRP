var THREE = require('three');
var Scene = require('./scene.js');
var Nebula = require('./nebula.js');

var scene = new Scene(document.body);
scene.resize(window.innerWidth, window.innerHeight);
scene.render();

window.onresize = function() {
    scene.resize(window.innerWidth, window.innerHeight);
}

var nebula = new Nebula(scene);
nebula.newBlob();
nebula.render();
