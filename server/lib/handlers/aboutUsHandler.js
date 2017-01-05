/**
 * Created by u067265 on 12/30/16.
 */

'use strict';

let navJson = require('../data/static/about-us-navigation.json'),
    sizeChartsJson = require('../data/static/size-charts-navigation.json'),
    adaptiveHandler = require('./adaptiveWithStaticDataFactory'),
    _ = require('lodash'),
    sjl = require('sjljs');

function aboutUsDataProvider(req) {
    var sizeChartsHttpPath = '/about-us/shopping/sizecharts/',
        sizeChartsObj = sjl.jsonClone(sizeChartsJson),
        out = {
            controller: 'about-us',
            action: req.pathname,
            navContainerObj: navJson
        };

    switch (req.pathname) {
        case 'kids-boys-girls-clothing':
            _.find(sizeChartsObj, item => item.id === 'about_kids').active = true;
            break;
        case sizeChartsHttpPath + 'mens-shirt-suit-clothing':
            _.find(sizeChartsObj, item => item.id === 'about_men').active = true;
            break;
        case sizeChartsHttpPath + 'mens-womens-kids-shoes':
            _.find(sizeChartsObj, item => item.id === 'about_shoes').active = true;
            break;
        case sizeChartsHttpPath + 'womens-petite-plus':
        default:
            _.find(sizeChartsObj, item => item.id === 'about_women').active = true;
            break;
    }

    if (req.pathname.indexOf('\/sizecharts')) {
        out.sizeChartsNav = sizeChartsJson;
    }

    return out;
}

module.exports = sjl.curry(adaptiveHandler, sjl._, aboutUsDataProvider);
