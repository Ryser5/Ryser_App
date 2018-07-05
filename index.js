
(function(){

	var Puzzle = {

		init: function(pieces){
			var running = true;
			this.$game = $(".game"); //game
			this.$modal = $(".modal"); //modal
			this.$overlay = $(".modal-overlay"); //modal-overlay
			this.pieceArray = $(pieces);
			this.$pieces = $((this.pieceArray));
			this.setup();
			var count = 0;
			this.pieceUnlckd();
			//for(var c = 0; c < 9; c++)
				//this.flipPiece(c, running);
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			var num = 0;
			this.memoryCards = $(".card");
		},

		//TEST FLIP
		pieceUnlckd: function(){
			var delayMillis = 1000; //1 second
			var counter = 1;
			var intval = setInterval(function() {
			var card = $("#" + counter);
				if(!card.find(".inside").hasClass("picked")){
					card.find(".inside").addClass("picked");
					}
					counter++;
					console.log("Flipped " + counter);
				if(counter > 9){
					clearInterval(intval);
					//this.win();
				}
			}, delayMillis);
		},

		//ACTUAL Flipped ----- TEST
		flipPiece: function(id, running){
			var pCap = 90000;
			var gps1 = [0,0];
			var gps2 = [0,0];
				//var pUser = 0;
				var delayMillis = 1000; //1 second
				var counter = 1;
				//var intval = setInterval(function() {
					gps1 = Puzzle.initMap();
					console.log( "Gps1: " + gps1);
					gps2 = Puzzle.initMap();
					console.log("Gps2: " +gps2);
					var lat1,lat2,lon1,lon2;
					//lat1 = gps1[0];
					//lat2 = gps2[0];
					//lon1 = gps1[1];
					//lon2 = gps2[2];
					var dist = function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  					var R = 6371; // Radius of the earth in km
  					var dLat = (Math.PI/180)*(lat2-lat1);  // deg2rad below
  					var dLon = (Math.PI/180)*(lon2-lon1);
  					var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
						Math.cos((Math.PI/180)*(lat1)) * Math.cos((Math.PI/180)*(lat2)) *
    				Math.sin(dLon/2) * Math.sin(dLon/2);
  					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  					var d = R * c; // Distance in km
						console.log("Distance in km: " + d);
  					return d;
					}

					if(dist > 0){
						var card = $("#" + counter);
						if(!card.find(".inside").hasClass("picked")){
							card.find(".inside").addClass("picked");
							}
							counter++;
							console.log("Flipped " + counter-1);
							if(counter > 9){
								clearInterval(intval);
								this.win();
							}
						}
					//}, delayMillis);
		},

		//unlocks all puzzle pieces
		win: function(){
			alert("Congratulations! You've unlocked a prize! Keep up the good work!")
		},

		//Flips the piece
		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			//this.shuffleCards(this.pieceArray);
			this.setup();
			this.$game.show("slow");
		},

		buildHTML: function(){
			var frag = '';
			var cardNum = 0;
			this.$pieces.each(function(k, v){
				frag += '<div class="card" id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="BarcodeImg/Logo.png"\
				alt="Ryser" /></div></div>\
				</div>';
				cardNum++;

			});
			return frag;
		},
		// Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.

    initMap: function() {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
						var pos = [0,0];
            pos[0] = position.coords.latitude;
						console.log("Lat: " + pos[0]);
            pos[1] = position.coords.longitude;
						console.log("Lon: " + pos[1]);
						return(pos);
          });
				}
      	else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
			   }
      },

    handleLocationError: function(browserHasGeolocation, infoWindow, pos) {
      console.log("Error: The Geolocation service failed.");
      console.log("Error: Your browser doesn\'t support geolocation.");
    }
	};

	var pieces = [
		{
			name: "r1c1",
			img: "BarcodeImg/r1c1.JPG", //url of images (preseparate into pieces)
			id: 1,
		},
		{
			name: "r1c2",
			img: "BarcodeImg/r1c2.JPG", //url of images (preseparate into pieces)
			id: 2
		},
		{
			name: "r1c3",
			img: "BarcodeImg/r1c3.JPG", //url of images (preseparate into pieces)
			id: 3
		},
		{
			name: "r2c1",
			img: "BarcodeImg/r2c1.JPG", //url of images (preseparate into pieces)
			id: 4
		},
		{
			name: "r2c2",
			img: "BarcodeImg/r2c2.JPG", //url of images (preseparate into pieces)
			id: 5
		},
		{
			name: "r2c3",
			img: "BarcodeImg/r2c3.JPG", //url of images (preseparate into pieces)
			id: 6
		},
		{
			name: "r3c1",
			img: "BarcodeImg/r3c1.JPG", //url of images (preseparate into pieces)
			id: 7
		},
		{
			name: "r3c2",
			img: "BarcodeImg/r3c2.JPG", //url of images (preseparate into pieces)
			id: 8
		},
		{
			name: "r3c3",
			img: "BarcodeImg/r3c3.JPG", //url of images (preseparate into pieces)
			id: 9
		}


	];
	//Get Location

	Puzzle.init(pieces);


})();
