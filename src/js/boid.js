// made by Jodie Lo

module.exports = function() {
	this.x = 0;
	this.y = 0;
	this.orientation = 360;
	this.velocity = 1;
	this.forceX = 0;
	this.forceY = 0;
	this.group = 1;

	this.init = function(groupID, x, y) {
		this.x = x;
		this.y = y;
		this.orientation *= Math.random();
		this.group = groupID;
	}

	this.run = function(boids) {
		this.resetBoid();
		this.separate(boids);
		this.align(boids);
		this.cohesion(boids);
		this.avoid(boids);
 		this.update();
		this.borders();

		return {
			x: this.x,
			y: this.y
		}
	}

	this.update = function() {
		var cornerDegree = 0,
			x,
			y,
			directionX,
			directionY;

		if (this.orientation < 90 && this.orientation > 0){
			cornerDegree = this.orientation;

			x = Math.sin(Math.radians(cornerDegree)) * this.velocity;
			y = Math.cos(Math.radians(cornerDegree)) * this.velocity;

			this.x += x;
			this.y -= y;

		}else if (this.orientation < 180 && this.orientation > 90){
			cornerDegree = this.orientation - 90;

			y = Math.sin(Math.radians(cornerDegree)) * this.velocity;
			x = Math.cos(Math.radians(cornerDegree)) * this.velocity;

			this.x += x;
			this.y += y;
		}else if (this.orientation < 270 && this.orientation > 180){
			cornerDegree = this.orientation - 180;

			x = Math.sin(Math.radians(cornerDegree)) * this.velocity;
			y = Math.cos(Math.radians(cornerDegree)) * this.velocity;

			this.x -= x;
			this.y += y;
		}else if (this.orientation < 360 && this.orientation > 270){
			cornerDegree = this.orientation - 270;

			y = Math.sin(Math.radians(cornerDegree)) * this.velocity;
			x = Math.cos(Math.radians(cornerDegree)) * this.velocity;

			this.x -= x;
			this.y -= y;
		}

		this.x += this.forceX;
		this.y += this.forceY;
	}

	this.borders = function() {
		if(this.x > window.vrRegionX * 2){
			this.x = 0;
		}
		if(this.x < 0){
			this.x = window.vrRegionX * 2;
		}
		if(this.y > window.vrRegionY * 2){
			this.y = 0;
		}
		if(this.y < 0){
			this.y = window.vrRegionY * 2;
		}

	}

	this.separate = function(boids) {
		var desiredSeparation = 10,
			separationSpeed = 5,
			forceX,
			forceY,
			nearestNeighbour = false,
			nearestNeighbourOrientation = 0,
			ratio;

		for(var i = 0; i < boids.length; i++){
			//if(this.group == boids[i].boid.group){
				ratio = this.collision(this.x, this.y, boids[i].boid.x, boids[i].boid.y, desiredSeparation);
				if(ratio != false){
					if(ratio.distance < desiredSeparation * 2){
						if(ratio.distance < nearestNeighbour || nearestNeighbour === false){
							nearestNeighbour = ratio.distance;
							nearestNeighbourOrientation = ratio.orientation;

						}
					}
				}
			//}
		}

		if(nearestNeighbour != false){
			nearestNeighbourOrientation -= 180;

			if(nearestNeighbourOrientation < 0){
				nearestNeighbourOrientation = 360 + nearestNeighbourOrientation;
			}

			//calculate the force
			this.forceY = Math.sin(Math.radians(nearestNeighbourOrientation)) * separationSpeed;
			this.forceX = Math.cos(Math.radians(nearestNeighbourOrientation)) * separationSpeed;
		}
	}

	this.align = function(boids) {
		var neighbourDistance = 30,
			averageAlignment = this.orientation,
			counter = 1,
			ratio;

		for(var i = 0; i < boids.length; i++){
			if(this.group == boids[i].boid.group){

				ratio = this.collision(this.x, this.y, boids[i].boid.x, boids[i].boid.y, neighbourDistance);

				if(ratio != false){
					if(ratio.distance < neighbourDistance * 2){
						counter++;
						averageAlignment += boids[i].boid.orientation;
					}
				}
			}
		}

		averageAlignment = averageAlignment / counter; // reken het gemiddelde uit
		if(averageAlignment < this.orientation || averageAlignment > this.orientation + 180){
			this.orientation -= 1.3;
		}

		if(averageAlignment > this.orientation || averageAlignment < this.orientation - 180){
			this.orientation += 1.3;
		}

		this.orientation = averageAlignment;

		this.preventFail();
	}

	this.cohesion = function(boids) {
		var desiredCohesion = 20,
			cohesionSpeed = 4.5,
			forceX,
			forceY,
			nearestNeighbour = false,
			averageNeighbourPos = 0,
			ratio,
			count;

		for(var i = 0; i < boids.length; i++){

			if(this.group == boids[i].boid.group){
				ratio = this.collision(this.x, this.y, boids[i].boid.x, boids[i].boid.y, desiredCohesion);

				if(ratio != false){

					if(ratio.distance < desiredCohesion * 2){

						if(ratio.distance < nearestNeighbour || nearestNeighbour === false){

							count++;
							nearestNeighbour = ratio.distance;
							averageNeighbourPos += ratio.orientation;

						}

					}

				}
			}
		}

		if(nearestNeighbour != false){
			//calculate the force
			this.forceY += Math.sin(Math.radians(averageNeighbourPos)) * cohesionSpeed;
			this.forceX = Math.cos(Math.radians(averageNeighbourPos)) * cohesionSpeed;
		}
	}

	this.avoid = function(boids){
		var neighbourDistance = 20;
		for(var i = 0; i < boids.length; i++){
			if(this.group != boids[i].boid.group){

				ratio = this.collision(this.x, this.y, boids[i].boid.x, boids[i].boid.y, neighbourDistance);

				if(ratio != false){
					if(ratio.distance < neighbourDistance * 2){
						this.orientation -= 0.3;
						this.preventFail();
					}
				}
			}
		}
	}

	this.preventFail = function() { //hernoemen
		if(this.orientation > 360){
			this.orientation = this.orientation - 360;
		}

		if(this.orientation < 0){
			this.orientation = this.orientation + 360;
		}
	}

	this.resetBoid = function(){
		this.forceY = 0;
		this.forceX = 0;
	}

	this.collision = function(x1,y1,x2,y2,radius){
		var radius = radius,
		dx,
		dy,
		distance,
		degrees;

		if(x1 != x2 && y1 != y2){
			dx = x1 - x2,
			dy = y1 - y2,
			distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < radius * 2) { // als er een collision is
				if(x1 > x2 && y1 > y2){
					// 270 graden tot 360
					degrees = 360 - Math.degrees(Math.atan(dx/dy));

				}else if (x1 < x2 && y1 > y2){
					// 0 graden tot 90
					degrees = -Math.degrees(Math.atan(dx/dy));

				}else if (x1 < x2 && y1 < y2){
					// 90 graden tot 180
					degrees = 180 - Math.degrees(Math.atan(dx/dy));

				}else if (x1 > x2 && y1 < y2){
					// 180 graden tot 270
					degrees = 180 - Math.degrees(Math.atan(dx/dy));

				}

				return {
					distance: distance,
					orientation: degrees
				}
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
}
//---- Boid class END

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

// and Robbert fixed some shit too
