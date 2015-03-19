// Sockets
var socketColor, socketHb, processingSocket;

// Slide stuff
var tel = 1;
var indexSlider;
var flexSliderOneIsAnimatingLockThatSucker = false;
var flexSliderTwoIsAnimatingLockThatSucker = false;

// Default colors
var colors = getRandomColor()+ ', ' + getRandomColor() + ', ' + getRandomColor() + ', ' + getRandomColor() + ', ' + getRandomColor();

// Temp config will be modified all the time
var configTemp = {
	var1: TFgetRandom(),
	var2: TFgetRandom(),
	var3: TFgetRandom(),
	var4: TFgetRandom(),
	var5: TFgetRandom(),
	var6: TFgetRandom(),
	var7: TFgetRandom(),
	var8: Math.round(Math.random() * (90 - 130) + 90),
	var9: getRandomColor()
};

// Counters? timer holders?
var counterC;
var countC=6;
var counterS;
var countS=6;

// Some heights idk don't ask me
var screenH = $('.screen-choice').height();
var choiceTop = $('.screen-choice').offset().top;
var launchTop = $('.screen-launch').offset().top;

// Scene vars, let's go global :D!
var canvas = document.getElementById('visual');
var blob = new Blob(getConfig(convertTempConfig(configTemp)));
var scene = new Scene(canvas);
scene.init(blob);

function handleClick(event) {
	event.preventDefault();

	// Check if sliders are locked - prevent blocking
	if(flexSliderOneIsAnimatingLockThatSucker || flexSliderTwoIsAnimatingLockThatSucker) {
		return;
	}

	// Lock sliders
	flexSliderOneIsAnimatingLockThatSucker = true;
	flexSliderTwoIsAnimatingLockThatSucker = true;

	// Update flex sliders
	if(tel<7) {
		$('.screen-choice .sub.left').flexslider(tel);
		$('.screen-choice .sub.right').flexslider(tel);
	} else {
		readyForTakeOf();
	}

	indexSlider = $(this).parent().index();

	// Get value from clicked slide
	var value = $(this).data("value");

	// Update configTemp
	configTemp['var' + tel] = value;

	// Update heartbeat and colors on slide four
	if(tel == 4) {
		document.getElementById("hb").innerHTML = 'The beat of your heart: ' + configTemp.var8;
		playHeartBeat()
		$( ".sensor-data" ).animate({ opacity: 1 });
		$( ".sensor-data .colors .row .color:nth-child(1)" ).css("background-color", colors[0]);
		$( ".sensor-data .colors .row .color:nth-child(2)" ).css("background-color", colors[1]);
		$( ".sensor-data .colors .row .color:nth-child(3)" ).css("background-color", colors[2]);
		$( ".sensor-data .colors .row .color:nth-child(4)" ).css("background-color", colors[3]);
		$( ".sensor-data .colors .row .color:nth-child(5)" ).css("background-color", colors[4]);
	}

	console.log(tel + ' = ' + value);
	console.log(configTemp);

	// Update blob
	blob.reconfigure(getConfig(convertTempConfig(configTemp)));

	$('.progress ul').children().eq(indexSlider).addClass('active');
	tel++;
}

function readyForTakeOf() {
	$('html, body').animate({
		scrollTop : launchTop
	}, 1500);
	counterC = setInterval(timerC, 1000); //1000 will  run it every 1 second
}


var init = function() {
	$('html').animate({scrollTop:0}, 1);
	$('body').animate({scrollTop:0}, 1);

	// INIT SOCKETS --------------------------------------------------
	processingSocket = new Socket('ws://10.0.0.9:8888');

	socketColor = new Socket('ws://10.0.0.11:9999', function(data) {
		colors = JSON.parse(data.data);
		console.log(colors);
		configTemp.var9 = colors[0];
	});

	socketHb = new Socket('ws://10.0.0.12:9999', function(data) {
		configTemp.var8 = data.data;
		console.log('HB ' + configTemp.var8);
		configTemp.var8 = var8;
	});


	// REGISTER EVENT HANDLERS ---------------------------------------
	// Button start
	$('#start').click(function(e) {
		$('html, body').animate({
			scrollTop : choiceTop
		}, 1500);


		socketColor.sendTextMessage('banaan');
		socketHb.sendTextMessage('banaan');
	});

	// Choice Option, progress active
	$('.slides > li .image').click(handleClick);


	// INIT FLEXSLIDERS ----------------------------------------------
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

		// Unlock slider if animation is finished
		after: function(){
			flexSliderOneIsAnimatingLockThatSucker = false
		}
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

		// Unlock slider if animation is finished
		after: function(){
			flexSliderTwoIsAnimatingLockThatSucker = false
		}
    });

	// Choice Sliders li Height
	$('.screen-choice .slides > li').height(screenH);


	// INIT SCENE ----------------------------------------------------

};

init();
