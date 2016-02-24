(function() {
	
	var imgArray = ['/Img/cave_wallpaper.jpg', '/Img/forest_brook.jpg', '/Img/nature_wallpaper.jpg', '/Img/rocky_shore.jpg', '/Img/stars_wallpaper.jpg', '/Img/rainforest_wallpaper.jpg', '/Img/valley_lake.jpg', '/Img/diving_dog.jpg', '/Img/Putin_on_Eagle.jpg'];
	var imgCounter = 0;
	var img;

	function nextImg() {
		img = imgArray[imgCounter];
		imgCounter++;

		if (imgCounter > 8) {
			imgCounter = 0;
		};

		return img;
	};
		

	setInterval(function() {
		$('html').css('background-image', 'url(' + nextImg() + ')');
	}, 12000);

})();