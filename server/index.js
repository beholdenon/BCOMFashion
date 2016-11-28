'use strict';
var Hapi = require('hapi'),
    Handlebars = require('handlebars'),
    Path = require('path'),
    server = new Hapi.Server(),
    cluster = require('cluster');

require('./lib/helpers/handlebarsHelpers');    

server.connection({
    port: process.env.PORT,
    routes: {
        files: { relativeTo: Path.join(__dirname, 'public') },
        state: { failAction: 'ignore' },
        cors: true    
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
    { method: 'GET',  path: '/v3/{path*}',                                                                  config: require('./lib/handlers/api').v3 },
    { method: 'GET',  path: '/v4/{path*}',                                                                  config: require('./lib/handlers/api').v4 },
    { method: 'GET',  path: '/p/{path*}',                                                                   config: require('./lib/handlers/api').proxy },
    { method: 'GET',  path: '/getBag/{path*}',                                                              config: require('./lib/handlers/api').getbag },
    { method: 'POST', path: '/addToBag/{path*}',                                                            config: require('./lib/handlers/api').addbag },
    { method: 'POST', path: '/bag/add/{path*}',                                                             config: require('./lib/handlers/api').addbag },
    { method: 'GET',  path: '/akamai/{path*}',                                                              config: require('./lib/handlers/akamai') },
    { method: 'GET',  path: '/fashion/{path*}',                                                             config: require('./lib/handlers/assets').netstorage },
    { method: 'GET',  path: '/img/{path*}',                                                                 config: require('./lib/handlers/assets').commonAssets },
    { method: 'GET',  path: '/web20/assets/{path*}',                                                        config: require('./lib/handlers/assets').commonAssets },
    { method: 'GET',  path: '/shop/flyout/{path*}',                                                         config: require('./lib/handlers/assets').commonAssets },
    { method: 'GET',  path: '/dyn_img/cat_splash/{path*}',                                                  config: require('./lib/handlers/assets').commonAssets },
    { method: 'GET',  path: '/popup.ognc',                                                                  config: require('./lib/handlers/assets').commonAssets },
    { method: 'GET',  path: '/catalog/{path*}',                                                             config: require('./lib/handlers/assets').commonAssets },
    { method: 'GET',  path: '/registry/wedding/benefits-perks/',                                            config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/registry/wedding/checklist/',                                                 config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/registry/wedding/{path*}',                                                    config: require('./lib/handlers/assets').commonAssets },
    { method: 'POST', path: '/bag/view',                                                                    config: require('./lib/handlers/assets').bagHandler },
    { method: 'GET',  path: '/shop/topnav',                                                                 config: require('./lib/handlers/assets').topNav },
    { method: 'GET',  path: '/shop/{path*}',                                                                config: require('./lib/handlers/assets').commonAssets },
    { method: 'GET',  path: '/international/china-brazil/components/{path*}',                               config: require('./lib/handlers/assets').ngViews },
    { method: 'GET',  path: '/landing-page/hawaii-ala-moana/{deeplinks?}',                                  config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/affiliate-program-network-partner/',                                 config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/amfar-b-cause-philanthropy/',                                        config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/breast-cancer-research-foundation-b-cause-philanthropy/',            config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/buy-online-pickup-in-store/',                                        config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/child-mind-institute-b-cause-philanthropy/',                         config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/help-usa-b-cause-philanthropy/',                                     config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/jdrf-b-cause-philanthropy/',                                         config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/mobile-shopping-online/',                                            config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/new-store-openings/',                                                config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/pink-campaign-b-cause-philanthropy/',                                config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/shopping/fashion-studio-styling-services/',                          config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/shopping/international-visitor-services/',                           config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/shopping/personal-shopper-complimentary-service/',                   config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/shopping/shopping-services/',                                        config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/shopping/sizecharts/kids-boys-girls-clothing/',                      config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/shopping/sizecharts/mens-shirt-suit-clothing/',                      config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/shopping/sizecharts/mens-womens-kids-shoes/',                        config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/shopping/sizecharts/womens-petite-plus/',                            config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/about-us/store-events-ways-to-shop/',                                         config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/campaign/give-pink-get-more/{path*}',                                         config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/catalogs/',                                                                   config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/charlotte-tilbury-makeup/',                                                   config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/fashion-index/top-fashion-outlet-store/',                                     config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/fashion-tips/baby-essentials-must-haves-checklist/',                          config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/fashion-tips/good-sleep-guide/',                                              config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/fashion-tips/buying-rug-guide-2016/',                                         config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/fashion-tips/customize-michele-watch/',                                       config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/fashion-tips/mattress-buying-guide/',                                         config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/in-store/diane-von-furstenberg/',                                             config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/in-store/louis-vuitton/',                                                     config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/in-store/creed/',                                                             config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/in-store/chloe-clothing/',                                                    config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/in-store/{action}/',                                                          config: require('./lib/handlers/views').adaptiveWithStaticData },
    { method: 'GET',  path: '/lookbooks/burberry-pre-fall-trend-report-2016/',                              config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/lookbooks/cookware-sets-guide/',                                              config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/lookbooks/corporate-gift-ideas/',                                             config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/lookbooks/outfit-ideas-stylish-summer/',                                      config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/lookbooks/shoes-handbags-fall-2016-fashion-trends/',                          config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/lookbooks/spring-2016-bedding-guide/',                                        config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/lookbooks/spring-2016-cuba-travelogue/',                                      config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/lookbooks/spring-2016-mens-festival/',                                        config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/lookbooks/spring-2016-pierre-henri-mattout/interview/',                       config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/lookbooks/spring-2016-pierre-henri-mattout/no-results/',                      config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/lookbooks/spring-2016-pierre-henri-mattout/',                                 config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/lookbooks/spring-2016-prom-dresses/',                                         config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/lookbooks/spring-2016-womens-festival/',                                      config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/lookbooks/summer-party-dining-guide-2016/',                                   config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/lookbooks/',                                                                  config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/makeup-date/{path*}',                                                         config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/media/about/directory/',                                                      config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/media/about/history/',                                                        config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/sweepstakes/win-1000-bucks-writing-reviews/',                                 config: require('./lib/handlers/views').adaptive },
    { method: 'GET',  path: '/international/china-brazil/',                                                 config: require('./lib/handlers/views').responsiveCustomHF },
    { method: 'GET',  path: '/100-percent-2016/{path*}',                                                    config: require('./lib/handlers/views').responsiveCustomHF },
    { method: 'GET',  path: '/2016-fall-campaign-100-percent-exclusive/{path*}',                            config: require('./lib/handlers/views').responsiveCustomHF },
    { method: 'GET',  path: '/outlet-touch-screen/',                                                        config: require('./lib/handlers/views').responsiveCustomHF },
    { method: 'GET',  path: '/{path*}',                                                                     config: require('./lib/handlers/views').fallback }
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
                        '\n' + request.path +
                        '\n--------------------------------------------------\n');
    }
});

server.on('log', function(event) {
    console.log('\n--------------------------------------------------\n' +
                '|   SERVER EVENT LOG:: ', event.data,'   |\n' +
                '--------------------------------------------------\n');    
});

if (process.env.NODE_ENV === 'production') { // Heroku sets this in their environment
    var DYNO = process.env.DYNO_CLUSTERS;
    var numCPUs = require('os').cpus().length;

    if (!DYNO || DYNO > numCPUs) {
        console.log('DYNO_CLUSTERS undefined or set too high, using system count:', numCPUs);
    } else {
        numCPUs = DYNO;
    }

    if (cluster.isMaster) {
        for (var i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', function(worker, code, signal) {
            console.log( 'worker died. pid: ' + worker.process.pid, code?'code: ' + code:'', signal?'signal: ' + signal:'');
            cluster.fork();
        });

    } else if (cluster.isWorker) {
        server.start(function() {
            console.log('\n--------------------------------------------------\n' +
                        '|   SERVER STARTED AT:: ', server.info.uri,'   |\n' +
                        '--------------------------------------------------\n');
        });
    }

    cluster.on('online', function(worker) {
        console.log('worker ' + worker.process.pid + ' is online');
    });
} else {
    server.start(function() {
        console.log('\n--------------------------------------------------\n' +
                    '|   SERVER STARTED AT:: ', server.info.uri,'   |\n' +
                    '--------------------------------------------------\n');
    });
}

