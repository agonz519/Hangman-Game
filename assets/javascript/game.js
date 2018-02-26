/* VARIABLES */

var words = ["Donkey Kong Country", "Final Fantasy III", "F ZERO", "Kirbys Dream Course", "Mega Man X", "Star Fox", "Street Fighter II", "Super Castlevania IV", "Super Mario Kart", "Super Mario World", "Super Metroid", "Super Punch Out", "The Legend of Zelda A Link to the Past", "Yoshis Island", "Secret of Mana", "Super Ghouls N Ghosts", "CONTRA III THE ALIEN WARS", "EarthBound"];
var incorrectGuesses = [];
var correctGuesses = [];
var goodGuess;
var wins = 0;
var losses = 0;
var guessesLeft = 10;
var displayGuessesLeft = document.getElementById("displayGuessesLeft");

/* FUNCTIONS */

function checkInput(input){
  var x = input;
	var regex = /^[a-zA-Z]+$/;
    if (!x.match(regex)) {
			alert("Must input a letter");
			return false;
    }
    return true;
}

function updateGuessesLeft() {
	displayGuessesLeft.innerHTML = `
		<p>${guessesLeft}</p>
	`;
}

function updateWins() {
	displayWins.innerHTML = `
		${wins}
	`
}

function updateLosses() {
	displayLosses.innerHTML = `
		${losses}
	`
}

function splitWord(currentWord) {
	var str = currentWord.toLowerCase();
	str = str.replace(/\s/g, "");
	var split = str.split("");
	return split;
}

/* BODY */

updateGuessesLeft();
var wordSplitUp = splitWord(words[0]);
document.getElementById("demo").innerHTML = wordSplitUp;

document.onkeyup = function(pressed) {
	var letter = pressed.key;
	if (checkInput(letter)) {
		var idx = wordSplitUp.indexOf(letter);
		if (idx > -1)
		{
			alert(letter + " found inside " + words[0]);
			while (idx != -1) {
				goodGuess = wordSplitUp.splice(idx, 1);
				correctGuesses.push(goodGuess);
				idx = wordSplitUp.indexOf(letter);
			}
			document.getElementById("displayCorrectGuesses").innerHTML = correctGuesses.toString();
			updateGuessesLeft();
			document.getElementById("demo").innerHTML = wordSplitUp;

		} else {
			alert("Nope");
			guessesLeft--;
			updateGuessesLeft();
		}
	};



}