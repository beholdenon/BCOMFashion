'use strict';

var fs = require('fs'),
    path = require('path'),
    headMetaRegEx = /<!--headMeta=(.*)-->/,
    headTitleRegEx = /<!--headTitle=(.*)-->/,
    headCanonicalRegEx=/<!--headCanonical=(.*)-->/;

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
            serverYear: serverDate.getFullYear(),
            headTitle: '',
            headMeta: '',
            headCanonical: ''
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

// Reads the file passed in and checks if any of the head* helpers are used
// Use of a head* helper is done using HTML comments <!-- -->
var detectHeadHelpers = function(file, args) {
    var contents,
        lines;
    try {
        // If the file doesn't exist, readFileSync will throw an error
        contents = fs.readFileSync(file, 'utf8');
        lines = contents.split("\n");
                
        // Read only first 20 lines of file
        for (var i = 0; i < 20; i++) {
            var headMetaMatches = headMetaRegEx.exec(lines[i]),
                headTitleMatches = headTitleRegEx.exec(lines[i]),
                headCanonicalMatches = headCanonicalRegEx.exec(lines[i]);
                
            if (headMetaMatches) {
                args.headMeta = JSON.parse(headMetaMatches[1]);
            }
            if (headTitleMatches) {
                args.headTitle = JSON.parse(headTitleMatches[1]);
            }
            if (headCanonicalMatches) {
                args.headCanonical = JSON.parse(headCanonicalMatches[1]);
            }            
        }
        
        if ( (args.headTitle && typeof(args.headTitle) !== "object") || 
            (args.headMeta && typeof(args.headMeta) !== "object") || 
            (args.headCanonical && typeof(args.headCanonical) !== "object") ) {
                console.log("Error using head* helper in " + file);
                console.log("Argument must be an object");
        }
        
    } catch (e) {
        console.log("Error reading file name " + file + " in detectHeadHelpers function");
        console.log(e.message);
    }
    
    return args;
};

module.exports = { 
    responsive: {
        description: 'Responsive layout',
        notes: 'Serve one code base for any device type',
        tags: ['responsive'],
        handler: function(req, res) {
            var requestPath = (req.url.pathname).substring(1),
                deviceDetectProc = deviceDetectParams(requestPath, req),
                responsiveCustomHFView = requestPath + '/index',
                slashMinSuffix = ( req.query.debug === '1' ? '' : '/min' ),
                fileToRead,
                dir,
                file;

            responsiveCustomHFView = responsiveCustomHFView.replace('//', '/');
            
            fileToRead = deviceDetectProc.view + ".html";
            dir = path.join(__dirname, '..', 'views');
            file = dir + '/' + fileToRead;

            // Check if any head* helpers are used
            // Use of a head* helper is done using HTML comments <!-- headHelper= -->
            // If so, add them to deviceDetectProc.args
            deviceDetectProc.args = detectHeadHelpers(file, deviceDetectProc.args);
            
            return res.view(deviceDetectProc.view, { args: deviceDetectProc.args, assetsHost: process.env.BASE_ASSETS, slashMinSuffix: slashMinSuffix }, { layout: 'responsive' });
        }
    },
    nonResponsive: {
        description: 'Non-responsive layout',
        notes: 'Server side mobile detection layout',
        tags: ['non-responsive'],
        handler: function(req, res) {
            var requestPath = (req.url.pathname).substring(1),
                deviceDetectProc = deviceDetectParams(requestPath, req),
                slashMinSuffix = ( req.query.debug === '1' ? '' : '/min' ),
                fileToRead,
                dir,
                file;

            fileToRead = deviceDetectProc.view + ".html";
            
            dir = path.join(__dirname, '..', 'views');
            file = dir + '/' + fileToRead;
            
            // Check if any head* helpers are used
            // Use of a head* helper is done using HTML comments <!-- headHelper= -->
            // If so, add them to deviceDetectProc.args
            deviceDetectProc.args = detectHeadHelpers(file, deviceDetectProc.args);                

            return res.view(deviceDetectProc.view, { args: deviceDetectProc.args, assetsHost: process.env.BASE_ASSETS, slashMinSuffix: slashMinSuffix });
        }
    },
    responsiveCustomHF: {
        description: 'Responsive custom Header&Footer layout',
        notes: 'Serve single html view for desktop and mobile; exclude standard H&F',
        tags: ['custom header & footer', 'static'],
        handler: function(req, res) {
            var requestPath = (req.url.pathname).substring(1),
                responsiveCustomHFView = requestPath + '/index',
                slashMinSuffix = ( req.query.debug === '1' ? '' : '/min' ),
                dir,
                file,
                args = {};
            
            responsiveCustomHFView = responsiveCustomHFView.replace('//', '/');
            
            dir = path.join(__dirname, '..', 'views');
            file = dir + '/' + responsiveCustomHFView + '.html';
                        
            // Check if any head* helpers are used
            // Use of a head* helper is done using HTML comments <!-- headHelper= -->
            // If so, add them to deviceDetectProc.args
            args = detectHeadHelpers(file, args);

            return res.view(responsiveCustomHFView, { assetsHost: process.env.BASE_ASSETS, slashMinSuffix: slashMinSuffix }, { layout: 'responsiveCustomHF' });
        }
    },
    nonResponsiveCustomHF: {
        description: 'Non-responsive layout',
        notes: 'Server side mobile detection layout, with custom header & footer',
        tags: ['non-responsive','custom header & footer'],
        handler: function(req, res) {
            var requestPath = (req.url.pathname).substring(1),
                deviceDetectProc = deviceDetectParams(requestPath, req),
                slashMinSuffix = ( req.query.debug === '1' ? '' : '/min' ),
                fileToRead,
                dir,
                file;

            fileToRead = deviceDetectProc.view + ".html";
            dir = path.join(__dirname, '..', 'views');
            file = dir + '/' + fileToRead;

            // Check if any head* helpers are used
            // Use of a head* helper is done using HTML comments <!-- headHelper= -->
            // If so, add them to deviceDetectProc.args
            deviceDetectProc.args = detectHeadHelpers(file, deviceDetectProc.args);                

            return res.view(deviceDetectProc.view, { args: deviceDetectProc.args, assetsHost: process.env.BASE_ASSETS, slashMinSuffix: slashMinSuffix }, { layout: 'nonresponsiveCustomHF'});           
        }
    },
    fallback: {
        description: 'Serve non-responsive standard layout',
        notes: 'This is the default fallback route if not explicitly captured',
        tags: ['fallback', 'static'],
        handler: function(req, res) {
            var requestPath,
                deviceDetectProc,
                fileToRead,
                slashMinSuffix = ( req.query.debug === '1' ? '' : '/min' ),
                dir,
                file;

            // override the user agent by passing in a query
            // (for developers)
            if (req.query.UA){
                req.headers['user-agent'] = req.query.UA;
            }
            
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

            deviceDetectProc = deviceDetectParams(requestPath, req);
                        
            fileToRead = deviceDetectProc.view + ".html";
            
            dir = path.join(__dirname, '..', 'views');
            file = dir + '/' + fileToRead;
            
            // Check if any head* helpers are used
            // Use of a head* helper is done using HTML comments <!-- headHelper= -->
            // If so, add them to deviceDetectProc.args
            deviceDetectProc.args = detectHeadHelpers(file, deviceDetectProc.args);
                                    
            return res.view(deviceDetectProc.view, { args: deviceDetectProc.args, assetsHost: process.env.BASE_ASSETS, slashMinSuffix: slashMinSuffix});
        }
    }
};