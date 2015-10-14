'use strict';

angular.module('CNBRapp')
	.controller('homeCtrl', function($scope, $route, $routeParams, $location){
	    var vm = this;
	    vm.title = 'MAIN PAGE';
		vm.route = $route;
		vm.location = $location;
		vm.routeParams = $routeParams;	    
	});
