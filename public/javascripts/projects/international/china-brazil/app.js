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
		'CacheService',
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
	.run(function ($window, $document, localStorageService, appGlobals) {
		//attach fastclick to solve the 300ms touch delay 
		FastClick.attach(document.body); // jshint ignore:line
 		
 		var globalLang;
 		try {
 			globalLang = localStorageService.get('lang');
 			appGlobals.setAttr('lang', globalLang);

 			if (globalLang === null) localStorageService.set('lang', 'EN');
 		} catch (err) {
 			showOverlay();
 		}

		function showOverlay() {
			return console.log('show overlay');
		}



// -------------------------------------------------------------------------------------- //
// ----------------------------          jQuery       ----------------------------------- //
// -------------------------------------------------------------------------------------- //
	    $(document).foundation();

        $('.left-off-canvas-toggle, .exit-off-canvas').on('click', function() {
            if ($('.off-canvas-wrap').hasClass('move-right')) {
                $('.off-canvas-wrap').css('height', '100%');
                $('body').css({
                	'height': '100%',
                	'overflow': 'initial'
                }); 
                $('.left-off-canvas-toggle').removeClass('open');               
            } else {
            	$('.left-off-canvas-toggle').addClass('open');
                var height = document.body.clientHeight;
                $('.off-canvas-wrap').css('height', height);
                $('body').css({
                	'height': height,
                	'overflow': 'hidden'
                });
                $('.arriving-input, .departing-input').hide();
            }
        });

	    $(window).on('orientationchange resize', function() {
	        if ($('.off-canvas-wrap').hasClass('move-right')) $('.left-off-canvas-toggle').click();
	    });      			
  }); 
