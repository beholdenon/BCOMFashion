require([
    'jquery',
    'underscore',
    'coremetrics',
    'globals',
    'globalHeaderFooter',
    'cookie'    
], function($, _, Coremetrics, Globals, GlobalHF, Cookie) {

    // init global app namespace object
    window.Globals = {
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
    
    // Load Global header and footer if ishop_app cookie is not defined,
    // meaning we are not loading this page from the Bloomingdale's app
    // If page is being loaded from the app, do not show the Global header footer
    if ( !Cookie.get('ishop_app') ) {
        GlobalHF();
    }

    // Initialize Coremetrics clientID and fire PageView tags
    Coremetrics.initCoreMetrics();

});
