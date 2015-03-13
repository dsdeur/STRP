module.exports = function() {
	this.x = 0;
	this.y = 0;
	this.orientation = 360;
	this.velocity = 0.5;
	this.group = 1;

	this.init = function(groupID, x, y) {
		this.x = x;
		this.y = y;
		this.orientation *= Math.random();
		this.velocity +=  0.5 * Math.random();
		this.group = groupID;
	}

	this.run = function(boids) {
		this.separate(boids);
		this.align(boids);
		this.cohesion(boids);
		var position = this.update();
		this.borders();
		return position;
		// this.render(boids);
	}

	this.update = function() {
		var cornerDegree = 0,
			x,
			y;

		if (this.orientation < 90 && this.orientation > 0){
			cornerDegree = this.orientation;

			x = Math.sin(Math.radians(cornerDegree)) * this.velocity;
			y = Math.cos(Math.radians(cornerDegree)) * this.velocity;

			this.x += x;
			this.y -= y;

		} else if (this.orientation < 180 && this.orientation > 90){
			cornerDegree = this.orientation - 90;

			y = Math.sin(Math.radians(cornerDegree)) * this.velocity;
			x = Math.cos(Math.radians(cornerDegree)) * this.velocity;

			this.x += x;
			this.y += y;
		} else if (this.orientation < 270 && this.orientation > 180){
			cornerDegree = this.orientation - 180;

			x = Math.sin(Math.radians(cornerDegree)) * this.velocity;
			y = Math.cos(Math.radians(cornerDegree)) * this.velocity;

			this.x -= x;
			this.y += y;
		} else if (this.orientation < 360 && this.orientation > 270){
			cornerDegree = this.orientation - 270;

			y = Math.sin(Math.radians(cornerDegree)) * this.velocity;
			x = Math.cos(Math.radians(cornerDegree)) * this.velocity;

			this.x -= x;
			this.y -= y;
		}

		return {
			x: this.x,
			y: this.y
		};
	}

	this.borders = function() {
		if(this.x > window.vrRegionX){
			this.x = window.vrRegionX*-1;
		}
		if(this.x < window.vrRegionX*-1){
			this.x = window.vrRegionX;
		}
		if(this.y > window.vrRegionY){
			this.y = window.vrRegionY*-1;
		}
		if(this.y < window.vrRegionY*-1){
			this.y = window.vrRegionY;
		}
	}

	this.separate = function(boids) {
	}

	this.align = function(boids) {
		var neighbourDistance = 100,
			averageAlignment = this.orientation,
			counter = 1;

		for(var i = 0; i < boids.length; i++){
			if(this.group == boids[i].group){
				if(this.collision(this.x, this.y, boids[i].x, boids[i].y, neighbourDistance)){
					counter++;
					averageAlignment += boids[i].orientation;
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

		this.preventFail();
	}

	this.cohesion = function(boids) {
	}

	this.preventFail = function() { //hernoemen
		if(this.orientation > 360){
			this.orientation = this.orientation - 360;
		}

		if(this.orientation < 0){
			this.orientation = 360 + this.orientation;
		}
	}

	this.collision = function(x1,y1,x2,y2,radius){
		var radius = radius,
		dx,
		dy,
		distance;

		if(x1 != x2 && y1 != y2){
			dx = (x1) - (x2),
			dy = (y1) - (y2),
			distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < radius * 2) {
				return true;
			}else{
				return false;
			}
		}
	}
}


Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
