module.exports = [

    { method: 'GET',  path: '/b/campaigns/example-page/{path*}',                config: require(__dirname + '/../lib/handlers/views').adaptive },
    { method: 'GET',  path: '/b/campaigns/makeup-date/makeup-tutorial/{path*}', config: require(__dirname + '/../lib/handlers/views').adaptive },


    // EXAMPLES
    //{ method: 'GET',  path: '/campaigns/example-page/{path*}',    config: require('../server/lib/handlers/views').adaptive },
    //{ method: 'GET',  path: '/campaigns/example-page/{path*}',    config: require('./lib/handlers/views').responsiveCustomHF },
];