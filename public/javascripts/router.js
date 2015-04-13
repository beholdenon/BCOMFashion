/**
 * @file router.js
 *
 */

define([
  'backbone',
  'views/fashionShoesView',
  'views/newView'
], function(Backbone, FashionShoesView, NewView) {
  'use strict';

  return Backbone.Router.extend({
    routes: {
      '/fashion-index/premium-shoes-handbags-spring-collections-2015': 'fashionShoes',
      '/new': 'newUrl'
    },

    fashionShoes: function() {
      new FashionShoesView();
    },

    newUrl: function() {
      new NewView();
    }

  });
});
