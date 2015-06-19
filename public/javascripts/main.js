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
    // default namespace
    window.Globals = {};
    
    if (BLOOMIES.isMobile) {
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
