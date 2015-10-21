'use strict';

angular.module('controllers')
    .controller('MainCtrl', function($scope, $location) {
    	$scope.goto = function(view) {
    		$location.url(view);
    	};
    });
