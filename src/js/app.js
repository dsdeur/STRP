var THREE = require('three');
var Scene = require('./scene.js');
var Nebula = require('./nebula.js');

var data = {
	color: [ 57, 245, 192 ],
    klassiekModern: false,
    volgendLeidend:  false,
    natuurFuturistisch: true,
    creatiefLogisch: false,
    introvertExtravert: true,
    rustigDruk: false,
    chaotischGestructureerd: true,
    hartslag: 60
};


var scene = new Scene(document.body);
scene.resize(window.innerWidth, window.innerHeight);
scene.render();

window.onresize = function() {
    scene.resize(window.innerWidth, window.innerHeight);
}

var nebula = new Nebula(scene);

for(var x = 0; x < 25; x++) {
	nebula.newBlob(data, 1);
}
for(var x = 0; x < 25; x++) {
	nebula.newBlob(data, 2);
}

nebula.render();
