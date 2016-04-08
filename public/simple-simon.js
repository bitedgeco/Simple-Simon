"use strict";
// listen for start button then call picSquare() 
$('#start').click(function() {
	var playerPressCount = 0;
	sequence.length = 0;
	i = 0;
	watchSequence();
	simonsTurn();
});

// highlihgts boxes as per sequence then calls picSquare()
function simonsTurn(){
	picSquare();
	i = 0;
	var intervalId = setInterval(function(){
		animateSequence();
	    i++;
	    if (i == sequence.length) {
	        clearInterval(intervalId);
	        repeatSequence();
	    }
	},1000);
}

function repeatSequence() {
	setTimeout(function(){
	$('#repeatSequence').show();
	$('#watchSequence').hide();
	$('#pressStart').hide();
},500);
}

function watchSequence() {
	setTimeout(function(){
	$('#watchSequence').show();
	$('#repeatSequence').hide();
	$('#pressStart').hide();
},500);
}

// highlight a random box and add it to sequence array
function picSquare(){
	var number = Math.random();
	switch (true) {
		case (number < 0.25):
			sequence.push('topLeft');
			break;
		case (number >= 0.25 && number < 0.5):
			sequence.push('topRight');
			break;
		case (number >= 0.5 && number < 0.75):
			sequence.push('bottomLeft');
			break;
		case (number > 0.75):
			sequence.push('bottomRight');
			break;
	};
	console.log(sequence)
};

// loops through sequence highlighing boxes
function animateSequence() {
	if (sequence[i] == 'topLeft')  {
		animateBox('#topLeft');
		console.log('topLeft highlighted')
	} else if (sequence[i] == 'topRight')  {
		animateBox('#topRight');
		console.log('topRight highlighted')
	} else if (sequence[i] == 'bottomLeft')  {
		animateBox('#bottomLeft');
		console.log('bottomLeft highlighted')
	} else if (sequence[i] == 'bottomRight')  {
		animateBox('#bottomRight');
		console.log('bottomRight highlighted')
	};
}

function animateBox(boxid){
	$(boxid).animate({opacity: 1}, 100);
	$(boxid).animate({borderWidth: 1}, 100);
	$(boxid).animate({opacity: .5}, 100);
	$(boxid).animate({borderWidth: 0}, 100);
}

// listen for user click on box, compare to corresponding sequence aray element 
// if correct before end of sequens add 1 to player count
// if corect at end of sequense call simonsTurn() 
// if incorect call gameOver()
$('.box').click(function() {
	animateBox('#' + $(this).attr('id'));
	if (sequence[playerPressCount] == $(this).attr('id')){
		playerPressCount++;
		if (sequence.length == playerPressCount){
			watchSequence();
			simonsTurn();
			playerPressCount = 0;
		}
	} else {
		gameOver()
	}
});

// Tells user game is over and resets playerPressCount and sequence array
function gameOver(){
	$('#pressStart').show();
	$('#pressStart').html('game over<br>you reached level ' + sequence.length + '<br>press start to play again');
	$('#repeatSequence').hide();
	$('#watchSequence').hide();
	var playerPressCount = 0;
	sequence.length = 0;
	i = 0;
}

$('#repeatSequence').hide();
$('#watchSequence').hide();
var i = 0;
var playerPressCount = 0;
var sequence = [];