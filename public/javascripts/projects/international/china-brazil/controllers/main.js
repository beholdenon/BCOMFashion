'use strict';

angular.module('controllers')
    .controller('MainCtrl', function($scope, $window, $location, localStorageService, appGlobals) {
    	$scope.lang = appGlobals.getAttr('lang');

        $scope.goto = function(view) {
    		if (view.indexOf('http') === 0){
    			$window.open(view);
    		} else {
                $location.url(view);

                //reposition view on top of the page
                $window.scrollTo(0, 0);

                //close mobile nav menu 
                if ($('.off-canvas-wrap').hasClass('move-right')) $('.left-off-canvas-toggle').click();
    		}
    	};

        $scope.copy = {
            'ENG': {
                'nav': [
                    'OUR HERITAGE',
                    'DESIGNER DESTINATION',
                    'VISIT OUR STORES',
                    'SHOP ONLINE'
                ],
                'home': {
                    'header': {
                        'mobile': {
                            'h1': 'Welcome',
                            'h2': 'See All the Stylish Sights Starting\n' +
                                'with a Visit to Bloomingdale\'s',
                            'p': 'Since 1872, Bloomingdale\'s has been\n' +
                                'at the center of style, carrying the\n' +
                                'most coveted designer fashions, shoes,\n' +
                                'handbags, cosmetics, fine jewelry and\n' +
                                'gifts in the world. When you visit our\n' +
                                'stores, you\'ll enjoy exclusive personal\n' +
                                'touches—like multilingual associates\n' +
                                'and special concierge services—that\n' +
                                'ensure you feel welcome, pampered\n' +
                                'and at home. These are just a few of\n' +
                                'the things that make Bloomingdale\'s\n' +
                                'like no other store in the world.'
                        },
                        'desktop': {
                            'h1': 'Welcome',
                            'h2': 'See All the Stylish Sights\n' +
                                'Starting with a Visit to Bloomingdale\'s', 
                            'p': 'Since 1872, Bloomingdale\'s has been at the center' +
                                'of style, carrying the most coveted designer' +
                                'fashions, shoes, handbags, cosmetics, fine jewelry' +
                                'and gifts in the world. When you visit our stores,' +
                                'you\'ll enjoy exclusive personal touches—like' +
                                'multilingual associates and special concierge' +
                                'services—that ensure you feel welcome, pampered' +
                                'and at home. These are just a few of the things' +
                                'that make Bloomingdale\'s like no other store in the world.'
                        }
                    },
                    'cat': [
                        'Our Heritage',
                        'Designer Destination',
                        'Visit Our Stores'
                    ],
                    'shop': [
                        'WOMEN',
                        'HANDBAGS',
                        'SHOES',
                        'Jewelry & Accessories',
                        'Men',
                        'home',
                        'kids',
                        'What\'s New',
                        'sale'
                    ]
                }
            }, 
            'POR': {
                'nav': [
                    'nosso Legado',
                    'Designer Destino',
                    'Visite Nossas Lojas',
                    'loja online'
                ]
            },
            'CN': {
                'nav': [
                    '传统和历史',
                    '知名设计',
                    '访问商店',
                    '网上购物'
                ]
            },
        };
 
        $scope.langOnClick = function($event) {
            var globalLang,
                el = $($event.target);

            $('.lang-opt').removeClass('active');
            el.parent('li').addClass('active');

            globalLang = el.attr('data-lang'); 

            appGlobals.setAttr('lang', globalLang);
            localStorageService.set('lang', globalLang);

            $scope.$broadcast('lang:change', {lang: globalLang});
        };

        $scope.$on('lang:change', function(ev, args) {
            $scope.lang = args.lang;
        });
    });
