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

        var $aboutUsNavUl = $('#bl_main_container > .about-us-nav .bcom-collapsible-nav')
                .bcomCollapsibleNav()
                .removeClass('hidden'),
            $aboutUsLink = $aboutUsNavUl.find('a[data-cm-element-id-open]'),
            $aboutUsExpandLink = $aboutUsLink.next(),
            aboutUsElementIdForOpen = $aboutUsLink.data('cm-element-id-open'),
            aboutUsElementCatIdForOpen = $aboutUsLink.data('cm-element-category-id'),
            aboutUsExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes({2: $('#cmdata').attr('data-pageid')}),
            sizeChart = $('#sizeChart');
            
            [$aboutUsLink, $aboutUsExpandLink].forEach(function ($elm) {
                $elm.on('click', function () {
                    coremetrics.elementTag({
                        elementID: aboutUsElementIdForOpen,
                        elementCategory: aboutUsElementCatIdForOpen,
                        attributes: aboutUsExploreAttributes.toString()
                    });
                });
            });

            //When user selects Size Chart page it must be set to "active" only after DOM has been created.
            //TODO: Rewrite and move this logic into aboutUsNavFactoryForMobile.js
            if (window.location.href.indexOf('/sizecharts/') > -1 && sizeChart && !sizeChart.hasClass('active')) {
                sizeChart.addClass('active');
            }

    });

});
