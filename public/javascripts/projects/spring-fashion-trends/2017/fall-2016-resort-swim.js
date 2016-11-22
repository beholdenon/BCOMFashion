'use strict';

$(window).resize(function() {

	if ($(window).width() < 600) {
		$("#canvasBloom_mobile").hide();
	} else {
		$("#canvasBloom_mobile").show();
	}
});

$( window ).load(function() {

	var update = true;
	var canvas = document.getElementById("canvasBloom_mobile");
	canvas.width = 1680;
	canvas.height = 667;

	var stage = new createjs.Stage(canvas);

	// enable touch interactions if supported on the current device:
	createjs.Touch.enable(stage);

	// enabled mouse over / out events
	stage.enableMouseOver(10);
	stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas



	$( window ).on('resize',function() {
		var canvasWidth = (  parseInt($(window).width()) > 1680 ? 1680 : parseInt($(window).width()) );
		$("#canvasBloom_mobile").css({
			'width':canvasWidth+"px"
		});

	});

	var queue = new createjs.LoadQueue(true);
	queue.loadFile("/fashion/images/projects/spring-fashion-trends/2017/swim_canvas1.jpg");
	queue.loadFile("/fashion/images/projects/spring-fashion-trends/2017/swim_canvas2.jpg");
	queue.loadFile("/fashion/images/projects/spring-fashion-trends/2017/swim_canvas3.jpg");
	queue.loadFile("/fashion/images/projects/spring-fashion-trends/2017/swim_canvas4.jpg");
	queue.loadFile("/fashion/images/projects/spring-fashion-trends/2017/swim_canvas5.jpg");
	queue.loadFile("/fashion/images/projects/spring-fashion-trends/2017/swim_canvas6.jpg");
	queue.loadFile("/fashion/images/projects/spring-fashion-trends/2017/swim_canvas7.png");
	queue.loadFile("/fashion/images/projects/spring-fashion-trends/2017/swim_canvas8.png");
	queue.on("complete", handleComplete, this);

	function handleComplete(){

		var swimCanvas1 = new Image();
		swimCanvas1.src = '/fashion/images/projects/spring-fashion-trends/2017/swim_canvas1.jpg';
		swimCanvas1.xpos = -128;
		swimCanvas1.ypos = 119;
		swimCanvas1.onload = handleImageLoad;

		var swimCanvas3 = new Image();
		swimCanvas3.src = '/fashion/images/projects/spring-fashion-trends/2017/swim_canvas3.jpg';
		swimCanvas3.xpos = 222;
		swimCanvas3.ypos = 347;
		swimCanvas3.onload = handleImageLoad;

		var swimCanvas4 = new Image();
		swimCanvas4.src = '/fashion/images/projects/spring-fashion-trends/2017/swim_canvas4.jpg';
		swimCanvas4.xpos = 806;
		swimCanvas4.ypos = 395;
		swimCanvas4.onload = handleImageLoad;

		var swimCanvas5 = new Image();
		swimCanvas5.src = '/fashion/images/projects/spring-fashion-trends/2017/swim_canvas5.jpg';
		swimCanvas5.xpos = 858;
		swimCanvas5.ypos = 26;
		swimCanvas5.onload = handleImageLoad;

		var swimCanvas7 = new Image();
		swimCanvas7.src = '/fashion/images/projects/spring-fashion-trends/2017/swim_canvas7.png';
		swimCanvas7.xpos = -1;
		swimCanvas7.ypos = 95;
		swimCanvas7.onload = handleImageLoad;

		var swimCanvas8 = new Image();
		swimCanvas8.src = '/fashion/images/projects/spring-fashion-trends/2017/swim_canvas8.png';
		swimCanvas8.xpos = 1114;
		swimCanvas8.ypos = 447;
		swimCanvas8.onload = handleImageLoad;	

		var swimCanvas2 = new Image();
		swimCanvas2.src = '/fashion/images/projects/spring-fashion-trends/2017/swim_canvas2.jpg';
		swimCanvas2.xpos = 156;
		swimCanvas2.ypos = 210;
		swimCanvas2.onload = handleImageLoad;

		var swimCanvas6 = new Image();
		swimCanvas6.src = '/fashion/images/projects/spring-fashion-trends/2017/swim_canvas6.jpg';
		swimCanvas6.xpos = 1351;
		swimCanvas6.ypos = 240;
		swimCanvas6.onload = handleImageLoad;

	}

	function handleImageLoad(event) {

		$.fn.trace(event.target.index);

	    var image = event.target;
	    var bitmap = new createjs.Bitmap(image);

        bitmap.x = image.xpos;
        bitmap.y = image.ypos;
	    stage.addChild(bitmap);
		bitmap.cursor = "pointer";

		bitmap.on("mousedown", function (evt) {
			this.parent.addChild(this);
			this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
		});

		bitmap.on("pressmove", function (evt) {
			this.x = evt.stageX + this.offset.x;
			this.y = evt.stageY + this.offset.y;
			update = true;
		});

		bitmap.on("rollover", function () {
			update = true;
		});

		bitmap.on("rollout", function () {
			update = true;
		});

        update = true;
	    createjs.Ticker.addEventListener("tick", tick);
	    // createjs.Ticker.interval=100;			

	}

	function tick(event) {
	    if (update) {
	        update = false; // only update once
	        stage.update(event);
	    }
	}
});
