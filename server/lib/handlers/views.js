'use strict';

var deviceDetectParams = function (requestPath, req) {
    var device = require('./../helpers/deviceDetection'),
        deviceType = device.detectDevice(req),
        view,
        args = {
            isMobile: false,
            isMobileAndroid: false,
            isMobileiOS: false,
            isTablet: false
        };

    if (deviceType.indexOf('mobile') > -1) {
        view = requestPath + 'index-mobile';
        args.isMobile = true;

        if (deviceType.indexOf('Android') > -1) {
            args.isMobileAndroid = true;
        } else if (deviceType.indexOf('iOS') > -1) {
            args.isMobileiOS = true;
        }
    } else {
        if (deviceType === 'tablet') args.isTablet = true;
        
        view = requestPath + 'index';
    }

    return {view: view, args: args};
};

module.exports = {
    responsive: {
        description: 'Responsive layout',
        notes: 'Serve one code base for any device type',
        tags: ['responsive'],
        handler: function(req, res) {
            var requestPath = (req.url.path).substring(1),
                responsiveCustomHFView = requestPath + 'index';

            return res.view(responsiveCustomHFView, null, { layout: 'responsive' });
        }
    },

    responsiveCustomHF: {
        description: 'Responsive custom Header&Footer layout',
        notes: 'Serve single html view for desktop and mobile; exclude standard H&F',
        tags: ['custom header & footer', 'static'],
        handler: function(req, res) {
            var requestPath = (req.url.path).substring(1),
                responsiveCustomHFView = requestPath + 'index';

            return res.view(responsiveCustomHFView, null, { layout: 'responsiveCustomHF' });
        }
    },

    nonResponsiveCustomHF: {
        description: 'Non-responsive layout',
        notes: 'Server side mobile detection layout, with custom header & footer',
        tags: ['non-responsive','custom header & footer'],
        handler: function(req, res) {
            var requestPath = (req.url.path).substring(1),
                deviceDetectProc = deviceDetectParams(requestPath, req);

            return res.view(deviceDetectProc.view, { args: deviceDetectProc.args }, { layout: 'nonresponsiveCustomHF'});           
        }
    },   

    fallback: {
        description: 'Serve non-responsive stadard layout',
        notes: 'This is the default fallback route if not explicitly captured',
        tags: ['fallback', 'static'],
        handler: function(req, res) {
            var requestPath = req.params.path,
                deviceDetectProc = deviceDetectParams(requestPath, req);

            if (requestPath !== '' && requestPath !== undefined) {
                //render standard view
                return res.view(deviceDetectProc.view, { args: deviceDetectProc.args });
            } else {
                // if route not captured, redirect to the main site
                return res.redirect('http://www.bloomingdales.com');
            }
        }
    }
};
