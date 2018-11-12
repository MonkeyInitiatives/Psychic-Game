var wins = 0;
var guessesRemaining = 10;
var lettersGuessed = "";
var currentPokemon;
var emptyArray = [];

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

var pokemonArray = [pikachu, charmander, squirtle, bulbasaur, exeggutor, rapidash, mewtwo];

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
	document.getElementById("pokemon-image-current").src=currentPokemon.silhouette;
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

function updatePokemonImage(){
	document.getElementById("pokemon-image-previous").src=currentPokemon.photo;
	document.getElementById("pokemon-text-previous").innerHTML = currentPokemon.description;
	new Audio("assets/audio/correct.mp3").play();
}

document.onkeyup = function(event) {
	if(event.keyCode == 13 && music.paused){
		music.play();
	}
	else if(event.keyCode == 13 && !music.paused){
		music.pause();
	}
	else{
		//nothing
	}
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