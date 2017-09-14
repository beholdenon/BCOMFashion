/**
 * Created by u067265 on 11/30/16.
 */

'use strict';

let sjl = require('sjljs'),
    path = require('path'),
    staticDataRootPath = path.join(__dirname, '../data/static'),

    doesPathExist = require('../helpers/doesPathExist'),
    deviceDetectionHelper = require('./../helpers/deviceDetection'),

    isMobile = deviceType => deviceType.toLowerCase() === 'mobile',
    isTablet = deviceType => deviceType.toLowerCase() === 'tablet',

    argsFactory = () => {
        console.log(process.env.polarisHeaderFooter);
        return {
            timeStamp: new Date(),
            isMobile: false,
            isTablet: false,
            headTitle: '',
            headMeta: '',
            headCanonical: '',
            tealiumScriptEnabled: process.env.tealiumScriptEnabled === "true",
            tealiumType: process.env.ENV_TYPE === "prod" ? "prod" : "qa",
            brightTagEnabled: process.env.brightTagEnabled !== "false",
            polarisHeaderFooter: process.env.polarisHeaderFooter === "true",
            breastCancerAwarenessCampaignEnabled: process.env.breastCancerAwarenessCampaignEnabled === "true"
        };
    },

    argsWithDeviceMetaData = (req, argsToUse) => {
        var _args = argsToUse || argsFactory(),
            detectedDeviceType = deviceDetectionHelper.detectDevice(req);
        _args.isMobile = isMobile(detectedDeviceType);
        _args.isTablet = isTablet(detectedDeviceType);
        return _args;
    },

    stripInitialForwardSlash = str => str.indexOf('/') === 0 ? str.substring(1) : str,
    ensureTrailingForwardSlash = str => str.lastIndexOf('\/') !== str.length - 1 ? str + '\/' : str,
    pathToFlattenedToSlug = filePath => {
        return filePath.replace(/[^\-_a-z0-9]/gim, '-').replace(/[^a-z\d]+$/i, '');
    },
    slugToPossibleDataPath = (slug, dataPathRoot) => {
        return path.normalize(path.join(dataPathRoot, slug + '.json'));
    },
    getPathStaticData = pathname => {
        let beginProcess = sjl.compose(doesPathExist, slug => slugToPossibleDataPath(slug, staticDataRootPath), pathToFlattenedToSlug);
        return beginProcess (pathname)
            .then(filePath => {
                return require(filePath);
            })
            .catch(() => {
                return {};
            });
    };

module.exports = {
    description: `
            This handler allows you to inject data from JSON files into your view.  The default layout used for this 
                handler is the standard layout for handlebars templates. 
            Caveats: 
            - Currently there is a build step in our grunt file that compiles all handlebars pages.  
              To circumvent this behavior and use your handlebars page with your static data name your page with 
              the *.html extension in your "./server/libs/views folder";
            - Static data file must be located in "./../data/static" folder and must be a named 
              {slug-of-url-pathname}.json;  E.g., for url pathname "/hello/world" your data file must be named 
              "hello-world.json"
            - This handler passes "your-pathname/index" to \`res.view\` handler by default does not check for a 
              mobile version of index (index-mobile.html etc).`,

    tags: ['standard-layout', 'for-mobile', 'for-desktop', 'for-tablet', 'static-data'],

    handler: function(req, res) {
        let slashMinSuffix = req.query.debug ? '' : '/min',
            requestPath = req.url.path || req.url.pathname,
            requestPathPartial = stripInitialForwardSlash(requestPath),
            viewAlias = ensureTrailingForwardSlash(requestPathPartial) + 'index',
            argsForView = argsWithDeviceMetaData(req, argsFactory());

        // Check if we have any static data to merge to `args` before rendering view
        // then render it and return the promise
        return (new Promise( resolve => {

            // Resolve view template whether we have data for it or not
            var resolveRequest = mergedArgs => {
                    resolve( res.view( viewAlias, {
                        args: mergedArgs,
                        assetsHost: process.env.BASE_ASSETS,
                        slashMinSuffix: slashMinSuffix
                    } ));
                },

                // curried `extend` method same signature as $.extend but more accurate
                mergeWithArgs = sjl.curry(sjl.extend, true, argsForView);

            // Resolve request
            getPathStaticData(requestPathPartial)

            // If data merge it
                .then(mergeWithArgs) // merge any returned static data to args

                // Resolve view with data
                .then(resolveRequest)

                // Resolve view with out data
                .catch(resolveRequest);
        }));

    }
};

