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
        "global": "global"
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
  'global'
], function(Backbone, $, _, global) {

  // Globally namespaced objects, please keep to absolute minimum
  window.App = {};

  //new AppRouter();
  console.log("erererer");
  
  global();

  Backbone.history.start({
    pushState: true//,
    // urlRoot: '/'
  });

});
