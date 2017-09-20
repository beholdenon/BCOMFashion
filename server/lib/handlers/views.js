'use strict';

let fs = require('fs'),
    path = require('path'),
    deviceDetectionHelper = require('./../helpers/deviceDetection'),
    tagDataHelper = require('./../helpers/tagDataPreparation'),

    headMetaRegEx = /<!--headMeta=(.*)-->/,
    headTitleRegEx = /<!--headTitle=(.*)-->/,
    headCanonicalRegEx=/<!--headCanonical=(.*)-->/,
    preLoadScriptsRegEx=/<!--preLoadScripts=(.*)-->/,

    args = {
        timeStamp: new Date(),
        isMobile: false,
        isTablet: false,
        headTitle: '',
        headMeta: '',
        headCanonical: '',
        preLoadScripts: '',
        tealiumScriptEnabled: process.env.tealiumScriptEnabled === "true",
        tealiumType: process.env.ENV_TYPE === "prod" ? "prod" : "qa",
        brightTagEnabled: process.env.brightTagEnabled !== "false",
        polarisHeaderFooterEnabled: process.env.polarisHeaderFooterEnabled === "true",
        breastCancerAwarenessCampaignEnabled: process.env.breastCancerAwarenessCampaignEnabled === "true"
    },

    detectMobileDeviceView = function detectMobileDeviceView(requestPath, req) {
        var view = requestPath + 'index',
            deviceType = deviceDetectionHelper.detectDevice(req);

        args.isTablet = false;
        args.isMobile = false;

        if (deviceType === 'mobile') {
            view = requestPath + 'index-mobile';
            args.isMobile = true;
        }
        else if (deviceType === 'tablet') {
            args.isTablet = true;
        }

        return view;
    },

    // Reads the file passed in and checks if any of the head* helpers are used
    // Use of a head* helper is done using HTML comments <!-- -->
    headHelpers = function headHelpers(file, req) {
        var contents,
            lines,
            dir;
        try {

            // Reset args.head* properties to null
            args.headTitle = '';
            args.headMeta = '';
            args.headCanonical = '';
            args.preLoadScripts = '';

            // If the file doesn't exist, readFileSync will throw an error
            dir = path.join(__dirname, '..', 'views');
            file = dir + '/' + file;

            contents = fs.readFileSync(file, 'utf8');
            lines = contents.split("\n");
            // Read only first 20 lines of file
            for (var i = 0; i < 20; i++) {
                var headMetaMatches = headMetaRegEx.exec(lines[i]),
                    headTitleMatches = headTitleRegEx.exec(lines[i]),
                    headCanonicalMatches = headCanonicalRegEx.exec(lines[i]),
                    preLoadScriptsMatches = preLoadScriptsRegEx.exec(lines[i]),
                    headCanonicalDotComIdx,
                    headCanonicalSlashBIdx,
                    canonicalHost,
                    protocol;

                if (headMetaMatches) {
                    args.headMeta = JSON.parse(headMetaMatches[1]);
                }
                if (headTitleMatches) {
                    args.headTitle = JSON.parse(headTitleMatches[1]);
                }
                if (headCanonicalMatches) {
                    args.headCanonical = JSON.parse(headCanonicalMatches[1]);
                    headCanonicalDotComIdx = args.headCanonical.href.indexOf('.com');
                    headCanonicalSlashBIdx = args.headCanonical.href.indexOf('/b/');

                    if (req.server !== undefined && req.server.info !== undefined && req.server.info.protocol !== undefined) {
                        protocol = req.server.info.protocol + '://';
                    } else {
                        protocol = 'https://';
                    }

                    canonicalHost = protocol + req.info.hostname + '/b';

                    //when on the headCanonical tag there are only a url path. Ex.: "/loyallist/top-of-the-list"
                    if (args.headCanonical.href && args.headCanonical.href.indexOf('http') === -1 && headCanonicalDotComIdx === -1 && headCanonicalSlashBIdx === -1) {
                        args.headCanonical.href = canonicalHost + args.headCanonical.href;
                    } 
                    //when on the headCanonical tag there are only the host, and there aren't /b/ context. Ex.: "fashion.bloomingdales.com/loyallist/top-of-the-list"
                    else if (headCanonicalDotComIdx !== -1 && headCanonicalSlashBIdx === -1) {
                        args.headCanonical.href = canonicalHost + args.headCanonical.href.substring(headCanonicalDotComIdx+4, args.headCanonical.href.length);
                    }
                    //when on the headCanonical tag there are the host and /b/ context. Ex.: "fashion.bloomingdales.com/b/loyallist/top-of-the-list"
                    else if (headCanonicalDotComIdx !== -1 && headCanonicalSlashBIdx !== -1) {
                        args.headCanonical.href = canonicalHost + args.headCanonical.href.substring(headCanonicalDotComIdx+6, args.headCanonical.href.length);
                    }
                    //when on the headCanonical tag there aren't the host but there are /b/ context. Ex.: "/b/loyallist/top-of-the-list"
                    else if (headCanonicalSlashBIdx !== -1) {
                        args.headCanonical.href = canonicalHost + args.headCanonical.href.replace('/b/', '/');
                    }
                }
                if (preLoadScriptsMatches) {
                    args.preLoadScripts = JSON.parse(preLoadScriptsMatches[1]);
                }
            }

            if ( (args.headTitle && typeof(args.headTitle) !== "object") ||
                (args.headMeta && typeof(args.headMeta) !== "object") ||
                (args.headCanonical && typeof(args.headCanonical) !== "object") ) {
                console.log("Error using head* helper in " + file);
                console.log("Argument must be an object");
            }
            	args.utagData = tagDataHelper.getPageType(req);
            
        } catch (e) {
            console.log("Error reading file name " + file + " in headHelpers function");
            console.log(e.message);
        }

        return args;
    },

    // Handle URL deeplinks params: discard fragment on the server-side and handle it on client-side.
    detectDeepLinks = function detectDeepLinks(req, defaultReqPath){
        var requestPath;

        if (/\{deeplinks\?}/.test(req.route.path)){
            requestPath = req.route.path.substring(1).replace(/{.*?}/,'');
        } else {
            requestPath = defaultReqPath;
        }
        return requestPath;
    },

    // Adaptive standard layout handler that allows json data to be injected from a reference file
    adaptiveWithStaticData = require('./adaptiveWithStaticData'),

    // Adaptive standard layout handler factory (method/function) that allows json data to be injected
    // and view to be passed in (for routes that have many pages that use the same view)
    adaptiveWithStaticDataFactory = require('./adaptiveWithStaticDataFactory');

module.exports = { 
    adaptive: {
        description: 'Non-responsive layout',
        notes: 'Reading Akamai headers, and based on device type (phone, tablet, desktop), serve either index.html or index-mobile.html layout',
        tags: ['non-responsive'],
        handler: function(req, res) {
            var requestPath = (req.url.pathname).replace(/^\/b\//g, "/").substring(1);
            var querystring = req.url.search || '';
            var deviceDetectProc,
                slashMinSuffix = ( req.query.debug === '1' ? '' : '/min' ),
                file;

            requestPath = detectDeepLinks(req, requestPath);

            deviceDetectProc = detectMobileDeviceView(requestPath, req);

            // get rid of trailing spaces, add a trailing slash if missing, then redirect
            if (requestPath.indexOf('#') < 0 && requestPath.indexOf('?') < 0 && requestPath.indexOf('.') < 0 && ! /\/$/.test(requestPath)) {
                requestPath = requestPath.replace(/\/?\s?$/, '/');
                var url = '/' + requestPath + querystring;

                return res.redirect(url);
            }

            // Check if any head* helpers are used
            // Use of a head* helper is done using HTML comments <!-- headHelper= -->
            // If so, add them to args
            file = deviceDetectProc + ".html";
            args = headHelpers(file, req);

            return res.view(deviceDetectProc, { args: args, assetsHost: process.env.BASE_ASSETS, slashMinSuffix: slashMinSuffix });
        }
    },
    adaptiveWithStaticData: adaptiveWithStaticData,
    adaptiveWithStaticDataFactory: adaptiveWithStaticDataFactory,
    responsiveCustomHF: {
        description: 'Responsive pages that use a custom Header&Footer',
        notes: 'Serve common html view for both desktop and mobile; exclude standard H&F',
        tags: ['custom header & footer', 'static'],
        handler: function(req, res) {
            var requestPath = (req.url.pathname).replace(/^\/b\//g, "/").substring(1);
            var slashMinSuffix = ( req.query.debug === '1' ? '' : '/min' );
            var file = requestPath.replace(/\\/g,"/");

            if ( requestPath.lastIndexOf('.') < 0 ) {
              file = file + '/index.html';
            }
                                                
            // Check if any head* helpers are used
            // Use of a head* helper is done using HTML comments <!-- headHelper= -->
            // If so, add them to deviceDetectProc.args
            args = headHelpers(file, req);

            return res.view(file, { args: args, assetsHost: process.env.BASE_ASSETS, slashMinSuffix: slashMinSuffix }, { layout: 'responsiveCustomHF' });
        }
    },
    fallback: {
        description: 'Serve responsive standard layout',
        notes: 'This is the default fallback route if not explicitly captured',
        tags: ['fallback', 'static'],
        handler: function(req, res) {
            var slashMinSuffix = ( req.query.debug === '1' ? '' : '/min' );
            var querystring = req.url.search || '';
            var requestPath = req.url.pathname.replace(/^\/b\//g, "/");
                requestPath = requestPath.substring(1);
            var file;

            // (for dev only) override the user agent by passing in a query
            if (req.query.UA){
                req.headers['user-agent'] = req.query.UA;
            }
            
            requestPath = detectDeepLinks(req, requestPath);
            
            // Need this call in order to change args    
            detectMobileDeviceView(requestPath, req);

            // if route not captured, redirect to the main site
            if (requestPath === '' || requestPath === undefined) {
                return res.redirect('http://www.bloomingdales.com');
            }

            // get rid of trailing spaces, add a trailing slash if missing, then redirect
            if (requestPath.indexOf('#') < 0 && requestPath.indexOf('?') < 0 && requestPath.indexOf('.') < 0 && ! /\/$/.test(requestPath)) {
                requestPath = requestPath.replace(/\/?\s?$/, '/');
                var url = '/' + requestPath + querystring;

                return res.redirect(url);
            }

            // Check if any head* helpers are used
            // Use of a head* helper is done using HTML comments <!-- headHelper= -->
            // If so, add them to args
            file = requestPath + "index.html";
            args = headHelpers(file, req);
            
            return res.view(requestPath + "index", { args: args, assetsHost: process.env.BASE_ASSETS, slashMinSuffix: slashMinSuffix});
        }
    }
};
