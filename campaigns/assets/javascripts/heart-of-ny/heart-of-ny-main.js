$(function(){
	var navActive = false;
	function initNav() {
		var sticky = $('.heart-of-ny-sticky-header');
		
		//on hamburger click trigger nav roll out
		$("#heart-of-ny-nav-switcher").on('click', function () {
	        $("body").toggleClass('heart-of-ny-nav-is-active');
	        navActive = $("body").hasClass('heart-of-ny-nav-is-active');
	    });
	    
	    // add border on page scroll
	    $(window).scroll(function () {
	        var offsetY = $(this).scrollTop();
	        if(offsetY > sticky.height()) {
	            sticky.addClass('nav-border');
	        } else {
	            sticky.removeClass('nav-border');
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