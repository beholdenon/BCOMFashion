/**
 *
 * Need to move the requirejs-config section to a different file
 * Currently it's here because, this file loaded thru data-main in index.html
 * 
 */

(function() {
    var paths = {
            "backbone": "libs/backbone",
            "handlebars": "libs/handlebars",
            "jquery": "libs/jquery",
            "require": "libs/requirejs",
            "underscore": "libs/lodash",
            "desktopHeader": "includes/desktopHeader",
            "mobileHeader": "includes/mobileHeader"
        },
        shim = {
            "backbone": {
                "deps": ["underscore", "jquery"],
                "exports": "Backbone"
            },
            "handlebars": {
                "exports": "Handlebars"
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
    'mobileHeader'
], function(Backbone, $, _, DesktopHeader, MobileHeader) {
    window.App = {};

    if (BLOOMIES.isMobile) {
        MobileHeader()
    } else {
        DesktopHeader();
    }

    Backbone.history.start({
        pushState: true,
        urlRoot: '/'
    });
});
