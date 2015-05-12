'use strict';
var serviceProxy = require('./serviceProxy');

module.exports = {
  description: 'v3 category',
  notes: 'category details',
  tags: ['Catalog', 'api'],
  handler: {
    proxy: {
      timeout: serviceProxy.timeout,
      passThrough: true,
      acceptEncoding: false,
      mapUri: function(request, callback) {
        var headers        = serviceProxy.getHeaders(request, process.env.CATALOGCATEGORYV3_KEY);
		request.url.host   = serviceProxy.getHost(request, process.env.CATEGORYINDEXV3_HOST || process.env.API_HOST);
        request.app.parser = require('./parsers/category');

        callback(null, request.url.format(request.url), headers);
      },
      onResponse: serviceProxy.defaultOnResponse
    }
  }
};
