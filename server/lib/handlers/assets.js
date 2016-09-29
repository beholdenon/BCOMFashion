'use strict';

let serviceProxy = require('./../helpers/serviceProxy');
let Path = require('path');

module.exports = {
    netstorage: {
        description: 'Static assets',
        notes: 'All requests that begin with /fashion are assumed to be static assets in /public',
        tags: ['static'],
        handler: function(req, res) {
            let env = process.env.NODE_ENV;
            let filePath = '/' + req.url.path.split('/').splice(2).join('/').replace(/\?.*/,'');

            if (env === 'dev') {
                filePath = '.' + filePath;
                res.file(filePath);
            } else if (env === 'production'){
                res.proxy({
                    timeout: serviceProxy.timeout,
                    passThrough: true,
                    mapUri: function(req, callback) {
                        let uri = 'http://' + process.env.NETSTORAGE + process.env.NETSTORAGE_ROOT_DIR + filePath;
                        callback(null, uri);
                    },
                    onResponse: serviceProxy.onResponseRedirect
                });
            } else {
                console.log('Incorrect NODE_ENV configuration.');
            }
        }
    },

    commonAssets: {
        handler: function(req, res) {
            var headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            res.proxy({
                timeout: serviceProxy.timeout,
                passThrough: true,
                mapUri: function(req, callback) {
                    let uri = 'http://' + process.env.BASE_ASSETS + req.url.path;
                    callback(null, uri, headers);
                },
                onResponse: serviceProxy.onResponseRedirect
            });
        }
    },

    topNav: {
        handler: function(req, res) {
            var headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            res.proxy({
                timeout: serviceProxy.timeout,
                passThrough: false,
                mapUri: function(req, callback) {
                    let uri = 'http://' + process.env.BASE_ASSETS + req.url.path;
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
                    let uri = 'http://' + process.env.BASE_ASSETS  + req.url.path;
                    callback(null, uri);
                }
            });
        },
        payload: {
          output: 'stream',
          parse: false
        }
    },

    ngViews: {
        description: 'Angular views',
        notes: 'Requests made by Angular to load template components',
        tags: ['angular views'],
        handler: function(req, res) {
            let ngView = Path.join(__dirname, '../views', req.url.path);
            res.file(ngView);
        }
    }
};
