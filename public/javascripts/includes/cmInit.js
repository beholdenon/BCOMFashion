define([ 
    'underscore',
    'jquery'
], function(_, $) {

    'use strict';

    function setEnvironment(fileName) {

        var env = 'dev';

        if (env === 'dev') {
            return cmSetTest();
        } else if (env === 'production') {
            return cmSetProduction();
        } else {
            throw 'ERROR: unidentified env variable'
        }
    };

    function cmInit() {
        var page_ID = 'fashion_',
            cat_ID = 'xx-xx-xx-xx',
            cmIntlShip = getCookie('shippingCountry'),
            fileName = '.env';

        BLOOMIES.coremetrics.pageViewExploreAttributes = new BLOOMIES.coremetrics.exploreAttributes();

        if (BLOOMIES && BLOOMIES.coremetrics) {
            BLOOMIES.coremetrics.pageViewExploreAttributes.append({
                37: ''
            });
        }

        setEnvironment(fileName);

        if (cmIntlShip && BLOOMIES.iShip.internationalMode) {
            BLOOMIES.coremetrics.cmCreatePageviewTag('Intl_' + cmIntlShip + ':' + page_ID, cat_ID, '', '');
        } else {
            BLOOMIES.coremetrics.cmCreatePageviewTag(page_ID, cat_ID, '', '');
        }
    };

    return cmInit;

});
