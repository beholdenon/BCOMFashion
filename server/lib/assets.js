'use strict'; 
var serviceProxy = require('./serviceProxy'),
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
            var standalonePage = require('./standalonePage'),            
                deviceType = device.detectDevice(request),
                requestParams = request.params.path,
                standalonePageURL = standalonePage.checkPath(requestParams),
                isMobile = false,
                isMobileiOS = false,
                isMobileAndroid = false,
                isTablet = false,
                customView;

            //render standalone pages
            if (standalonePageURL !== null) return reply.file(standalonePageURL);

            //render generic templates
            if (deviceType.indexOf('mobile') > -1) {
                customView = requestParams + 'index-mobile';
                isMobile = true;
                
                if (deviceType.indexOf('Android') > -1) {
                    isMobileAndroid = true;
                } else if (deviceType.indexOf('iOS') > -1){
                    isMobileiOS = true;
                }
            } else {
                customView = requestParams + 'index';
            }

            if (deviceType === 'tablet') isTablet = true;

            if (requestParams === '' || requestParams === undefined) {
                return reply.redirect('http://www.bloomingdales.com');
            } else {
                return reply.view(customView, {
                    isMobile: isMobile,
                    isMobileAndroid: isMobileAndroid,
                    isMobileiOS: isMobileiOS,
                    isTablet: isTablet
                });
            }
        }
    }
};
