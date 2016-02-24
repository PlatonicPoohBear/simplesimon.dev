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

		// Holds timeout id's from memoryLight.
	var timeoutArray = [];

		
		// Pulls random id from array.
	function getRandomId() {
		var id = idArray[Math.floor(Math.random() * idArray.length)];
		setMemory(id);
	};

		
		// Builds Simple Simon sequence, adding an id on each round.
	function setMemory(id) {
		memoryArray.push(id);
		setRound();
			// Clear timeoutArray.
		removeTimeouts();
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
				
				// TimeoutId holds id of timeout in the current iteration of the forEach loop.

			var timeoutId = setTimeout(function() {
				$('#' + memoryId).animate({
					opacity: 1
				}, 250).animate({
					opacity: 0.2
				}, 250);
			}, 500 * index);

				// Store the timeout id from the iteration.
			timeoutArray.push(timeoutId);
			timeoutId = 0;

		});
			// Once sequence has finished, create event listeners.
		setTimeout(setListeners, 500 * (memArray.length));
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


		// Function to remove timeouts stored in array, and clear array.
	function removeTimeouts() {
		timeoutArray.forEach(function (timeout, index, array) {
			clearTimeout(timeout);
		});
		timeoutArray = [];
	};

	
		// Animates user input as it comes in.
	function userLight() {
		
			var id = this.id;

			// Remove listeners during animation.
		removeListeners();
		
		$(this).animate({
				opacity: 1
			}, 250).animate({
				opacity: 0.2
			}, 250);

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
			removeTimeouts();
			resetGame();
			setTimeout(function() {
				resetLimit = false;
			}, 1000);
		};
		
	};

		// Event listener for new game.
	document.getElementById('newGame').addEventListener('click', resetLimiter);

})();