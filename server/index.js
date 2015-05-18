'use strict';
var Hapi    = require('hapi');
var Handlebars = require('handlebars');

var server = new Hapi.Server();

server.connection({
  port: +process.env.PORT,
  routes: {
    files: { relativeTo: __dirname + '/public' },
    state: { failAction: 'ignore' }
  },
  state: { ignoreErrors: false, strictHeader: false }
});

server.views({
  engines: {
    "html": Handlebars
  },
  path: __dirname + '/lib/views',
  layoutPath: __dirname + '/lib/views/layout',
  layout: 'layout',
  partialsPath: __dirname + '/lib/views/partials'
});

var routes = [
  { method: 'GET',    path: '/fashion/{path*}',        config: require('./lib/assets').fashion },
  { method: 'GET',    path: '/shop/{path*}',           config: require('./lib/assets').shop },
  { method: 'GET',    path: '/{path*}',                config: require('./lib/assets').fallback },
  { method: 'GET',    path: '/api/{path*}',            config: require('./lib/category') }
];

server.route(routes);

server.ext('onPreHandler', function(request, reply) {
  var tagsArray = request.route.settings.tags;
  if (tagsArray && tagsArray.indexOf('api') > -1) {
    request.url.protocol = 'http';
    request.url.pathname = request.url.pathname.replace(/^\/api\//, '');
  }
  
  return reply.continue();
});

server.on('request', function(request, event, tags) {
  if (tags.error) {
    console.log('Tags:', Object.keys(tags).join(', '), '~', (event.data ? event.data.stack || JSON.stringify(event.data) : ''));
  }
});

server.on('request-internal', function(request, event, tags) {
  if (tags.error) {
    console.log('Tags:', Object.keys(tags).join(', '), '~', (event.data ? event.data.stack || JSON.stringify(event.data) : ''));
  }
});

server.on('log', function(event) {
  console.log('Event data: ', event.data);
});

// Start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
