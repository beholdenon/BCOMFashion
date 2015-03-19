//append routes
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.redirect(301, 'http://www.bloomingdales.com');
});

router.get('/fashion-index', function(req, res) {
    res.redirect(301, 'http://www.bloomingdales.com');
});

module.exports = router;