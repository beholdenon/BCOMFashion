(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('StoresCtrl', StoresCtrl);

    function StoresCtrl($rootScope, $scope, $window, $timeout, AppGlobals, Coremetrics, $routeParams) { //uiGmapGoogleMapApi
        $scope.lang = AppGlobals.getAttr('lang');
        $scope.copy = AppGlobals.getAttr('copy');
        $scope.storeList = ($scope.lang) ? angular.copy($scope.copy[$scope.lang].stores.dropdown.list) : null;
        $scope.storeSelection = null;
        $scope.sticky = true;
        $scope.defaultStores = $scope.copy.ENG.stores.dropdown.list;

        angular.element(document).ready(function () {
            if($routeParams.store) {

                $scope.defaultStores.forEach(function(store) {
                    if(store.url === $routeParams.store) { 
                        $scope.storeSelection = store.id;
                        $scope.$apply();
                        $scope.onChange();
                    }
                });
            }
        });

        $scope.onChange = function() {
            $window.scrollTo(0, 0);

            //Coremetrics tag
            var pageID = AppGlobals.getAttr('cm_pageID'),
                storeID = $scope.storeSelection,
                stores = $scope.defaultStores,
                store = null,
                windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '', 
                tag = prefix + pageID + '--visit_';

            for (var i = 0; i < stores.length; i++) {
                if (stores[i] !== null && stores[i].id === storeID) {
                    store = stores[i].name;
                    break;
                }
            }

            tag += store;
            Coremetrics.tag('Pageview', prefix + pageID, tag);
        };

        $scope.bookletHoverOn = function($event) {
            var elem = jQuery($event.target).parent().children('img');
            elem.addClass('hover');
        };

        $scope.bookletHoverOff = function($event) {
            var elem = jQuery($event.target).parent().children('img');
            elem.removeClass('hover');
        };

        $scope.bookletOnClick = function($event){
            $event.preventDefault();

            //Coremetrics tag
            var pageID = AppGlobals.getAttr('cm_pageID'),
                tag = pageID + '--download-booklet_',
                href = null;

            href = jQuery($event.target).attr('href');

            $window.open(href, '_blank');
            
            href = href.substr(href.lastIndexOf('/') + 1);

            tag += href;
            Coremetrics.tag('Element', pageID, tag);            
        };

        $rootScope.$on('lang:change', function(ev, args) {
            $scope.lang = args.lang;
            $scope.storeList = angular.copy($scope.copy[$scope.lang].stores.dropdown.list);
        });

        //google maps API on DIRECTIONS section
        // angular.extend($scope, {
        //     map: {
        //         control: {},
        //         center: {
        //             latitude: 40.7617753,
        //             longitude: -73.9688554
        //         },
        //         marker: {
        //             id: 0,
        //             latitude: 40.7617753,
        //             longitude: -73.9688554,
        //             options: {
        //                 visible: true
        //             }
        //         },
        //         zoom: 7,
        //         pan: true,
        //         refresh: true,
        //         events: {},
        //         bounds: {},
        //         polys: [],
        //         draw: undefined,
        //         options: {
        //             draggable: true,
        //             disableDefaultUI: true,
        //             panControl: false,
        //             navigationControl: false,
        //             scrollwheel: false,
        //             scaleControl: false
        //         }
        //     }
        // });

        // uiGmapGoogleMapApi.then(function(maps) {
        //     maps.visualRefresh = true;
        // });
    }
})();
