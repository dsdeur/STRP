var THREE = require('three');
var Scene = require('./scene.js');
var Nebula = require('./nebula.js');

var config = {
	color: [ 0, 128, 255 ],
    klassiekModern: true,
    volgendLeidend:  false,
    natuurFuturistisch: true,
    creatiefLogisch: false,
    introvertExtravert: false,
    rustigDruk: false,
    chaotischGestructureerd: true,
    hartslag: 66
};

// var data = {
// 	color: [ 255, 70, 220 ],
//     speed1: .021,
//     level:  .3,
//     var1: 1,
//     var2: 0.033,
//     speed2: .09
// };


var scene = new Scene(document.body);
scene.resize(window.innerWidth, window.innerHeight);
scene.render();

window.onresize = function() {
    scene.resize(window.innerWidth, window.innerHeight);
}

var nebula = new Nebula(scene);
nebula.newBlob(data);

nebula.render();
