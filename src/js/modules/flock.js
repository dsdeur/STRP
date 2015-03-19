var _ = require('lodash');

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

	this.update = function(data) {
		for(var x = 0, len = this.boids.length; x < len; x++) {
			var updatedBoid = _.filter(data, {userId: this.boids[x].id})[0];


			if(!updatedBoid) {
				this.deleteBoid(x);
				return;
			}

			this.changeBoidsGroup(x, updatedBoid.cluster);
		}
	};

	this.changeBoidsGroup = function(index, group){
		this.boids[index].changeGroup(group);
	};

	this.deleteBoid = function(x) {
		this.boids.splice(x, 1);
	};
}

// and Robbert fixed some shit too
