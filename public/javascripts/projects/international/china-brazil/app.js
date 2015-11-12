(function() {
    'use strict';

    angular.module('controllers', []);
    angular.module('directives', []);
    angular.module('services', []);

    angular
        .module('CNBRapp', [
            'controllers',
            'directives',
            'services',
            'ngRoute',
            'ngMessages',
            'ngAnimate',
            'CacheService',
            'LocalStorageModule', //ref: https://github.com/grevory/angular-local-storage
            'uiGmapgoogle-maps', //ref: http://angular-ui.github.io/angular-google-maps/#!/api/
            'angulartics', //ref: https://github.com/angulartics/angulartics
            'angulartics.coremetrics.analytics' //ref: https://github.com/cwill747/angulartics-coremetrics
        ])
        .config(config)
        .run(run);

    function config($interpolateProvider, $routeProvider, localStorageServiceProvider, uiGmapGoogleMapApiProvider, $analyticsProvider) {
        //configuring the default Angular interpolation markup to solve conflict with Handlebars {{}}
        $interpolateProvider.startSymbol('//');
        $interpolateProvider.endSymbol('//');

        //ref: https://github.com/grevory/angular-local-storage
        localStorageServiceProvider
            .setPrefix('ChinaBrazil')
            .setStorageCookie(45, '/');

        $routeProvider
            .when('/', {
                templateUrl: 'components/home.html'
            })
            .when('/our-heritage', {
                templateUrl: 'components/our-heritage.html'
            })
            .when('/designer-destination', {
                templateUrl: 'components/designer-destination.html'
            })
            .when('/visit-our-stores', {
                templateUrl: 'components/visit-our-stores.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        //Google maps config 
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyAzXauC8RAX_qxgaP_qC9rPQye5HQHy8fc',
            channel: 'fashion.bloomingdales.com',
            signed_in: 'true',  // jshint ignore:line
            sensor: 'false',
            libraries: 'places,geometry,visualization'
        });

        //Coremetrics 
        $analyticsProvider.settings.coremetrics.userId = 'test1';
        $analyticsProvider.settings.coremetrics.additionalAccountIDs = 'test2';
    }

    function run($window, $rootScope, $document, $location, $timeout, localStorageService, appGlobals) {
        appGlobals.init();
        var copy;
        copy = appGlobals.getAttr('copy');

        //attach fastclick to solve the 300ms touch delay 
        FastClick.attach(document.body); // jshint ignore:line

        var globalLang;
        try {
            globalLang = localStorageService.get('lang');
            appGlobals.setAttr('lang', globalLang);
        } catch (err) {
            //silence
        }

        //show language selector overlay for the first visit
        if (globalLang === null) {
            $timeout(function() {
                $rootScope.$emit('overlay:show', {
                    template: 'select-lang'
                });
            }, 400);
        }

        //mark active section in the nav menu when app loads
        var path = $location.path();
        if (path !== '/') {
            $timeout(function() {
                activateNavSelection(path);
            }, 400);
        }

        //mark active section in the nav menu when app changes view
        $rootScope.$on('$routeChangeStart', function() {
            path = $location.path();
            activateNavSelection(path);
        });

        function activateNavSelection(path) {
            jQuery('.nav-section a').removeClass('active');
            jQuery('.nav-section a[href="' + path + '"]').addClass('active');
        }

        // -------------------------------------------------------------------------------------- //
        // ----------------------------          jQuery       ----------------------------------- //
        // -------------------------------------------------------------------------------------- //
        jQuery(document).foundation();

        jQuery('.left-off-canvas-toggle, .exit-off-canvas').on('click', function() {
            if (jQuery('.off-canvas-wrap').hasClass('move-right')) {
                jQuery('.off-canvas-wrap').css('height', '100%');
                jQuery('body').css({
                    'height': '100%',
                    'overflow': 'initial'
                });
                jQuery('.left-off-canvas-toggle').removeClass('open');
            } else {
                jQuery('.left-off-canvas-toggle').addClass('open');
                var height = document.body.clientHeight;
                jQuery('.off-canvas-wrap').css('height', height);
                jQuery('body').css({
                    'height': height,
                    'overflow': 'hidden'
                });
                jQuery('.arriving-input, .departing-input').hide();
            }
        });

        jQuery(window).on('orientationchange resize', function() {
            if (jQuery('.off-canvas-wrap').hasClass('move-right')) {
                jQuery('.left-off-canvas-toggle').click();
                jQuery('.off-canvas-wrap').removeClass('touch');
            }
        });
    }    
})();