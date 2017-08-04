/**
 * Created by u067265 on 12/19/16.
 */
/**
 * Created by u067265 on 11/30/16.
 */

'use strict';

let sjl = require('sjljs'),
    path = require('path'),
    viewsPath = path.join(__dirname, '../views'),
    staticDataRootPath = path.join(__dirname, '../data/static'),

    doesPathExist = require('../helpers/doesPathExist'),
    getViewTemplateName = require('../helpers/getViewTemplateName'),
    deviceDetectionHelper = require('./../helpers/deviceDetection'),

    isMobile = deviceType => deviceType.toLowerCase() === 'mobile',
    isTablet = deviceType => deviceType.toLowerCase() === 'tablet',

    argsFactory = () => {
        return {
            timeStamp: new Date(),
            isMobile: false,
            isTablet: false,
            headTitle: '',
            headMeta: '',
            headCanonical: '',
            tealiumScriptEnabled: process.env.tealiumScriptEnabled === "true",
            tealiumType: process.env.ENV_TYPE === "prod" ? "prod" : "qa"
        };
    },

    argsWithDeviceMetaData = (req, argsToUse) => {
        const _args = argsToUse || argsFactory(),
            detectedDeviceType = deviceDetectionHelper.detectDevice(req);
        _args.isMobile = isMobile(detectedDeviceType);
        _args.isTablet = isTablet(detectedDeviceType);
        return _args;
    },

    stripInitialForwardSlash = str => str.indexOf('/') === 0 ? str.substring(1) : str,
    pathToFlattenedToSlug = filePath => {
        return filePath.replace(/[^\-_a-z0-9]/gim, '-').replace(/[^a-z\d]+$/i, '');
    },
    slugToPossibleDataPath = (slug, dataPathRoot) => {
        return path.normalize(path.join(dataPathRoot, slug + '.json'));
    },
    getPathStaticData = pathname => {
        let beginProcess = sjl.compose(doesPathExist,
            slug => slugToPossibleDataPath(slug, staticDataRootPath),
            pathToFlattenedToSlug);
        return beginProcess (pathname)
            .then(filePath => {
                return require(filePath);
            })
            .catch(() => {
                return {};
            });
    };

/**
 * Returns a Hapi.js handler that allows you to have static data for pages that hit your route and also allows you to pass
 * a `dataProducer` function that recieves the `req` object and returns some data object.
 * @param viewAlias {String} - View alias to use in returned handler entry.
 * @param [dataProducer {Function<req>|undefined}] - Optional data producer (function that returns some data (an Object or JSON Object) for the view to use).
 * @param [layoutObj {undefined|Object<layout>}] - An object with a `layout` property specifying the layout to use.  Optional.
 * @returns {{description: string, tags: [string,string,string,string,string], handler: handler}}
 */
module.exports = function (viewAlias, dataProducer, layoutObj) {
    return {
        description: `
            This handler allows you to inject data from JSON files into your view.  The default layout used for this 
                handler is the standard layout for handlebars templates.
            - This handler is the same as './adaptiveWithStaticData.js' except that it lets you specify the viewAlias
            to use;  E.g., view path, for example lets say we got to pathname '/in-store/louis-vuitton' but we want it to use 
             a template we're using for all our in store pages we can passes the factory this handler is in 'in-store/index'
             and that view template will get used.
            Caveats: 
            - Currently there is a build step in our grunt file that compiles all handlebars pages.  
              To circumvent this behavior and use your handlebars page with your static data (and partials), name 
              your page with the *.html extension in your "./server/libs/views folder" and any partials you wish 
              rendered along with said template also with the '*.html' extension.;
            - Static data file must be located in "./../data/static" folder and must be a named 
              {slug-of-url-pathname}.json;  E.g., for url pathname "/hello/world" your data file must be named 
              "hello-world.json"
            - This handler passes "your-pathname/index" to \`res.view\` handler by default does not check for a 
              mobile version of index (index-mobile.html etc).`,

        tags: ['standard-layout', 'for-mobile', 'for-desktop', 'for-tablet', 'static-data'],

        handler: function (req, res) {
            let slashMinSuffix = req.query.debug ? '' : '/min',
                requestPath = req.url.pathname.replace(/^\/b\//g, "/"),
                requestPathPartial = stripInitialForwardSlash(requestPath),
                dataProducerData = typeof dataProducer === 'function' ? dataProducer(req) : null,
                argsForView = argsWithDeviceMetaData(req, argsFactory()),
                getMergedArgs = otherData => sjl.extend(true, argsForView, dataProducerData, otherData),
                resolveRequest = viewTemplateName => {

                    return new Promise((resolve) => {

                        // Resolve view template whether we have args for it or not
                        let resolveRequest = fetchedStaticData => {
                            resolve(res.view(viewTemplateName, {
                                args: getMergedArgs(fetchedStaticData),
                                assetsHost: process.env.BASE_ASSETS,
                                slashMinSuffix: slashMinSuffix
                            }, layoutObj));
                        };

                        // Resolve request
                        getPathStaticData(requestPathPartial)

                        // Merge any returned static data and resolve request and view with data
                            .then(resolveRequest)

                            // Resolve view with out data
                            .catch(resolveRequest);
                    });
                };

            // Check if we have any static args to merge to `args` before rendering view
            // then render it and return the promise
            return getViewTemplateName(
                viewAlias,
                requestPathPartial,
                viewsPath,
                argsForView.isMobile,
                resolveRequest
            );
        }
    };
};
