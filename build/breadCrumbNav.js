var _ = require('lodash');
/**
 * Get the HTML for the breadcrumb.
 * This is a handlebar helper.
 * @param data: the menu data
 * @param pageTitle: page title, comes from commment at start of page
 *
 * @author Joe Orr 08/2016
 */

function breadCrumbNav(data, pageTitle){

    pageTitle = pageTitle.replace(/[']/,'');
    var pageId = "about_" + _.camelCase(pageTitle);

    var comparator = function(o){
        if (Array.isArray(o)){
            return _.find(o, comparator);
        } else {
            return  o.id === pageId;
        }
    };
    function getSelectedSection(section){
        var found;
        if (! Array.isArray(section)){return false}
        found = _.find(section, (o)=>{return o.id === pageId});
        if (found) {return section}
        if (! found){
            for(var i = 0; i < section.length; i++){
                var s = section[i];
                found = getSelectedSection(s);
                if (found){return found}
            }
        }
        return null;
    }
    var items = [];
    var section = getSelectedSection(data);
    if (! section){
        console.log("No matching section found for pageId = " + pageId);
        return;
    }
    items.push(section[0]);
    definedPush(items, _.find(section, comparator));
    // if top level selection then puah first menu item on to breadcrumb
    if (items.length === 1){
        items.unshift(data[0][0]);
    }

    return _getBreadCrumbHTML(items);

    // utility function for push (return false if missing args; return false if undefined result)
    function definedPush(arr, item, first) {
        if (!item) {
            return arr;
        }
        item = _.clone(item);
        if (first) {
            arr.push(first, item);
        } else {
            arr.push(item);
        }
        return arr;
    }

}
function _getBreadCrumbHTML(items) {
    var html = [];
    items.forEach(function (item, index, arr) {
        var label = item.text;
        if (item.label) {
            label = item.label
        }
        if (index < arr.length - 1) {
            html.push('<span class= "bl_breadcrumb_link"><a href = "' + item.href + '">' + label + '</a></span> &gt; ');
        } else {
            html.push('<span class= "bl_breadcrumb_bold">' + label + '</a ></span>');
        }
    });
    return html.join('');
}
module.exports =  breadCrumbNav;