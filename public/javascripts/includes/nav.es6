/**
 * @file
 * This file provides setup functions for the leftnav, title and breadcrumbs.
 * It checks to see if these elements do not exist, and if they do not, it
 * adds them.
 *
 * @author Joe Orr 08/2016
 */

"use strict";

import $ from 'jquery';
import _ from 'lodash';

// create link for dynamically generated title image
function getImgNS(message) {
    message = message.replace(/\s/g, '%20');
    const options = {
        bgc: '255,255,255',
        fmt: 'png',
        textAttr: 144,
        layer: 'comp',
        extend: '0,-4,0,-13',
        textPs: `{XQX{%5Cfonttbl{%5Cf0%20Champion%20Bantamweight%3B}XQX}{%5Ccolortbl%20%3B%5Cred51%5Cgreen51%5Cblue51%3B}%5Cf0%5Cfs38%5Ccf1%5Cexpnd3%5Ccaps%20${message}}`
    };
    const url = 'http://images.bloomingdales.com/is/image/BLM?';
    let path = '';
    Object.keys(options).forEach((k) => path = path + '&' + k + '=' + options[k]);
    // nasty hack to keep the double curly brace in image source url from stop breaking the template
    path = path.replace(/XQX/g, '');
    return url + path.substring(1);
}

// if the title element has a data-menu attribute, then draw the menu and breadcrumb, if target elements exist
export function drawMenus() {

    const pageTitleEl = document.getElementsByTagName('TITLE')[0];
    let pageTitle = "";
    let menuType = "";
    if (pageTitleEl) {
        pageTitle = pageTitleEl.innerHTML;
        const pageTitleData = pageTitleEl.dataset.title;
        if (pageTitleData) {
            pageTitle = pageTitleData;
        }
        const menuData = pageTitleEl.dataset.menu;
        if (menuData) {
            menuType = menuData.replace(/\./g, '');
        }
    }

    if (menuType) {

        // the title graphic which goes on top of main content
        // this has been moved to titleimage.js so as to load
        // right after the img tag is loaded
        const titleImageEl = document.getElementById('titleImage');
        if (titleImageEl && pageTitle) {
            titleImageEl.src = getImgNS(pageTitle);
        }
        // if already got the nav menu, no need for drawing it on client,
        // just highlight selected item and leave
        const pageId = "about_" + _.camelCase(pageTitle);
        if ($('#bl_leftNavContainer ul')[0]) {
            $('#' + pageId).parent('li').addClass('level1Selected');
            return;
        }
        // left nav and breadcrumbs
        require([menuType], function (leftNav) {

                // extract the bread crumb items from the nav data
                const data = leftNav.data.nav;
                const comparator = (o) => o.id === pageId;
                function getSelectedSection(sections, comparator){
                    return _.find(sections, (section)=> _.find(section, comparator));
                }
                const items = [];
                const section = getSelectedSection(data, comparator);
                if (! section){
                    console.log("No matching section found for pageId = " + pageId);
                    return;
                }
                items.push(section[0]);
                definedPush(items, _.find(section.slice(1), comparator));
                if (items.length === 1){
                    items.unshift(data[0][0]);
                }

                // utility functions for push (return false if missing args; return false if undefined result)
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
                    if (! $('.bl_breadcrumb_object span').length) {
                        const template = _.template($('#breadCrumbTemplate').html());
                        $('.bl_breadcrumb_object').append(template({items: items}));
                    }
                }

                // render the left menu if it is empty, otherwise just set the selected class
                if ($('#bl_leftNavContainer ul')[0]){
                  //  $('#' + pageId).parent('li').addClass('level1Selected');
                } else {
                    leftNav.render('#bl_leftNavContainer', pageId);
                }
            }
        );
    }
}



