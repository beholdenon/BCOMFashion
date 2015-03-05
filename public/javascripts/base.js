
/**
 * BLOOMIES global namespace object. Only create if it doesn't already exist.
 * This governs the Singleton nature of this base object.
 * @static
 */

if (typeof BLOOMIES === "undefined" || !BLOOMIES) {
    var BLOOMIES = {};
}

if(!BLOOMIES.namespace){
    /** Adapted namespacing code from core YUI YAHOO Singleton. Provides for
     * namespacing with BLOOMIES as the root package.
     *
     * @method namespace
     * @param  {String*} arguments 1-n namespaces to create
     * @return {Object}  A reference to the last namespace object created
     * @static
     */
    BLOOMIES.namespace = function() {
        var a=arguments, o=null, i, j, d;
        for (i=0; i<a.length; i=i+1) {
            d=a[i].split(".");
            o=BLOOMIES;

            // BLOOMIES is implied, so it is ignored if it is included
            for (j=(d[0] == "BLOOMIES") ? 1 : 0; j<d.length; j=j+1) {
                o[d[j]]=o[d[j]] || {};
                o=o[d[j]];
            }
        }
        return o;
    };
    
}   

BLOOMIES.cleanXSSCharacters = function(text) {
	if(!text) {
		return text;
	}

	var cleanedQuery,
		htmlEntityAllowedChars = {
			'"': "&#34;", // or &quot;
			"'": "&#39;",
			"/": "&#47;", // or &frasl;
			"<": "&lt;",
			">": "&gt"
		};

	// Get query param and replace all & first to avoid the HTML escapes getting
	// replaced incorrectly later on
	cleanedQuery = text.replace( /&/gmi, "&#38;" );
	$.each( htmlEntityAllowedChars, function ( key, value ) {
		// Using RegExp to take advantage of the gmi flags.
		// Wrapped on [] to not break on the + char that is unescaped and is a
		// special char on regexps
		cleanedQuery = cleanedQuery.replace( new RegExp( '[' + key + ']', 'gmi' ), value );
	} );
	
	return cleanedQuery;
};

BLOOMIES.isMEW = (function() {
	if( /Android|iPhone/i.test(navigator.userAgent) ) {
	  return true;
	}
	return false;
})();

BLOOMIES.doMobileHeader = function() {
	var myvar = '<section id="mw-region-header"><header id="mw-header-container"><div id="mw-nav-button"><i id="mw-nav-button-icon" class="icon-menuButton"></i></div>'+
				'<div id="mw-bag-status">'+
				'      <div id="myBagLink" class=" mw_myBagLink to_be_sprited-t_bag">'+
				'        <a href="http://m.bloomingdales.com/bag/index.ognc" id="qb_addToBagOverlayLabel" class="qb_closedOverlayLabel">'+
				'          <span id="brownBagItemsTotal">'+
				'            </span>'+
				'        </a>'+
				'      </div>'+
				'    </div>'+
				'    <div class="mvHiddenInRegistry" id="bl_nav_top_logo">'+
				'      <a href="/?cm_sp=NAVIGATION-_-TOP_NAV-_-TOP_BLOOMIES_ICON"><img src="//assets.moovweb.net/bloomingdales/bcom-origin-prod/v30/images/bloomingdales.png" id="mw-header-logo-image">'+
				'      </a>'+
				'    </div>'+
				'    <div id="r_nav_top_logo" class="mvHiddenInSite">'+
				'      <a href="#" class="to_be_sprited-registryHeader">'+
				'      </a>'+
				'    </div>'+
				'  </header></section>'+
				'  <section id="mw-search-wrapper"><div class="mvHeaderWrapper">'+
				'    <div class="mvBDHeader">'+
				'      <div class="bl_nav_top_sub_search">'+
				'        <div id="mvBDSearchFormToggle">'+
				'          <form id="keywordSearch" method="get" action="http://m.bloomingdales.com/shop/search">'+
				'            <div class="bl_nav_top_sub_search_input">'+
				'              <div class="bl_nav_top_sub_search_go">'+
				'                <span class="mw_go_icon to_be_sprited-t_glass"></span>'+
				'                <input class="bl_nav_top_sub_search_go" type="submit" alt="Search Now" value=" " name="KEYWORD_GO_BUTTON">'+
				'  </div>'+
				'              <input type="hidden" value="*" name="SearchTarget"><input class="aboveNavSearchBox  ui-autocomplete-input" type="text" maxlength="72" name="Keyword" value="" title="Keyword Search" id="mvSearchField" placeholder="Search" autocapitalize="off" autocorrect="off" autocomplete="off"><span class="clearSearchBoxIcon hide"></span>'+
				'              <input type="hidden" value="mobile" name="channel"><input type="hidden" value="20" name="ppp">'+
				'  </div>'+
				'            <div class="clearLeft">'+
				'            </div>'+
				'          </form>'+
				'        </div>'+
				'      </div>'+
				'    </div>'+
				'</div></section>';

 	$("header").html(myvar);
};

BLOOMIES.doMobileFooter = function() {
	
	var myvar = '<div class="footer-container">'+
				'	<div id="footer-links">'+
				'		<span id="footer-sign-in" class="footer-sign-link">'+
				'			<a href="http://www.bloomingdales.com/account/myaccount?cm_sp=NAVIGATION--TOP_NAV--MY_ACCOUNT">Sign In</a>'+
				'		</span>'+
				'		<span id="footer-sign-out" class="footer-sign-link displayNone">'+
				'			<a href="http://www.bloomingdales.com/signin/signout.ognc">Sign Out</a>'+
				'		</span>'+
				'		<span id="footer-sign-up" class="footer-sign-link"> '+
				'			<a href="http://www.bloomingdales.com/signup">Sign up for emails & texts</a>'+
				'		</span>'+
				'		<div class="clearboth"></div>'+
				'	</div>'+
				''+
				'	<div id="footer-social-links">'+
				'		<span>'+
				'			<a class="footer-icon footer-facebook" href="http://www.facebook.com/Bloomingdales?cm_sp=FOOTER-_-BOTTOM_NAV-_-FACEBOOK"></a>'+
				'		</span>'+
				'		<span>'+
				'			<a class="footer-icon footer-twitter" href="http://mobile.twitter.com/Bloomingdales?cm_sp=FOOTER-_-BOTTOM_NAV-_-TWITTER"></a>'+
				'		</span>'+
				'		<span>'+
				'			<a class="footer-icon footer-pin" href="http://www.pinterest.com/Bloomingdales?cm_sp=FOOTER-_-BOTTOM_NAV-_-PINTEREST"></a>'+
				'		</span>'+
				'		<span>'+
				'			<a class="footer-icon footer-instagram" href="http://instagram.com/bloomingdales#?cm_sp=FOOTER-_-BOTTOM_NAV-_-INSTAGRAM"></a>'+
				'		</span>'+
				'		<span id="app-line">'+
				'			<a id="footer-app-ios" class="footer-icon footer-phone displayNone" href="itms-apps://itunes.apple.com/us/app/bloomingdales-big-brown-bag/id525536985?mt=8">Download the Big Brown Bag App</a>'+
				'			<a id="footer-app-android" class="footer-icon footer-phone " href="https://play.google.com/store/apps/details?id=com.bloomies.android">Download the Big Brown Bag App</a>'+
				'		</span>'+
				'		'+
				'		<div class="clearboth"></div>'+
				'	</div>'+
				''+
				'	<div id="footer-bottom-links">'+
				'		<span class="customer-service">'+
				'			'+
				'			<a href="https://customerservice.bloomingdales.com/app/home/?cm_sp=NAVIGATION-_-BOTTOM_NAV-_-CUSTOMER_SERVICE" data-environment="prod">Customer Service</a>'+
				'		</span>'+
				'		<span class="separator"></span>'+
				'		<span class="fullSite"> '+
				'			<a id="mw_desktop_link" class="desktop_site" href="http://www.fashion.bloomingdales.com/fashion-index/premium-shoes-handbags-spring-collections-2015.jsp?stop_mobi=yes&&cm_sp=NAVIGATION-_-TOP_NAV-_-16961-CATEGORY_ICON_IMAGE-Premium-Designer-Lookbook">Full Site</a>'+
				'		</span>'+
				'		<span class="separator"></span>'+
				'		<span class="country"> '+
				'			<a id="mw_country_link" class="desktop_site" href="http://www1.bloomingdales.com/internationalContext/index.ognc?stop_mobi=yes&cm_sp=NAVIGATION_MEW-_-BOTTOM_LINKS-_-INTERNATIONAL_SHOPPING">Choose Your Country</a>'+
				'		</span>'+
				'		<br><span class="careers">'+
				'			<a href="http://www.bloomingdalesjobs.com">Careers</a> '+
				'		</span>'+
				'		<span class="separator"></span>'+
				'		<span class="privacy-practice">'+
				'			'+
				'			<a href="https://customerservice.bloomingdales.com/app/answers/detail/a_id/769/?cm_sp=NAVIGATION-_-BOTTOM_LINKS-_-PRIVACY_PRACTICES" data-environment="prod">Privacy Practices</a>'+
				'		</span>'+
				'		<span class="separator"></span>'+
				'		<span class="bill">'+
				'			<a href="http://www.macysinc.com/social-responsibility/customer-bill-of-rights/default.aspx">Customers\' Bill of Rights</a>'+
				'		</span>'+
				'	</div>'+
				''+
				'	<div id="footer-copy-right"> '+
				'		© 2015 Bloomingdale\'s, dba bloomingdales.com.'+
				'	</div>'+
				''+
				'</div>';
	
	$("footer").html(myvar);
};

BLOOMIES.doMobileNav = function() {
	var myvar = '<nav id="mw-nav-container"><ul id="mw-nav-menu" class="nav nav-tabs nav-stacked menu" data-animating="false">'+
				'<li id="top" class="headerRow fobtop">'+
				'      <a class="mw-nav-link">'+
				'        Menu'+
				'      </a>'+
				'    </li>'+
				'    <li id="shop" class="fobshop firstlevel">'+
				'      <a class="mw-nav-link" href="http://m.bloomingdales.com/">'+
				'        Shop'+
				'      </a>'+
				'    </li>'+
				'    <li id="deals" class="fobdeals firstlevel">'+
				'      <a class="mw-nav-link" href="http://m.bloomingdales.com/shop/sales-offers?cm_sp=NAVIGATION-_-TOP_NAV-_-3977-SALES-%26-OFFERS-See-All">'+
				'        Promotions'+
				'      </a>'+
				'    </li>'+
				'    <li id="stores" class="fobstores firstlevel">'+
				'      <a class="mw-nav-link" href="http://m.bloomingdales.com/store/index.ognc?cm_sp=NAVIGATION--TOP_NAV--STORES_EVENTS">'+
				'        Stores'+
				'      </a>'+
				'    </li>'+
				'    <li id="myAccount" class="fobmyAccount firstlevel">'+
				'      <a class="mw-nav-link" href="https://m.bloomingdales.com/account/myaccount?cm_sp=navigation--top_nav--account">'+
				'        My Account'+
				'      </a>'+
				'    </li>'+
				'    <li id="mybWallet" class="fobmybWallet firstlevel">'+
				'      <a class="mw-nav-link" href="https://m.bloomingdales.com/account/wallet?ocwallet=true&cm_sp=NAVIGATION_MEW--SIDE_NAV--MY_WALLET-n-n">'+
				'        MY bWALLET'+
				'      </a>'+
				'    </li>'+
				'    <li id="loyallist" class=" fobloyallist firstlevel">'+
				'      <a class="mw-nav-link">'+
				'        My Loyallist'+
				'      </a>'+
				'    </li>'+
				'    <ul id="loyallist_children" class="no-show children_wrapper">'+
				'<li id="viewpoints" class="fobloyallist children">'+
				'        <a class="mw-nav-link" href="https://m.bloomingdales.com/loyallist/accountsummary">'+
				'          View My Points'+
				'        </a>'+
				'      </li>'+
				'      <li id="enroll" class="fobloyallist children">'+
				'        <a class="mw-nav-link" href="https://m.bloomingdales.com/loyallist">'+
				'          Enroll'+
				'        </a>'+
				'      </li>'+
				'    </ul>'+
				'<li id="registry" class="fobregistry firstlevel">'+
				'      <a class="mw-nav-link">'+
				'        The Registry'+
				'      </a>'+
				'    </li>'+
				'    <ul id="registry_children" class="no-show children_wrapper">'+
				'<li id="find" class="fobregistry children">'+
				'        <a class="mw-nav-link" href="http://m.bloomingdales.com/registry/wedding/registrysearch?cm_re=give--n--n">'+
				'          Find'+
				'        </a>'+
				'      </li>'+
				'      <li id="manage" class="fobregistry children">'+
				'        <a class="mw-nav-link" href="http://m.bloomingdales.com/registry/wedding/registrymanager">'+
				'          Manage'+
				'        </a>'+
				'      </li>'+
				'      <li id="create" class="fobregistry children">'+
				'        <a class="mw-nav-link" href="http://m.bloomingdales.com/registry/wedding/registrycaptureemail?cm_re=register--n--n">'+
				'          Create'+
				'        </a>'+
				'      </li>'+
				'    </ul>'+
				'</ul></nav>';
				
	$("#bl_main_container").prepend(myvar);
};

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
  
BLOOMIES.MobileNav = function() {
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

    $(".row.layout-mobile").on("touchmove click", function(){
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
};

$(document).ready(function(){
	if(BLOOMIES.isMEW) {
		BLOOMIES.doMobileHeader();
    	BLOOMIES.doMobileFooter();
    	BLOOMIES.doMobileNav();
    	BLOOMIES.MobileNav();
    	$('#brownBagItemsTotal').html(thisUser.getCartItemTotal());
	}
});

