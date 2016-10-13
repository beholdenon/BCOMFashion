'use strict';

var deviceDetectParams = function (requestPath, req) {
    var device = require('./../helpers/deviceDetection'),
        deviceType = device.detectDevice(req),
        serverDate = new Date(),
        view,
        args = {
            isMobile: false,
            isMobileAndroid: false,
            isMobileiOS: false,
            isTablet: false,
            serverYear: serverDate.getFullYear()
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
        if (deviceType === 'tablet') {
            args.isTablet = true;
        }
        
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
            var requestPath = (req.url.pathname).substring(1),
                deviceDetectProc = deviceDetectParams(requestPath, req),
                responsiveCustomHFView = requestPath + '/index';

            responsiveCustomHFView = responsiveCustomHFView.replace('//', '/');
            return res.view(deviceDetectProc.view, { args: deviceDetectProc.args, assetsHost: process.env.BASE_ASSETS }, { layout: 'responsive' });
        }
    },
    responsiveCustomHF: {
        description: 'Responsive custom Header&Footer layout',
        notes: 'Serve single html view for desktop and mobile; exclude standard H&F',
        tags: ['custom header & footer', 'static'],
        handler: function(req, res) {
            var requestPath = (req.url.pathname).substring(1),
                responsiveCustomHFView = requestPath + '/index';

            responsiveCustomHFView = responsiveCustomHFView.replace('//', '/');
            return res.view(responsiveCustomHFView, { assetsHost: process.env.BASE_ASSETS }, { layout: 'responsiveCustomHF' });
        }
    },
    nonResponsiveCustomHF: {
        description: 'Non-responsive layout',
        notes: 'Server side mobile detection layout, with custom header & footer',
        tags: ['non-responsive','custom header & footer'],
        handler: function(req, res) {
            var requestPath = (req.url.pathname).substring(1),
                deviceDetectProc = deviceDetectParams(requestPath, req);

            return res.view(deviceDetectProc.view, { args: deviceDetectProc.args }, { layout: 'nonresponsiveCustomHF'});           
        }
    },
    fallback: {
        description: 'Serve non-responsive standard layout',
        notes: 'This is the default fallback route if not explicitly captured',
        tags: ['fallback', 'static'],
        handler: function(req, res) {

            var requestPath;

            // Check for path with deeplinks param. Deep link
            // param will be dropped and handled on client. Otherwise,
            // proceed as usual.
            if (/\{deeplinks\?}/.test(req.route.path)){
                requestPath = req.route.path.substring(1).replace(/{.*?}/,'');
            } else {
                requestPath = req.params.path;//  || req.path;
            }

            if (requestPath === '' || requestPath === undefined) {
                // if route not captured, redirect to the main site
                return res.redirect('http://www.bloomingdales.com');
            }
            // get rid of trailing spaces, add a trailing slash if missing, then redirect
            if (requestPath.indexOf('#') < 0 && requestPath.indexOf('?') < 0 && requestPath.indexOf('.') < 0 && ! /\/$/.test(requestPath)) {
                requestPath = requestPath.replace(/\/?\s?$/, '/');
                var url = '/' + requestPath;
                return res.redirect(url);
            }
            var deviceDetectProc = deviceDetectParams(requestPath, req);
            return res.view(deviceDetectProc.view, { args: deviceDetectProc.args, assetsHost: process.env.BASE_ASSETS });
        }
    }
};