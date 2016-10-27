'use strict'; 
var serviceProxy = require('./../helpers/serviceProxy');

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
                mapUri: function(req, res) {

                    var headers = serviceProxy.getHeaders(req, process.env.CATALOGCATEGORYV3_KEY);
                    req.url.host = serviceProxy.getHost(req, process.env.CATEGORYINDEXV3_HOST || process.env.API_HOST);

                    req.app.parser = require('./../parsers/category');

                    res(null, req.url.format(req.url), headers);

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
                mapUri: function(req, res) {

                    var headers = serviceProxy.getHeaders(req, process.env.CATALOGCATEGORYV3_KEY);
                    req.url.host = serviceProxy.getHost(req, process.env.CATEGORYINDEXV3_HOST || process.env.API_HOST);

                    req.app.parser = require('./../parsers/category');

                    console.log("---------REQUEST--------");
                    console.log(req.url);
                    console.log(headers);
                    console.log("------------------------");

                    console.log(res);

                    res(null, req.url.format(req.url), headers);

                },

                onResponse: serviceProxy.defaultOnResponse

            }
        }
    },

    getbag: {
        description: 'bag service calls',
        notes: 'reqs for bag service calls require the specialized bag services key',
        tags: ['developer.bloomingdales.com', 'api', 'bag'],
        handler: {
            proxy: {
                protocol: 'https',
                timeout: serviceProxy.timeout,
                passThrough: true,
                acceptEncoding: false,
                mapUri: function(req, res) {

                    var headers = serviceProxy.getHeaders(req, process.env.SERVICES_KEY);
                    req.url.host = serviceProxy.getHost(req, process.env.CATEGORYINDEXV3_HOST || process.env.API_HOST);

                    req.app.parser = require('./../parsers/category');

                    req.url.pathname = req.url.pathname.replace(/^\/getBag\//, '');
                    
                    res(null, req.url.format(req.url), headers);

                },

                onResponse: serviceProxy.defaultOnResponse

            }
        }
    },

    addbag: {
        description: 'bag service calls',
        notes: 'reqs for bag service calls require the specialized bag services key',
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
                mapUri: function(req, res) {
                    var headers = serviceProxy.getHeaders(req, process.env.SERVICES_KEY);
                    req.url.host = process.env.BASE_ASSETS;
                    req.app.parser = require('./../parsers/category');
                    req.url.pathname = req.url.pathname = 'bag/add';
                    res(null, req.url.format(req.url), headers);
                },
                onResponse: serviceProxy.defaultOnResponse
            }
        }
    },
    proxy: {
        description: 'proxy, sends any request over to bloomingdales.com',
        handler: function (req, res) {
            var host = process.env.BASE_ASSETS1 || process.env.BASE_ASSETS;
            host = false;
            if (! host){
                host = 'www1.bloomingdales.com';
            }
            var uri = 'http://' + host + '/' + req.raw.req.url.replace(/^\/p\//,''); //+ req.params.path;
            return res.proxy({
                redirects: 2,
                uri: uri
            });
        }
    }

};