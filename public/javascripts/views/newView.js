define([
  'backbone'
], function (Backbone) {

  'use strict';

  var newView = Backbone.View.extend({
  	
  	el: '#bl_main_wrapper',

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.html(Templates.newUrl());
    }

  });

  return newView;

});
