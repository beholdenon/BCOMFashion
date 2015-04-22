define([
  'backbone',
  'jquery',
  'underscore'
], function(Backbone, $, _) {
	
	function toggleChildren (id_selector) {
	    $(id_selector).addClass("currentRow");
	    $(id_selector+"_children").slideDown("slow");
	    $(".firstlevel").addClass("no-show");
	}
	  
	function highlightChild(parent_id, child_id) {
	     $(parent_id).removeClass("currentRow no-show");
	     $(parent_id).addClass("headerRow");
	     $(parent_id+"_children li").addClass("no-show");
	     $(child_id).addClass("currentRow");
	}
	  
	BLOOMIES.initMobileNav = function() {
	    // Add the height on some divs on the page to support the proper scrolling
	    var heightEqualizer = function(){
	        var pageHeight = window.innerHeight;
	        var regionMainHeight = pageHeight - $('#mb-region-header').outerHeight();
	        $('#bl_main_container').css("min-height", regionMainHeight);
	        if( $("body").hasClass("nav-toggle")) {
	            $('#mb-page-wrapper').css("height", pageHeight);
	            $('#bl_main_container').css("height", regionMainHeight);
	        } else {
	            $('#mb-page-wrapper').css("height", "");
	            $('#bl_main_container').css("height", "");
	        }
	    };
	
	    // Show/Hide the global navigation menu
	    var navToggle = function(){
	        $("body").toggleClass("nav-toggle");
	        heightEqualizer();
	    };
	
	    $( window ).on("orientationchange resize", function(){
	        heightEqualizer();
	    });
	
	    $("#mw-nav-button").on("click", function(event) {
	        event.preventDefault();
	        navToggle();
	    });
	
	    $("#mw-content-overlay").on("touchmove click", function(){
	        if($("body").hasClass("nav-toggle")) {
	            navToggle();
	        }
	        return false;
	    });
	
	        
	    if (window.location.pathname.match("(\/account\/)|(\/service\/)|(\/credit\/)") !=  null) {
	        if(window.location.pathname.match("/account/wallet") !=  null){
	            $(".firstlevel").addClass("no-show");
	            $("#mybWallet").addClass("currentRow");  
	        }
	        else {
	            $(".firstlevel").addClass("no-show");
	            $("#myAccount").addClass("currentRow");   
	        }
	    }
	
	    if(window.location.pathname.match("loyallist") !=  null || 
	        window.location.pathname.match("loyalty_program") !=  null) {
	        var signedIn = getCookie("SignedIn");
	        toggleChildren("#loyallist");
	        // While signed the following pages will have viewpoints highlighted
	        if(window.location.pathname.match("(loyallist\/offers)|(loyallist\/faq)|(loyallist\/rewardcards)|(loyallist\/benefits)") !=  null && signedIn == 1) {
	            $("#myAccount").removeClass("currentRow");
	            highlightChild("#loyallist", "#viewpoints");
	        }
	        else {
	            // While unsigned all pages will have enroll highlighted except the following
	            if(window.location.pathname.match("loyallist/accountsummary") !=  null) {
	                highlightChild("#loyallist", "#viewpoints");
	        }
	            else{
	                highlightChild("#loyallist", "#enroll");
	            }
	        }
	    }
	
	    if(window.location.pathname.match("/store") !=  null) {
	        $(".firstlevel").addClass("no-show");
	        $("#stores").addClass("currentRow");
	    }
	
	    if(window.location.pathname.match("shop/sales-offers") !=  null) {
	        $(".firstlevel").addClass("no-show");
	        $("#deals").addClass("currentRow");
	    }
	
	    if(window.location.pathname.match("registry") !=  null) {
	        toggleChildren("#registry");
	        if(window.location.pathname.match("(registry\/wedding\/registrysearch)|(registry\/wedding\/guest)") !=  null) {
	            highlightChild("#registry", "#find");
	        }
	        if(window.location.pathname.match("(registry\/wedding\/registrymanager)|(registry\/wedding\/registrysignin)|(registry\/wedding\/registrant)|(registry\/wedding\/registryeditaccount)") !=  null) {
	            highlightChild("#registry", "#manage");
	        }
	        if(window.location.pathname.match("(registry\/wedding\/registrycaptureemail)|(registry\/wedding\/registrycreateaccount)") !=  null) {
	            highlightChild("#registry", "#create");
	        }
	    }
	
	    if (window.location.pathname.match("account/signin") !=  null) {
	        var forward_page = $.cookie("FORWARDPAGE_KEY");
	
	        if (forward_page.match("%2Floyallist%2Faccountsummary")) {
	            toggleChildren("#loyallist");
	            $("#myAccount").removeClass("currentRow");
	            highlightChild("#loyallist", "#viewpoints");
	        }
	        if (forward_page.match("%2Faccount%2Fwallet")) {
	            $("#myAccount").removeClass("currentRow");
	            $("#mybWallet").addClass("currentRow");
	        }
	        if (forward_page.match("%2Faccount%2Fmyaccount") || 
	            forward_page.match("http")) {
	            $(".firstlevel").addClass("no-show");
	            $("#myAccount").addClass("currentRow");
	        }
	    }
	
	    $("#loyallist").on("click", function() {
	        $("#viewpoints").removeClass("currentRow no-show");
	        $("#enroll").removeClass("currentRow no-show");
	        toggleChildren("#loyallist");
	    });
	
	    $("#registry").on("click", function() {
	        $("#find").removeClass("currentRow no-show");
	        $("#manage").removeClass("currentRow no-show");
	        $("#create").removeClass("currentRow no-show");
	        toggleChildren("#registry");
	    });
	
	    $("#top").on("click", function() {
	        $(".children_wrapper").slideUp(0);
	        $(".firstlevel").removeClass("no-show");
	        $("#mw-nav-menu li").removeClass("currentRow");
	        $("#mw-nav-menu li:not(#top)").removeClass("headerRow");
	    });
	
	    $("#mvSearchField").bind("click", function(){
	        if($("body").hasClass("nav-toggle")) {
	            navToggle();
	        }
	    });
		
		var placeholder = $(".aboveNavSearch .aboveNavSearchInput input").attr('placeholder');
	    $('#aboveNav .headerTablet > a:nth-child(1)').on("click", function() {
	    	$('#aboveNavBanner').hide();
	    	$('.headerTablet').removeClass('show-for-medium').hide();
	    	$('.aboveNavSearch').removeClass('show-for-large-up').show();

	    	$('.aboveNavSearch .aboveNavSearchInput input').focus();
		    if ($('.aboveNavSearch .aboveNavSearchInput input').val() == '') {
		        $('.aboveNavSearch .aboveNavSearchInput input').val(placeholder);
		    }
	    });
		$('.aboveNavSearch .aboveNavSearchInput input').on('keypress', function() {
		    if ($(this).val() == placeholder) {
		        $(this).val('');
		    }
		});
		$('.aboveNavSearch .aboveNavSearchInput input').on('blur', function() {
	    	event.preventDefault();
	    	$('#aboveNavBanner').show();
	    	$('.headerTablet').addClass('show-for-medium').show();
	    	$('.aboveNavSearch').addClass('show-for-large-up').hide();
	    	$('.aboveNavSearch .aboveNavSearchInput input').val('');
		});
	};
	
	var initMobile = function(){
    	BLOOMIES.initMobileNav();
    	$('#brownBagItemsTotal').html(thisUser.getCartItemTotal());
	};
	return initMobile;
	
});
