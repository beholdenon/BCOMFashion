var _ = require('lodash');

/**
 * Given a pageTitle and itemId (id on a menu item), get selected class.
 * This is a handlebar helper.
 * @param itemId: the id from the menu element
 * @param pageTitle: page title, comes from commment at start of page
 *
 * @author Joe Orr 08/2016
 */

function selectedClass(itemId, pageTitle, isHeader){
  if (! pageTitle){
    return '';
  }
  var pageId = "about_" + _.camelCase(pageTitle);
  var css = '';
  if (isHeader){
    css = 'bl_leftNav_header';
  }
  if (pageId === itemId){
    css = css + ' level1Selected';
  }
  return css;
}

module.exports = selectedClass;