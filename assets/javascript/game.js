/* VARIABLES */

var words = ["Donkey Kong Country", "Final Fantasy III", "F ZERO", "Kirbys Dream Course", "Mega Man X", "Star Fox", "Street Fighter II", "Super Castlevania IV", "Super Mario Kart", "Super Mario World", "Super Metroid", "Super Punch Out", "The Legend of Zelda A Link to the Past", "Yoshis Island", "Secret of Mana", "Super Ghouls N Ghosts", "CONTRA III THE ALIEN WARS", "EarthBound"];
var incorrectGuesses = [];
var correctGuesses = [];
var goodGuess;
var wins = 0;
var losses = 0;
var guessesLeft = 3;
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

function newWord(){
	var rand = words[Math.floor(Math.random() * words.length)]
	return rand;
}

function checkForWin(everyItem){
	return everyItem === "_";
}

/* BODY */

updateGuessesLeft();
var currentWord = newWord();
var wordSplitUp = splitWord(currentWord);
var wordSplitUpCopy = wordSplitUp.slice();
for (var i = 0; i < wordSplitUpCopy.length; i++) {
	wordSplitUpCopy[i] = "_";
}
document.getElementById("demo").innerHTML = wordSplitUp;
document.getElementById("displayCorrectGuesses").innerHTML = wordSplitUpCopy;

document.onkeyup = function(pressed) {
	var letter = pressed.key;
	if (checkInput(letter)) {
		var idx = wordSplitUp.indexOf(letter);

		if (idx > -1)
		{
			alert(letter + " found inside " + currentWord);
			while (idx != -1) {
				goodGuess = wordSplitUp[idx];
				goodGuess = goodGuess.toString();
				correctGuesses.push(goodGuess);
				wordSplitUpCopy[idx] = wordSplitUp[idx];
				wordSplitUp[idx] = "_";
				// var sortedGuesses = correctGuesses.sort(function(a, b) {
				// 	return wordSplitUpCopy.indexOf(a) - wordSplitUpCopy.indexOf(b);
				// });
				idx = wordSplitUp.indexOf(letter);

			}

			document.getElementById("displayCorrectGuesses").innerHTML = wordSplitUpCopy;
			updateGuessesLeft();
			document.getElementById("demo").innerHTML = wordSplitUp;
			if (wordSplitUp.every(checkForWin)) {
				alert("YOU GOT IT! " + currentWord);
				currentWord = newWord();
				wordSplitUp = splitWord(currentWord)
				wordSplitUpCopy = wordSplitUp.slice();
				for (var i = 0; i < wordSplitUpCopy.length; i++) {
					wordSplitUpCopy[i] = "_";
				}
				document.getElementById("demo").innerHTML = wordSplitUp;
				wins++;
				updateWins();
				guessesLeft = 3;
				updateGuessesLeft();
				correctGuesses.length = 0;
				document.getElementById("displayCorrectGuesses").innerHTML = wordSplitUpCopy;
			}

		} else {
			if (guessesLeft > 0) {
				alert("Nope");
				guessesLeft--;
				updateGuessesLeft();
			} else {
				alert("GAME OVER");
				currentWord = newWord();
				wordSplitUp = splitWord(currentWord)
				wordSplitUpCopy = wordSplitUp.slice();
				for (var i = 0; i < wordSplitUpCopy.length; i++) {
					wordSplitUpCopy[i] = "_";
				}
				document.getElementById("demo").innerHTML = wordSplitUp;
				losses++;
				updateLosses();
				guessesLeft = 3;
				updateGuessesLeft();
				correctGuesses.length = 0;
				document.getElementById("displayCorrectGuesses").innerHTML = wordSplitUpCopy;
			}


		}
	};



}