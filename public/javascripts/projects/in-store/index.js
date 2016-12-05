/**
 * Created by u067265 on 11/16/16.
 */
require(['jquery', 'coremetrics'], function ($, CoreMetrics) {

    'use strict';

    $(function () {

        // Init core metrics only if it is available
        if (window.Globals && window.Globals.Coremetrics) {
            CoreMetrics.initCoreMetrics();
        }

        // If not mobile replace all store address phone number links with yext pages store link
        if ($('#bcomFashion.bl_mobile').length === 0) {
            // For each phone number link replace href
            $('#in-store a[href^="tel:"]').each(function (index, item) {

                // Replace href with previous links href
                item.href = $(item).prev().attr('href');
            });
        }

    });

});
