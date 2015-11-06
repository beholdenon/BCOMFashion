(function() {
	'use strict';

	angular
		.module('controllers')
		.controller('StoresCtrl', StoresCtrl);

	function StoresCtrl($scope, appGlobals){
        $scope.lang = appGlobals.getAttr('lang');
        $scope.copy = appGlobals.getAttr('copy');
        $scope.storeList = ($scope.lang) ? angular.copy($scope.copy[$scope.lang].stores.dropdown.list) : null;
        $scope.storeSelection = null;
	 
	    $scope.$on('lang:change', function(ev, args) {
	        $scope.lang = args.lang;
	        $scope.storeList = angular.copy($scope.copy[$scope.lang].stores.dropdown.list);
	        console.log('receive');
	    });	   
	}
})();