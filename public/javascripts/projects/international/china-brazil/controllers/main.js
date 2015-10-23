'use strict';

angular.module('controllers')
    .controller('MainCtrl', function($scope, $window, $location, appGlobals) {
    	$scope.goto = function(view) {
    		if (view.indexOf('http') === 0){
    			$window.open(view);
    		} else {
    			$location.url(view);

                //reposition view on top of the page
                $window.scrollTo(0, 0);
    		}
    	};

        $scope.lang = appGlobals.getAttr('lang');
    });
