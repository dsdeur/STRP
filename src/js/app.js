var THREE = require('three');
var Scene = require('./scene.js');
var Nebula = require('./nebula.js');


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
nebula.render();



// CODE FOR TESTING PURPOSES ---------------------------------------
function randomData(color) {
	var data = {
		c1: color,
		hb: 66,
		var1: Math.random() < 0.5 ? true : false,
		var2: Math.random() < 0.5 ? true : false,
		var3: Math.random() < 0.5 ? true : false,
		var4: Math.random() < 0.5 ? true : false,
		var5: Math.random() < 0.5 ? true : false,
		var6: Math.random() < 0.5 ? true : false,
		var7: Math.random() < 0.5 ? true : false
	};

	return data;
}

function getRandomHexColor() {
	return '0123456789abcdef'.split('').map(function(v,i,a){
  		return i>5 ? null : a[Math.floor(Math.random()*16)]
	}).join('');
}

// Add random blobs
for(var i = 0; i < 0; i++) {
	var color = getRandomHexColor();

	for(var x = 0; x < 10; x++) {
		nebula.newBlob(randomData(color), i);
	}
}

// Get buttons
var newBlobButton = document.getElementById('newBlob');
var deleteBlobButton = document.getElementById('deleteBlob');

// Add new blob on button click
newBlobButton.addEventListener('click', function() {
	var color = getRandomHexColor();
	nebula.newBlob(randomData(color), Math.floor(Math.random() + 10));
});
