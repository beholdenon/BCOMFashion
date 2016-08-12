$( window ).load(function() {

//===============================================================================================================//
//===============================================================================================================//

	'use strict';
	$.fn.coreTag('Pageview', 'fall16_100percent--sweeps');


	if($(window).height()>=1030){
		$('#contest_desktop').css({
			'height':$(window).height()+'px'
		});			
	}

	$( window ).on('resize',function() {
		if($(window).height()>=1030){
			$('#contest_desktop').css({
				'height':$(window).height()+'px'
			});			
		}
	});






	/*

		dynamic add item in jquery
		add class to the item
		animation in css with added class name

	    $('meta[name=viewport]').remove();
	    $('head').append( '<meta name="viewport" width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no >' );

	*/



/*

		$( '.download' ).click(function() {
		    this.href = $('#canvasBloom2')[0].toDataURL();
		});

		var update = true;

		var canvas = document.getElementById("canvasBloom2");

		var stage = new createjs.Stage("canvasBloom2");
		// enable touch interactions if supported on the current device:


		//examples.showDistractor();


		createjs.Touch.enable(stage);


		// enabled mouse over / out events
		stage.enableMouseOver(10);
		stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas









		var circle = new createjs.Shape();
		circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
		circle.x = 100;
		circle.y = 100;
		stage.addChild(circle);
		stage.update();

		circle.on("pressmove",function(e) {
		    this.parent.addChild(this);

	        // Update currentTarget, to which the event listener was attached
	        e.currentTarget.x = e.stageX;
	        e.currentTarget.y = e.stageY;
	        
	        // Redraw stage
		    //stage.update();
	        update = true;
		});






		var bitmap = new createjs.Bitmap("/fashion/images/projects/100-percent-exclusive-2016-summer-collection/svg/a.svg");
		stage.addChild(bitmap);

		bitmap.on("mousedown", function (evt) {
		    this.parent.addChild(this);
		    this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
		});

		// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
		bitmap.on("pressmove", function (evt) {
		    this.x = evt.stageX + this.offset.x;
		    this.y = evt.stageY + this.offset.y;
		    // indicate that the stage should be updated on the next tick:
		    //stage.update();
	        update = true;

		});


		var bitmap2 = new createjs.Bitmap("/fashion/images/projects/100-percent-exclusive-2016-summer-collection/svg/b.svg");
		stage.addChild(bitmap2);

		bitmap2.on("mousedown", function (evt) {
		    this.parent.addChild(this);
		    this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
		});

		// the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
		bitmap2.on("pressmove", function (evt) {
		    this.x = evt.stageX + this.offset.x;
		    this.y = evt.stageY + this.offset.y;
		    // indicate that the stage should be updated on the next tick:
		    //stage.update();
	        update = true;
		});







		// load the source image:
		var image = new Image();
		image.src = "/fashion/images/projects/100-percent-exclusive-2016-summer-collection/fragrance-icon.svg";
		image.onload = handleImageLoad;

		var image2 = new Image();
		image2.src = "/fashion/images/projects/100-percent-exclusive-2016-summer-collection/skin-care-icon.svg";
		image2.onload = handleImageLoad;

		var image3 = new Image();
		image3.src = "/fashion/images/projects/100-percent-exclusive-2016-summer-collection/gift-icon.svg";
		image3.onload = handleImageLoad;



		function handleImageLoad(event) {
		    var image = event.target;
		    var bitmap = new createjs.Bitmap(image);
		    stage.addChild(bitmap);

	        bitmap.x = parseInt( canvas.width * Math.random() );
	        bitmap.y = parseInt( canvas.height * Math.random() );
	        bitmap.rotation = parseInt( 360 * Math.random() );
	        bitmap.regX = parseInt( (bitmap.image.width / 2) );
	        bitmap.regY = parseInt( (bitmap.image.height / 2) );
	        bitmap.scaleX = bitmap.scaleY = bitmap.scale = Math.random() * 0.1 + 0.5;
	        bitmap.name = "bmp_"+bitmap.x;
	        bitmap.cursor = "pointer";


	        // using "on" binds the listener to the scope of the currentTarget by default
	        // in this case that means it executes in the scope of the button.
	        bitmap.on("mousedown", function (evt) {
	            this.parent.addChild(this);
	            this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
	        });

	        // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
	        bitmap.on("pressmove", function (evt) {
	            this.x = evt.stageX + this.offset.x;
	            this.y = evt.stageY + this.offset.y;
	            // indicate that the stage should be updated on the next tick:
	            update = true;
	        });

	        bitmap.on("rollover", function () {
	            this.scaleX = this.scaleY = this.scale * 1.2;
	            update = true;
	        });

	        bitmap.on("rollout", function () {
	            this.scaleX = this.scaleY = this.scale;
	            update = true;
	        });

		    //examples.hideDistractor();
		    createjs.Ticker.addEventListener("tick", tick);
		    createjs.Ticker.interval=10;
		}

		function tick(event) {
		    // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
		    if (update) {
		        update = false; // only update once
		        stage.update(event);
		    }
		}

*/



    
});

