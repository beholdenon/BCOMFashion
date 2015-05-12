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
        "global": "global",
        "base": "base",
        "router": "router",
        "views/fashionShoesView": "views/fashionShoesView",
        "views/newView": "views/newView",
        "templates": "templates/templates"
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
  'global',
  'base',
  'router',
  'views/fashionShoesView',
  'views/newView',
  'templates'
], function(Backbone, $, _, Global, Base, Router, FashionShoesView, NewView) {

  window.App = {};

  //TODO: Create a BACKBONE router
  
  Base();
  var app_router = new Router();
  Global();

  Backbone.history.start({
    pushState: true,
    urlRoot: '/'
  });

  $.ajax({
	method: 'GET',
	dataType:'json',
	url: '/api/v3/catalog/category/5545',
  }).success(function (res) {
	console.log(res);
  });

});
