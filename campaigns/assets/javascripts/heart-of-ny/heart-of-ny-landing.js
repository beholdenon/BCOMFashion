$(function(){
		var prop = 2000/1041;
		$(window).resize(resizeBuilding);

		function getParameterByName(name, url) {
		    if (!url) url = window.location.href;
		    name = name.replace(/[\[\]]/g, '\\$&');
		    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		        results = regex.exec(url);
		    if (!results) return null;
		    if (!results[2]) return '';
		    return decodeURIComponent(results[2].replace(/\+/g, ' '));
		}
		function resizeBuilding() {
			var contentWidth = $(window).height() * prop;
			$(".heart-of-ny-landing").height($(window).height());
			$(".hp-outer-strips").height($(window).height()).width(contentWidth);

			$(".hp-strips").height($(window).height()).width(contentWidth);

			$(".hp-strips-nav").width(contentWidth);
			$(".hp-nav").width(contentWidth + 10);
			$(".hp-strips-nav li").each(function(index) {
				$(this).height($(".floor").eq(index).height());
			});
		}
		function activateHover () {
			$(".hp-strips-nav li").hover(function() {
				var index = $(this).index();
				$(".hp-not-active .floor").eq(index).find("img").stop().animate({
					opacity: 0
				}, 400, "swing");
				$(".hp-nav div").eq(index).addClass("active");
			},
			function() {
				var index = $(this).index();
				$(".hp-not-active .floor").eq(index).find("img").stop().animate({
					opacity: 1
				}, 400, "swing");
				$(".hp-nav div").eq(index).removeClass("active");
			});
		}
		function animateWindows() {
			var delay = 500;
			var fadeSpeed = 500;
			setTimeout(function(){
				$(".hp-logo").addClass("animate");
				activateHover();
			 }, fadeSpeed * 6);

			$(".hp-not-active .floor").each(function(index) {
				$(this).find("img").delay(delay).animate({
				opacity: 0}, fadeSpeed, "swing").animate({
				opacity: 1}, fadeSpeed, "swing");
				delay += fadeSpeed;
			});
		}
		function animatePage() {
			$(".heart-of-ny-landing").fadeOut(0).css("opacity", 1).fadeIn(1000);
		}
		function init() {
			resizeBuilding();
			if(getParameterByName("animate") === "1") {
				animateWindows();
			}
			else {
				setTimeout(function(){
					$(".hp-logo").addClass("animate");
				}, 1000);
				activateHover();
			}
			animatePage();
		}
		init();
	});