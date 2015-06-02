'use strict';

var device = {};
device.detectDevice = function(req) {
    var UA = req.headers['user-agent'],
    	deviceType;

    if( /iPhone/i.test(UA) ) {
		deviceType = 'mobile';
	} else if (  /iPad/i.test(UA) ){
		deviceType = 'tablet';
	} else if (/Android/i.test(UA)){
		if(/Mobile/i.test(UA)) {
			deviceType = 'mobile';
		}
		else {
			deviceType = 'tablet';
		}
	} else {
		deviceType = 'desktop'
	}

	return deviceType;
};

module.exports = device;
