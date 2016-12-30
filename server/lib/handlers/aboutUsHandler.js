/**
 * Created by u067265 on 12/30/16.
 */

'use strict';

let adaptiveHandler = require('./adaptiveWithStaticDataFactory'),
    sjl = require('sjljs');

function aboutUsDataProvider (req) {
    return {};
}

module.exports = sjl.curry(adaptiveHandler, sjl._, aboutUsDataProvider);
