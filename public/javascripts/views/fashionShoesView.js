define([
  'backbone'
], function (Backbone) {

  'use strict';

  var fashionShoes = Backbone.View.extend({
  	
  	el: '#bl_main_wrapper',

    init: function () {
      this.render();
    },

    render: function () {
      this.$el.html(TEMPLATE.fashionShoes());
    }

  });

  return fashionShoes;

});
