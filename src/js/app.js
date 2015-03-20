var THREE = require('three');
var Scene = require('./modules/scene.js');
var Nebula = require('./modules/nebula.js');

// Set environment var
window.DEBUGGING = false;

// Init the scene
var scene = new Scene(document.body);
scene.resize(window.innerWidth, window.innerHeight);
scene.render();

// Resize canvas on window resizes
window.onresize = function() {
    scene.resize(window.innerWidth, window.innerHeight);
}

// Create the nebula! :O
var nebula = new Nebula(scene);

// Start the render loop
if(window.DEBUGGING) {
	nebula.debugRender();
} else {
	nebula.render();
}



// CODE FOR TESTING PURPOSES ---------------------------------------
function randomData(color) {
	var data = {
		'profiles': {
			c1: color,
			hb: 66,
			"1": Math.random() < 0.5 ? true : false,
			"2": Math.random() < 0.5 ? true : false,
			"3": Math.random() < 0.5 ? true : false,
			"4": Math.random() < 0.5 ? true : false,
			"5": Math.random() < 0.5 ? true : false,
			"6": Math.random() < 0.5 ? true : false,
			"7": Math.random() < 0.5 ? true : false
		}
	};

	return data;
}

function getRandomHexColor() {
	return '0123456789abcdef'.split('').map(function(v,i,a){
  		return i>5 ? null : a[Math.floor(Math.random()*16)]
	}).join('');
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}


var simulatedInputData = {
    "timestamp": 1,
    "nodes": [],
    "clusters": [
        {
            "1": [20, 24],
            "2": [14, 7]
        }
    ]

};

// Add random blobs
// for(var i = 0; i < 15; i++) {
// 	var color = getRandomHexColor();

// 	for(var x = 0; x < 20; x++) {
// 		var config = randomData(color);
// 		var id = guid();
// 		simulatedInputData['nodes'].push({
//             "userId": id,
//             "input_data": config,
//             "cluster": i,
//             "position": [3, 4]
//         });

// 		nebula.newBlob(config, i, id);
// 	}
// }


// addRandomBlob();

function inputSimulator() {
	console.log('update');
	if(simulatedInputData['nodes'].length == 0) {
		return;
	}

	var nrOfEdits = Math.floor(Math.random() * 50);

	for(var i = 0; i < nrOfEdits; i++) {
		var index = Math.floor(Math.random() * simulatedInputData['nodes'].length);
		var group = Math.floor(Math.random() * 6);
		//console.log(group);
		simulatedInputData['nodes'][index].cluster = group;
	}

	nebula.handleInput(simulatedInputData);

	setTimeout(function(){inputSimulator();}, 5000);
}

// inputSimulator();



// Add add/delete buttons if debugging
if(window.DEBUGGING) {
	var div = document.createElement("div");
	div.id = 'form';

	var newBlobButton = document.createElement("button"); //input element, text
	newBlobButton.id = 'newBlob';
	newBlobButton.innerHTML = 'New Blob';
	newBlobButton.addEventListener('click', addRandomBlob);

	// var deleteBlobButton = document.createElement("button"); //input element, text
	// deleteBlobButton.id = 'deleteBlob';
	// deleteBlobButton.innerHTML = 'Delete Blob';
	// deleteBlobButton.addEventListener('click', deleteRandomBlob);

	div.appendChild(newBlobButton);
	//div.appendChild(deleteBlobButton);

	document.getElementsByTagName('body')[0].appendChild(div);
}

// Add new blob on button click
function addRandomBlob() {
	var color = getRandomHexColor();
	var config = randomData(color);
	var cluster = Math.floor(Math.random() * 10);

	var id = guid();
	simulatedInputData['nodes'].push({
        "userId": id,
        "input_data": config,
        "cluster": cluster,
        "position": [3, 4]
    });

	nebula.newBlob(config, cluster, id);
};
