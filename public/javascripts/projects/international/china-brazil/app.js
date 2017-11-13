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
            //'uiGmapgoogle-maps' //ref: http://angular-ui.github.io/angular-google-maps/#!/api/
        ])
        .config(config)
        .run(run);

    function config($interpolateProvider, $routeProvider, localStorageServiceProvider) { //uiGmapGoogleMapApiProvider
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
                resolve: {
                    langSwitch : function ( $rootScope, $location, localStorageService  ) {

                        // check for a language, eg: /#/chinese
                        // if language is found, switch, then go to homepage

                        var path = $location.path().toLowerCase(),
                            globalLang = null;
                        
                        switch ( path ) {
                            case '/english':
                                globalLang = 'ENG';
                                break;
                            case '/portuguese':
                                globalLang = 'POR';
                                break;
                            case '/chinese':
                                globalLang = 'CN';
                                break;
                            case '/spanish':
                                globalLang = 'ESP';
                                break;
                            case '/japanese':
                                globalLang = 'JP';
                                break;
                            default:
                                globalLang = localStorageService.get('lang') || 'ENG';
                        }

                        $rootScope.$broadcast('lang:change', {
                            lang: globalLang
                        });
                        
                        localStorageService.set('lang', globalLang);
                        $location.path('/');
                    }
                }
            });   

        //Google maps config
        // uiGmapGoogleMapApiProvider.configure({
        //     key: 'AIzaSyAzXauC8RAX_qxgaP_qC9rPQye5HQHy8fc',
        //     channel: 'fashion.bloomingdales.com',
        //     signed_in: 'true',  // jshint ignore:line
        //     sensor: 'false',
        //     libraries: 'places,geometry,visualization'
        // });
    }

    function run($window, $rootScope, $document, $location, $timeout, $interval, localStorageService, AppGlobals, Coremetrics) {
        AppGlobals.init();

        Coremetrics.init();

        //attach fastclick to solve the 300ms touch delay 
        //FastClick.attach(document.body); // jshint ignore:line

        var globalLang = null;
        try {
            globalLang = localStorageService.get('lang');
            AppGlobals.setAttr('lang', globalLang);
        } catch (err) {}

        if (globalLang !== null) {
            var pageID = null;

            switch(globalLang) {
                case 'POR':
                    pageID = 'fall15_brazilmicrosite';
                    break;
                case 'CN':
                    pageID = 'fall15_chinamicrosite';
                    break;
                case 'ESP':
                    pageID = 'fall15_spanishmicrosite';
                    break;
                case 'JP':
                    pageID = 'fall15_japanesemicrosite';
                    break;
                default:
                    pageID = 'fall15_englishmicrosite';
            }

            AppGlobals.setAttr('cm_pageID', pageID);
        } else {
            //show language selector overlay for the first visit
            var stop;

            if (angular.isDefined(stop)) return;

            stop = $interval(function() {
                globalLang = localStorageService.get('lang');
                
                if (globalLang === null || globalLang === undefined) {
                    $rootScope.$emit('overlay:show', {
                        template: 'select-lang'
                    });     
                                       
                    // console.log('trying...');
                } else {
                    if (angular.isDefined(stop)) {
                        $interval.cancel(stop);
                        stop = undefined;
                    }
                }
            }, 1000);
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
            $('.nav-section a').removeClass('active');
            $('.nav-section a[href="' + path + '"]').addClass('active');
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
                catID = prefix + catID;                    
                pageID = prefix + pageID;

                Coremetrics.tag('Pageview', catID, pageID);
            }
        }

        // -------------------------------------------------------------------------------------- //
        // ----------------------------          jQuery       ----------------------------------- //
        // -------------------------------------------------------------------------------------- //
        $($document).foundation();

        $($window).load(function() {  
            $('.left-off-canvas-toggle, .exit-off-canvas').on('click', function() {
                var pageID = AppGlobals.getAttr('cm_pageID'),
                    windowWidth = $window.innerWidth,
                    prefix = (windowWidth < 641) ? 'MBL:' : '',
                    tag = null;            

                if ($('.off-canvas-wrap').hasClass('move-right')) {
                    $('.off-canvas-wrap').css('height', '100%');
                    $('body').css({
                        'height': '100%',
                        'overflow': 'initial'
                    });
                    $('.left-off-canvas-toggle').removeClass('open');
                    $('.arriving-input, .departing-input').show();
    
                    //Coremetrics tag          
                    tag = prefix + 'settings-menu_close';
                    Coremetrics.tag('Element', prefix + pageID, tag);                
                } else {
                    $('.left-off-canvas-toggle').addClass('open');
                    var height = document.body.clientHeight;
                    $('.off-canvas-wrap').css('height', height);
                    $('body').css({
                        'height': height,
                        'overflow': 'hidden'
                    });
                    $('.arriving-input, .departing-input').hide();

                    //Coremetrics tag          
                    tag = prefix + 'settings-menu_open';
                    Coremetrics.tag('Element', prefix + pageID, tag);                
                }
            });
        });

        $($window).on('orientationchange resize', function() {
            if ($('.off-canvas-wrap').hasClass('move-right')) {
                $('.left-off-canvas-toggle').click();
                $('.off-canvas-wrap').removeClass('touch');
            }
        });

        //Close language and social overlays when clicked outside
        $($document).mouseup(function (e) {
            var flagsOverlay = $('.flags'),
                socialOverlay = $('.social');

            // if the target of the click isn't the container or a descendant of the container
            if ((!flagsOverlay.is(e.target) && flagsOverlay.has(e.target).length === 0)) {
                flagsOverlay.removeClass('active');
            }

            if ((!socialOverlay.is(e.target) && socialOverlay.has(e.target).length === 0)) {
                socialOverlay.removeClass('active');
            }
        });

    }    
})();