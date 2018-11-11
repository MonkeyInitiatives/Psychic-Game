		var wins = 0;
		var guessesRemaining = 10;
		var lettersGuessed = "";
		
		var pokemonArray = ["Pikachu", "Charmander", "Squirtle", "Bulbasaur", "Exeggutor", "Rapidash", "Mewtwo"];
		
		var randomNumber = 0;
        var currentPokemon = "";
        
        
		var emptyArray = [];
		
		var music = new Audio("assets/audio/pokemon.mp3");
		
		//NEW GAME LOOP
		function startGame(){
			randomNumber = Math.floor(Math.random() * pokemonArray.length);
	        currentPokemon = pokemonArray[randomNumber].toLowerCase();

			guessesRemaining = 10;
			lettersGuessed = "";
	        
        	var userText = document.getElementById("user-wins");
			userText.textContent = wins;
			var userText = document.getElementById("user-remaining");
			userText.textContent = guessesRemaining;
			var userText = document.getElementById("user-guessed");
			userText.textContent = lettersGuessed;
	        
	        
			emptyArray = [];
			for(var i = 0; i<currentPokemon.length; i++)
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
		//END LOOP
		
		
		function capitalize(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
		
		function isPlaying(audelem) 
		{ 
			return !audelem.paused; 
		}
		
		document.onkeyup = function(event) {
			if(event.keyCode == 32 && music.paused){
                music.play();
		    }
		    else if(event.keyCode == 32 && !music.paused){
			    music.pause();
		    }
		    else{
			    
		    }

        	var userGuess = event.key.toLowerCase();
        	var foundLetter = false;
        				        	
        	for(var i = 0; i<currentPokemon.length; i++)
        	{
	        	if(currentPokemon.charAt(i) === userGuess)
	        	{		
		        	emptyArray[i] = currentPokemon.charAt(i);
		        	
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
		        	
	        	}
        	}
        	if(!foundLetter)
        	{	
	        	if(lettersGuessed.indexOf(userGuess) > -1){
		        	foundLetter = false;

	        	}
	        	else{
		        	if(event.keyCode == 32){}
		        	else{
		        		guessesRemaining--;
		        		foundLetter = false;
		        		lettersGuessed = lettersGuessed + userGuess + " ";
					}
	        	}
        	}
        	
        	if(!(emptyArray.indexOf(" - ") > -1)){
	        	if(currentPokemon==="pikachu"){
		        	document.getElementById("pokemon-image").src="assets/images/pikachu.png";
		        	document.getElementById("pokemon-text").innerHTML = "Whenever Pikachu comes across something new, it blasts it with a jolt of electricity. If you come across a blackened berry, it's evidence that this Pokémon mistook the intensity of its charge.";
					new Audio("assets/audio/correct.mp3").play();
	        	}
	        	else if(currentPokemon==="bulbasaur"){
		        	document.getElementById("pokemon-image").src="assets/images/bulbasaur.png";
		        	document.getElementById("pokemon-text").innerHTML = "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger."	
					new Audio("assets/audio/correct.mp3").play();
	        	}
	        	else if(currentPokemon==="charmander"){
		        	document.getElementById("pokemon-image").src="assets/images/charmander.png";
		        	document.getElementById("pokemon-text").innerHTML = "The flame that burns at the tip of its tail is an indication of its emotions. The flame wavers when Charmander is enjoying itself. If the Pokémon becomes enraged, the flame burns fiercely.";
		        	new Audio("assets/audio/correct.mp3").play();;
	        	}
	        	else if(currentPokemon==="squirtle"){
		        	document.getElementById("pokemon-image").src="assets/images/squirtle.png";
		        	document.getElementById("pokemon-text").innerHTML = "Squirtle's shell is not merely used for protection. The shell's rounded shape and the grooves on its surface help minimize resistance in water, enabling this Pokémon to swim at high speeds.";
		        	new Audio("assets/audio/correct.mp3").play();
	        	}
	        	else if(currentPokemon==="exeggutor"){
		        	document.getElementById("pokemon-image").src="assets/images/exeggutor.png";
		        	document.getElementById("pokemon-text").innerHTML = "Exeggutor originally came from the tropics. Its heads steadily grow larger from exposure to strong sunlight. It is said that when the heads fall off, they group together to form Exeggcute.";
		        	new Audio("assets/audio/correct.mp3").play();
	        	}
	        	else if(currentPokemon==="rapidash"){
		        	document.getElementById("pokemon-image").src="assets/images/rapidash.png";
		        	document.getElementById("pokemon-text").innerHTML = "Rapidash usually can be seen casually cantering in the fields and plains. However, when this Pokémon turns serious, its fiery manes flare and blaze as it gallops its way up to 150 mph.";
		        	new Audio("assets/audio/correct.mp3").play();
	        	}
	        	else if(currentPokemon==="mewtwo"){
		        	document.getElementById("pokemon-image").src="assets/images/mewtwo.png";
		        	document.getElementById("pokemon-text").innerHTML = "Mewtwo is a Pokémon that was created by genetic manipulation. However, even though the scientific power of humans created this Pokémon's body, they failed to endow Mewtwo with a compassionate heart.";
					new Audio("assets/audio/correct.mp3").play();

	        	}
	        	else{
		        	
	        	}
	        	
				var userText = document.getElementById("who-was-it");
				userText.textContent = "Yes! It's " + capitalize(currentPokemon) +"!";
	        	startGame();
	        	wins++;
	        	guessesRemaining=10;
	        	lettersGuessed="";
        	}
        	
        	
        	if((emptyArray.indexOf(" - ") > -1) && (guessesRemaining===0)){
	        	var userText = document.getElementById("who-was-it");
				userText.textContent = "No! It was " + capitalize(currentPokemon) +"!";
	        	guessesRemaining=10;
	        	lettersGuessed="";
	        	startGame();
        	}
                	
        	var userText = document.getElementById("user-wins");
			userText.textContent = wins;
			var userText = document.getElementById("user-remaining");
			userText.textContent = guessesRemaining;
			var userText = document.getElementById("user-guessed");
			userText.textContent = lettersGuessed;
		};
		
		
