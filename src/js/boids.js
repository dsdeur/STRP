// made by Jodie Lo

var canvas,
		context,
		canvasWidth,
		canvasHeight,
		flock;

window.onload = function() {
	initApp();
}

initApp = function() {
	canvas  = document.getElementById("canvas");
	context = canvas.getContext("2d");
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	flock = new Flock();

	canvas.onclick = function(){
		for(var i = 0; i < 3; i++){
			var boid = new Boid("pop");
			if(i <= 20){
				boid.init(1, "red");
			}
			if(i > 20 && i <= 40){
				boid.init(2, "green");
			}
			if(i > 40){
				boid.init(3, "blue");
			}
			flock.addBoid(boid);
		}
	}

	looper();
}

looper = function(){
	context.clearRect(0,0,canvasWidth,canvasHeight);
	flock.run();
	requestAnimationFrame(looper);
}

//---- Flock class BEGIN

Flock = function() {
	this.boids = [];

	this.run = function() {
		if(this.boids){
			for(var i = 0; i < this.boids.length; i++){
				this.boids[i].run(this.boids);
			}
		}
	}

	this.addBoid = function(boid) {
		this.boids.push(boid);
	}

	this.editBoid =  function() {
		//
	}

	this.removeBoid = function(removeID) {
		for(var i = 0; i < boids.length; i++){
			if(boids[i].iD == removeID){
				boids.slice(i);
			}
		}
	}
}

//---- Flock class END

//---- Boid class BEGIN

Boid = function(id) {
	this.x = canvasWidth;
	this.y = canvasHeight;
	this.directionX = 0;
	this.directionY = 0;
	this.orientation = 360;
	this.velocity = 2.5;
	this.acceleration = 0;
	this.color = "green";
	this.ID = id;
	this.group = 1;

	this.init = function(groupID, color) {
		this.x = 50 * Math.random();
		this.y = 50 * Math.random();
		this.directionX = this.x;
		this.directionY = this.y + 10;
		this.orientation *= Math.random();
		//this.velocity +=  0.5 * Math.random();
		this.group = groupID;
		this.color = color;
	}

	this.run = function(boids) {
		this.separate(boids);
		this.align(boids);
		this.cohesion(boids);
		this.update();
		this.borders();
		this.render(boids);
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

			directionX = Math.sin(Math.radians(cornerDegree)) * 10;
			directionY = Math.cos(Math.radians(cornerDegree)) * 10;
			this.directionX = this.x + directionX;
			this.directionY = this.y - directionY;

			this.x += x;
			this.y -= y;

		}else if (this.orientation < 180 && this.orientation > 90){
			cornerDegree = this.orientation - 90;

			y = Math.sin(Math.radians(cornerDegree)) * this.velocity;
			x = Math.cos(Math.radians(cornerDegree)) * this.velocity;

			directionY = Math.sin(Math.radians(cornerDegree)) * 10;
			directionX = Math.cos(Math.radians(cornerDegree)) * 10;
			this.directionX = this.x + directionX;
			this.directionY = this.y + directionY;

			this.x += x;
			this.y += y;
		}else if (this.orientation < 270 && this.orientation > 180){
			cornerDegree = this.orientation - 180;

			x = Math.sin(Math.radians(cornerDegree)) * this.velocity;
			y = Math.cos(Math.radians(cornerDegree)) * this.velocity;

			directionX = Math.sin(Math.radians(cornerDegree)) * 10;
			directionY = Math.cos(Math.radians(cornerDegree)) * 10;
			this.directionX = this.x - directionX;
			this.directionY = this.y + directionY;

			this.x -= x;
			this.y += y;
		}else if (this.orientation < 360 && this.orientation > 270){
			cornerDegree = this.orientation - 270;

			y = Math.sin(Math.radians(cornerDegree)) * this.velocity;
			x = Math.cos(Math.radians(cornerDegree)) * this.velocity;

			directionY = Math.sin(Math.radians(cornerDegree)) * 10;
			directionX = Math.cos(Math.radians(cornerDegree)) * 10;
			this.directionX = this.x - directionX;
			this.directionY = this.y - directionY;

			this.x -= x;
			this.y -= y;
		}
	}

	this.borders = function() {
		if(this.x > canvasWidth){	this.x = 0; this.directionX = 0;	}
		if(this.x < 0){	this.x = canvasWidth; this.directionX = canvasWidth;	}
		if(this.y > canvasHeight){	this.y = 0; this.directionY = 0;	}
		if(this.y < 0){	this.y = canvasHeight; this.directionY = canvasHeight;	}

	}

	this.separate = function(boids) {
	}

	this.align = function(boids) {
		var neighbourDistance = 30,
			averageAlignment = this.orientation,
			counter = 1,
			ratio;

		for(var i = 0; i < boids.length; i++){
			if(this.group == boids[i].group){

				ratio = this.collision(this.x, this.y, boids[i].x, boids[i].y, neighbourDistance);

				if(ratio != false){
					if(ratio.distance < neighbourDistance * 2){
						counter++;
						averageAlignment += boids[i].orientation;
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

	this.render = function(boids) {
		document.getElementById("hoi").innerHTML = boids[0].orientation;
		context.beginPath();
		context.moveTo(this.x,this.y);
		context.lineTo(this.directionX,this.directionY);
		context.strokeStyle = this.color;
		context.lineWidth = 2;
		context.stroke();
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
