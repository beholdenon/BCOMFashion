"use strict";

/**

NOTE: This file is deprecated, see nav.es6

 */

define([
    'jquery',
    'lodash'
], function($, _) {

    // create link for dynamically generated title image
    function getImgNS(message) {
        message = message.replace(/\s/g, '%20');
        var options = {
            bgc: '255,255,255',
            fmt: 'png',
            textAttr: 144,
            layer: 'comp',
            extend: '0,-4,0,-13',
            textPs: '{XQX{%5Cfonttbl{%5Cf0%20Champion%20Bantamweight%3B}XQX}{%5Ccolortbl%20%3B%5Cred51%5Cgreen51%5Cblue51%3B}%5Cf0%5Cfs38%5Ccf1%5Cexpnd3%5Ccaps%20' + message + '}'
        };
        var url = 'http://images.bloomingdales.com/is/image/BLM?';
        var path = '';
        Object.keys(options).forEach(function (k) {
            path = path + '&' + k + '=' + options[k];
        });
        // nasty hack to keep the double curly brace in image source url from stop breaking the template
        path = path.replace(/XQX/g, '');
        return url + path.substring(1);
    }

    // if the title element has a data-menu attribute, then draw the menu and breadcrumb, if target elements exist
    function drawMenus() {

        var pageTitleEl = document.getElementsByTagName('TITLE')[0];
        var pageTitle = "";
        var menuType = "";
        if (pageTitleEl) {
            pageTitle = pageTitleEl.innerHTML;
            var pageTitleData = pageTitleEl.dataset.title;
            if (pageTitleData) {
                pageTitle = pageTitleData;
            }
            var menuData = pageTitleEl.dataset.menu;
            if (menuData) {
                menuType = menuData.replace(/\./g, '');
            }
        }

        if (menuType) {

            // the title graphic which goes on top of main content
            var titleImageEl = document.getElementById('titleImage');
            if (titleImageEl && pageTitle) {
                titleImageEl.src = getImgNS(pageTitle);
            }

            // left nav and breadcrumbs
            require([menuType], function (leftNav) {

                    var pageId = "about_" + _.camelCase(pageTitle);

                    // extract the bread crumb items from the nav data
                    var data = leftNav.data.nav;
                    var comparator = function (o) {
                        return o.id === pageId;
                    };
                    function getSelectedSection(sections, comparator){
                        return _.find(sections, function(section){return _.find(section, comparator);});
                    }
                    var items = [];
                    var section = getSelectedSection(data, comparator);
                    if (! section){
                        console.log("No matching section found for pageId = " + pageId);
                        return;
                    }
                    items.push(section[0]);
                    definedPush(items, _.find(section.slice(1), comparator));
                    if (items.length === 1){
                        items.unshift(data[0][0]);
                    }

                    // utility functions for find and push (return false if missing args; return false if undefined result)
                    /*
                    function definedFind(source, comparator) {
                     if (!source) {
                     return false;
                     }
                     var found = source.find(comparator);
                     if (!found) {
                     return false;
                     }
                     return found;
                     }
                     */
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

                    // render the breadcrumb menu
                    if (items) {
                        var template = _.template($('#breadCrumbTemplate').html());
                        $('.bl_breadcrumb_object').append(template({items: items}));
                    }

                    // render the left menu
                    leftNav.render('#bl_leftNavContainer', pageId);
                    // leftNav.render( '#bl_leftNavContainer', "ln_safetyRecall" );
                }
            );
        }
    }
    return {
        drawMenus: drawMenus
    };

});