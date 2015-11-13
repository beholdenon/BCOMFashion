(function() {
    'use strict';

    angular
        .module('services')
        .factory('Coremetrics', coremetrics);

    function coremetrics($window) {
        var services = {
            init: init,
            tag: cm
        };

        return services;

        ////////////////////////////////

        function cm(tagType, cmCategoryID, cmPageID) {
            if (tagType === 'Pageview') {
                try {
                    $window.BLOOMIES.coremetrics.cmCreatePageviewTag(cmPageID, cmCategoryID);
                } catch (e) {
                    __trace('COREMETRICS ERROR: ' + e);
                }                

                __trace('{{{{{{{{COREMETRICS: Pageview - cmCategoryID: ' + cmCategoryID + ' cmPageID: ' + cmPageID + ' }}}}}}}}');
            } else if (tagType === 'Element') {
                try {
                    $window.BLOOMIES.coremetrics.cmCreatePageElementTag(cmPageID, cmCategoryID);
                } catch (e) {
                    __trace('COREMETRICS ERROR: ' + e);
                }

                __trace('{{{{{{{{COREMETRICS: Element - cmCategoryID: ' + cmCategoryID + ' cmPageID: ' + cmPageID + ' }}}}}}}}');
            }
        }

        function init() {
            var env = $window.ENV_CONFIG;

            $window.BLOOMIES.coremetrics.pageViewExploreAttributes = '';

            if (env === 'dev') {
                return cmSetTest(); // jshint ignore:line
            } else if (env === 'prod' || env === 'production') {
                return cmSetProduction(); // jshint ignore:line
            } else {
                throw 'ERROR: unidentified ENV variable';
            }
        }

        function __trace(logString) {
            if ($window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
                $window.console.log(logString);
            }
        }
    }
})();
