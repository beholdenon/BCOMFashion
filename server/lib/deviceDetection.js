'use strict';

var device = {};
// Check if the user-agent is MOBILE or PC/Tablet
device.detectDevice = function(req) {
    var ua = req.headers['user-agent'];
    if( /iPhone/i.test(ua) ) {
	  return true;
	} else if (/Android/i.test(ua)){
		if(/Mobile/i.test(ua)) {
			return true;
		}
		else {
			return false;
		}
	} else  {
		return false;
	}
};

module.exports = device;
