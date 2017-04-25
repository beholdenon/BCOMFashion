/**
 * Created by u067265 on 12/30/16.
 */

'use strict';

let navJson = require('../data/static/about-us-navigation.json'),
    sizeChartsJson = require('../data/static/size-charts-navigation.json'),
    adaptiveHandler = require('./adaptiveWithStaticDataFactory'),
    aboutUsNavFactory = require('../helpers/aboutUsNavFactoryForMobile'),
    getPageItemByUri = (uri, pageItemsContainer) => {
        let foundItems = pageItemsContainer.pages.filter(item => {
            return item.href.split('?')[0] === uri;
        });
        return foundItems.length > 0 ? foundItems[0] : null;
    };

function aboutUsDataProvider(req) {
    var sizeChartsObj = sizeChartsJson,
        out = {
            aboutUsNavContainer: aboutUsNavFactory(navJson, req.url.pathname)
        };

    if (req.url.pathname && req.url.pathname.indexOf('/sizecharts/') > -1) {
        let foundSizeChartPageObj = getPageItemByUri(req.url.pathname, sizeChartsObj);
        if (foundSizeChartPageObj) {
            out.foundSizeChartPageObj = true;
        }
        out.sizeChartNavContainer = aboutUsNavFactory(sizeChartsObj, req.url.pathname);
    }

    return out;
}

module.exports = adaptiveHandler(0, aboutUsDataProvider, {layout: 'about-us-standard'});
