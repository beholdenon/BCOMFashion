'use strict';

var serviceProxy = require('./../helpers/serviceProxy'),
    Path = require('path'),
    Device = require('./../helpers/deviceDetection');

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

    ngViews: {
        description: 'Angular views',
        notes: 'Requests made by Angular to load template components',
        tags: ['angular views'],
        handler: function(req, res) {
            var ngView = Path.join(__dirname, '../views', req.url.path);
            res.file(ngView);
        }         
    },

    shop: {
        description: 'customer ui server proxy (for development only)',
        notes: 'Redirect api urls that should go to the server',
        tags: ['navapp'],
        handler: function(req, res) {
            var headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            res.proxy({
                timeout: serviceProxy.timeout,
                passThrough: true,
                mapUri: function(req, callback) {
                    var uri = 'http://www.bloomingdales.com' + decodeURIComponent(req.url.path);
                    callback(null, uri, headers);
                },
                onResponse: serviceProxy.onResponseRedirect
            });
        }
    },

    hfHandler: {
        handler: function(req, res) {
            var headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            res.proxy({
                timeout: serviceProxy.timeout,
                passThrough: true,
                mapUri: function(req, callback) {
                    var uri = 'http://' + process.env.BASE_ASSETS + decodeURIComponent(req.url.path);
                    callback(null, uri, headers);
                },
                onResponse: serviceProxy.onResponseRedirect
            });
        }
    },
    bagHandler: {
        handler: function(req, res) {

            res.proxy({
                timeout: serviceProxy.timeout,
                passThrough: true,
                mapUri: function(req, callback) {
                    var uri = 'http://' + process.env.BASE_ASSETS + decodeURIComponent(req.url.path);
                    callback(null, uri);
                }
            });
        },
        payload: {
          output: 'stream',
          parse: false
        }
    },
    
    topNav: {
        handler: function(req, res) {
            var headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            // var deviceType = Device.detectDevice(req),
            var mobileParam = '&stop_mobi=yes';

            res.proxy({
                timeout: serviceProxy.timeout,
                passThrough: true,
                mapUri: function(req, callback) {
                    var uri = 'http://' + process.env.BASE_ASSETS + decodeURIComponent(req.url.path) + mobileParam;
                    callback(null, uri, headers);
                },
                onResponse: serviceProxy.onResponseRedirect
            });
        }
    }
};
