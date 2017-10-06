define([
  '_multiValueCookie'
], function (mvCookie) {
  'use strict';

  var MAX_INACTIVE_INTERVAL = 30;
  var cookieUtil = {
    
    getUserName: function () {
      return mvCookie.get('UserName', 'GCs');
    },
    isSignedInUser: function () {
      return mvCookie.get('SignedIn') === '1';
    },
    isSoftSignedInUser: function () {
      var lastAccess = mvCookie.get('last_access_token', 'SNSGCs');
      return this.getUserName() &&
          (!this.isSignedInUser() || (lastAccess && (new Date().getTime() - parseInt(lastAccess, 10)) / 60000 > MAX_INACTIVE_INTERVAL));
    },
    
  };

  return cookieUtil;
});
