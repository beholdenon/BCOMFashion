/**
 * Created by u067265 on 12/30/16.
 */

'use strict';

let navJson = require('../data/static/about-us-navigation.json'),
    sizeChartsJson = require('../data/static/size-charts-navigation.json'),
    adaptiveHandler = require('./adaptiveWithStaticDataFactory'),
    sjl = require('sjljs'),
    getPageItemByUri = (uri, pageItemsContainer) => {
        let foundItems = pageItemsContainer.pages.filter(item => {
            return item.href === uri;
        });
        return foundItems.length > 0 ? foundItems[0] : null;
    };

function aboutUsDataProvider(req) {
    var sizeChartsObj = sjl.jsonClone(sizeChartsJson),
        out = {
            aboutUsNavContainer: navJson
        };

    if (req.url.pathname && req.url.pathname.indexOf('/sizecharts/') > -1) {
        getPageItemByUri(req.url.pathname, sizeChartsObj).active = true;
        out.sizeChartNavContainer = sizeChartsObj;
    }

    return out;
}

module.exports = sjl.curry(adaptiveHandler, sjl._, aboutUsDataProvider);
