/**
 * Created by u067265 on 11/16/16.
 * About Us Pages Specific.
 * @requires /{project-root}/public/styles/modules/_bcom-collapsible-nav
 * @requires /{project-root}/public/javascripts/includes/coremetrics
 * @requires /{project-root}/public/javascripts/components/jquery.bcomCollapsibleNav
 * @requires jquery
 * @requires require.js
 */
require([
    'jquery',
    'coremetrics', //'/fashion/javascripts/includes/coremetrics',
    '/fashion/javascripts/components/jquery.bcomCollapsibleNav'
], function ($, coremetrics) {

    'use strict';

    $(function () {

        var $aboutUsNavUl = $('.about-us-nav .bcom-collapsible-nav')
                .bcomCollapsibleNav()
                .removeClass('hidden'),
            $aboutUsLink = $aboutUsNavUl.find('a[data-cm-element-id-open]'),
            $aboutUsExpandLink = $aboutUsLink.next(),
            aboutUsElementIdForOpen = $aboutUsLink.data('cm-element-id-open'),
            aboutUsElementCatIdForOpen = $aboutUsLink.data('cm-element-category-id');

            [$aboutUsLink, $aboutUsExpandLink].forEach(function ($elm) {
                $elm.on('click', function () {
                    coremetrics.elementTag({
                        elementID: aboutUsElementIdForOpen,
                        elementCategory: aboutUsElementCatIdForOpen
                    });
                });
            });

    });

});
