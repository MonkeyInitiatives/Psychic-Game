function showGameModes() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

var wins = 0;
var guessesRemaining = 10;
var lettersGuessed = "";
var currentPokemon;
var emptyArray = [];
var easyGame = true;

function easyMode(){
	easyGame = true;
	document.getElementById("easyGame").style.backgroundColor = "red";
	document.getElementById("hardGame").style.backgroundColor = "black";
}
function hardMode(){
	easyGame = false;
	document.getElementById("hardGame").style.backgroundColor = "red";
	document.getElementById("easyGame").style.backgroundColor = "black";
}
function resetGame(){
	wins =0;
	startGame();
	document.getElementById("previous-pokemon").style.display = "none";
}

//create generic pokemon object
function genericPokemon(name, description){
	this.name = name;
	this.description = description;
	this.photo = "assets/images/"+name+".png";
	this.silhouette = "assets/images/"+name+"-silhouette.png";
}

var pikachu = new genericPokemon("pikachu", "Whenever Pikachu comes across something new, it blasts it with a jolt of electricity. If you come across a blackened berry, it's evidence that this Pokémon mistook the intensity of its charge.");
var charmander = new genericPokemon("charmander", "The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely.");
var bulbasaur = new genericPokemon("bulbasaur", "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.");
var squirtle = new genericPokemon("squirtle", "Squirtle's shell is not merely used for protection. The shell's rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokémon to swim at high speeds.");
var exeggutor = new genericPokemon("exeggutor", "Exeggutor originally came from the tropics. Its heads steadily grow larger from exposure to strong sunlight. It is said that when the heads fall off, they group together to form Exeggcute.");
var rapidash = new genericPokemon("rapidash", "Rapidash usually can be seen casually cantering in the fields and plains. However, when this Pokémon turns serious, its fiery manes flare and blaze as it gallops its way up to 150 mph."); 				
var mewtwo = new genericPokemon("mewtwo", "Mewtwo is a Pokémon that was created by genetic manipulation. However, even though the scientific power of humans created this Pokémon's body, they failed to endow Mewtwo with a compassionate heart.");					
var alakazam = new genericPokemon("alakazam", "Alakazam's brain continually grows, making its head far too heavy to support with its neck. This Pokémon holds its head up using its psychokinetic power instead.");
var gengar = new genericPokemon("gengar", "Sometimes, on a dark night, your shadow thrown by a streetlight will suddenly and startlingly overtake you. It is actually a Gengar running past you, pretending to be your shadow.");
var dragonite = new genericPokemon("dragonite", "Dragonite is capable of circling the globe in just 16 hours. It is a kindhearted Pokémon that leads lost and foundering ships in a storm to the safety of land.");
var eevee = new genericPokemon("eevee", "Eevee has an unstable genetic makeup that suddenly mutates due to the environment in which it lives. Radiation from various stones causes this Pokémon to evolve.");
var ditto = new genericPokemon("ditto", "Ditto rearranges its cell structure to transform itself into other shapes. However, if it tries to transform itself into something by relying on its memory, this Pokémon manages to get details wrong.");
var magmar = new genericPokemon("magmar", "In battle, Magmar blows out intensely hot flames from all over its body to intimidate its opponent. This Pokémon's fiery bursts create heat waves that ignite grass and trees in its surroundings.");
var jigglypuff = new genericPokemon("jigglypuff", "Jigglypuff's vocal cords can freely adjust the wavelength of its voice. This Pokémon uses this ability to sing at precisely the right wavelength to make its foes most drowsy.");
var chansey = new genericPokemon("chansey", "Chansey lays nutritionally excellent eggs on an everyday basis. The eggs are so delicious, they are easily and eagerly devoured by even those people who have lost their appetite.");

var pokemonArray = [pikachu, charmander, squirtle, bulbasaur, exeggutor, rapidash, mewtwo, alakazam, gengar, dragonite, eevee, ditto, magmar, jigglypuff, chansey];

var music = new Audio("assets/audio/pokemon.mp3");

function updateHTMLText(){
	var userText = document.getElementById("user-wins");
	userText.textContent = wins;
	var userText = document.getElementById("user-remaining");
	userText.textContent = guessesRemaining;
	var userText = document.getElementById("user-guessed");
	userText.textContent = lettersGuessed;
}

//initialize new game
function startGame(){
	var randomNumber = Math.floor(Math.random() * pokemonArray.length);
	currentPokemon = pokemonArray[randomNumber];
	if(easyGame===true){
		console.log("Game Easy");
		document.getElementById("pokemon-image-current").src=currentPokemon.silhouette;
	}
	else{
		console.log("Game Hard");
		document.getElementById("pokemon-image-current").src="assets/images/unknown.jpg";
	}
	guessesRemaining = 10;
	lettersGuessed = "";
	
	updateHTMLText();
	
	if(document.getElementById('pokemon-text-previous').innerHTML.length>0){
		document.getElementById("previous-pokemon").style.display = "block";
	}
	else{
		document.getElementById("previous-pokemon").style.display = "none";
	}
	emptyArray = [];
	for(var i = 0; i<currentPokemon.name.length; i++)
	{
		emptyArray.push(" - ");
	}
	var userText = document.getElementById("current-pokemon");
	var theText = "";
	for(var i = 0; i<emptyArray.length; i++)
	{
		theText = theText+emptyArray[i];
	}
	userText.textContent = theText;
}
//End

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function isPlaying(audelem) 
{ 
	return !audelem.paused; 
}

function playMusic(){
	if(music.paused){
		music.play();
		document.getElementById("playMusic").style.backgroundColor = "red";
	}
	else if(!music.paused){
		music.pause();
		document.getElementById("playMusic").style.backgroundColor = "black	";
	}
	else{
		//nothing
	}
}

function updatePokemonImage(){
	document.getElementById("pokemon-image-previous").src=currentPokemon.photo;
	document.getElementById("pokemon-text-previous").innerHTML = currentPokemon.description;
	new Audio("assets/audio/correct.mp3").play();
}

document.onkeyup = function(event) {
	
	var userGuess = event.key.toLowerCase();
	var foundLetter = false;			        	
	for(var i = 0; i<currentPokemon.name.length; i++)
	{
		if(currentPokemon.name.charAt(i) === userGuess)
		{		
			emptyArray[i] = currentPokemon.name.charAt(i);
			var theText = "";
				for(var j = 0; j<emptyArray.length; j++)
				{
					theText = theText+" "+emptyArray[j]+" ";
				}
			var userText = document.getElementById("current-pokemon");
			userText.textContent = theText;
			foundLetter = true;
		}
		else{
			//nothing
		}
	}
	if(!foundLetter)
	{	
		if(lettersGuessed.indexOf(userGuess) > -1){
			foundLetter = false;
		}
		else{
			if(event.keyCode == 13){}
			else{
				guessesRemaining--;
				foundLetter = false;
				lettersGuessed = lettersGuessed + userGuess + " ";
			}
		}
	}
	else{
		//nothing
	}
	if(!(emptyArray.indexOf(" - ") > -1)){
		updatePokemonImage();
		var userText = document.getElementById("who-was-it");
		userText.textContent = "Yes! It's " + capitalize(currentPokemon.name) +"!";
		wins++;
		document.getElementById("previous-pokemon").style.display = "block";
		startGame();
	}
	if((emptyArray.indexOf(" - ") > -1) && (guessesRemaining===0)){
		var userText = document.getElementById("who-was-it");
		userText.textContent = "No! It was " + capitalize(currentPokemon.name) +"!";
		document.getElementById("pokemon-image-previous").src=currentPokemon.photo;
		document.getElementById("pokemon-text-previous").innerHTML = currentPokemon.description;
		startGame();
	}   	
	updateHTMLText();
};