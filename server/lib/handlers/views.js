'use strict';

var fs = require('fs'),
    path = require('path'),
    headMetaRegEx = /<!--headMeta=(.*)-->/,
    headTitleRegEx = /<!--headTitle=(.*)-->/,
    headCanonicalRegEx=/<!--headCanonical=(.*)-->/;
    
let args = {
    timeStamp: new Date(),
    isMobile: false,
    isTablet: false,
    headTitle: '',
    headMeta: '',
    headCanonical: ''
};

var detectMobileDeviceView = function detectMobileDeviceView(requestPath, req) {
    var view = requestPath + 'index',
        device = require('./../helpers/deviceDetection'),
        deviceType = device.detectDevice(req);    
        
    args.isTablet = false;
    args.isMobile = false;
    
    if (deviceType === 'mobile') {
        view = requestPath + 'index-mobile';
        args.isMobile = true;
    } else if (deviceType === 'tablet') {
        args.isTablet = true;
    }
        
    return { view: view };        
};

// Reads the file passed in and checks if any of the head* helpers are used
// Use of a head* helper is done using HTML comments <!-- -->
var headHelpers = function headHelpers(file) {
    var contents,
        lines;
    try {
        
        // Reset args.head* properties to null
        args.headTitle = '';
        args.headMeta = '';
        args.headCanonical = '';
        
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
                if (args.headCanonical.href && args.headCanonical.href.indexOf('http') === -1) {
                    args.headCanonical.href = process.env.PROD_HOST + args.headCanonical.href;
                }
            }            
        }
        
        if ( (args.headTitle && typeof(args.headTitle) !== "object") || 
            (args.headMeta && typeof(args.headMeta) !== "object") || 
            (args.headCanonical && typeof(args.headCanonical) !== "object") ) {
                console.log("Error using head* helper in " + file);
                console.log("Argument must be an object");
        }
        
    } catch (e) {
        console.log("Error reading file name " + file + " in headHelpers function");
        console.log(e.message);
    }
    
    return args;
};

module.exports = { 
    nonResponsive: {
        description: 'Non-responsive layout',
        notes: 'Reading Akamai headers, and based on device type (phone, tablet, desktop), serve either index.html or index-mobile.html layout',
        tags: ['non-responsive'],
        handler: function(req, res) {
            var requestPath = (req.url.pathname).substring(1),
                deviceDetectProc = detectMobileDeviceView(requestPath, req),
                slashMinSuffix = ( req.query.debug === '1' ? '' : '/min' ),
                fileToRead,
                dir,
                file;

            fileToRead = deviceDetectProc.view + ".html";
            dir = path.join(__dirname, '..', 'views');
            file = dir + '/' + fileToRead;
                        
            // Check if any head* helpers are used
            // Use of a head* helper is done using HTML comments <!-- headHelper= -->
            // If so, add them to args
            args = headHelpers(file);                

            return res.view(deviceDetectProc.view, { args: args, assetsHost: process.env.BASE_ASSETS, slashMinSuffix: slashMinSuffix }, { layout: 'nonResponsive' });
        }
    },
    responsiveCustomHF: {
        description: 'Responsive pages that use a custom Header&Footer',
        notes: 'Serve common html view for both desktop and mobile; exclude standard H&F',
        tags: ['custom header & footer', 'static'],
        handler: function(req, res) {
            var requestPath = (req.url.pathname).substring(1),
                responsiveCustomHFView = requestPath + '/index',
                slashMinSuffix = ( req.query.debug === '1' ? '' : '/min' ),
                dir,
                file;
            
            dir = path.join(__dirname, '..', 'views');
            file = dir + '/' + responsiveCustomHFView + '.html';
                                    
            // Check if any head* helpers are used
            // Use of a head* helper is done using HTML comments <!-- headHelper= -->
            // If so, add them to deviceDetectProc.args
            args = headHelpers(file);

            return res.view(responsiveCustomHFView, { assetsHost: process.env.BASE_ASSETS, slashMinSuffix: slashMinSuffix }, { layout: 'responsiveCustomHF' });
        }
    },
    fallback: {
        description: 'Serve responsive standard layout',
        notes: 'This is the default fallback route if not explicitly captured',
        tags: ['fallback', 'static'],
        handler: function(req, res) {
            var slashMinSuffix = ( req.query.debug === '1' ? '' : '/min' ),
                requestPath,
                fileToRead,
                dir,
                file;

            // (for dev only) override the user agent by passing in a query
            if (req.query.UA){
                req.headers['user-agent'] = req.query.UA;
            }
            
            // Handle URL deeplinks params: discard fragment on the server-side and handle it on client-side. 
            if (/\{deeplinks\?}/.test(req.route.path)){
                requestPath = req.route.path.substring(1).replace(/{.*?}/,'');
            } else {
                requestPath = req.params.path;//  || req.path;
            }
            
            // Need this call in order to change args    
            detectMobileDeviceView(requestPath, req);
            
            // if route not captured, redirect to the main site
            if (requestPath === '' || requestPath === undefined) {
                return res.redirect('http://www.bloomingdales.com');
            }
            
            // get rid of trailing spaces, add a trailing slash if missing, then redirect
            if (requestPath.indexOf('#') < 0 && requestPath.indexOf('?') < 0 && requestPath.indexOf('.') < 0 && ! /\/$/.test(requestPath)) {
                requestPath = requestPath.replace(/\/?\s?$/, '/');
                var url = '/' + requestPath;
                return res.redirect(url);
            }

            //deviceDetectProc = deviceDetectParams(requestPath, req);
            fileToRead = requestPath + "index.html";
            dir = path.join(__dirname, '..', 'views');
            file = dir + '/' + fileToRead;
            
            // Check if any head* helpers are used
            // Use of a head* helper is done using HTML comments <!-- headHelper= -->
            // If so, add them to args
            args = headHelpers(file);
            
            return res.view(requestPath + "index", { args: args, assetsHost: process.env.BASE_ASSETS, slashMinSuffix: slashMinSuffix});
        }
    }
};