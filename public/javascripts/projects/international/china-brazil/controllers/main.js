'use strict';

angular.module('controllers')
    .controller('MainCtrl', function($scope, $window, $location) {
    	$scope.goto = function(view) {
    		if (view.indexOf('http') === 0){
    			$window.open(view);
    		} else {
    			$location.url(view);

                $window.scrollTo(0, 0);

    			// $scope.selSection = 

    			// var el = $event.target;
    			// console.log(el);
    			// angular.element(e.srcElement);
    		}
    	};
    });
