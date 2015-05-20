'use strict';
var Wreck = require('wreck'),
    fs = require('fs'),
    cheerio = require('cheerio'),
    serviceProxy = require('./serviceProxy'),
    config = require('./parsers/config'),
    device = require('./deviceDetection');


module.exports = {

    fashion: {
        description: 'Server static assets',
        notes: 'All requests that begin with /fashion are assumed to be static assets in /public',
        tags: ['static'],
        handler: {
            directory: {
                path: './'
            }
        }
    },

    shop: {
        description: 'customer ui server proxy (for development only)',
        notes: 'Redirect api urls that should go to the server',
        tags: ['navapp'],

        handler: function(request, reply) {
            var headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };
            reply.proxy({
                timeout: serviceProxy.timeout,
                passThrough: true,
                mapUri: function(request, callback) {
                    var uri = 'http://www.bloomingdales.com' + decodeURIComponent(request.url.path);
                    callback(null, uri, headers);
                },
                onResponse: serviceProxy.onResponseRedirect
            });
        }
    },

    fallback: {
        description: 'Serve index page or brombone generated snapshot',
        notes: 'This is the default fallback route if not explicitly captured',
        tags: ['fallback', 'static'],
        handler: function(request, reply) {
            var isMobile = false, 
                customView = 'index';
            if (device.detectDevice(request)) {
                isMobile = true;
                customView = 'index-mobile';
            }

            return reply.view(customView, { isMobile: isMobile});

/*            
            fs.readFile(__dirname + indexFileName, function(err, data) {
                // Better to at least throw the error than do nothing with it
                if (err) {
                    throw err;
                }   

                // generate an object of all config properties set up
                var config = {};

                // Node way of iterating an object
                Object.keys(process.env).forEach(function(key) {
                    if (key.indexOf('CONFIG_') === 0) {
                        config[key.toLowerCase().replace('config_', '')] = process.env[key];
                    }
                });

                var configStr = '';
                // Check that its not empty
                if (Object.getOwnPropertyNames(config)) {
                    configStr = 'var ENV_CONFIG = (function() { return ' + JSON.stringify(config) + '; })();';
                }

                // create a cheerio object from the index.html
                var $ = cheerio.load(data + '');

                // If we have config properties to pass to the client, inject after main HTML content
                if (configStr) {
                    $('#bl_main_container').after('<script type="text/javascript">' + configStr + '</script>');
                }

                request.log(request.route.tags, {
                    uri: reply($.html()).source.path
                });
            });
*/
        }
    }
};
