(function() {
	
	var idArray = ['red', 'blue', 'green', 'yellow'];
	var memoryArray = [];
	var inputCounter = 0;
	var highScore = 0;
	var currentRound = 1;
	var checkInputLimit = false;
	var userLightLimit = false;
	var resetLimit = false;

	function getRandomId() {
		var id = idArray[Math.floor(Math.random() * idArray.length)];
		setMemory(id);
	};

	function setMemory(id) {
		memoryArray.push(id);
		setRound();
		memoryLight(memoryArray);
	};

	function setRound() {
		$('#round').text('Current round: ' + currentRound);
		currentRound++;
	}


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

		setTimeout(setListeners, 1000 * (memArray.length));
	};


	function setListeners() {
		idArray.forEach(function (id, index, array) {
			document.getElementById(id).addEventListener('click', userLight);
		});
	};


	function userLight() {
		removeListeners();
		
		$(this).animate({
				opacity: 0.1
			}, 500).animate({
				opacity: 1
			}, 500);

			var id = this.id;
		
		setTimeout(function() {
			checkInput(id);
		}, 500);
	};


	function checkInput(id) {
		var i = inputCounter;
		
		if (id != memoryArray[i]) {
			
			inputCounter = 0;
			endGame();
		} else if (id == memoryArray[i] && (i + 1) == memoryArray.length) {
			
			inputCounter = 0;
			setTimeout(getRandomId, 1000);
		} else {
			inputCounter++;
			setListeners();
		};
		
	};


	function removeListeners() {
		idArray.forEach(function (id, index, array) {
			document.getElementById(id).removeEventListener('click', userLight);
		});
	};


	function endGame() {
		if (memoryArray.length - 1 > highScore) {
			highScore = memoryArray.length - 1;
			alert('New high score! You completed ' + highScore + ' round(s)!');
		} else {
			alert('You completed ' + memoryArray.length + ' round(s)!')
		};

		$('#highscore').text('High score: ' + highScore);

	};


	function resetGame() {
		memoryArray = [];
		inputCounter = 0;
		currentRound = 1;
		setTimeout(getRandomId, 1000);
	};



	function resetLimiter() {
		if (resetLimit == false) {
			resetLimit = true;
			resetGame();
			setTimeout(function() {
				resetLimit = false;
			}, 1000);
		};
	};

	
	document.getElementById('newGame').addEventListener('click', resetLimiter);

})();