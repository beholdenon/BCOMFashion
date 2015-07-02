/* jshint ignore:start */

'use strict';

/**
 * BLOOMIES global namespace object. Only create if it doesn't already exist. 
 * This governs the Singleton nature of this base object.
 * @static
 */

if (typeof BLOOMIES === 'undefined' || !BLOOMIES) {
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
            d=a[i].split('.');
            o=BLOOMIES;

            // BLOOMIES is implied, so it is ignored if it is included
            for (j=(d[0] === 'BLOOMIES') ? 1 : 0; j<d.length; j=j+1) {
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
        key,
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

    for (key in htmlEntityAllowedChars) {
        if (htmlEntityAllowedChars.hasOwnProperty(key)) {
            // Using RegExp to take advantage of the gmi flags.
            // Wrapped on [] to not break on the + char that is unescaped and is a
            // special char on regexps            
            cleanedQuery = cleanedQuery.replace( new RegExp( '[' + key + ']', 'gmi' ), htmlEntityAllowedChars[key] );
        }
    }    
    
    return cleanedQuery;
};

BLOOMIES.isMobile = (function() {
	if( /iPhone/i.test(navigator.userAgent) ) {
	  return true;
	} else if (/Android/i.test(navigator.userAgent)){
		if(/Mobile/i.test(navigator.userAgent)) {
			return true;
		}
		else {
			return false;
		}
	}
	return false;
})();

/* jshint ignore:end */
