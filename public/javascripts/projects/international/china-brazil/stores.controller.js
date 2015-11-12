(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('StoresCtrl', StoresCtrl);

    function StoresCtrl($rootScope, $scope, $window, $timeout, appGlobals, uiGmapGoogleMapApi, uiGmapIsReady) {
        $scope.lang = appGlobals.getAttr('lang');
        $scope.copy = appGlobals.getAttr('copy');
        $scope.storeList = ($scope.lang) ? angular.copy($scope.copy[$scope.lang].stores.dropdown.list) : null;
        $scope.storeSelection = null;

        $scope.sticky = true;

        $scope.scrollToTop = function() {
            $window.scrollTo(0, 0);
        };

        $scope.bookletHoverOn = function($event) {
            var elem = jQuery($event.target).parent().children('img');
            elem.addClass('hover');
        };

        $scope.bookletHoverOff = function($event) {
            var elem = jQuery($event.target).parent().children('img');
            elem.removeClass('hover');
        };

        $rootScope.$on('lang:change', function(ev, args) {
            $scope.lang = args.lang;
            $scope.storeList = angular.copy($scope.copy[$scope.lang].stores.dropdown.list);
        });

        angular.extend($scope, {
            map: {
                control: {},
                center: {
                    latitude: 45,
                    longitude: -74
                },
                marker: {
                    id: 0,
                    latitude: 45,
                    longitude: -74,
                    options: {
                        visible: false
                    }
                },
                zoom: 7,
                pan: true,
                refresh: false,
                events: {},
                bounds: {},
                polys: [],
                draw: undefined,  
                options: {
                    draggable: true,
                    disableDefaultUI: true,
                    panControl: false,
                    navigationControl: false,
                    scrollwheel: false,
                    scaleControl: false
                }
            }
        });

        uiGmapGoogleMapApi.then(function(maps) {
            maps.visualRefresh = true;
        });

        uiGmapIsReady.promise(2).then(function(instances) {
            instances.forEach(function(inst) {
                inst.map.ourID = inst.instance;
            });
        });
    }
})();
