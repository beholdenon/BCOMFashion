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
        Coremetrics: {
            pageID: null,
            catID: null,
            attr42: null
        }
    };

    if ($('body').hasClass('bl_mobile')) {
        window.Globals.deviceType = 'mobile';
    } else if ($('body').hasClass('bl_tablet')) {
        window.Globals.deviceType = 'tablet';
    } else {
        window.Globals.deviceType = 'desktop';
    }

    // Initialize Global Header and Footer from MacysUI
    window.useNewDesign = true;
    GlobalHF();

    // Initialize Coremetrics clientID and fire PageView tags
    Coremetrics.initCoreMetrics();

});
