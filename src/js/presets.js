var _ = require('lodash');

module.exports.matchPresets = function(data) {
	// console.log(data);
    var config = [
        {
            var1: 0.27,
            var2: 0
        },
      	{
	        var1: 0.21,
	        var2: 0.022
	    },
	  	{
	        var1: 0.0975,
	        var2: 0.67
	    },
	  	{
	        var1: 0.173,
	        var2: 0.596
	    },
	    {
	        var1: 1,
	        var2: 0.33
	    },
	    {
	        var1: 0.054,
	        var2: 0.80
	    },
	  	{
			var1: 0.169,
			var2: 0.0308
		},
      	{
			var1: 0.1405,
			var2: 0.629
		}
    ]
    
	var presets = [
		{
			introvertExtravert: true,
			chaotischGestructureerd: false,
			rustigDruk: true,
		},
		{
			klassiekModern: false,
			introvertExtravert: true,
			rustigDruk: true,
			natuurFuturistisch: false
		},
		{
			klassiekModern: true,
			rustigDruk: false,
			natuurFuturistisch: false		
        },
		{
			rustigDruk: false,
			volgendLeidend: true,
			natuurFuturistisch: false
		},
		{
			klassiekModern: false,
			natuurFuturistisch: true,
			creatiefLogisch: false
		},
		{
			volgendLeidend: false,
			natuurFuturistisch: false,
			creatiefLogisch: true,
			introvertExtravert: false,
			rustigDruk: false
		},
		{
			rustigDruk: false,
			chaotischGestructureerd: true 
		},
		{
			volgendLeidend: false,
			introvertExtravert: true,
			natuurFuturistisch: false,
			rustigDruk: false
		} 
	]
	
	var mijnArray = [];
	for( var x= 0; x < presets.length; x++){
		var counter = 0;
      
	    for(var prop in presets[x]) {
	        if(!presets[x].hasOwnProperty(prop)) {
	        	return;
	        }
	        
	        if(data[prop] == presets[x][prop]) {
	        	counter++;
	        }
	    }
      	// Loop through preset properties
      		// Check if property value is the same in data and preset
      		// Yes: counter++ 
        	mijnArray.push(counter);
	}
	var index = getMaxValueIndex(mijnArray);
	console.log(index);
  	return config[index]; 
}

function getMaxValueIndex(arr) {
  	var max = arr[0]
    var maxIndex = 0;
  
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  	}
  
  	return maxIndex;
}
