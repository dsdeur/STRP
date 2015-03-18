// RANDOM FUNCTIONS -----------------------------------------------
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


// SOUNDS FUNCTIONS -----------------------------------------------
function playWhoosh() {
	document.getElementById('whoosh').play();
}

function playHeartBeat() {
	document.getElementById('heartbeat').play();
}

function playCountdown() {
	document.getElementById('cdSound').play();
}


// TIMER FUNCTIONS -----------------------------------------------
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
		// Unlock sliders
		flexSliderOneIsAnimatingLockThatSucker = false;
		flexSliderTwoIsAnimatingLockThatSucker = false;

        var messageJSON = {
            'profiles': convertTempConfig(configTemp) // Config temp lives is main and is global.. shouldn't but is
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

		// Unlock sliders
		flexSliderOneIsAnimatingLockThatSucker = false;
		flexSliderTwoIsAnimatingLockThatSucker = false;
		
        tel = 1;
        countC=6;
        countS=6;

        configTemp.var1 = TFgetRandom();
        configTemp.var2 = TFgetRandom();
        configTemp.var3 = TFgetRandom();
        configTemp.var4 = TFgetRandom();
        configTemp.var5 = TFgetRandom();
        configTemp.var6 = TFgetRandom();
        configTemp.var7 = TFgetRandom();
     	configTemp.var8 = Math.round(Math.random() * (90 - 130) + 90);
        configTemp.var9 = getRandomColor();

        $('.screen-reset').animate({ opacity: 0 });
        $('.screen-reset').css('z-index', '-1');

        console.log('RESET');
    }
    console.log('Reset: ' + countS);
}

// CONVERT CONFIG -----------------------------------------------
function convertTempConfig(config) {
	var newConfig =	$.extend({}, config);

	newConfig.c1 = config.var9.substring(1),
	newConfig.hb = config.var8;

	delete newConfig['var8'];
	delete newConfig['var9'];

	return newConfig;
}
