'use strict';
var standalonePage = exports,
    Path = require('path');

/*
 * LIST TO STORE STANDALONE PAGES
 * place a new folder in .\server\lib\views, 
 * then inside it, save your *.html/htm file
 */
var standaloneURLs = [
    'akamai/akamai-sureroute-test-object.htm'
];

/*
 * Check if current route points to a standalone page
 * @param requestParams
 * @returns null || relative path to the standalone page 
 */
standalonePage.checkPath = function(requestParams) {
    var localPath = null;

    standaloneURLs.forEach(function(item) {
        if (item === requestParams) {
            localPath = Path.join(__dirname, 'views/', requestParams);
        }
    });

    return localPath;
};
