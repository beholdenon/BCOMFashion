/**
 * Created by u067265 on 12/30/16.
 */

'use strict';

let navJson = require('../data/static/about-us-navigation.json'),
    adaptiveHandler = require('./adaptiveWithStaticDataFactory'),
    sjl = require('sjljs');

function aboutUsDataProvider (req) {
    return sjl.extend(navJson, {controller: 'about-us', action: req.hostname});
}

module.exports = sjl.curry(adaptiveHandler, sjl._, aboutUsDataProvider);
