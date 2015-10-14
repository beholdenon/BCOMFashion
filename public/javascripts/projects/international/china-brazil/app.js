'use strict';
angular.module('controllers', []);
angular.module('directives', []);
angular.module('services', []);

angular.module('CNBRapp', [
		'controllers',
		'directives',
		'services',
		'ngRoute'
	])

	.config(['$interpolateProvider','$routeProvider', function($interpolateProvider, $routeProvider) {
        $interpolateProvider.startSymbol('//');
        $interpolateProvider.endSymbol('//');

	    $routeProvider
	        .when('/', {
                templateUrl: 'components/home.html',
                controller: 'homeCtrl'
	        })	    
	        .when('/our-heritage', {
                templateUrl: 'components/our-heritage.html',
                controller: 'ourHeritageCtrl'
	        })
	        .otherwise({
	            redirectTo: '/'
	        });
	}]);
