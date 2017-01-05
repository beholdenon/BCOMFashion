/**
 * Created by u067265 on 1/3/17.
 * jQuery widget for mobile collapsible nav (could be used for desktop).
 * @requires /{project-root}/public/styles/modules/_bcom-collapsible-nav.scss
 * @requires jquery
 * @requires jquery-ui.widget - JQuery Ui Widget factory.
 * @requires jquery-ui.Widget - JQuery Ui Widget prototype.
 * @requires require.js
 */
define('/fashion/javascripts/components/jquery.bcomCollapsibleNav', ['jquery', 'jqueryui'], function ($) {

    'use strict';

    var noop = function () {};

    $.widget('bcom.bcomCollapsibleNav', {

        options: {
            ownClassName: 'collapsible-nav',
            ownSelector: '.collapsible-nav',
            togglableListItemSelector: '.togglable',
            toggleBtnSelector: 'a + a',
            activeSelector: '.active',
            activeClassName: 'active',
            eventToToggleOn: 'touchend',
            touchend: noop,
            afterToggleCallback: noop
        },

        refresh: function () {
            var ops = this.options;
            this._removeEventListeners(ops)
                ._addEventListeners(ops);
        },

        destroy: function () {
            this._removeEventListeners(this.options);
        },

        _create: function () {
            var self = this,
                ops = self.options;
            self._onToggleBtnListener = function (e) {
                var $elm = $(this).closest(ops.togglableListItemSelector).toggleClass(ops.activeClassName);
                self._closeSiblingTogglables($elm, ops);
                ops.touchend(e);
                ops.afterToggleCallback(e);
            };
        },

        _init: function () {
            this.refresh();
        },

        _closeSiblingTogglables: function ($togglableLi, ops) {
            $togglableLi.siblings().removeClass(ops.activeClassName);
        },

        _addEventListeners: function (ops) {
            var self = this;
            this.element.find(ops.togglableListItemSelector + ' ' + ops.toggleBtnSelector)
                .each(function (index, item) {
                    item.addEventListener(ops.eventToToggleOn, self._onToggleBtnListener);
                });
            return this;
        },

        _removeEventListeners: function (ops) {
            var self = this;
            this.element.find(ops.togglableListItemSelector + ' ' + ops.toggleBtnSelector)
                .each(function (index, item) {
                    item.removeEventListener(ops.eventToToggleOn, self._onToggleBtnListener);
                });
            return this;
        }
    });

});
