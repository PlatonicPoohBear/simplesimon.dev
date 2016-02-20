var idArray = ['red', 'blue', 'green', 'yellow'];
var memoryArray = [];

function getRandomId(idArray) {
	var id = idArray[Math.floor(Math.random() * idArray.length)];
	setMemory(id);
};

function setMemory(id) {
	memoryArray.push(id);
	alterDiv(memoryArray);
};


function alterDiv(memArray) {
	
	memArray.forEach(function (memoryId, index, array) {
		
		setTimeout(function() {
			$('#' + memoryId).animate({
				opacity: 0.1
			}, 500).animate({
				opacity: 1
			}, 500);
		}, 1000 * index);
	});

	setListeners();
};


function setListeners() {
	idArray.forEach(function (id, index, array) {
		document.getElementById(id).addEventListener('click', checkInput);
	});
};


function checkInput() {
	console.log(this.id);
}
