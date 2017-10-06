define([
  'underscore',
  'cookie'
], function (_, Cookie) {
  'use strict';
  
  var tokens = {
    SEPARATOR: '3_87_', /* '&' */
    EQUAL:     '1_92_', /* '=' */
    EMPTY:     '4_02_'  /* '' */
  };

  var cookieUtil = {
    get: function (cookieName, multiValueCookieName) {
      // If asking for a simple cookie - return the value
      if (_.isUndefined(multiValueCookieName)) {
        var value = Cookie.get(cookieName);
        return value ? value : (undefined);
      } else {
        // If asking to get a subcookie of multi-value cookie
        // get that multi-value cookie first
        var mvcValue = Cookie.get(multiValueCookieName);
        if (!mvcValue || mvcValue.indexOf(cookieName) === -1) {
          return undefined;
        }

        // Now extract the value of subcookie.
        var mvcSubs = mvcValue.split(tokens.SEPARATOR);
        // Find the one that has the name specified as a parameter
        for (var i = 0, len = mvcSubs.length; i < len; i++) {
          var keyValue = mvcSubs[i].split(tokens.EQUAL);
          if (keyValue[0] === cookieName) {
            return keyValue[1] === tokens.EMPTY ? '' : keyValue[1];
          }
        }
      }
      return undefined;
    }

  };

  return cookieUtil;
});
