(function() {
	'use strict';

	angular
		.module('controllers')
		.controller('StoresCtrl', StoresCtrl);

	function StoresCtrl($scope, appGlobals){
        $scope.lang = appGlobals.getAttr('lang');
        $scope.copy = appGlobals.getAttr('copy');
        $scope.storeList = angular.copy($scope.copy[$scope.lang].stores.dropdown.list);
        $scope.storeSelection = null;
	}
})();