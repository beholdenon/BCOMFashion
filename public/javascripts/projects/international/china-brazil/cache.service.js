(function() {
    'use strict';

    angular
        .module('CacheService', ['ng'])
        .factory('CacheService', CacheService);

    function CacheService($cacheFactory) {
        return $cacheFactory('CacheService');
    }
})();
