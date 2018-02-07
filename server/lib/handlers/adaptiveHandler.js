/**
 * Created by u067265 on 1/12/17.
 */
'use strict';
let fs = require('fs'),
    path = require('path'),
    sjl = require('sjljs'),
    responseArgsFactory = require('./../helpers/responseArgsFactory'),
    getViewTemplateName = require('./../helpers/getViewTemplateName'),
    doesFilePathExist = require('./../helpers/doesPathExist'),
    killswitches = require('./../helpers/killswitchesHelper'),

    viewsPath = path.join(__dirname, '../views'),

    headMetaRegEx = /<!--headMeta=(.*)-->/,
    headTitleRegEx = /<!--headTitle=(.*)-->/,
    headCanonicalRegEx=/<!--headCanonical=(.*)-->/,


    // Reads the file passed in and checks if any of the head* helpers are used
    // Use of a head* helper is done using HTML comments <!-- -->
    /**
     * A promisified and non-blocking version of the headHelpers function in './views.js'.
     * @param filePath {String}
     * @param args {Object}
     * @returns {Promise.<T>|*}
     */
    headHelpers = function headHelpers(filePath, args) {
        let filePathToUse = path.join(viewsPath, filePath),
            getFileProcessor = (foundFilePath, resolve, reject) => (err, content) => {
                let lines = content.split('\n').slice(0, 20);

                // Resolve or reject initial cases
                if (lines.length === 0) {
                    return resolve(args);
                }
                else if (!sjl.empty(err)) {
                    reject('Error using head* helper in ' + foundFilePath, 'Argument must be an object');
                }

                // Process lines
                const aggregatedArgs = lines.reduce((agg, line) => {
                    [
                        [headMetaRegEx, 'headMeta'],
                        [headTitleRegEx, 'headTitle'],
                        [headCanonicalRegEx, 'headCanonical']
                    ].forEach(tuple => {
                        let regexResult = tuple[0].exec(line);
                        if (!regexResult) {
                            return;
                        }
                        agg[tuple[1]] = JSON.parse(regexResult[1]);
                    });

                    return agg;
                }, args);

                // Touch canonical
                if (aggregatedArgs && aggregatedArgs.headCanonical.href && aggregatedArgs.headCanonical.href.indexOf('http') === -1) {
                    aggregatedArgs.headCanonical.href = process.env.PROD_HOST + aggregatedArgs.headCanonical.href;
                }

                resolve(aggregatedArgs);
            },

            processExistingFilePath = foundFilePath => {
                return new Promise((resolve, reject) => {
                    fs.readFile(foundFilePath, 'utf8', getFileProcessor(foundFilePath, resolve, reject));
                });
            };

        return doesFilePathExist(filePathToUse)

            .then(processExistingFilePath)

            .catch(console.warn);
    },

    // Handle URL deeplinks params: discard fragment on the server-side and handle it on client-side.
    detectDeepLinks = function detectDeepLinks (req, defaultReqPath) {
        return /\{deeplinks\?}/.test(req.route.path) ?
            req.route.path.substring(1).replace(/{.*?}/,'') : defaultReqPath;
    };

module.exports = {
    description: 'A handler for static views.  Uses the "standard" layout.',
        notes: 'Reads Akamai headers before serving the "some-path/index" or "some-path/index-mobile" view based ' +
        'on whether the device is a phone, a tablet, or a desktop browser.',
        tags: ['non-responsive', 'standard'],
        handler: function(req, res) {
        let requestPath = (req.url.pathname).substring(1);

        const args = responseArgsFactory(req);

        let resolveRequest = viewName => {
            return headHelpers(viewName + '.html', args)
                .then(aggregatedArgs => {
                    return res.view(viewName, killswitches.pageViewArgsFactory(req, aggregatedArgs));
                })
                .catch(() => {
                    return res.view(viewName, killswitches.pageViewArgsFactory(req, args));
                });
        };

        // Gets '...index' or '...index-mobile' depending on it's parameters
        return getViewTemplateName(null, detectDeepLinks(req, requestPath), viewsPath, args.isMobile, resolveRequest);
    }
};
