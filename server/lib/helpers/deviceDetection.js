'use strict';

var device = {};

device.detectDevice = function(req) {

    var UA = req.headers['user-agent'],
        deviceType = 'desktop',
        akamaiHeader = req.headers['x-bloomingdales-device'];
    if( typeof akamaiHeader !== undefined && akamaiHeader ) {
        deviceType = akamaiHeader.toLowerCase();
        deviceType = deviceType === 'phone' ? 'mobile' : deviceType;
    } else {
        // In case Akamai services are unavailable, rely on User Agent detection
        if (/iPhone/i.test(UA)) {
             deviceType = 'mobile';
         } else if (/iPad/i.test(UA)) {
             deviceType = 'tablet';
         } else if ((/Android/i.test(UA)) && (/Mobile/i.test(UA))) {
             deviceType = 'mobile';
         } else if (/Android/i.test(UA)) {
             deviceType = 'tablet';
         }
    }

    return deviceType;
};

module.exports = device;