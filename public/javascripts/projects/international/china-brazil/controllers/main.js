'use strict';

angular.module('CNBRapp')
    .controller('MainController', function($scope, $location) {
    	$scope.goto = function(view) {
    		$location.url(view);
    	};
    });
