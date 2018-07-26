
$(function(){
	var navActive = false;
	
	// create resuable reference to the body
	var bodyRef = $("body");

	// initiate the sticky nav
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

	// initiate the lazy load instance
	function initLazyLoad() {
		if($('.lazy').length) {
		    $('.lazy').Lazy({
		        effect: 'fadeIn'
		    });
		}
	}

	// if heart icon exists (shoe page) then initiate position
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
		 'left': (o.left + e.width()-45),
		 'top': (o.top - 50)
		});
		$(".sub-head-box .heart").show();
	}

	// for pages with slick carousel
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
	function initFeatureBar() {
		if($(".new-feature").length) {
			$(window).on("resize", setFeatureBar);
			setFeatureBar();
		}
	}
	function setFeatureBar () {
		$(".new-feature").each(function() {
			$(this).height( $(this).find(".col").height() + $(this).find("p").height() );
			$(this).css("border", "1px solid #ff000");
		});
	}
	
	initNav();
	initLazyLoad();
	initHeart();
	initCarousel();
	animatePage();
	initFeatureBar();

});