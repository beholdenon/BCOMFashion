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
                templateUrl: 'components/home.html',
                controller: 'HomeCtrl'
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
    }

    function run($window, $rootScope, $document, $location, $timeout, localStorageService, appGlobals) {
        var copy = {
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
                },
                'heritage': {
                    'header': {
                        'h1': 'The Story of Bloomingdale\'s',
                        'h2': 'A Brief-ish History'
                    },
                    'article': {
                        'y1880': [{
                            'h3': '1872–A GREAT EAST SIDE BAZAAR',
                            'p': 'The Bloomingdale Brothers coin the phrase, "Location, location, location," and open their first store at 938 Third Avenue. Attention-grabbing window displays feature the latest Paris fashions. Soon, window shopping becomes a popular New York pastime.'
                        }, {
                            'h3': 'BLOOMINGDALE\'S PREDICTS THE FUTURE',
                            'p': 'Poised at the "retail crossroads" of New York, the new store at 59th Street and Third Avenue boasts a sky carriage, (i.e., an elevator). Thirteen years later, Lyman Bloomingdale finances a young inventor\'s idea of an "inclined elevator" and the escalator is born.'
                        }],
                        'y1900': [{
                            'h3': 'A Slogan Known Around the World',
                            'p': 'The IRT Third Avenue El, or elevated train, is the transportation method of choice for turn-of-the-century Bloomingdale\'s shoppers, so much so that billboards, beach umbrellas and comic strips all over the city (and the world) boast the popular slogan, "All Cars Transfer to Bloomingdale\'s." Gold footprints were embedded into the sidewalk so people would follow them off the train and into Bloomingdale\'s.'
                        }, {
                            'h3': '910–To a (Model) T',
                            'p': 'Bloomingdale\'s becomes the first store in New York City to use Henry Ford\'s Model T for deliveries.'
                        }],
                        'y1920': [{
                            'h3': 'Bloomingdale\'s Gets a Glamorous Makeover',
                            'p': 'Bloomingdale\'s anchors itself on Lexington Avenue and adds eleven new stories, capturing the new craze for Art Deco glamour with of-the-moment materials like black granite, limestone and terracotta. It occupies the entire block from Lexington to Third Avenue and from 59th to 60th Street. It is actually 10 buildings that are interconnected.'
                        }],
                        'y1940': [{
                            'h3': 'Bloomingdale\'s Turns 75 and Parties Like a Teenager',
                            'p': 'To mark her Diamond Jubilee, Bloomingdale\'s invites America\'s hottest 26 designers—including luminaries Claire McCardell, Pauline Trigere and Jo Copeland—to create a couture outfit for the store windows. The store also launches the first-ever home furnishings showroom.'
                        }],
                        'y1960': [{
                            'h3': 'Fashion Explodes',
                            'p': 'Men on the moon. The Mustang. Mod shops. And more. Bloomingdale\'s is the first store to give an admiring American audience to European visionaries like Yves Saint Laurent and Courrèges.'
                        }, {
                            'h3': 'Get Groovy, Baby',
                            'p': 'Starting in the fall of \'63, Bloomingdale\'s is the first store to commission the era\'s grooviest artists to illustrate the shopping bag. Artists like Jonah Kinigstein and Michael Vollbracht revolutionize the Bloomingdale\'s bag, making them instant art collectibles. Shopping bags would never be the same.'
                        }],
                        'y1970': [{
                            'h3': 'Bloomingdale\'s Goes Hollywood',
                            'p': 'The decade of decadence starts off with a bang as Bloomingdale\'s partners with Hollywood and Broadway. Major movies are filmed in the 59th Street store. Woody Allen\'s <i>Manhattan</i>, <i>Starting Over</i> and <i>The Electric Horseman</i> are just the beginning, with <i>Splash</i> and <i>Moscow on the Hudson</i> following in the \'80s.'
                        }, {
                            'h3': 'Bloomingdale\'s Launches the Big 3',
                            'p': 'Ralph Lauren, Donna Karan and Calvin Klein get their big starts at Bloomingdale\'s, proving yet again that the store champions youth, newness and fresh outlooks.'
                        }, {
                            'h3': 'Iconic',
                            'p': 'Bloomingdale\'s iconic Big Brown Bag first hit the streets in 1973. The Little Brown Bag followed a year later and the Medium Brown Bag was the final addition. Bloomingdale\'s has commissioned the most recognizable shopping bags in history and they can be seen in museum collections around the world.'
                        }],
                        'y1980': [{
                            'h3': 'Bloomingdale\'s sells the "sizzle."',
                            'p': 'Warhol calls Bloomingdale\'s "the new kind of museum for the \'80s." And, each day, the store transforms itself into a cutting-edge gallery of the latest and greatest. Bloomingdale\'s jumps aboard the decade of gala glamour. Star fashion figures like Karl Lagerfeld, Diane von Furstenberg, Liza Minnelli and Oscar de la Renta jet in for glamorous store openings.'
                        }, {
                            'h3': '1988–Year of the Dragon',
                            'p': 'A year before President Nixon traveled to China, Bloomingdale\'s was already making strides in rekindling a trade relationship with mainland China. Fifteen years later, in 1988, following up on the popular success of its first China campaign, the 59th Street flagship offers a 7-week epic panorama of fashion and design from the Orient, celebrating 10 years of trade with the People\'s Republic. Decked out accordingly, the store shines like a jewel from the Forbidden City.'
                        }],
                        'y1990': [{
                            'h3': 'The New Gold Rush',
                            'p': 'Four new California stores in four days: Century City, Stanford, Sherman Oaks and Newport Beach. And one year later, Beverly Center. Bloomingdale\'s is now the only upscale, full-selection department store with a national presence. Californians celebrate by shopping—and then going to the beach.'
                        }],
                        'y2000': [{
                            'h3': 'Bloomingdale\'s Gets Downtown Fashion Cred',
                            'p': 'All good things get better when they move downtown. Bloomingdale\'s opens in SoHo. A historic cast-iron façade building on Broadway transforms into a polished gem of 21st century fashion.'
                        }, {
                            'h3': 'Going Digital',
                            'p': 'bloomingdales.com is born. From designer clothing and luxury beauty products to handbags and statement shoes, the site gives customers around the globe world-class fashion at their fingertips.'
                        }, {
                            'h3': 'Beauty Revamp',
                            'p': 'The main B-way floor at 59th Street gets "the biggest makeover in NYC," with an array of state-of-the-art kiosks from top beauty brands.'
                        }],
                        'y2010': [{
                            'h3': '2011–A Gleaming New Space for Fine Jewelry',
                            'p': 'Designed to showcase every facet of the world\'s best designers, including David Yurman, the fine jewelry department at 59th Street—visited by over 400,000 people from over 230 countries and all 50 states—is an NYC Concierge Choice Award–winner five years running.'
                        }, {
                            'h3': 'No Limit to Being Like No Other',
                            'p': 'Today, there\'s no stopping where Bloomingdale\'s can go. The type of innovation synonymous with the brand since its first days continues to be central to its mission of luxury. By looking back at the triumphs of the past, Bloomingdale’s beholds the future. It\'s a future like no other.'
                        }]
                    }
                },
                'designer': {
                    'header': {
                        'h1': 'So Many Names in Just One Store',
                        'h2': 'We Handpick the Best Designers in Fashion, Beauty and Beyond'
                    },
                    'article': [
                        'Bloomingdale’s carries an unrivaled selection of designer brands including CHANEL, Dior, Michael Kors, MCM, Tory Burch, Marc Jacobs, Armani and Ralph Lauren.',
                        'Searching for the latest (and most coveted) beauty products? Find all of your favorite skin care, makeup and fragrance brands including La Mer, Estée Lauder, Gucci, Chloé, Clinique, Lancôme and kate spade new york.'
                    ]
                },
                'socialshare': {
                    'fb': {
                        'name': 'International Tourism | bloomingdales.com',
                        'description': 'From designer clothing to the most-coveted beauty brands, explore all that Bloomingdale\'s has to offer on their updated international site.'
                    },
                    'pinterest': {
                        'description': 'International Tourism | bloomingdales.com'
                    },
                    'twitter': {
                        'text': 'Love to shop @bloomingdales? Check out their international site for the latest designer clothing, accessories & beauty. http://bit.ly/aaa'
                    },
                    'weibo': {
                        'title': 'Discover Bloomingdale\'s luxury fashions, storied history and world-class hospitality on their updated international site.'
                    },
                    'weixin': {
                        'text': 'Scan the QR code to receive push notifications from Bloomingdale\'s.'
                    }
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
        appGlobals.setAttr('copy', copy);

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