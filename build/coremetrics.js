var _ = require('lodash');
/**
 * This handlebar helper function takes a pageId and PageCategory and
 * returns the string for a div tag with these values set as data items.
 * This allows the main.js file to load these after the coremetrics lib
 * has been loaded.
 *
 * @param pageId
 * @param pageCategory
 * @returns {string}
 *
 * @author Joe Orr 08/2016
 */
function coremetrics(pageId, categoryId){
    return '<div id="cmdata" data-pageid="' + pageId + '" data-categoryid="' + categoryId + '"></div>';
}

module.exports = coremetrics;