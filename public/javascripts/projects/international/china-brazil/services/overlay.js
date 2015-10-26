'use strict';

angular.module('services')
    .factory('overlay', function($rootScope, $q) {

    return {
        show: function(opts) {
            deferred = $q.defer();
            options = angular.copy(defaultOptions);
            if (typeof opts === 'object') {
                angular.extend(options, opts);
            }

            if (!options.disabled) {
                options.isShowed = true;
            }

            setOptions(options);

            return deferred.promise;
        },
        hide: function() {
            this.resolve();
        },
        resolve: function(data) {
            options.isShowed = false;
            if (angular.isDefined(deferred)) {
                deferred.resolve(data);
            }
        },
        reject: function(data) {
            options.isShowed = false;
            if (angular.isDefined(deferred)) {
                deferred.reject(data);
            }
        },
        disable: function() {
            options.disabled = true;
        },
        enable: function() {
            options.disabled = false;
        }
    };
});