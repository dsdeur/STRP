var socketColor, socketHb, processingSocket;
var tel = 1;
var color;
var colors = getRandomColor()+ ', ' + getRandomColor() + ', ' + getRandomColor() + ', ' + getRandomColor() + ', ' + getRandomColor();

var value;
var var1 = TFgetRandom();
var var2 = TFgetRandom();
var var3 = TFgetRandom();
var var4 = TFgetRandom();
var var5 = TFgetRandom();
var var6 = TFgetRandom();
var var7 = TFgetRandom();
var var8 = Math.round(Math.random() * (90 - 130) + 90);
var var9 = getRandomColor();

var message = '{"1": '+var1+', "2": '+var2+', "3": '+var3+', "4": '+var4+', "5": '+var5+', "6": '+var6+', "7": '+var7+', "hb": '+var8+', "color": '+var9+'}';
//console.log('Backup message = ' + message);

var counterC;
var countC=6;
var counterS;
var countS=6;

var screenH = $('.screen-choice').height();
var indexSlider;

var choiceTop = $('.screen-choice').offset().top;
var launchTop = $('.screen-launch').offset().top;

function TFgetRandom() {
	var arrayTF = [
		false,
		true
	];
	var randomValue = Math.floor(Math.random()*arrayTF.length);

	return arrayTF[randomValue];
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$(window).load(function() {

	processingSocket = new Socket('ws://10.0.0.9:8888');

	// Button start
	$('#start').click(function(e) {
		$('html, body').animate({
			scrollTop : choiceTop
		}, 1500);

		socketColor = new WebSocket('ws://10.0.0.12:9999');

		socketColor.onopen= function() {
			socketColor.send('banaan');
			console.log('Connected BLOB');
		};
		socketColor.onmessage= function(s) {
			colors = JSON.parse(s.data);
			console.log(colors);
			var9 = colors[0];
		};
		// alert(colors);
		// alert(var9);
		
		socketHb = new WebSocket('ws://10.0.0.11:9999');

		socketHb.onopen= function() {
			socketHb.send('banaan');
			console.log('Connected HB');
		};
		socketHb.onmessage= function(s) {
			var8 = s.data;
			console.log('HB ' + var8);
			var8 = var8;
		};
	});

	// Button end
	$('.end').click(function(e) {
		$('html, body').animate({
			scrollTop : launchTop
		}, 1500);
		counterC = setInterval(timerC, 1000); //1000 will  run it every 1 second
	});

	// Choice Sliders
	$('.screen-choice .sub.left').flexslider({
		animation: "fade",
		slideshow: false,
		animationLoop: false,
        slideshowSpeed: 1000,
        animationSpeed: 500,
		randomize: false,

		// Usability features
		touch: false,

		controlNav: false,
		// Primary Controls
		directionNav: false,
    });

	$('.screen-choice .sub.right').flexslider({
		animation: "fade",
		slideshow: false,
		animationLoop: false,
        slideshowSpeed: 500,
        animationSpeed: 250,
		randomize: false,

		// Usability features
		touch: false,

		controlNav: false,
		// Primary Controls
		directionNav: false,
    });

	// Choice Sliders li Height
	$('.screen-choice .slides > li').height(screenH);

	// Choice Option, progress active
	$('.slides > li .image').click(function(event){
		event.preventDefault();

		if(tel<7) {
			$('.screen-choice .sub.left').flexslider(tel);
			$('.screen-choice .sub.right').flexslider(tel);
		}
		indexSlider = $(this).parent().index();

		value = $(this).data("value");

		if(tel==1) { var1 = value; }
		if(tel==2) { var2 = value; }
		if(tel==3) { var3 = value; }
		if(tel==4) {
			var4 = value;
			document.getElementById("hb").innerHTML = 'The beat of your heart: ' + var8;
			playHeartBeat()
			$( ".sensor-data" ).animate({ opacity: 1 });
			$( ".sensor-data .colors .row .color:nth-child(1)" ).css("background-color", colors[0]);
			$( ".sensor-data .colors .row .color:nth-child(2)" ).css("background-color", colors[1]);
			$( ".sensor-data .colors .row .color:nth-child(3)" ).css("background-color", colors[2]);
			$( ".sensor-data .colors .row .color:nth-child(4)" ).css("background-color", colors[3]);
			$( ".sensor-data .colors .row .color:nth-child(5)" ).css("background-color", colors[4]);
		}
		if(tel==5) { var5 = value; }
		if(tel==6) { var6 = value; }
		if(tel==7) { var7 = value; }

		message = '{"1": '+var1+', "2": '+var2+', "3": '+var3+', "4": '+var4+', "5": '+var5+', "6": '+var6+', "7": '+var7+', "hb": '+var8+', "c1": "'+var9.substring(1)+'"}';
		console.log(tel + ' = ' + value);
		console.log(message);

		$('.progress ul').children().eq(indexSlider).addClass('active');
		tel++;
	});

	// Countdown timer
	function timerC() {
		countC--;
		if(countC < 0) {
			clearInterval(counterC);
			return;
		}
		document.getElementById("timer").innerHTML = countC;

		if(countC == 5) {
			playCountdown();
		}

		if(countC == 0 ) {
			var messageJSON = {
				'profiles': JSON.parse(message)
			};

			console.log(messageJSON);

			// Send new blob to socket
			processingSocket.sendMessage("new_input_blob", JSON.stringify(messageJSON));

			document.getElementById("timer").innerHTML = '<img src="images/beeldNebula.png"/>';

			playWhoosh();

			//alert(message);
			counterS = setInterval(timerS, 1000); //1000 will  run it every 1 second
		}
		console.log('Countdown: ' + countC);
	}

	// Reset timer + data
	function timerS() {
		countS--;
		if(countS == 5 ) {
			$('.screen-choice .sub.left').flexslider(0);
			$('.screen-choice .sub.right').flexslider(0);

			$('.progress ul > li').removeClass('active');

			$( ".sensor-data" ).animate({ opacity: 0 });

			$('.screen-reset').css('z-index', '500');
			$( ".screen-reset" ).animate({ opacity: 1, });

			$('html, body').animate({
				scrollTop : 0
			}, 1500);
		}
		if(countS == 0) {
			clearInterval(counterS);
			tel = 1;
			countC=6;
			countS=6;

			var1 = TFgetRandom();
			var2 = TFgetRandom();
			var3 = TFgetRandom();
			var4 = TFgetRandom();
			var5 = TFgetRandom();
			var6 = TFgetRandom();
			var7 = TFgetRandom();
			var8 = Math.round(Math.random() * (90 - 130) + 90);
			var9 = getRandomColor();

			$('.screen-reset').animate({ opacity: 0 });
			$('.screen-reset').css('z-index', '-1');

			console.log('RESET');
		}
		console.log('Reset: ' + countS);
	}

});

$(document).ready(function() {
    $('html').animate({scrollTop:0}, 1);
    $('body').animate({scrollTop:0}, 1);
});

function playWhoosh() {
	document.getElementById('whoosh').play();
}
function playHeartBeat() {
	document.getElementById('heartbeat').play();
}
function playCountdown() {
	document.getElementById('cdSound').play();
}
//playHeartBeat()
