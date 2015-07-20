/**
 * 
 * Need to move the requirejs-config section to a different file
 * Currently it's here because, this file loaded thru data-main in index.html
 * 
 */

(function() {
    var paths = {
            'backbone': 'libs/backbone',
            'handlebars': 'libs/handlebars',
            'jquery': 'libs/jquery',
            'require': 'libs/requirejs',
            'underscore': 'libs/lodash',
            'globalns': 'includes/globalns',
            'desktopHeader': 'includes/desktopHeader',
            'mobileHeader': 'includes/mobileHeader',
            'coremetrics': 'includes/coremetrics'
        },
        shim = {
            'backbone': {
                'deps': ['underscore', 'jquery'],
                'exports': 'Backbone'
            },
            'handlebars': {
                'exports': 'Handlebars'
            }
        };

    require.config({
        paths: paths,
        shim: shim
    });
})();

define([
    'backbone',
    'jquery',
    'underscore',
    'desktopHeader',
    'mobileHeader',
    'coremetrics'
], function(Backbone, $, _, DesktopHeader, MobileHeader, Coremetrics) {
    
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

    if (typeof window.Globals.mobileOS !== "undefined") {
        MobileHeader()
    } else {
        DesktopHeader();
    }

    // show/hide the DOWNLOAD THE BIG BROWN BAG APP footer btn based on the mobile OS detection
    BLOOMIES.BBBappBtn();

    // init CM: env setup; pageview; nav links clicks
    Coremetrics.initCoreMetrics();

    Backbone.history.start({
        pushState: true,
        urlRoot: '/'
    });
});
