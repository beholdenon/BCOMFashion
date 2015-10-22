'use strict';
angular.module('controllers', []);
angular.module('directives', []);
angular.module('services', []);

angular.module('CNBRapp', [
		'controllers',
		'directives',
		'services',
		'ngRoute',
		'ngMessages',
		'ngAnimate',
		'LocalStorageModule'
	])
	.config(['$interpolateProvider','$routeProvider', 'localStorageServiceProvider', function($interpolateProvider, $routeProvider, localStorageServiceProvider) {
        //configuring the default Angular interpolation markup to solve conflict with Handlebars {{}}
        $interpolateProvider.startSymbol('//');
        $interpolateProvider.endSymbol('//');

        //ref: https://github.com/grevory/angular-local-storage
        localStorageServiceProvider
        	.setPrefix('ChinaBrazil')
        	.setStorageCookie(45, '/');

	    $routeProvider
	        .when('/', {
                templateUrl: 'components/home.html',
                controller: 'HomeCtrl',
	        })	    
	        .when('/our-heritage', {
                templateUrl: 'components/our-heritage.html',
                controller: 'HeritageCtrl'
	        })	    
	        .when('/designer-destination', {
                templateUrl: 'components/designer-destination.html',
                controller: 'DesignerCtrl'
	        })	    
	        .when('/visit-our-stores', {
                templateUrl: 'components/visit-our-stores.html',
                controller: 'StoresCtrl'
	        })
	        .otherwise({
	            redirectTo: '/'
	        });
	}])
	.run(function (localStorageService) {
	// .run(function ($window, $document) {
		// $window.FastClick.attach($document.body);
 
 		var vm = {};

 		try {
 			vm.lang = getItem('lang');
 		} catch (err) {
 			vm.lang = null;
 		}

 		if (vm.lang === null) {
 			showOverlay();
 		}

		function getItem(key) {
			return localStorageService.get(key);
		}

		function showOverlay() {
			return console.log('show overlay');
		}

		// function submit(key, val) {
		// 	return localStorageService.set(key, val);
		// }

	    //     // Handle resume
	    //     $window.document.addEventListener('resume', function () {
	    //       Session.checkVersion().then(function (version) {
	    //         popUp.show({
	    //           template: 'standard-modal',
	    //           title: 'Version ' + version + ' Now Available',
	    //           body: 'This version of the application is no longer supported. Please update to the latest version to continue.',
	    //           buttonTitle: 'Update',
	    //           buttonAction: function () {
	    //             if ($window.deviceIsIOS) {
	    //               $window.open(config.market.ios, '_system');
	    //             } else if ($window.deviceIsAndroid) {
	    //               $window.open(config.market.android, '_system');
	    //             }
	    //           },
	    //           always: true
	    //         });
	    //       });
	    //       console.log('Device resume!');

	    //       $rootScope.$broadcast('vm.resume');

	    //   }

	    //   Session.checkVersion().then(function (version) {
	    //     popUp.show({
	    //       template: 'standard-modal',
	    //       title: 'Version ' + version + ' Now Available',
	    //       body: 'This version of the application is no longer supported. Please update to the latest version to continue.',
	    //       buttonTitle: 'Update',
	    //       buttonAction: function () {
	    //         if ($window.deviceIsIOS) {
	    //           $window.open(config.market.ios, '_system');
	    //         } else if ($window.deviceIsAndroid) {
	    //           $window.open(config.market.android, '_system');
	    //         }
	    //       },
	    //       always: true
	    //     });
	    //   });
	    // });

	    // // listen change start events
	    // $rootScope.$on('$routeChangeStart', function (event, next, current) {
	    //   $rootScope.viewDirection = 'rtl';
	    //   // console.log(arguments);
	    //   if (current && next && (current.depth > next.depth)) {
	    //     $rootScope.viewDirection = 'ltr';
	    //   }
	    //   // back
	    //   $rootScope.back = function () {
	    //     $window.history.back();
	    //   };
	    //   // location redirect for templates
	    //   $rootScope.goTo = function (path) {
	    //     $location.path(path);
	    //   };
	    // });

	    // $rootScope.$on('$locationChangeStart', function () {
	    //   cordovaConnection.checkConnection().then(function () {
	    //     popUp.enable();
	    //   }, Auth.noConnectionHandler);

	    //   if ($window.deviceIsIOS) {
	    //     $window.document.body.style.height = screen.availHeight + 'px';
	    //     $window.document.body.style.marginTop = "24px";
	    //   } else if ($window.deviceIsAndroid) {
	    //     $window.document.body.style.height = window.innerHeight + 'px';
	    //   }
	    // });

	    // $rootScope.$on('vm.logout', function () {
	    //   User.cleanMe();
	    //   $rootScope.globalNotificationCount = 0;
	    // });
  }); 
