define([
  'backbone',
  'jquery',
  'underscore'
], function(Backbone, $, _) {

	BLOOMIES.initMobileNav = function() {
	    // Add the height on some divs on the page to support the proper scrolling
	    var heightEqualizer = function(){
	        var pageHeight = window.innerHeight;
	        var regionMainHeight = pageHeight - $('#region-header').outerHeight();
	        $('#mobile-wrapper').css("min-height", regionMainHeight);
	        if( $("body").hasClass("nav-toggle")) {
	            $('#page-wrapper').css("height", pageHeight);
	            $('#mobile-wrapper').css("height", regionMainHeight);
	        } else {
	            $('#page-wrapper').css("height", "");
	            $('#mobile-wrapper').css("height", "");
	        }
	    };
	
	    // Show/Hide the global navigation menu
	    var navToggle = function(){
	        $("body").toggleClass("nav-toggle");
	        $('#nav-button-icon').toggleClass('active');
	        heightEqualizer();
	    };
		  
		function highlightChild(parent_id, child_id) {
		     $(parent_id).removeClass("currentRow no-show");
		     $(parent_id).addClass("headerRow");
		     $(parent_id+"_children li").addClass("no-show");
		     $(child_id).addClass("currentRow");
		}

	    $( window ).on("orientationchange resize", function(){
	        heightEqualizer();
	    });
	
	    $("#nav-button").on("click", function(event) {
	        event.preventDefault();
	        navToggle();
	    });
	
	    $("#content-overlay").on("touchmove click", function(){
	        if($("body").hasClass("nav-toggle")) {
	            navToggle();
	        }
	        return false;
	    });
	
		function toggleChildren (id_selector) {
		    $(id_selector).addClass("currentRow");
		    $(id_selector+"_children").slideDown("slow");
		    $(".firstlevel").addClass("no-show");
		}
	
		//SHOW LOYALLIST SUB-MENU
	    $("#loyallist").on("click", function() {
	        $("#viewpoints").removeClass("currentRow no-show");
	        $("#enroll").removeClass("currentRow no-show");
	        toggleChildren("#loyallist");
	    });
	
		//SHOW REGISTRY SUB-MENU
	    $("#registry").on("click", function() {
	        $("#find").removeClass("currentRow no-show");
	        $("#manage").removeClass("currentRow no-show");
	        $("#create").removeClass("currentRow no-show");
	        toggleChildren("#registry");
	    });
	
	    $("#top").on("click", function() {
	        $(".children_wrapper").slideUp(0);
	        $(".firstlevel").removeClass("no-show");
	        $("#nav-menu li").removeClass("currentRow");
	        $("#nav-menu li:not(#top)").removeClass("headerRow");
	        $("#top").addClass("currentRow");
	    });
	
		//HIDE NAVIGATION WHEN SEARCHING
	    $("#mvSearchField").on("click", function(){
	        if($("body").hasClass("nav-toggle")) {
	            navToggle();
	        }
	    });

	    //SHOW CLEAR SEARCH BUTTON
	    $("#mvSearchField").on("keyup", function(){
	        if($(".clearSearchBoxIcon").hasClass("hide")) {
	            $('.clearSearchBoxIcon').toggleClass('hide');
	        }
	    });
	    $(".clearSearchBoxIcon").on("click", function(){
	    	$('#mvSearchField').val('');
	        $(this).toggleClass('hide');
	    });    
	};

	BLOOMIES.BBBappBtn = function() {
		// show/hide the DOWNLOAD THE BIG BROWN BAG APP footer btn based on the mobile OS detection
		var iOSbtn = $('#footer-app-ios'),
			Androidbtn = $('#footer-app-android');

		if ( BLOOMIES.mobileOS === 'iOS' ){
			Androidbtn.addClass('hidden');
			iOSbtn.removeClass('hidden');
		} else if ( BLOOMIES.mobileOS === 'Android' ){
			iOSbtn.addClass('hidden');
			Androidbtn.removeClass('hidden');	
		} else {
			iOSbtn.addClass('hidden');
			Androidbtn.addClass('hidden');
		}
	};
	
	var initMobile = function(){
    	BLOOMIES.initMobileNav();
    	$('#brownBagItemsTotal').html(thisUser.getCartItemTotal());
	};
	return initMobile;
	
});
