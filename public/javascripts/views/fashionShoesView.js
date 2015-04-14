define([
  'backbone'
], function (Backbone) {

  'use strict';

  var fashionShoes = Backbone.View.extend({
  	
  	el: '#bl_main_wrapper',

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.html(Templates.fashionShoes());
    }

  });

  return fashionShoes;

});
