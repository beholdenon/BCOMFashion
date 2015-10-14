'use strict';
var Hapi = require('hapi'),
    Handlebars = require('handlebars'),
    Path = require('path'),
    server = new Hapi.Server();

require('./lib/helpers/handlebarsHelpers');    

server.connection({
    port: process.env.PORT,
    routes: {
        files: { relativeTo: Path.join(__dirname, 'public') },
        state: { failAction: 'ignore' }       
    },
    state: { ignoreErrors: false, strictHeader: false } 
});
  
server.views({
    engines: {
        'html': Handlebars
    },
    path: Path.join(__dirname, 'lib/views'),
    layoutPath: Path.join(__dirname, 'lib/views/layout'),
    layout: 'standard',
    partialsPath: Path.join(__dirname, '/lib/views/partials')
});

var routes = [
    { method: 'GET',  path: '/v3/{path*}',                                      config: require('./lib/handlers/api').v3 },
    { method: 'GET',  path: '/v4/{path*}',                                      config: require('./lib/handlers/api').v4 },
    { method: 'GET',  path: '/getBag/{path*}',                                  config: require('./lib/handlers/api').getbag },
    { method: 'POST', path: '/addToBag/{path*}',                                config: require('./lib/handlers/api').addbag },
    { method: 'GET',  path: '/fashion/{path*}',                                 config: require('./lib/handlers/assets').fashion },
    { method: 'GET',  path: '/shop/{path*}',                                    config: require('./lib/handlers/assets').shop },
    { method: 'GET',  path: '/akamai/{path*}',                                  config: require('./lib/handlers/akamai') },
    // { method: 'GET',  path: '/{--path--}',                                      config: require('./lib/handlers/views').responsive },
    // { method: 'GET',  path: '/{--path--}',                                      config: require('./lib/handlers/views').nonResponsiveCustomHF },
    { method: 'GET',  path: '/international/china-brazil/components/{path*}',   config: require('./lib/handlers/assets').ngViews },
    { method: 'GET',  path: '/international/china-brazil/',                     config: require('./lib/handlers/views').responsiveCustomHF },
    { method: 'GET',  path: '/{path*}',                                         config: require('./lib/handlers/views').fallback }
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

server.ext('onPreResponse', function(request, reply) {
    var response = request.response;

    if (response.isBoom) {
        return reply.redirect('/errors/');

    } else if (response.variety === 'view') {
        var source = response.source;

        // Pre-render the template and see if there's any errors
        return server.render(source.template, source.context, function(err) {
            if (err) {
                return reply.redirect('/errors/');
            }

            reply.continue();
        });
    }

    return reply.continue();
});

server.on('request', function(request, event, tags) {
    if (tags.error) {
        console.log('\n--------------------------------------------------\n' +
                        'SERVER ON-REQUEST ERROR::\n'+
                        Object.keys(tags).join(', '), '~', (event.data ? event.data.stack || JSON.stringify(event.data) : '') +
                        '\n--------------------------------------------------\n');      
    }
});

server.on('request-internal', function(request, event, tags) {
    if (tags.error) {
        console.log('\n--------------------------------------------------\n' +
                        'SERVER INTERNAL ERROR::\n'+
                        Object.keys(tags).join(', '), '~', (event.data ? event.data.stack || JSON.stringify(event.data) : '') +
                        '\n--------------------------------------------------\n');       
    }
});

server.on('log', function(event) {
    console.log('\n--------------------------------------------------\n' +
                '|   SERVER EVENT LOG:: ', event.data,'   |\n' +
                '--------------------------------------------------\n');    
});

// Start the server
server.start(function() {
    console.log('\n--------------------------------------------------\n' +
                '|   SERVER STARTED AT:: ', server.info.uri,'   |\n' +
                '--------------------------------------------------\n');
});
