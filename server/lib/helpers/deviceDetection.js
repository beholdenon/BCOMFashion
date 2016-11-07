'use strict';

var device = {};

device.detectDevice = function(req) {

    var UA = req.headers['user-agent'],
        deviceType,
        akamaiHeader = req.headers['x-bloomingdales-device'];

    if( typeof akamaiHeader !== undefined && akamaiHeader ) {
        deviceType = akamaiHeader.toLowerCase();
        deviceType = deviceType === 'phone' ? 'mobile' : deviceType;
    } else {
        // In case Akamai services are unavailable, rely on User Agent detection
        if( /Mobi/i.test(UA) ) {
            deviceType = 'mobile'; 
        } else {
            deviceType = 'desktop'; 
        }
    }

    return deviceType;
};

module.exports = device;
