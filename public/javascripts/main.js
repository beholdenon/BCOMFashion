require([
    'jquery',
    'underscore',
    'coremetrics',
    'globals',
    'globalHeaderFooter',    
], function($, _, Coremetrics, Globals, GlobalHF) {

    // init global app namespace object
    window.Globals = {
        env: window.ENV_CONFIG || 'dev',
        deviceType: null,
        mobileOS: window.MOBILE_OS,
        Coremetrics: {
            pageID: null,
            catID: null,
            attr42: null
        }
    };

    if ($('body').hasClass('mobile')) {
        window.Globals.deviceType = 'mobile';
    } else if ($('body').hasClass('tablet')) {
        window.Globals.deviceType = 'tablet';
    } else {
        window.Globals.deviceType = 'desktop';
    }

    // Initialize Global Header and Footer from MacysUI
    window.useNewDesign = true;
    GlobalHF();

    // Initialize Coremetrics clientID and fire PageView tags
    Coremetrics.initCoreMetrics();

    Backbone.history.start({
        pushState: true,
        urlRoot: '/'
    });
});
