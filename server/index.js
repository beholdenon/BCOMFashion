'use strict';
/* jshint ignore:start */

const Hapi = require('hapi'),
    Handlebars = require('handlebars'),
    Path = require('path'),
    cluster = require('cluster'),
    viewHandlers = require('./lib/handlers/views'),
    Vision = require('vision'),
    h2o2 = require('h2o2'),
    inert = require('inert'),

    server = Hapi.Server({
        port: process.env.PORT,
        routes: {
            files: { relativeTo: Path.join(__dirname, 'public') },
            state: { failAction: 'ignore' },
            cors: true,
        },
        state: { ignoreErrors: false, strictHeader: false } 
    }),

    campaigns = require(__dirname + '/routes/campaign_routes');

require('./lib/helpers/handlebarsHelpers');    

const validate_routes = ( route, validation, validation_string ) => {
    let invalid = '';

    for ( let i = 0; i < route.length; i++ ) {

        if ( ! validation.test(route[i].path) ) {
            invalid += "\n (" + i + ")   " + route[i].path;   
        }
    }

    if ( invalid.length > 0 ) {
        console.error("\x1b[31m",
            "\n------------------------------------------------------\n",
            "                Invalid Routes(s)", 
            invalid,
            "\n------------------------------------------------------",
            "\n    "+validation_string,
            "\n------------------------------------------------------\n",
            "\x1b[0m");

        process.exit(1);
    }
};

const startServer = async () => {
    
    await server.register(Vision);

    await server.register(h2o2);

    await server.register(inert);

    server.views({
        engines: {
            'html': Handlebars
        },
        relativeTo: __dirname,
        path: 'lib/views',
        layoutPath: 'lib/views/layout',
        partialsPath: 'lib/views/partials',
        layout: 'standard'
    });

    let routes = [
        { method: 'GET',  path: '/v3/{path*}',                                                                  config: require('./lib/handlers/api').v3 },
        { method: 'GET',  path: '/b/v3/{path*}',                                                                config: require('./lib/handlers/api').v3 },
        { method: 'GET',  path: '/v4/{path*}',                                                                  config: require('./lib/handlers/api').v4 },
        { method: 'GET',  path: '/b/v4/{path*}',                                                                config: require('./lib/handlers/api').v4 },
        { method: 'GET',  path: '/getBag/{path*}',                                                              config: require('./lib/handlers/api').getbag },
        { method: 'GET',  path: '/b/getBag/{path*}',                                                            config: require('./lib/handlers/api').getbag },
        { method: 'POST', path: '/addToBag/{path*}',                                                            config: require('./lib/handlers/api').addbag },
        { method: 'POST', path: '/b/addToBag/{path*}',                                                          config: require('./lib/handlers/api').addbag },
        { method: 'POST', path: '/bag/add/{path*}',                                                             config: require('./lib/handlers/api').addbag },
        { method: 'POST', path: '/b/bag/add/{path*}',                                                           config: require('./lib/handlers/api').addbag },
        { method: 'GET',  path: '/press/{path*}',                                                               config: require('./lib/handlers/api').press },
        { method: 'GET',  path: '/p/{path*}',                                                                   config: require('./lib/handlers/api').proxy },
        { method: 'GET',  path: '/akamai/{path*}',                                                              config: require('./lib/handlers/akamai') },
        { method: 'GET',  path: '/fashion/{path*}',                                                             config: require('./lib/handlers/assets').netstorage },
        { method: 'GET',  path: '/b/fashion/{path*}',                                                           config: require('./lib/handlers/assets').netstorage },
        { method: 'GET',  path: '/img/{path*}',                                                                 config: require('./lib/handlers/assets').commonAssets },
        { method: 'GET',  path: '/web20/assets/{path*}',                                                        config: require('./lib/handlers/assets').commonAssets },
        { method: 'GET',  path: '/shop/flyout/{path*}',                                                         config: require('./lib/handlers/assets').commonAssets },
        { method: 'GET',  path: '/dyn_img/cat_splash/{path*}',                                                  config: require('./lib/handlers/assets').commonAssets },
        { method: 'GET',  path: '/popup.ognc',                                                                  config: require('./lib/handlers/assets').commonAssets },
        { method: 'GET',  path: '/catalog/{path*}',                                                             config: require('./lib/handlers/assets').commonAssets },
        
        { method: 'GET',  path: '/registry/wedding/benefits-perks/',                                            config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/registry/wedding/checklist/',                                                 config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/registry/wedding/{path*}',                                                    config: require('./lib/handlers/assets').commonAssets },
        { method: 'GET',  path: '/b/registry/wedding/benefits-perks/',                                          config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/b/registry/wedding/checklist/',                                               config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/b/registry/wedding/{path*}',                                                  config: require('./lib/handlers/assets').commonAssets },
        
        { method: 'POST', path: '/bag/view',                                                                    config: require('./lib/handlers/assets').bagHandler },
        { method: 'GET',  path: '/shop/topnav',                                                                 config: require('./lib/handlers/assets').topNav },
        { method: 'GET',  path: '/shop/{path*}',                                                                config: require('./lib/handlers/assets').commonAssets },
        { method: 'GET',  path: '/international/china-brazil/components/{path*}',                               config: require('./lib/handlers/assets').ngViews },
        { method: 'GET',  path: '/landing-page/hawaii-ala-moana/{deeplinks?}',                                  config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/about-us/{action*}',                                                          config: require('./lib/handlers/aboutUsHandler')},
        { method: 'GET',  path: '/b/about-us/{action*}',                                                        config: require('./lib/handlers/aboutUsHandler')},
        { method: 'GET',  path: '/campaign/give-pink-get-more/{path*}',                                         config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/b/campaign/give-pink-get-more/{path*}',                                       config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/campaign/give-pink-get-more/terms-and-conditions/{path*}',                    config: require('./lib/handlers/views').fallback },
        { method: 'GET',  path: '/b/campaign/give-pink-get-more/terms-and-conditions/',                         config: require('./lib/handlers/views').fallback },
        
        { method: 'GET',  path: '/catalogs/',                                                                   config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/bwallet/',                                                                    config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/charlotte-tilbury-makeup/',                                                   config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/fashion-index/top-fashion-outlet-store/',                                     config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/fashion-tips/baby-essentials-must-haves-checklist/',                          config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/fashion-tips/good-sleep-guide/',                                              config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/fashion-tips/buying-rug-guide-2016/',                                         config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/fashion-tips/customize-michele-watch/',                                       config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/fashion-tips/mattress-buying-guide/',                                         config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/in-store/diane-von-furstenberg/',                                             config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/in-store/louis-vuitton/',                                                     config: require('./lib/handlers/views').adaptive },

        { method: 'GET',  path: '/in-store/{action*}',                                                          config: viewHandlers.adaptiveWithStaticDataFactory('in-store/index') },
        { method: 'GET',  path: '/b/in-store/{action*}',                                                        config: viewHandlers.adaptiveWithStaticDataFactory('in-store/index') },

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
        { method: 'GET',  path: '/b/lookbooks/',                                                                config: require('./lib/handlers/views').adaptive },
       
        { method: 'GET',  path: '/loyallist/benefits/',                                                         config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/b/loyallist/benefits/',                                                       config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/loyallist/top-of-the-list/',                                                  config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/b/loyallist/top-of-the-list/',                                                config: require('./lib/handlers/views').adaptive },
        
        { method: 'GET',  path: '/denim/{path*}',                                                               config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/b/denim/{path*}',                                                             config: require('./lib/handlers/views').adaptive },
        
        { method: 'GET',  path: '/makeup-date/{path*}',                                                         config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/b/makeup-date/{path*}',                                                       config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/sweepstakes/win-1000-bucks-writing-reviews/',                                 config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/product/review/',                                                             config: require('./lib/handlers/views').adaptive },
        
        { method: 'GET',  path: '/furniture-mattress-warranty/',                                                config: require('./lib/handlers/views').responsiveCustomHF },
        { method: 'GET',  path: '/b/furniture-mattress-warranty/',                                              config: require('./lib/handlers/views').responsiveCustomHF },

        { method: 'GET',  path: '/b/furniture-mattress-store-locations',                                        config: require('./lib/handlers/views').adaptive },
        { method: 'GET',  path: '/furniture-mattress-store-locations',                                          config: require('./lib/handlers/views').adaptive },

        { method: 'GET',  path: '/international/{path*}',                                                       config: require('./lib/handlers/views').angularCustom },
        { method: 'GET',  path: '/b/international/{path*}',                                                     config: require('./lib/handlers/views').angularCustom },
        
        { method: 'GET',  path: '/100-percent-2016/{path*}',                                                    config: require('./lib/handlers/views').responsiveCustomHF },
        { method: 'GET',  path: '/2016-fall-campaign-100-percent-exclusive/{path*}',                            config: require('./lib/handlers/views').responsiveCustomHF },
        
        //{ method: 'GET',  path: '/b/2017-spring-campaign-100-percent-exclusive/{path*}',                        config: require('./lib/handlers/views').responsiveCustomHF },
        //{ method: 'GET',  path: '/2017-spring-campaign-100-percent-exclusive/{path*}',                          config: require('./lib/handlers/views').responsiveCustomHF },
        { method: 'GET',  path: '/b/2017-fall-campaign-100-percent-exclusive/{path*}',                          config: require('./lib/handlers/views').responsiveCustomHF },
        { method: 'GET',  path: '/2017-fall-campaign-100-percent-exclusive/{path*}',                            config: require('./lib/handlers/views').responsiveCustomHF },
        { method: 'GET',  path: '/b/2017-glowhaus/{path*}',                                                     config: require('./lib/handlers/views').responsiveCustomHF },
        { method: 'GET',  path: '/2017-glowhaus/{path*}',                                                       config: require('./lib/handlers/views').responsiveCustomHF },

        { method: 'GET',  path: '/{path*}',                                                                     config: require('./lib/handlers/views').fallback },

        { method: 'GET',  path: '/b/campaigns/2017-spring-campaign-100-percent-exclusive/{path*}',                        config: require('./lib/handlers/views').responsiveCustomHF },
    ];

    validate_routes(campaigns, /^(\/b)?\/campaigns\//, 'All campaigns must start with /b/campaigns/' );

    routes = routes.concat(campaigns);

    server.route(routes);

    server.ext('onPreHandler', (request, reply) => {
        const tagsArray = request.route.settings.tags;

        if (tagsArray && tagsArray.indexOf('api') > -1) {
            request.url.protocol = 'http';
            request.url.pathname = request.url.pathname.replace(/^\/api\//, '');
        }

        return reply.continue;
    });

    server.ext('onPreResponse', (request, reply) => {
        const response = request.response;

        if (response.isBoom) {
            return reply.redirect('/errors/');
        } else if (response.variety === 'view') {
            const source = response.source;

            // Pre-render the template and see if there's any errors
            return reply.view(source.template, source.context, source.options);
        }

        return reply.continue;
    });

    server.events.on('request', (request, event, tags) => {
        if (tags.error) {
            console.log('\n--------------------------------------------------\n' +
                            'SERVER ON-REQUEST ERROR::\n'+
                            Object.keys(tags).join(', '), '~', (event.data ? event.data.stack || JSON.stringify(event.data) : '') +
                            '\n--------------------------------------------------\n');      
        }
    });

    server.events.on('log', (event) => {
        console.log('\n--------------------------------------------------\n' +
                    '|   SERVER EVENT LOG:: ', event.data,'   |\n' +
                    '--------------------------------------------------\n');    
    });

    if (process.env.NODE_ENV === 'production') { // Heroku sets this in their environment
        const DYNO = process.env.DYNO_CLUSTERS;
        let numCPUs = require('os').cpus().length;

        if (!DYNO || DYNO > numCPUs) {
            console.log('DYNO_CLUSTERS undefined or set too high, using system count:', numCPUs);
        } else {
            numCPUs = DYNO;
        }

        if (cluster.isMaster) {
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();
            }

            cluster.on('exit', (worker, code, signal) => {
                console.log( 'worker died. pid: ' + worker.process.pid, code?'code: ' + code:'', signal?'signal: ' + signal:'');
                cluster.fork();
            });

        } else if (cluster.isWorker) {
            server.start(() => {
                console.log('\n--------------------------------------------------\n' +
                            '|   SERVER STARTED AT:: ', server.info.uri,'   |\n' +
                            '--------------------------------------------------\n');
            });
        }

        cluster.on('online', (worker) => {
            console.log('worker ' + worker.process.pid + ' is online');
        });
    } else {
        server.start(() => {
            console.log('\n--------------------------------------------------\n' +
                        '|   SERVER STARTED AT:: ', server.info.uri,'   |\n' +
                        '--------------------------------------------------\n');
        });
    }
};
startServer();

/* jshint ignore:end */