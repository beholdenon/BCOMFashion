$(function(){
	var navActive = false;
	var bodyRef =$("body");
	function initNav() {
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
	function initLazyLoad() {
		$(function() {
	        $('.lazy').Lazy({
	        	effect: 'fadeIn'
	        });
	    });
	}
	function setHeart() {
		var e = $(".sub-head-box h2");
		var o = e.position();
		$(".sub-head-box .heart").css({
		 'left': (o.left + e.width()-50),
		 'top': (o.top - 50)
		});
		$(".sub-head-box .heart").show();
	}
	$(window).resize(setHeart);

	

	initNav();
	initLazyLoad();
	setHeart();
});