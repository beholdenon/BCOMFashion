var _ = require('lodash');

/**
 * Given a pageTitle and a set of menu items, return css = hidden if
 * the pageTitle does not correspond to one of the menu items.
 * (This is used by the leftNav component to hide submenus.)
 *
 * This is a handlebar helper.
 * @param pageTitle: page title, comes from commment at start of page
 * @param menuItems: array of submenu items for leftNav
 * @author Joe Orr 08/2016
 */

function hideLevel(pageTitle, menuItems){
  if (! pageTitle){
    return '';
  }
  var pageId = "about_" + _.camelCase(pageTitle);
  var css = 'hidden';
  menuItems.forEach(
      (item) => {if (item.id === pageId){css = ''; return}}
  );
  return css;
}

module.exports = hideLevel;