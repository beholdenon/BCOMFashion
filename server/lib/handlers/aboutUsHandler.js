/**
 * Created by u067265 on 12/30/16.
 */

'use strict';

let DEV_MODE = process.env && typeof process.env.NODE_ENV === 'string' && process.env.NODE_ENV.toLowerCase() === 'dev',
    navJson = require('../data/static/about-us-navigation.json'),
    sizeChartsJson = require('../data/static/size-charts-navigation.json'),
    adaptiveHandler = require('./adaptiveWithStaticDataFactory'),
    // transformForMobile = require('../utils/aboutUsNavFactoryForMobile'),
    jsonClone = obj => JSON.parse(JSON.stringify(obj)),
    getPageItemByUri = (uri, pageItemsContainer) => {
        let foundItems = pageItemsContainer.pages.filter(item => {
            return item.href === uri;
        });
        return foundItems.length > 0 ? foundItems[0] : null;
    };

function aboutUsDataProvider(req) {
    var sizeChartsObj = jsonClone(sizeChartsJson),
        out = {
            aboutUsNavContainer: DEV_MODE ? navJson : transformForMobile(navJson)
        };

    if (req.url.pathname && req.url.pathname.indexOf('/sizecharts/') > -1) {
        let foundSizeChartPageObj = getPageItemByUri(req.url.pathname, sizeChartsObj);
        if (foundSizeChartPageObj) {
            foundSizeChartPageObj.active = true;
        }
        out.sizeChartNavContainer = DEV_MODE ? sizeChartsObj : transformForMobile(sizeChartsObj);
    }

    return out;
}

module.exports = adaptiveHandler(0, aboutUsDataProvider, {layout: 'about-us-standard'});
