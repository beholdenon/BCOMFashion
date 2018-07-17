$(function(){
	var navActive = false;
	var bodyRef = $("body");
	function initNav() {
		if($('.heart-of-ny-sticky-header').length){
			var sticky = $('.heart-of-ny-sticky-header');
		
			//on hamburger click trigger nav roll out
			$("#heart-of-ny-nav-switcher").on('click', function () {
		        bodyRef.toggleClass('heart-of-ny-nav-is-active');
		        navActive = bodyRef.hasClass('heart-of-ny-nav-is-active');
		    });
		    
		    // add border on page scroll
		    var logoOffset = $("header .bloom-logo").offset();
		    $(window).scroll(function () {
		        var offsetY = $(this).scrollTop();
		        if(offsetY > (logoOffset.top)) {
		            bodyRef.addClass("heart-scrolled");
		        } else {
		            bodyRef.removeClass("heart-scrolled");
		        }
		    });
		}
	}
	function initLazyLoad() {
		$(function() {
	        $('.lazy').Lazy({
	        	effect: 'fadeIn'
	        });
	    });
	}
	function initHeart() {
		if($(".sub-head-box .heart").length) {
			setHeart();
			$(window).resize(setHeart);
		}
	}
	function setHeart() {
		var e = $(".sub-head-box h2");
		var o = e.position();
		$(".sub-head-box .heart").css({
		 'left': (o.left + e.width()-55),
		 'top': (o.top - 50)
		});
		$(".sub-head-box .heart").show();
	}
	function initCarousel() {
		if($(".59-carousel").length) {
			$('.59-carousel').slick({
				prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"></button>',
				nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button"></button>',
				dots: true,
				autoplay: true,
  				autoplaySpeed: 4000
			});
		}
	}
	function animatePage() {
		$(".heart-of-new-york").fadeOut(0).css("opacity", 1).fadeIn(1000);
	}
	
	initNav();
	initLazyLoad();
	initHeart();
	initCarousel();
	animatePage();

});