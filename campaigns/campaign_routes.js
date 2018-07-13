module.exports = [
    { method: 'GET',  path: '/b/campaigns/heart-of-ny/{path*}', config: require('../lib/handlers/views').responsiveCustomHF },
    { method: 'GET',  path: '/b/campaigns/glowhaus/{path*}', config: require('../lib/handlers/views').responsiveCustomHF },

    { method: 'GET',  path: '/b/campaigns/2018-spring-campaign-100-percent-exclusive/{path*}', config: require('../lib/handlers/views').responsiveCustomHF },
    { method: 'GET',  path: '/b/campaigns/spring-fashion-trends/2018/{path*}',    config: require('../lib/handlers/views').responsiveCustomHF },
    { method: 'GET',  path: '/b/campaigns/example-page/{path*}',                config: require(__dirname + '/../lib/handlers/views').adaptive },
    { method: 'GET',  path: '/b/campaigns/makeup-date/makeup-tutorial_old/{path*}', config: require(__dirname + '/../lib/handlers/views').adaptive },
    { method: 'GET',  path: '/b/campaigns/makeup-date/makeup-tutorial/{path*}', config: require(__dirname + '/../lib/handlers/views').adaptive },

  // EXAMPLES
  //{ method: 'GET',  path: '/campaigns/example-page/{path*}',    config: require('../server/lib/handlers/views').adaptive },
  //{ method: 'GET',  path: '/campaigns/example-page/{path*}',    config: require('./lib/handlers/views').responsiveCustomHF },
];