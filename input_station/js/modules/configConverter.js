var getConfig = function(inputdata) {
        var data = {
            klassiekModern: inputdata.var3,
            volgendLeidend:  inputdata.var2,
            natuurFuturistisch: inputdata.var7,
            creatiefLogisch: inputdata.var5,
            introvertExtravert: inputdata.var4,
            rustigDruk: inputdata.var6,
            chaotischGestructureerd: inputdata.var1,
            hartslag: inputdata.hb,
            color: inputdata.c1
        }

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

		var vars = matchPresets(data);
// 		console.log(vars);

		config.var1 = vars.var1;
		config.var2 = vars.var2;

		//Give it back now y'all
		return config;
}
