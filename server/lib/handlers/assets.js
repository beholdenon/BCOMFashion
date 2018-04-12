'use strict';

const serviceProxy = require('./../helpers/serviceProxy'),
    Path = require('path');

module.exports = {
    netstorage: {
        description: 'Static assets',
        notes: 'All requests that begin with /fashion are assumed to be static assets in /public',
        tags: ['static'],
        handler: (req, res) => {

            const urlPath = req.url.path.replace(/^\/b\//g, "/"),
                env = process.env.NODE_ENV;
            let filePath = '/' + urlPath.split('/').splice(2).join('/').replace(/\?.*/,'');

            if (env === 'dev') {
                filePath = '.' + filePath;
                return res.file(filePath);
            } else if (env === 'production'){
                return res.proxy({
                    timeout: serviceProxy.timeout,
                    passThrough: true,
                    mapUri: () => {
                        let uri = 'http://' + process.env.NETSTORAGE + process.env.NETSTORAGE_ROOT_DIR + filePath;
                        
                        return {
                            uri: uri
                        };
                    },
                    onResponse: serviceProxy.onResponseRedirect
                });
            } else {
                console.log('Incorrect NODE_ENV configuration.');
            }
        }
    },

    commonAssets: {
        handler: (req, res) => {
            const headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            return res.proxy({
                timeout: serviceProxy.timeout,
                passThrough: true,
                mapUri: (req) => {
                    const uri = process.env.BASE_ASSETS + req.url.path.replace(/^\/b\//g, "/");
                    return {
                        uri: uri,
                        headers: headers
                    };
                },
                onResponse: serviceProxy.onResponseRedirect
            });
        }
    },

    topNav: {
        handler: (req, res) => {
            const headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            return res.proxy({
                timeout: serviceProxy.timeout,
                passThrough: true,
                mapUri: (req) => {
                    const uri = process.env.BASE_ASSETS + req.url.path.replace(/^\/b\//g, "/");
                    return {
                        uri: uri,
                        headers: headers
                    };
                },
                onResponse: serviceProxy.onResponseRedirect
            });
        }
    },

    bagHandler: {
        handler: (req, res) => {

            return res.proxy({
                timeout: serviceProxy.timeout,
                passThrough: true,
                mapUri: (req) => {
                    let uri = process.env.BASE_HOST + req.url.path.replace(/^\/b\//g, "/");
                    return {
                        uri: uri
                    };
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
        handler: (req, res) => {
            const ngView = Path.join(__dirname, '../views', req.url.path.replace(/^\/b\//g, "/") );
            return res.file(ngView);
        }
    }
};