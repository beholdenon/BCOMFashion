var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    querystring = require('querystring'),
    bodyParser = require('body-parser');
    // sass = require("node-sass");

var routes = require('./routes/index'),
    users = require('./routes/users');

var request = require('request');

var app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// ======================================================
// ======================================================
//  Bloomingdales Proxy Routing
// ======================================================
// ======================================================

    // Proxy variables.
    var apiKey      = '5dbw5xjgkhzxh45pvpr5kubx',
        orderKey    = 'jj5buwu772sjq3gkjx7wm2pn',
        v1Key       = 'dpqu9t5by6vb5mvdxdr9ncb2',
        secureKey   = 'yccsf9ccz5gdux24yq84p4yd';

    var apiName     = 'x-macys-webservice-client-id',
        tokenName   = 'bearer';

    // Proxy for all standard WSSG API Calls
    app.use('/api/*', function(req, res) {
        var path = "https://api.bloomingdales.com/"+req.params[0],
            post_data = req.body;

        req.headers[apiName]=apiKey;
        req.headers['accept']='application/json';

        if ( req.method === 'POST' ) {
            request(path, post_data, function(){
            }).pipe(res);
        } else if ( req.method === 'GET' || req.method === 'HEAD' ) {
            req.pipe(request(path, req.body )).pipe(res);
        }
    });

    app.post('/v1service/*', function(req, res) {

        var options = {
            url: "https://api.bloomingdales.com/"+req.params[0],
            headers: {
                'X-Macys-Webservice-Client-Id': v1Key,
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: req.body,
            json: true,
            method: 'POST'
        };

        console.log(options);

        request(options, function(err, resp, body){
            res.json(resp.body);
        });

    });

    // Proxy for direct BCOM server ajax calls.
    app.use('/bcom/*', function(req, res) {
        var url = "https://www.bloomingdales.com/"+req.params[0]+"?";
        for (var prop in req.query) {
            url += prop+"="+req.query[prop]+"&";
        }
        req.headers[apiName]=apiKey;

        if ( req.method === 'POST' || req.method === 'PUT' ) {
            req.pipe(request.post(url)).pipe(res);
        } else if ( req.method === 'GET' || req.method === 'HEAD' ) {
            req.pipe(request(url)).pipe(res);
        }

    });

    // Secure calls
    app.use('/secure/*', function(req, res) {
        var url = "https://api.bloomingdales.com/"+req.params[0]+"?";
        for (var prop in req.query) {
            url += prop+"="+req.query[prop];
        }
        req.headers[apiName]=apiKey;

        console.log('======================');
        console.log('SECURE: '+url);
        console.log('======================');

        req.pipe(request(url)).pipe(res);
    });

// ======================================================
//  END Proxy Routing
// ======================================================

// app.get('/app-index', function(req, res, next){
//     res.render('./app-index/', {title: 'Bloomingdales'});
// });
app.get('/fashion-index/premium-shoes-handbags-spring-collections-2015', function(req, res, next){
    var path = req.params[0];
    res.render('./fashion-index/premium-shoes-handbags-spring-collections-2015', {title: 'Bloomingdales'});
});

app.get('/', function(req, res, next){
    var path = req.params[0];
    res.render('', {title: 'Bloomingdales'});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
console.log('Server started on port 3000');