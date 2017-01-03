/**
 * Created by u067265 on 1/3/17.
 */
let handlebars = require('handlebars'),
    path = require('path'),
    serverRootPath = path.join(__dirname, '/../'),
    viewsPath = path.join(serverRootPath, 'views'),
    layoutsPath = path.join(viewsPath, 'layout'),
    partialsPath = path.join(viewsPath, 'partials');

module.exports = {
    engines: {
        'html': handlebars
    },
    path: viewsPath,
    layout: 'standard',
    layoutPath: layoutsPath,
    partialsPath: partialsPath
};
