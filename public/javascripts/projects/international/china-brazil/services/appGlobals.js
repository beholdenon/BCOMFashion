'use strict';

angular.module('services')
    .factory('appGlobals', function(CacheService) {
        return {
            getAttr: function(key) {
                var attr = CacheService.get(key);

                if (attr) {
                    return attr;
                }

                return null;
            },
            setAttr: function(key, value) {
                CacheService.put(key, value);
            },
            clearAttr: function(key) {
                CacheService.put(key, '');
            }
        };
    });
