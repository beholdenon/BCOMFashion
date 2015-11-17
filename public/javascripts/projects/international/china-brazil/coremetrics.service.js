(function() {
    'use strict';

    angular
        .module('services')
        .factory('Coremetrics', coremetrics);

    function coremetrics($window, $location) {
        var services = {
            init: init,
            tag: createTag
        };

        return services;

        ////////////////////////////////

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

        /**
        * @desc: the main Coremetrics service
        */ 
        function createTag(tagType, cmCategoryID, cmPageID) {
            if (tagType === 'Pageview') {
                try {
                    $window.BLOOMIES.coremetrics.cmCreatePageviewTag(cmPageID, cmCategoryID);
                } catch (e) {
                    __trace('CoreM_err: ' + e);
                }                

                __trace('CoreM ::: tagType: Element; categoryID: ' + cmCategoryID + '; pageID: ' + cmPageID);
            } else if (tagType === 'Element') {
                try {
                    $window.BLOOMIES.coremetrics.cmCreatePageElementTag(cmPageID, cmCategoryID);
                } catch (e) {
                    __trace('CoreM_err: ' + e);
                }

                __trace('CoreM ::: tagType: Element; categoryID: ' + cmCategoryID + '; pageID: ' + cmPageID);
            }
        }

        /**
        * @desc: log Coremetrics events only on staging env
        */     
        function __trace(log) {
            if ($location.host().indexOf('fashion.bloomingdales.com') < 0) {
                $window.console.log(log + '\n--------------------------------------------------------------------------------------------------------\n');      
            }
        }
    }
})();
