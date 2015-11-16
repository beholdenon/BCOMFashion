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
            'uiGmapgoogle-maps' //ref: http://angular-ui.github.io/angular-google-maps/#!/api/
        ])
        .config(config)
        .run(run);

    function config($interpolateProvider, $routeProvider, localStorageServiceProvider, uiGmapGoogleMapApiProvider) {
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
    }

    function run($window, $rootScope, $document, $location, $timeout, $interval, localStorageService, AppGlobals, Coremetrics) {
        AppGlobals.init();

        Coremetrics.init();

        //attach fastclick to solve the 300ms touch delay 
        FastClick.attach(document.body); // jshint ignore:line

        var globalLang = null;
        try {
            globalLang = localStorageService.get('lang');
            AppGlobals.setAttr('lang', globalLang);
        } catch (err) {}

        //show language selector overlay for the first visit
        if (globalLang === null) {
            $timeout(function() {
                $rootScope.$emit('overlay:show', {
                    template: 'select-lang'
                });
            }, 600);
        } else {
            var pageID = null;
            switch(globalLang) {
                case 'POR':
                    pageID = 'fall15_brazilmicrosite';
                    break;
                case 'CN':
                    pageID = 'fall15_chinamicrosite';
                    break;
                default:
                    pageID = 'fall15_englishmicrosite';
            }

            AppGlobals.setAttr('cm_pageID', pageID);
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
            coremetricsPageViewTag(path);
        });

        function activateNavSelection(path) {
            jQuery('.nav-section a').removeClass('active');
            jQuery('.nav-section a[href="' + path + '"]').addClass('active');
        }

        function coremetricsPageViewTag(path) {
            var windowWidth = $window.innerWidth,
                pageID = null,
                catID = null,
                prefix = (windowWidth < 641) ? 'MBL:' : ''; 

            var stop;
            if (angular.isDefined(stop)) return;

            stop = $interval(function() {
                pageID = AppGlobals.getAttr('cm_pageID');
                
                if (pageID === null) {
                    // console.log('trying...');
                } else {
                    if (angular.isDefined(stop)) {
                        __bindPageviewCM();
                        $interval.cancel(stop);
                        stop = undefined;
                    }
                }
            }, 1000);

            function __bindPageviewCM() {
                switch(path) {
                    case '/':
                        catID = pageID + '--hp';
                        break;
                    case '/our-heritage':
                        catID = pageID + '--heritage';
                        break;
                    case '/designer-destination':
                        catID = pageID + '--designer_destination';
                        break;
                    case '/visit-our-stores':
                        catID = pageID + '--visit';
                        break;
                }                      
                pageID = prefix + pageID;

                Coremetrics.tag('Pageview', pageID, catID);
            }
        }

        // -------------------------------------------------------------------------------------- //
        // ----------------------------          jQuery       ----------------------------------- //
        // -------------------------------------------------------------------------------------- //
        jQuery($document).foundation();

        jQuery($window).load(function() {  
            jQuery('.left-off-canvas-toggle, .exit-off-canvas').on('click', function() {
                var pageID = AppGlobals.getAttr('cm_pageID'),
                    windowWidth = $window.innerWidth,
                    prefix = (windowWidth < 641) ? 'MBL:' : '',
                    tag = null;            

                if (jQuery('.off-canvas-wrap').hasClass('move-right')) {
                    jQuery('.off-canvas-wrap').css('height', '100%');
                    jQuery('body').css({
                        'height': '100%',
                        'overflow': 'initial'
                    });
                    jQuery('.left-off-canvas-toggle').removeClass('open');
    
                    //Coremetrics tag          
                    tag = prefix + 'settings-menu_close';
                    Coremetrics.tag('Element', pageID, tag);                
                } else {
                    jQuery('.left-off-canvas-toggle').addClass('open');
                    var height = document.body.clientHeight;
                    jQuery('.off-canvas-wrap').css('height', height);
                    jQuery('body').css({
                        'height': height,
                        'overflow': 'hidden'
                    });
                    jQuery('.arriving-input, .departing-input').hide();

                    //Coremetrics tag          
                    tag = prefix + 'settings-menu_open';
                    Coremetrics.tag('Element', pageID, tag);                
                }
            });
        });

        jQuery($window).on('orientationchange resize', function() {
            if (jQuery('.off-canvas-wrap').hasClass('move-right')) {
                jQuery('.left-off-canvas-toggle').click();
                jQuery('.off-canvas-wrap').removeClass('touch');
            }
        });
    }    
})();