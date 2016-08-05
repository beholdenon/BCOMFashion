$( window ).load(function() {

//===============================================================================================================//
//===============================================================================================================//

	'use strict';






	/*

		dynamic add item in jquery
		add class to the item
		animation in css with added class name

	    $('meta[name=viewport]').remove();
	    $('head').append( '<meta name="viewport" width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no >' );

	*/





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

	        bitmap.on("rollover", function (/*evt*/) {
	            this.scaleX = this.scaleY = this.scale * 1.2;
	            update = true;
	        });

	        bitmap.on("rollout", function (/*evt*/) {
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





/*

	var element = {
		'elementID': '',
		'elementCategory': 'spring16_100percent',
	};
	
	window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();

	var find = '/';
	var re = new RegExp(find, 'g'),
		winPath = window.location.pathname.replace(re,'_');

	pageViewTag( 'fashion' + winPath.substring( 0, winPath.lastIndexOf('_') ), element.elementCategory);

	// ===== Init Actions =====
	$('header, footer').remove();

	(function () {
		var hash = location.hash;

		if ( hash !== undefined && hash !== '' ) {

			$('#lookbookPage-' + hash.substring(1)).siblings().removeClass('active');
			$('#lookbookPage-' + hash.substring(1)).fadeIn(400, function() {
				$('#lookbookPage-' + hash.substring(1)).addClass('active');
				pageViewTag($('#slideBox .active').attr('id'), element.elementCategory);
			});
			
			
		} else {
			if ( $('#lookbooks') ) {
				$('#lookbooks .slide:first-child').fadeIn(800, function() {
					$('#lookbooks .slide:first-child').addClass('active');
					pageViewTag($('#slideBox .active').attr('id'), element.elementCategory);
				});
				
			}
		}

	})();


	
	// ===== Page Interactions =====

	$('#lookbook, #shopLink').on('click tap', function () {
		$(this).find('ul').toggle();
	});



	var slide = {

		left: function (p, n) {

			if (n < 0) n = $('#slideBox .slide').length - 1;

			$('#slideBox .slide').eq(n).css('left','-100vw').show();
			var target = $('#slideBox .slide').filter( function (i){
				return $.inArray(i, [p,n]) > -1;
			}) ;

			target.animate({'left': '+=100vw'},600, function () {
				$('#slideBox .active').removeClass('active');
				$('#slideBox .slide').eq(n).addClass('active');
				$('.arrow').removeClass('active');
			});
			setTimeout(function(){ pageViewTag($('#slideBox .active').attr('id'), element.elementCategory); }, 650);
		},

		right: function (p, n) {

			if (n >= $('#slideBox .slide').length) n=0;

			$('#slideBox .slide').eq(n).css('left','100vw').show();
			var target = $('#slideBox .slide').filter( function (i){
				return $.inArray(i, [p,n]) > -1;
			}) ;

			target.animate({'left': '-=100vw'},600, function () {
				$('#slideBox .active').removeClass('active');
				$('#slideBox .slide').eq(n).addClass('active');
				$('.arrow').removeClass('active');
			});

			setTimeout(function(){ pageViewTag($('#slideBox .active').attr('id'), element.elementCategory); }, 650);
		}

	};

	// clicked on a slide show arrow
	$('.arrow').on('click tap', function() {
		var position =  $('#slideBox .active').index(),
			next;

		if ( !$(this).hasClass('active')) {
			$('.arrow').addClass('active');
			if ( $(this).hasClass('left') ) {
				next = position-1;
				slide.left(position, next);
			} else {
				next = position+1; 
				slide.right(position, next);
			}
		}

	});	

	// Coremetrics 


	$('#topNav a').on('click tap', function () {
		element.elementID = 'topNav-' + $(this).attr('id');
		elementTag(element);
	});

	$('#lookbooks .arrow').on('click tap', function () {
		element.elementID = $('#lookbooks .slide.active').attr('id') + '-' + $(this).attr('id');
		elementTag(element);
	});

	$('video').on('play', function () {
		element.elementID = $(this).attr('id');
		elementTag(element);
	});

	function elementTag(element) {
        return window.cmCreatePageElementTag(element.elementID, element.elementCategory, element.attributes || null);
    }

    function pageViewTag (pageID, catID){

        window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, catID, '', '');        
    } 





*/



    
});

