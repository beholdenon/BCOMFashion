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
            'LocalStorageModule' //ref: https://github.com/grevory/angular-local-storage
        ])
        .config(config)
        .run(run);

    function config($interpolateProvider, $routeProvider, localStorageServiceProvider) {
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
            $('.nav-section a').removeClass('active');
            $('.nav-section a[href="' + path + '"]').addClass('active');
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
            if ($('.off-canvas-wrap').hasClass('move-right')) {
                $('.left-off-canvas-toggle').click();
                $('.off-canvas-wrap').removeClass('touch');
            }
        });
    }    
})();