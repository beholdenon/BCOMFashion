'use strict';

module.exports = {
    description: 'Akamai SureRoute static test page',
    notes: 'Static htm page, served without header & footer; don\'t modify the view',
    tags: ['akamai sureroute', 'static page'],
    handler: function(req, res) {
        var Path = require('path'),
            akamaiView = Path.join(__dirname, '../views/akamai/akamai-sureroute-test-object.htm');

        res.file(akamaiView);
    }
};
