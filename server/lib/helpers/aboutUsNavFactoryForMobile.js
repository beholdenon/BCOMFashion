/**
 * Created by u067265 on 1/10/17.
 * A module for injecting the '?cm_sp=...' query string required for the mobile about-us navigation.
 */

'use strict';

let navContainer = require('../data/static/about-us-navigation.json'),
    jsonClone = obj => JSON.parse(JSON.stringify(obj));

module.exports = function (container, uri) {
    return setActive(jsonClone(container || navContainer), uri);
};

function setActive (container, uri) {
    if (container.href && container.href.split('?')[0] === uri) {
        container.active = true;
        return container;
    }
    else if (!container.pages) {
        return container;
    }
    for (let ind = 0; ind < container.pages.length; ind += 1) {
        let page = container.pages[ind],
            foundPage = setActive(page, uri);
        if (foundPage.active) {
            container.active = true;
            return container;
        }
    }
    return container;
}
