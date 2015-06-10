'use strict';
var serviceProxy = require('./serviceProxy'),
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
            var deviceType = device.detectDevice(request),
                isMobile = false,
                isTablet = false,
                customView;

            if (deviceType === 'mobile') {
                customView = request.params.path + 'index-mobile';
                isMobile = true;
            } else {
                customView = request.params.path + 'index';
            }

            (deviceType === 'tablet') ? isTablet = true: isTablet = false;

            if (request.params.path == '' || request.params.path == undefined) {
                return reply.redirect('http://www.bloomingdales.com');
            } else {
                return reply.view(customView, {
                    isMobile: isMobile,
                    isTablet: isTablet
                });
            }
        }
    }
};
