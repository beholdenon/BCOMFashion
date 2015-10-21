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
		'angular-owl-carousel'
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
	        .when('/designer-destination', {
                templateUrl: 'components/designer-destination.html',
                controller: 'designerDestinationCtrl'
	        })	    
	        .when('/visit-our-stores', {
                templateUrl: 'components/visit-our-stores.html',
                controller: 'visitOurStoresCtrl'
	        })
	        .otherwise({
	            redirectTo: '/'
	        });
	}])
	.run(function () {
	// .run(function ($window, $document) {
		// $window.FastClick.attach($document.body);


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
