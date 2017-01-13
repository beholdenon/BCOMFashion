/**
 * Created by u067265 on 1/3/17.
 * jQuery widget for mobile collapsible nav (could be used for desktop).
 * @requires /{project-root}/public/styles/modules/_bcom-collapsible-nav.scss
 * @requires jquery
 * @requires jquery-ui.widget - JQuery Ui Widget factory.
 * @requires jquery-ui.Widget - JQuery Ui Widget prototype.
 * @requires require.js
 */
define('/fashion/javascripts/components/jquery.bcomCollapsibleNav', ['jquery', 'jqueryui-amd/widget'], function ($) {

    'use strict';

    var noop = function () {},
        reduce = function (arrayLike, callback, aggregator, context) {
            return Array.prototype.reduce.call(arrayLike, callback, aggregator, context);
        };

    function collapsedHeight ($elm) {
        return parseInt($elm.attr('data-collapsed-height'), 10);
    }

    $.widget('bcom.bcomCollapsibleNav', {

        options: {
            highestListItemZIndex: 998,
            scrollTopSpeed: 1000,
            defaultOwnClassName: 'bcom-collapsible-nav',
            defaultOwnSelector: '.bcom-collapsible-nav',
            togglableListItemSelector: 'li.togglable',
            togglableListItemClassName: 'togglable',
            toggleBtnSelector: 'a + a',
            activeSelector: '.active',
            activeClassName: 'active',
            eventToToggleOn: 'touchend',
            afterToggleCallback: noop
        },

        refresh: function () {
            var ops = this.options;
            this._removeEventListeners(ops)
                ._addZIndices(this.element, ops.highestListItemZIndex)
                ._addEventListeners(ops);
        },

        destroy: function () {
            this._removeEventListeners(this.options);
        },

        _create: function () {
            var self = this,
                ops = self.options;

            // Toggle listener
            self._onToggleBtnListener = function (e) {
                var $this = $(this),
                    $elm = $this.closest(ops.togglableListItemSelector),
                    collapsedHeight = $elm.attr('data-collapsed-height'),
                    activeClassName = ops.activeClassName;
                if ($elm.hasClass(activeClassName)) {
                    if (collapsedHeight) {
                        $elm.height(collapsedHeight)
                    }
                    $elm.removeClass(activeClassName);
                }
                else if (!$elm.hasClass(ops.activeClassName)) {
                    var expandedHeight = self._getExpandHeight($elm, ops);
                    $elm.height(expandedHeight);
                    $elm.addClass(activeClassName);

                }
                self._closeSiblingTogglables($elm, collapsedHeight, ops);
                self._updateParentHeights($elm, ops);
                ops.afterToggleCallback.call(this, e);
            };
        },

        _init: function () {
            this.refresh();
        },

        _addZIndices: function ($startingUl, startZIndex) {
            var self = this;

            if ($startingUl.length === 0) {
                return self;
            }

            $startingUl.each(function (ind, elm) {
                var $elm = $(elm);
                $elm.css({'z-index': startZIndex--});
            });

            $startingUl.find('> li').each(function (index, elm) {
                var $elm = $(elm),
                    $ul = $elm.find('> ul, > div');

                    self._addZIndices($ul, startZIndex);

                $elm.css({'z-index': --startZIndex});

                if ($ul.length > 0) {
                    $elm.addClass(self.options.togglableListItemClassName);
                }

                $elm.attr('data-collapsed-height', $elm.get(0).offsetHeight);
            });

            return self;
        },

        _getExpandHeight: function ($li, ops) {
            var self = this;
            return collapsedHeight($li) +
                reduce($li.find('> ul').find('> li'), function (agg, elm) {
                    var $elm = $(elm);
                    return agg + ($elm.hasClass(ops.activeClassName) ?
                            self._getExpandHeight($elm, ops) :
                            collapsedHeight($elm));
                }, 0, this);
        },

        _updateParentHeights: function ($li, ops) {
            if ($li.parent().hasClass(ops.defaultOwnClassName)) {
                return;
            }
            var $parentLi = $li.parent().closest(ops.togglableListItemSelector);
                $parentLi.height(this._getExpandHeight($parentLi, ops));
                this._updateParentHeights($parentLi, ops);
        },

        _closeSiblingTogglables: function ($togglableLi, collapsedHeight, ops) {
            $togglableLi.siblings().each(function (ind, elm) {
                var $elm = $(elm);
                if ($elm.hasClass(ops.activeClassName) && collapsedHeight) {
                    $elm.height(collapsedHeight)
                        .removeClass(ops.activeClassName);
                }
                $elm.removeClass(ops.activeClassName);
            });
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

