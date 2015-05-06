
'use strict';
var _       = require('lodash'),
    util    = require('util'),

var parser = {
  /**
   * Internal function used to take an upstream response and manipulate it
   * before sending it back to the client.
   *
   * @param request {Object} the node request object
   * @param payload {Object} the JSON response from the upstream
   *
   * @return - the response data expected by the client
   */
  _parse: function(request, payload) {
    var response = payload;
    return response;
  }
};

module.exports = parser;
