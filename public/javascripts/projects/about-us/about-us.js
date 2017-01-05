/**
 * Created by u067265 on 11/16/16.
 * About Us Pages Specific.
 * @requires /{project-root}/public/styles/modules/_bcom-collapsible-nav
 * @requires /{project-root}/public/javascripts/components/jquery.bcomCollapsibleNav
 * @requires jquery
 * @requires require.js
 */
require(['jquery', '/fashion/javascripts/components/jquery.bcomCollapsibleNav'], function ($) {

    'use strict';

    $(function () {

        $('.about-us-nav .bcom-collapsible-nav').bcomCollapsibleNav();

    });

});
