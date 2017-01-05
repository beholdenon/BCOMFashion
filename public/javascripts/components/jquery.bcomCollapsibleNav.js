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

    var noop = function () {},
        reduceRight = function (arrayLike, callback, aggregator) {
            return Array.prototype.reduceRight.call(arrayLike, callback, aggregator);
        };

    $.widget('bcom.bcomCollapsibleNav', {

        options: {
            highestListItemZIndex: 998,
            scrollTopSpeed: 1000,
            togglableListItemSelector: '.togglable',
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
                ._doCssModifications(this.element, ops.highestListItemZIndex)
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
                    expandedHeight = $elm.attr('data-expanded-height'),
                    collapsedHeight = $elm.attr('data-collapsed-height'),
                    activeClassName = ops.activeClassName;
                if ($elm.hasClass(activeClassName)) {
                    if (collapsedHeight) {
                        $elm.height(collapsedHeight)
                    }
                    $elm.removeClass(activeClassName);
                }
                else if (!$elm.hasClass(ops.activeClassName)) {
                    if (expandedHeight) {
                        $elm.height(reduceRight($elm.find(ops.togglableListItemSelector + ops.activeSelector ), function (agg, _elm) {
                            return agg + $(_elm).height();
                        }, expandedHeight));
                    }
                    $elm.addClass(activeClassName);
                }
                self._closeSiblingTogglables($elm, collapsedHeight, ops);
                // $('body, html').animate({scrollTop: $this.offset().top}, ops.scrollTopSpeed);
                ops.afterToggleCallback(e);
            };
        },

        _init: function () {
            this.refresh();
        },

        _doCssModifications: function ($startingUl, startZIndex) {
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

                    self._doCssModifications($ul, startZIndex);

                $elm.css({'z-index': --startZIndex});

                if ($ul.length > 0) {
                    $elm.attr('data-expanded-height', $elm.height());
                    $elm.addClass(self.options.togglableListItemClassName);
                    $elm.attr('data-collapsed-height', $elm.height());
                }
            });
            return self;
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
