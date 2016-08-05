'use strict';

$( window ).load(function() {


	var charArr=[];
	var charLeftPos=0;
	var foulwords=['fuck','ass','fucking'];
	var finalword='';

	$('#submitButton').click(function() {
		charLeftPos=0;
		finalword=$("#mytextfield").val();

		for (var j = 0; j < foulwords.length; j++) {
			if( finalword === foulwords[j] ){
				finalword=foulwords[j];
				trace("bad "+finalword);
				finalword = '0000';
				break;
			}
		}


		charArr = finalword.split('') ;
		stage.removeAllChildren();
		for (var i = 0; i < charArr.length; i++) {
			createChar( charArr[i] );
		}
	});


	function createChar(inputChar){

		var imageb = new Image();
		imageb.src = '/fashion/images/projects/100-percent-exclusive-2016-summer-collection/svg/'+inputChar+'.svg';
		imageb.onload = handleImageLoad;
		trace(inputChar);
	}	


    function trace(logString) {
    	var returnString = window.console && console.log(logString);
    	return returnString;
    }

	$( '.download' ).click(function() {
	    this.href = $('#canvasBloom_mobile')[0].toDataURL();
	});



	trace("dinner time!");


	var update = true;

	var canvas = document.getElementById("canvasBloom_mobile");
	canvas.width = ( $(window).width() * 2 );// make double pixel for canvas
//	canvas.height = ( $(window).height()/2 * 2 );
	canvas.height = ( $(window).width() * 2 );

	var stage = new createjs.Stage("canvasBloom_mobile");
	// enable touch interactions if supported on the current device:


	//examples.showDistractor();


	createjs.Touch.enable(stage);


	// enabled mouse over / out events
	stage.enableMouseOver(10);
	stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas









	var circle = new createjs.Shape();
	circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 20);
	circle.x = 30;
	circle.y = 30;
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






	var bitmap = new createjs.Bitmap("/fashion/images/projects/100-percent-exclusive-2016-summer-collection/svg/!.svg");
        bitmap.x = parseInt( (canvas.width-30) * Math.random() );
        bitmap.y = parseInt( (canvas.height-30) * Math.random() );	
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


	var bitmap2 = new createjs.Bitmap("/fashion/images/projects/100-percent-exclusive-2016-summer-collection/svg/#.svg");
        bitmap2.x = parseInt( (canvas.width-30) * Math.random() );
        bitmap2.y = parseInt( (canvas.height-30) * Math.random() );	
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
	var imageb = new Image();
	imageb.src = "/fashion/images/projects/100-percent-exclusive-2016-summer-collection/svg/b.svg";
	imageb.onload = handleImageLoad;

	var imagel = new Image();
	imagel.src = "/fashion/images/projects/100-percent-exclusive-2016-summer-collection/svg/l.svg";
	imagel.onload = handleImageLoad;

	var imageo = new Image();
	imageo.src = "/fashion/images/projects/100-percent-exclusive-2016-summer-collection/svg/o.svg";
	imageo.onload = handleImageLoad;






	function handleImageLoad(event) {
	    var image = event.target;
	    var bitmap = new createjs.Bitmap(image);

	    charLeftPos = charLeftPos + ( (canvas.width-80) /charArr.length);
        bitmap.x = charLeftPos;
        bitmap.y = 50 + parseInt( (canvas.height-200) * Math.random() );
        //bitmap.rotation = parseInt( 360 * Math.random() );
        bitmap.regX = parseInt( (bitmap.image.width / 2) );
        bitmap.regY = parseInt( (bitmap.image.height / 2) );

        bitmap.scaleX = bitmap.scaleY = bitmap.scale = Math.random() * 0.1 + 1;
        bitmap.name = "bmp_"+bitmap.x;
        bitmap.cursor = "pointer";

	    stage.addChild(bitmap);

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

        update = true;
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

});



















$(document).ready( function($) {

	var element = {
		'elementID': '',
		'elementCategory': 'spring16_100percent',
	};

	var social = {
		facebookTitle: '100% BLOOMINGDALE\'S',
		facebookDescription: '100% Bloomingdale\'s is back with a whole new series of designer capsule collections: 1000 exclusives. 100 designers. 1 store.',
		facebookImageFileName: 'S16_100Percent_FB.jpg',
		twitterTitle: '100% Bloomingdale’s is back with a new series of designer capsule collections: 1000 exclusives. 100 designers. 1 store. http://fashion.bloomingdales.com/100-percent-2016/',
		pinterestTitle: '100% Bloomingdale\'s is back with a whole new series of designer capsule collections: 1000 exclusives. 100 designers. 1 store.',
		pinterestImageFileName: 'S16_100Percent_Pinterest.jpg',
		facebookURL: null,
		twitterURL: null,
		pinterestURL: null    
    };

    socialSetup();

	//var find = '/';
	//var re = new RegExp(find, 'g'),
		// winPath = window.location.pathname.replace(re,'_');

	// pageViewTag( 'mbl:fashion' + winPath.substring( 0, winPath.lastIndexOf('_') ), element.elementCategory);

    socialSetup();

	$('.top').on('click tap', function () {
		$(this).toggleClass('active');
		$(this).siblings().slideToggle(400);
	});

	//  COREMETRICS TAGS

	$('.subNav a').on('click tap', function () {
		element.elementID = 'mlb:' + $(this).attr('id');
		elementTag(element);
	});

	$('#landing button, #landing a, #social a').on('click tap', function() {
		element.elementID = 'mlb:' + $(this).attr('id');
		elementTag(element);
	});

	$('video').on('play', function () {
		element.elementID = 'mlb:' + $(this).attr('id');
		elementTag(element);
	});


	function elementTag(element) {
        return window.cmCreatePageElementTag(element.elementID, element.elementCategory, element.attributes || null);
    }

    //  function pageViewTag (pageID, catID){
    //     window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, catID, '', '');        
    // }

    function socialSetup () {
        var baseURL = 'http://' + window.location.host + window.location.pathname,
            baseURLAssets = 'http://' + window.location.host + '/fashion/images/projects/100-percent/';

        var facebookURL = 'https://www.facebook.com/dialog/feed';
        facebookURL += '?app_id=145634995501895';
        facebookURL += '&name=' + encodeURIComponent(social.facebookTitle);
        facebookURL += '&description=' + encodeURIComponent(social.facebookDescription);
        facebookURL += '&link=' + encodeURIComponent(baseURL);
        facebookURL += '&picture=' + encodeURIComponent(baseURLAssets + social.facebookImageFileName);
        facebookURL += '&display=popup&redirect_uri=' + encodeURIComponent('https://www.facebook.com/');
        $('#facebookLink').attr('href', facebookURL);

        var twitterURL = 'http://twitter.com/intent/tweet?source=webclient&text=';
        twitterURL += encodeURIComponent(social.twitterTitle);
        $('#twitterLink').attr('href', twitterURL);

        var pinterestURL = 'http://pinterest.com/pin/create/button/?';
        pinterestURL += 'url=' + encodeURIComponent(baseURL);
        pinterestURL += '&media=' + encodeURIComponent(baseURLAssets + social.pinterestImageFileName);
        pinterestURL += '&description=' + encodeURIComponent(social.pinterestTitle);
        $('#pinterestLink').attr('href', pinterestURL);
    }


});


