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
				//$(".hp-nav div").eq(index).addClass("active");
				followMouseStart(index);
			},
			function() {
				var index = $(this).index();
				$(".hp-not-active .floor").eq(index).find("img").stop().animate({
					opacity: 1
				}, 400, "swing");
				//$(".hp-nav div").eq(index).removeClass("active");
				followMouseStop();
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
			//$(".heart-of-ny-landing").fadeOut(0).css("opacity", 1).fadeIn(1000);
		}

		function getFloor(id) {
			return $(".hp-not-active .floor").eq(id);
		}
		function getTooltip(id) {
			return $(".tt-container");
		}
		var tooltipObj = [
			{
				title: "Home",
				copy: "On 6, 8 and 8",
				inline: false,
				offsetY: 0
			},
			{
				title: "Shoes",
				copy: "On 5",
				inline: true,
				offsetY: 0
			},
			{
				title: "Women",
				copy: "On 2, 3 and 4",
				inline: false,
				offsetY: 10
			},
			{
				title: "Beauty",
				copy: "On 1",
				inline: true,
				offsetY: 15
			},
			{
				title: "Men",
				copy: "On The Lower Level",
				inline: false,
				offsetY: 0
			},
			{
				title: "Events",
				copy: "At The Flagship",
				inline: false,
				offsetY: 0
			}
		];
				
		// change the content of the tooltip
		function setTooltip(id) {
			var tt = getTooltip(id);
			tt.find("h3").html(tooltipObj[id].title);
			tt.find("p").html(tooltipObj[id].copy);
			if(tooltipObj[id].inline) {
				tt.find(".inner").addClass("inline");
			}
			else {
				tt.find(".inner").removeClass("inline");
			}
		}
		function getTooltipPosition(id) {
			var tt = getTooltip(id);
			var floor = getFloor(id);

			// return the position of the tooltip
			var pos = floor.position().top;
			pos += (floor.height()/2);
			pos -= (tt.height()/2);
			pos += tooltipObj[id].offsetY;
			return pos;
		}
		function followMouseStart(index) {
			// horizontal distance from the mouse
			var offsetX;

			// get the tooltip
			var tt = getTooltip(index);

			// set tooltip content
			setTooltip(index);

			// set the top value of the floor
			tt.stop().css("top", getTooltipPosition(index)).fadeIn(300);

			var wait = false;
			$(document).on("mousemove", function(e) {
				if(e.pageX < ($(window).width()/2)) {
					offsetX = 10;
				}
				else {
					offsetX = -(tt.width() + 10);
				}
				tt.css({ "top": e.pageY  });
				tt.css({ "left": e.pageX + offsetX });
			});
		}
		function followMouseStop() {
			var tt = $(".tt-container");
			tt.stop().fadeOut(300);
			$(document).unbind("mousemove");
		}
		function initMouseHandlers() {
			$("a").on("click", function(e) {
				e.preventDefault();
				callPage($(this).attr("href"));
			});
		}
		function callPage(href) {
			$(".heart-of-ny-landing").addClass("active");
			setTimeout(function() {
				window.location.href = href;
			}, 300);
		}

		function init() {
			resizeBuilding();
			
			// for testing with and without animation
			if(getParameterByName("animate") === "1") {
				animateWindows();
			}
			else {
				setTimeout(function(){
					$(".hp-logo").addClass("animate");
				}, 1000);
				activateHover();
			}
			// add class to the body tag to hide overflow
			$("body").addClass("heart-of-ny-landing-body");

			// trigger animation
			animatePage();

			// trigger a tag mouse handler
			initMouseHandlers();
		}

		init();
	});