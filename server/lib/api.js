'use strict'; 
var serviceProxy    = require('./serviceProxy');

module.exports = {
    v3: {
        description: 'v3 calls',
        notes: 'v3 key and call',
        tags: ['developer.bloomingdales.com', 'api', 'v3'],
        handler: {
            proxy: {
                timeout: serviceProxy.timeout,
                passThrough: true,
                acceptEncoding: false,
                mapUri: function(request, callback) {

                    var headers = serviceProxy.getHeaders(request, process.env.CATALOGCATEGORYV3_KEY);
                    request.url.host = serviceProxy.getHost(request, process.env.CATEGORYINDEXV3_HOST || process.env.API_HOST);

                    request.app.parser = require('./parsers/category');

                    callback(null, request.url.format(request.url), headers);

                },

                onResponse: serviceProxy.defaultOnResponse

            }
        }
    },

    v4: {
        description: 'v4 calls',
        notes: 'v4 key and call',
        tags: ['developer.bloomingdales.com', 'api', 'v4'],
        handler: {
            proxy: {
                timeout: serviceProxy.timeout,
                passThrough: true,
                acceptEncoding: false,
                mapUri: function(request, callback) {

                    var headers = serviceProxy.getHeaders(request, process.env.CATALOGCATEGORYV3_KEY);
                    request.url.host = serviceProxy.getHost(request, process.env.CATEGORYINDEXV3_HOST || process.env.API_HOST);

                    request.app.parser = require('./parsers/category');

                    // console.log(request.url);

                    callback(null, request.url.format(request.url), headers);

                },

                onResponse: serviceProxy.defaultOnResponse

            }
        }
    },

    getbag: {
        description: 'bag service calls',
        notes: 'requests for bag service calls require the specialized bag services key',
        tags: ['developer.bloomingdales.com', 'api', 'bag'],
        handler: {
            proxy: {
                protocol: 'https',
                timeout: serviceProxy.timeout,
                passThrough: true,
                acceptEncoding: false,
                mapUri: function(request, callback) {

                    var headers = serviceProxy.getHeaders(request, process.env.SERVICES_KEY);
                    request.url.host = serviceProxy.getHost(request, process.env.CATEGORYINDEXV3_HOST || process.env.API_HOST);

                    request.app.parser = require('./parsers/category');

                    request.url.pathname = request.url.pathname.replace(/^\/getBag\//, '');
                    
                    callback(null, request.url.format(request.url), headers);

                },

                onResponse: serviceProxy.defaultOnResponse

            }
        }
    },

    addbag: {
        description: 'bag service calls',
        notes: 'requests for bag service calls require the specialized bag services key',
        tags: ['developer.bloomingdales.com', 'api', 'bag'],
        payload: {
            output: 'data',
            parse: false
        },
        handler: {
            proxy: {
                protocol: 'http',
                timeout: serviceProxy.timeout,
                passThrough: true,
                acceptEncoding: false,
                mapUri: function(request, callback) {

                    var headers = serviceProxy.getHeaders(request, process.env.SERVICES_KEY);
                    request.url.host = serviceProxy.getHost(request, process.env.CATEGORYINDEXV3_HOST || process.env.API_HOST);

                    request.app.parser = require('./parsers/category');
                    request.url.pathname = request.url.pathname = 'order/v1/bags';

                    callback(null, request.url.format(request.url), headers);
                },

                onResponse: serviceProxy.defaultOnResponse

            }
        }
    }
};