/* VARIABLES */

var DKC = {
	word: "Donkey Kong Country",
	song: "assets/music/Donkey Kong Country Music SNES - Main Theme.mp3",
	pic: "assets/images/donkeyKong.png"
}
var FF3 = {
	word: "Final Fantasy III",
	song: "assets/music/Final Fantasy III (SNES) Music - Battle Theme.mp3",
	pic: "assets/images/ff3.png"
}
var FZ = {
	word: "F ZERO",
	song: "assets/music/F-ZERO (SNES) Music - Mute City.mp3",
	pic: "assets/images/fzero.png"
}
var KDC = {
	word: "Kirbys Dream Course",
	song: "assets/music/Kirby's Dream Course - Title Screen.mp3",
	pic: "assets/images/kirby.png"
}
var MMX = {
	word: "Mega Man X",
	song: "assets/music/Mega Man X (SNES) Music - Zero's Entrance.mp3",
	pic: "assets/images/megaman.png"
}
var SF = {
	word: "Star Fox",
	song: "assets/music/Star Fox (SNES) Music - Venom Base Stage 02.mp3",
	pic: "assets/images/starfox.png"
}
var SF2 = {
	word: "Street Fighter II",
	song: "assets/music/Street Fighter II SNES-Guile Stage.mp3",
	pic: "assets/images/streetFighter2.jpg"
}
var SC4 = {
	word: "Super Castlevania IV",
	song: "assets/music/Super Castlevania IV OST - Stage B Beginning (B-2).mp3",
	pic: "assets/images/castlevania.png"
}
var SMK = {
	word: "Super Mario Kart",
	song: "assets/music/Super Mario Kart (SNES) Music - Title Theme.mp3",
	pic: "assets/images/mariokart.png"
}
var SMW = {
	word: "Super Mario World",
	song: "assets/music/Super Mario World (SNES) Music - Ending Credit Roll.mp3",
	pic: "assets/images/superMario.jpg"
}
var SM = {
	word: "Super Metroid",
	song: "assets/music/Theme of Super Metroid - Super Metroid.mp3",
	pic: "assets/images/superMetroid.jpg"
}
var SPO = {
	word: "Super Punch Out",
	song: "assets/music/Super Punch-Out!! (SNES) Music - World Circuit Fight.mp3",
	pic: "assets/images/punchout.png"
}
var LZLP = {
	word: "The Legend of Zelda A Link to the Past",
	song: "assets/music/Legend of Zelda, The - A Link to the Past (SNES) Music - Hyrule Field.mp3",
	pic: "assets/images/zelda.png"
}
var YI = {
	word: "Yoshis Island",
	song: "assets/music/Yoshi's Island OST - Story Music Box.mp3",
	pic: "assets/images/yoshi.jpg"
}
var SOM = {
	word: "Secret of Mana",
	song: "assets/music/Secret Of Mana Soundtrack - Fear Of The Heavens (1080p).mp3",
	pic: "assets/images/secret.jpg"
}
var SGG = {
	word: "Super Ghouls N Ghosts",
	song: "assets/music/Super Ghouls 'N Ghosts (SNES) Music - Ending Theme 02.mp3",
	pic: "assets/images/superGnG.png"
}
var C3AW = {
	word: "CONTRA III THE ALIEN WARS",
	song: "assets/music/Contra III - The Alien Wars (SNES) Music - Stage 01.mp3",
	pic: "assets/images/contra3.png"
}
var EB = {
	word: "EarthBound",
	song: "assets/music/Earthbound - 132 - The Lost Underworld.mp3",
	pic: "assets/images/earthbound.png"
}

var words = [DKC, FF3, FZ, KDC, MMX, SF, SF2, SC4, SMK, SMW, SM, SPO, LZLP, YI, SOM, SGG, C3AW, EB];
var incorrectGuesses = [];
var correctGuesses = [];
var goodGuess;
var wins = 0;
var losses = 0;
var guessesLeft = 3;
var displayGuessesLeft = document.getElementById("displayGuessesLeft");
var song = new Audio("assets/music/Super Mario World (SNES) Music - Overworld Theme.mp3");
var gameOver = new Audio("assets/sound effects/Super Mario World OST - Lose Life-[AudioTrimmer.com].mp3");
var victory = new Audio("assets/sound effects/Final Fantasy III (SNES) Music - Unused Fanfare-[AudioTrimmer.com].mp3")



/* FUNCTIONS */

function checkInput(input){
  var x = input;
	var regex = /^[a-zA-Z]+$/;
    if (!x.match(regex)) {
			alert("Must input a letter");
			return false;
    }
		if (correctGuesses.includes(x) || incorrectGuesses.includes(x)) {
			console.log("repeat letter");
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
	var rand = words[Math.floor(Math.random() * words.length)];
	return [rand.word, rand.pic, rand.song];
}

function checkForWin(everyItem){
	return everyItem === "_";
}

/* BODY */
song.play();

updateGuessesLeft();
var wordArray = newWord();
var currentWord = wordArray[0];
var rewardSong = wordArray[2];
var rewardPic = wordArray[1];
var wordSplitUp = splitWord(currentWord);
var wordSplitUpCopy = wordSplitUp.slice();
for (var i = 0; i < wordSplitUpCopy.length; i++) {
	wordSplitUpCopy[i] = "_";
}

document.getElementById("displayCorrectGuesses").innerHTML = wordSplitUpCopy.join(" ");

document.onkeyup = function(pressed) {
	var letter = pressed.key;
	if (checkInput(letter)) {
		var idx = wordSplitUp.indexOf(letter);

		if (idx > -1)
		{
			console.log(letter + " found in word");
			while (idx != -1) {
				goodGuess = wordSplitUp[idx];
				goodGuess = goodGuess.toString();
				if (correctGuesses.includes(goodGuess)) {
					// do not push
				} else {
					correctGuesses.push(goodGuess);
				}
				wordSplitUpCopy[idx] = wordSplitUp[idx];
				wordSplitUp[idx] = "_";
				idx = wordSplitUp.indexOf(letter);
			}
			document.getElementById("correctGuesses").innerHTML = correctGuesses.toString();
			document.getElementById("displayCorrectGuesses").innerHTML = wordSplitUpCopy.join(" ");
			updateGuessesLeft();

			if (wordSplitUp.every(checkForWin)) {

				song.pause();
				song.currentTime = 0;
				victory.play();
				alert("You got it! Please enjoy the following song and image from the Super Nintendo video game, " + currentWord);
				victory.pause();
				victory.currentTime = 0;
				document.getElementById("intro").innerHTML = currentWord;
				document.getElementById("gameImage").src = rewardPic;
				song.currentTime = 0;
				song = new Audio(rewardSong);
				song.play();
				wordArray = newWord();
				currentWord = wordArray[0];
				rewardSong = wordArray[2];
				rewardPic = wordArray[1];
				wordSplitUp = splitWord(currentWord);
				wordSplitUpCopy = wordSplitUp.slice();
				for (var i = 0; i < wordSplitUpCopy.length; i++) {
					wordSplitUpCopy[i] = "_";
				}

				wins++;
				updateWins();
				guessesLeft = 3;
				updateGuessesLeft();
				correctGuesses.length = 0;
				incorrectGuesses.length = 0;
				document.getElementById("incorrectGuesses").innerHTML = incorrectGuesses.toString();
				document.getElementById("correctGuesses").innerHTML = correctGuesses.toString();
				document.getElementById("displayCorrectGuesses").innerHTML = wordSplitUpCopy.join(" ");
			}

		} else {
			if (guessesLeft > 0) {
				console.log("incorrect guess");
				incorrectGuesses.push(letter);
				document.getElementById("incorrectGuesses").innerHTML = incorrectGuesses.toString();
				guessesLeft--;
				updateGuessesLeft();
			} else {
				song.pause();
				song.currentTime = 0;
				gameOver.play();
				alert("GAME OVER! No music for you! :)");
				gameOver.pause();
				gameOver.currentTime = 0;
				incorrectGuesses.length = 0;
				correctGuesses.length = 0;
				document.getElementById("incorrectGuesses").innerHTML = incorrectGuesses.toString();
				document.getElementById("correctGuesses").innerHTML = correctGuesses.toString();
				wordArray = newWord();
				currentWord = wordArray[0];
				rewardSong = wordArray[2];
				rewardPic = wordArray[1];
				wordSplitUp = splitWord(currentWord);
				wordSplitUpCopy = wordSplitUp.slice();
				for (var i = 0; i < wordSplitUpCopy.length; i++) {
					wordSplitUpCopy[i] = "_";
				}

				losses++;
				updateLosses();
				guessesLeft = 3;
				updateGuessesLeft();
				document.getElementById("displayCorrectGuesses").innerHTML = wordSplitUpCopy.join(" ");
			}


		}
	};



}