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
		c1:'34ff34',
		var1: Math.random() < 0.5 ? true : false,
		var2:  Math.random() < 0.5 ? true : false,
		var3: Math.random() < 0.5 ? true : false,
		var4: Math.random() < 0.5 ? true : false,
		var5: Math.random() < 0.5 ? true : false,
		var6: Math.random() < 0.5 ? true : false,
		var7:  Math.random() < 0.5 ? true : false,
		hb: Math.floor(Math.random() * 100) + 50
	};

	return data;
}

var color =  [
	Math.floor(Math.random() * 254),
	Math.floor(Math.random() * 254),
	Math.floor(Math.random() * 254)
];

var sampleInput ={
    "timestamp": 1,
	"userId": 2,
    "nodes": [
        {
            "userId": 1,
            "input_data": randomData(color),
            "cluster": 3,
            "position": [3, 4]
        },
        {
            "userId": 2,
            "input_data": randomData(color),
            "cluster": 6,
            "position": [16, 3]
        }
    ],
    "clusters": [
        {
            "1": [20, 24],
            "2": [14, 7]
        }
    ]

};

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
	for(var x = 0; x < 10; x++) {
		nebula.newBlob(randomData(color), i);
	}
}


nebula.render();


var newBlobButton = document.getElementById('newBlob');
var deleteBlobButton = document.getElementById('deleteBlob');
var blobId = document.getElementById('blobId');

console.log(newBlobButton, deleteBlobButton, blobId);

newBlobButton.addEventListener('click', function() {
	// var color =  [
	// 	Math.floor(Math.random() * 254),
	// 	Math.floor(Math.random() * 254),
	// 	Math.floor(Math.random() * 254)
	// ];
	// nebula.newBlob(randomData(color), 0);

	nebula.handleInput(sampleInput);
});
