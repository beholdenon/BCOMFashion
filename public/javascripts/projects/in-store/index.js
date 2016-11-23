/**
 * Created by u067265 on 11/16/16.
 */
require(['jquery', 'coremetrics'], function ($, CoreMetrics) {

    'use strict';

    $(function () {
        if (window.Globals && window.Globals.Coremetrics) {
            CoreMetrics.initCoreMetrics();
        }
    });

});
