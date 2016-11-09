/* globals cI: false, jQuery: false */
/**
 * Created by u067265 on 10/24/16.
 * Adds a listener to the opt out form and sets a cookie based on the user chosen value.  Also
 * allows user to see their current opt-status via an alert box.
 * @requires cI, jQuery, jQuery.fn.dialog
 */
(function () {

    "use strict";

    var OPT_OUT = 'opt_out',
        OPT_IN_ANON = 'anonymous',
        OPT_IN = 'opt_in',
        OPTS = [OPT_OUT, OPT_IN, OPT_IN_ANON],
        Blm = window.BLOOMIES;

    function getOptStatusCookie () {
        var optStatus = cI('CMOptout');
        return  optStatus && OPTS.indexOf(optStatus) > -1 ? optStatus : OPT_IN_ANON;
    }

    function getOptStatusNewExpireDate () {
        var date = new Date();
        date.setFullYear(date.getFullYear() + 20);
        return date;
    }

    function setOptCookie (value, date) {
        document.cookie = 'CMOptout=' + value + '; path=/; expires=' + date.toGMTString();
    }

    function getOptStatusMsgByOptStatus (optStatus) {
        var msgSuffix;
        switch (optStatus) {
            case OPT_IN:
                msgSuffix = 'Cancelled Opt-out';
                break;
            case OPT_OUT:
                msgSuffix = 'Total Opt-out';
                break;
            case OPT_IN_ANON:
                msgSuffix = 'Anonymous Visitor';
                break;
            default:
                msgSuffix = 'Anonymous Visitor';
                break;
        }
        return msgSuffix;
    }

    function alertOpener ($alertParentElement, $alertElement, timeout) {
        timeout = timeout || 5000;

        var alertOpenerTimeout = null,
            $htmlAndBody = jQuery('html, body'),
            opener = function (msg) {

                clearInterval(alertOpenerTimeout);

                var alertElementOffset = $alertElement.offset(),
                    $win = jQuery(window),
                    winInnerHeight = window.innerHeight,
                    scrollTopOffset = (!Blm.isMobile ? winInnerHeight / 3 : 0),
                    shouldScrollToView = $win.scrollTop() + scrollTopOffset > alertElementOffset.top ||
                        $win.scrollTop() + winInnerHeight < alertElementOffset.top;

                // Set alert message
                $alertElement.html(msg);

                // Set alert element's parent's height
                $alertParentElement.height(Math.ceil($alertElement.height(true)));

                // Show alert element
                $alertParentElement.removeClass('closed');

                if (shouldScrollToView) {
                    // Delay for current css alert box animation duration
                    $htmlAndBody
                        .delay(890)
                        .animate({scrollTop: $alertElement.offset().top - scrollTopOffset}, 890);
                }

                // Set hide timeout
                alertOpenerTimeout = setInterval(function (close) {

                    // Hide alert element and clear opener timeout
                    close();

                }, timeout, opener.close);
            };

        opener.close = function () {
            $alertParentElement.addClass('closed');
            clearInterval(alertOpenerTimeout);
        };

        // Return the opener function
        return opener;
    }

    window.addEventListener('load', function () {
        var $pageContentElm = jQuery('#ibm_analytics_optout'),
            $optStatusForm = $pageContentElm.find('#ibm_analytics_optout-form'),
            $viewOptStatusATag = $pageContentElm.find('.ibm_analytics_optout-status'),
            $msgElement = $pageContentElm.find('.opt-status-alert-msg'),
            $alertElement = $pageContentElm.find('.opt-status-alert-success'),
            $optStatusFormRadioElms = $optStatusForm.find('input[name="ibm_analytics_optout-option"]'),
            openAlert = alertOpener($alertElement,$alertElement.find('.opt-status-alert')),
            openMessage = alertOpener($msgElement, $msgElement.find('.opt-status-alert')),
            currentOptStatusValue = getOptStatusCookie();

        // Set default cookie if it isn't already set and refresh
        // current cookies expire date if it is already set
        setOptCookie(currentOptStatusValue, getOptStatusNewExpireDate());

        // Preselect persons current opt out status
        $optStatusFormRadioElms.filter('[value="' + currentOptStatusValue + '"]')
            .attr('checked', 'checked')
            .addClass('checked'); // Since it seems there is some javascript manipulating these elements and it is
                                  // using 'checked' as the class name to show that the element is 'checked'

        // Listen to opt status form
        $optStatusForm.on('submit', function (e) {
            e.preventDefault();

            var defaultOptStatus = getOptStatusCookie(),
                chosenOptStatus = $optStatusFormRadioElms.filter(':checked,.checked').val();

            // Set opt out cookie
            setOptCookie(chosenOptStatus || defaultOptStatus, getOptStatusNewExpireDate());

            // Close any open opt-out messages
            openMessage.close();

            // Open dialog
            openAlert('Opt-out Status updated to: ' + getOptStatusMsgByOptStatus(getOptStatusCookie()));
        });

        // Listen for back button click
        $optStatusForm.find('#ibm_analytics_optout-back').on('click', function (e) {
            e.preventDefault();
            if (window.history && window.history.back) {
                window.history.back();
            }
            else {
                window.location.href = '/';
            }
        });

        // Listen to 'view current opt-status' link
        $viewOptStatusATag.on('click', function (e) {
            e.preventDefault();
            openAlert.close();

            openMessage('Current Opt-out Status is: ' + getOptStatusMsgByOptStatus(getOptStatusCookie()));
        });

    }); // End of window onload

}()); // End of iife

