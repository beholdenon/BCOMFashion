define([
  'backbone',
  'jquery',
  'underscore'
], function(Backbone, $, _) {

  // Globally namespaced objects, please keep to absolute minimum
  window.App = {};

  new AppRouter();

  Backbone.history.start({
    pushState: true//,
    // urlRoot: '/'
  });

});
