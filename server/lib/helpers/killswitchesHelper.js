'use strict';

let setUserToken = require('./../helpers/userTokenHelper'),
    iShipCountries = require('./../helpers/iShipCountries'),

    killswitches = {
    argsFactory: function () {
        return {
            timeStamp: new Date(),
            isMobile: false,
            isTablet: false,
            headTitle: '',
            headMeta: '',
            headCanonical: '',
            preLoadScripts: '',
            tealiumScriptEnabled: process.env.tealiumScriptEnabled === "true",
            tealiumType: process.env.ENV_TYPE === "prod" ? "prod" : "qa",
            brightTagEnabled: process.env.brightTagEnabled !== "false",
            polarisHeaderFooterEnabled: process.env.polarisHeaderFooterEnabled === "true",
            polarisMobileHeaderFooterEnabled: process.env.polarisMobileHeaderFooterEnabled === "true",
            breastCancerAwarenessCampaignEnabled: process.env.breastCancerAwarenessCampaignEnabled === "true"

        };
    },
    pageViewArgsFactory: function (req, args) {
        let signUpFieldInternationalEnabled = false;
        // If signUpFieldInternationalEnabled KS is false,
        // the fields should be visible and should not check the shippingCountry cookie value
        if (!process.env.signUpFieldInternationalEnabled || process.env.signUpFieldInternationalEnabled === 'false') {
            signUpFieldInternationalEnabled = true;
        } else {
            signUpFieldInternationalEnabled = !iShipCountries.includes(req.state.shippingCountry);
        }
        args.signUpFieldInternationalEnabled = signUpFieldInternationalEnabled;
        return {
            args: args,
            isApp: req.state.ishop_app,
            assetsHost: process.env.BASE_ASSETS,
            baseHost: process.env.BASE_HOST,
            secureHost: process.env.SECURE_HOST,
            mobileHost: process.env.MOBILE_HOST,
            slashMinSuffix: ( req.query.debug ? '' : '/min' ),
            bvUserToken: setUserToken(req)
        };
    }
};

module.exports = killswitches;