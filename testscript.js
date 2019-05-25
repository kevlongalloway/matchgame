const cards = document.querySelectorAll('.memory-card');
let moves = 0;
let hasFlippedCard = false;
let preventAction = false;
let firstCard, secondCard;
resetButton = document.getElementById('restart').addEventListener('click', reset);
let matchCount = 0;
modal = document.getElementById('popup1');
document.getElementById('play-again').addEventListener('click', reset);
stars = document.querySelectorAll('.star');
modalMoves = document.getElementById('finalMove');
timer = document.getElementById('timer');
let starCount = 3;
//define vars to hold time 
let seconds = 0;
let minutes = 0;

let displaySeconds = '';
let displayMinutes = '';
//define var to hold set interval function
let interval = null;
//stopwatch status
let status = "stopped";
//stopwatch function (determines when to increment)


function reset(){
	shuffle();
	starCount = 3;
	startTimer();
	stars.forEach(star => star.classList.remove('hide'));
	modal.classList.add('hide');
	modal.classList.remove('show-modal');
	[firstCard, secondCard] = [null,null];
	[hasFlippedCard, preventAction] = [false,false];
	
	moves = 0;
	cards.forEach(card => card.addEventListener('click', flipCard));	
	cards.forEach(card => card.classList.remove('match','show'));
	render();
	modal.classList.add('hide');
}

function flipCard(){
	if (preventAction) return;
	if (this === firstCard) return;
	moves++;
	starScore();
	render();
	this.classList.toggle('show');
	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
	}else{
		hasFlippedCard = false;
		secondCard = this;

		//do they match?
		if (firstCard.type === secondCard.type) {
			matchCount++;
			console.log(matchCount);
			if(checkWin()) return true;
			firstCard.removeEventListener('click',flipCard);
			secondCard.removeEventListener('click',flipCard);
			firstCard.classList.toggle('match');
			secondCard.classList.toggle('match')
		//they don't match
		}else{
			preventAction = true;
			firstCard.classList.add('warning');
			secondCard.classList.add('warning');
			
			setTimeout(function(){
				firstCard.classList.remove('show','warning');
				secondCard.classList.remove('show','warning');
				preventAction = false;
			},500);
		}

	}
}

function checkWin(){
	if(matchCount === 8) {
		modalValues();
		toggleModal();
		stopTimer();
		return true;
	}
}


function toggleModal(){
	modal.classList.toggle('hide');
	modal.classList.toggle('show-modal');
}

function modalValues(){
	modalMoves.innerHTML = moves;
	document.getElementById('totalTime').innerHTML = timer.innerHTML;
	document.getElementById('starRating').innerHTML = starCount + " star(s)"

}

function starScore(){
	if (moves > 25) {
		stars[2].classList.add('hide');
		starCount = 2 ;
	}if(moves > 35) {
		stars[1].classList.add('hide');
		starCount = 1;
	}if(moves >40) {
		stars[0].classList.add('hide');
		starCount = 0;
	}

}

function shuffle (){
	cards.forEach(card => {
		let random = Math.floor(Math.random()*12);
		card.style.order = random;
	});
	
	
}



//update view 
function render(){
	document.getElementById('move-count').innerHTML = moves;	
}



function stopwatch(){
	seconds++;

	if (seconds / 60 == 1) {
		seconds = 0;
		minutes++;
	}

	//display leading zero if one digit
	if(seconds < 10) {
		displaySeconds = "0" + seconds.toString();

	}else {
		displaySeconds = seconds.toString();
	}
	if(minutes < 10) {
		displayMinutes = "0" + minutes.toString();

	}else{
		displayMinutes = minutes.toString();
	}

	//display updated time values

	timer.innerHTML = displayMinutes + ":" + displaySeconds;
	

}




function startTimer(){
	resetTimer();
	interval = setInterval(stopwatch,1000);
}

function stopTimer(){
	
	clearInterval(interval);
}

function resetTimer(){
	stopTimer();
	seconds = 0;
	minutes = 0;
}