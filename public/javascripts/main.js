require([
    'jquery',
    'underscore',
    'coremetrics',
    'globals'   
], function($, _, Coremetrics, Globals) {
    window.Globals = Globals;

    // init global app namespace object
    Globals.Coremetrics = {
        pageID: null,
        catID: null,
        attr42: null
    };

    if ($('body').hasClass('bl_mobile')) {
        Globals.deviceType = 'mobile';
    } else if ($('body').hasClass('bl_tablet')) {
        Globals.deviceType = 'tablet';
    } else {
        Globals.deviceType = 'desktop';
    }

    // Initialize Global Header and Footer from MacysUI
    window.useNewDesign = true;

    // Initialize Coremetrics clientID and fire PageView tags
    Coremetrics.initCoreMetrics();

});
