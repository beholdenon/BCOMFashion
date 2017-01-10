/**
 * Created by u067265 on 1/10/17.
 */

'use strict';

let navContainer = require('../data/static/about-us-navigation.json'),

    jsonClone = obj => JSON.parse(JSON.stringify(obj)),

    cmQueryStringforMobileLinksV1 = {
        queryStringPrefix: '?CM_SP=MEW_ABOUT_US_NAV',
        attribSeparator: '-_-',
        tertiaryAttribPrefix: 'LINK_',

        normalizeLabel: label => {
            return label.indexOf(' ') > -1 ? label.toUpperCase().split(' ').join('_') : label.toUpperCase();
        },

        addCMQueryStringToLinks: function (container, prefix) {
            let {attribSeparator, tertiaryAttribPrefix, normalizeLabel} = this;
            if (!container.hasOwnProperty('pages')) {
                return container;
            }
            container.pages = container.pages.map(page => {
                let tertiaryLinkPrefix = prefix.indexOf(attribSeparator) > -1 ? tertiaryAttribPrefix : '',
                    normalizedPageLabel = tertiaryLinkPrefix + normalizeLabel(page.label),
                    queryString = prefix + attribSeparator + normalizedPageLabel;
                page.href = page.href + queryString;
                if (page.pages) {
                    return this.addCMQueryStringToLinks(page, queryString);
                }
                return page;
            });
            return container;
        },

        transform: function (container) {
            return this.addCMQueryStringToLinks(container, this.queryStringPrefix);
        }
    };

module.exports = function (container) {
    return cmQueryStringforMobileLinksV1.transform(jsonClone(container || navContainer));
};
