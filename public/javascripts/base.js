
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
				'          <form id="keywordSearch" method="get" action="/shop/search">'+
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

$(document).ready(function(){
	if(BLOOMIES.isMEW) {
		BLOOMIES.doMobileHeader();
    	BLOOMIES.doMobileFooter();
	}
})();

