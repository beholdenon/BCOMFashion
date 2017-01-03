/**
 * Created by u067265 on 1/3/17.
 */
define(['jquery'], function ($) {

    'use strict';

    return $.widget('bcom.bcomCollapsibleNav', {
        options: {
            activeSelector: '.active',
            activeClassName: 'active'
        },
        _create: function () {
        },
        _init: function () {
            var ops = this.options;
            this.element.find('> li a + ul').parent().addClass(ops.activeClassName);
        },

    });

});
