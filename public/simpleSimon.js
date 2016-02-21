(function() {
		// Preset array of possible id's.
	var idArray = ['red', 'blue', 'green', 'yellow'];
	
		// Holds randomnly determined sequence of id's.
	var memoryArray = [];
	
		// Holds number of times user has input id in current round.
	var inputCounter = 0;
		
		// Holds highest number of rounds user has reached.
	var highScore = 0;
	
		// Holds number of rounds user has reached this turn.
	var currentRound = 1;
		
		// Flag to slow down how quickly user can click reset button.
	var resetLimit = false;

		// Pulls random id from array.
	function getRandomId() {
		var id = idArray[Math.floor(Math.random() * idArray.length)];
		setMemory(id);
	};

		// Builds Simple Simon sequence, adding an id on each round.
	function setMemory(id) {
		memoryArray.push(id);
		setRound();
		memoryLight(memoryArray);
	};

		// Displays current round, then increments for next round.
	function setRound() {
		$('#round').text('Current round: ' + currentRound);
		currentRound++;
	};

		// Animates Simon sequence.
	function memoryLight(memArray) {
		
		memArray.forEach(function (memoryId, index, array) {
			
			setTimeout(function() {
				$('#' + memoryId).animate({
					opacity: 0.1
				}, 500).animate({
					opacity: 1
				}, 500);
			}, 1000 * index);
		});
			// Once sequence has finished, create event listeners.
		setTimeout(setListeners, 1000 * (memArray.length));
	};

		// Function for creating event listeners for user input.
	function setListeners() {
		idArray.forEach(function (id, index, array) {
			document.getElementById(id).addEventListener('click', userLight);
		});
	};

		// Function for removing the event listeners for user input.
	function removeListeners() {
		idArray.forEach(function (id, index, array) {
			document.getElementById(id).removeEventListener('click', userLight);
		});
	};

		// Animates user input as it comes in.
	function userLight() {
		
			// Remove listeners during animation.
		removeListeners();
		
		$(this).animate({
				opacity: 0.1
			}, 500).animate({
				opacity: 1
			}, 500);

			var id = this.id;
		
			// Check input for correctness.
		setTimeout(function() {
			checkInput(id);
		}, 500);
	};

		// Function for checking user input against Simon sequence.
	function checkInput(id) {
		var i = inputCounter;
			
			// If input is incorrect, reset counter and end the game.
		if (id != memoryArray[i]) {
			
			inputCounter = 0;
			endGame();
		} 

			// If user reaches the end of the sequence, reset the counter and add new id to the sequence. 
		else if (id == memoryArray[i] && (i + 1) == memoryArray.length) {
			
			inputCounter = 0;
			setTimeout(getRandomId, 1000);
		} 

			// If user input is correct, but there is more left in the sequence, increment counter and turn listeners back on.
		else {
			inputCounter++;
			setListeners();
		};
		
	};

		// Function to end turn. Checks for and displays new high score.
	function endGame() {
		if (memoryArray.length - 1 > highScore) {
			highScore = memoryArray.length - 1;
			alert('New high score! You completed ' + highScore + ' round(s)!');
		} else {
			alert('You completed ' + memoryArray.length + ' round(s)!')
		};

		$('#highscore').text('High score: ' + highScore);

	};

		// Starts new game. Resets all fields except high score. Generates first id in Simon sequence.
	function resetGame() {
		memoryArray = [];
		inputCounter = 0;
		currentRound = 1;
		setTimeout(getRandomId, 1000);
	};

		// Limits how quickly user can reset game. (Bug fix)
	function resetLimiter() {
		if (resetLimit == false) {
			resetLimit = true;
			resetGame();
			setTimeout(function() {
				resetLimit = false;
			}, 1000);
		};
	};

		// Event listener for new game.
	document.getElementById('newGame').addEventListener('click', resetLimiter);

})();