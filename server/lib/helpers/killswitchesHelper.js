'use strict';

var killswitches = {
    argsFactory : function () {
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
    }
};

module.exports = killswitches;