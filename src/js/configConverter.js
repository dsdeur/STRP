var THREE = require('three');
var Presets = require('./presets.js');

module.exports.getConfig = function(data) {
		// console.log(config);
		//Start a clean config object and overwrite below
		var config = {
			wireframe: false,
			movement: 1,
			color: [ 255, 255, 255 ],
		    speed1: 0,
		    level:  0,
		    var1: 0,
		    var2: 0,
		    speed2: 0,
		    rotation: 0
		};

		if (data.klassiekModern == true) {
			config.wireframe = true;
		}else{
			config.wireframe = false;
		}

		if (data.volgendLeidend == true) {
			config.movement = 1.3;
		}else{
			config.movement = 1;
		}

		config.color = data.color;

		//Testen > anders durge zijn schuld anders > baas
		data.hartslag = Math.min(Math.max(data.hartslag, 50), 140) - 50;
		config.speed2 = (0.2 * data.hartslag ) / 90;
		
		if (data.introvertExtravert = true){
			config.level = 0.7;
		}else {
			config = 0.2;
		}

		if (data.rustigDruk = true){
			config.speed1 = 0.140;
		}else {
			config.speed1 = 0.015;
		}

		if (data.chaotischGestructureerd = true){
			config.rotation = 1;
		}else {
			config.rotation = -1;
		}

// var data = {
// 	color: [ 0, 128, 255 ],
//     klassiekModern: false,
//     volgendLeidend:  false,
//     natuurFuturistisch: true,
//     creatiefLogisch: false,
//     introvertExtravert: true,
//     rustigDruk: true,
//     chaotischGestructureerd: false,
//     hartslag: 140
// };
// var data1 = {
// 	color: [ 0, 128, 255 ],
//     klassiekModern: false,
//     volgendLeidend:  true,
//     natuurFuturistisch: false,
//     creatiefLogisch: true,
//     introvertExtravert: true,
//     rustigDruk: true,
//     chaotischGestructureerd: false,
//     hartslag: 60
// };
// var data2 = {
// 	color: [ 0, 128, 255 ],
//     klassiekModern: true,
//     volgendLeidend:  true,
//     natuurFuturistisch: false,
//     creatiefLogisch: false,
//     introvertExtravert: true,
//     rustigDruk: false,
//     chaotischGestructureerd: true,
//     hartslag: 60
// };
// var data3 = {
// 	color: [ 0, 128, 255 ],
//     klassiekModern: true,
//     volgendLeidend:  true,
//     natuurFuturistisch: false,
//     creatiefLogisch: true,
//     introvertExtravert: true,
//     rustigDruk: false,
//     chaotischGestructureerd: true,
//     hartslag: 60
// };
// var data4 = {
// 	color: [ 0, 128, 255 ],
//     klassiekModern: true,
//     volgendLeidend:  false,
//     natuurFuturistisch: false,
//     creatiefLogisch: false,
//     introvertExtravert: false,
//     rustigDruk: true,
//     chaotischGestructureerd: false,
//     hartslag: 60
// };
// var data5 = {
// 	color: [ 0, 128, 255 ],
//     klassiekModern: false,
//     volgendLeidend:  false,
//     natuurFuturistisch: false,
//     creatiefLogisch: false,
//     introvertExtravert: true,
//     rustigDruk: false,
//     chaotischGestructureerd: true,
//     hartslag: 60
// };

		var vars = Presets.matchPresets(data);
		
// 		var vars2 = Presets.matchPresets(data1);
// 		var vars3 = Presets.matchPresets(data2);
// 		var vars4 = Presets.matchPresets(data3);
// 		var vars5 = Presets.matchPresets(data4);
// 		var vars6 = Presets.matchPresets(data5);
// 		console.log(vars);
		
		config.var1 = vars.var1;
		config.var2 = vars.var2;

		//Give it back now y'all
		return config;
}