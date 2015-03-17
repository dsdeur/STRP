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

function randomData(color) {
	var data = {
		color:color,
		klassiekModern: Math.random() < 0.5 ? true : false,
		volgendLeidend:  Math.random() < 0.5 ? true : false,
		natuurFuturistisch: Math.random() < 0.5 ? true : false,
		creatiefLogisch: Math.random() < 0.5 ? true : false,
		introvertExtravert: Math.random() < 0.5 ? true : false,
		rustigDruk: Math.random() < 0.5 ? true : false,
		chaotischGestructureerd:  Math.random() < 0.5 ? true : false,
		hartslag: Math.floor(Math.random() * 100) + 50
	};

	return data;
}


var scene = new Scene(document.body);
scene.resize(window.innerWidth, window.innerHeight);
scene.render();

window.onresize = function() {
    scene.resize(window.innerWidth, window.innerHeight);
}

var nebula = new Nebula(scene);
for(var i = 0; i < 10; i++) {
	var color =  [
		Math.floor(Math.random() * 254),
		Math.floor(Math.random() * 254),
		Math.floor(Math.random() * 254)
	];
	for(var x = 0; x < 20; x++) {
		nebula.newBlob(randomData(color), i);
	}
}


nebula.render();
