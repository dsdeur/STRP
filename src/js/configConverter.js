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

		config.color = data['c1'];

		//Testen > anders durge zijn schuld anders > baas
		data['hb'] = Math.min(Math.max(data['hb'], 50), 140) - 50;
		config.speed2 = (0.2 * data['hb'] ) / 90;
		
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

		var vars = Presets.matchPresets(data);
// 		console.log(vars);
		
		config.var1 = vars.var1;
		config.var2 = vars.var2;

		//Give it back now y'all
		return config;
}