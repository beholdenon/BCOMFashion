(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('StoresCtrl', StoresCtrl);

    function StoresCtrl($rootScope, $scope, $window, $timeout, appGlobals) {
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

        $scope.mouseover = function() {
            console.log('mouseover', this);
            this.style.backgroundColor = 'grey';
        };
        $scope.mouseout = function() {
            this.style.backgroundColor = 'white';
        };
        $scope.click = function() {
            console.log('click');
        };
        $scope.customMarkers = [{
            address: '1600 pennsylvania ave, washington DC',            'class': 'my1'
        }, {
            address: '600 pennsylvania ave, washington DC',            'class': 'my2'
        }, ];
    }
})();
