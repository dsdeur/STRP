//var height =

// made by Jodie Lo

module.exports = function() {
	this.boids = [];

	this.run = function() {
		if(this.boids){
			for(var i = 0; i < this.boids.length; i++){
				this.boids[i].update(this.boids);
			}
		}
	}

	this.addBoid = function(boid) {
		this.boids.push(boid);
	}

	this.editBoid =  function() {
		//
	}
}



// and Robbert fixed some shit too
