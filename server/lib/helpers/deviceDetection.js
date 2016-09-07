'use strict';

var device = {};

device.detectDevice = function(req) {
    var UA = req.headers['user-agent'],
        deviceType,
        akamaiHeader = req.headers['x-bloomingdales-device'];

    if( typeof akamaiHeader !== undefined && akamaiHeader ) {
        deviceType = akamaiHeader.toLowerCase();
        deviceType = deviceType === 'phone' ? 'mobile' : deviceType;
    }
    else {
        if (/iPhone/i.test(UA)) {
            deviceType = 'mobile.iOS';
        } else if (/iPad/i.test(UA)) {
            deviceType = 'tablet';
        } else if (/Android/i.test(UA)) {
            if (/Mobile/i.test(UA)) {
                deviceType = 'mobile.Android';
            } else {
                deviceType = 'tablet';
            }
        } else {
            deviceType = 'desktop';
        }
    }

    return deviceType;
};

module.exports = device;
