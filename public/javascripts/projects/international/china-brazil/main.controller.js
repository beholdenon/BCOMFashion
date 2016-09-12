(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($rootScope, $scope, $window, $location, localStorageService, AppGlobals, SocialShare, Coremetrics) {
        $scope.lang = AppGlobals.getAttr('lang');
        var copy = $scope.copy = AppGlobals.getAttr('copy');

        $scope.goto = function($event, view) {
            var pageID = AppGlobals.getAttr('cm_pageID'),
                windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '';

            if (view.indexOf('http') === 0) {
                $window.open(view);

                //Coremetrics tag
                switch (view) {
                    case 'http://www1.bloomingdales.com/#':
                        // $event.preventDefault();
                        view = 'top-nav_shop';
                        Coremetrics.tag('Element', pageID, prefix + view);
                        break;
                    case 'http://www1.bloomingdales.com/':
                        // $event.preventDefault();
                        view = 'hp_shop-online';
                        Coremetrics.tag('Element', pageID, prefix + view);
                        break;                        
                    case 'http://www1.bloomingdales.com/shop/fashion-lookbooks-videos-style-guide?id=13668':
                        view = 'hp-shop-whats-new';
                        Coremetrics.tag('Element', pageID, prefix + view);
                        break;
                }
            } else if (view.indexOf('/') === 0) {
                $location.url(view);

                //reposition view on top of the page
                $window.scrollTo(0, 0);

                //close mobile nav menu 
                if (jQuery('.off-canvas-wrap').hasClass('move-right')) jQuery('.left-off-canvas-toggle').click();

                //Coremetrics tag
                switch (view) {
                    case '/our-heritage':
                        view = 'heritage';
                        break;
                    case '/designer-destination':
                        view = 'designer_destination';
                        break;
                    case '/visit-our-stores':
                        view = 'visit';
                        break;
                }
                
                if (jQuery($event.target).parent().attr('class') === 'nav-section') {
                    view = 'top-nav_' + view;  
                } else {
                    view = 'hp_category_' + view;
                }

                Coremetrics.tag('Element', pageID, prefix + view);
            } else {
                var url = null;
                var device = (windowWidth < 641) ? 'mobileLinks' : 'desktopLinks';

                url = copy.ENG.home.shop[device][view];

                $window.open(url, '_blank');

                //Coremetrics tag
                view = 'hp_shop_' + view;
                Coremetrics.tag('Element', pageID, prefix + view);
            }
        };

        $scope.showSocialShareOverlay = function() {
            $scope.$emit('overlay:show', {
                template: 'social-share'
            });

            //Coremetrics tag          
            var pageID = AppGlobals.getAttr('cm_pageID'),
                windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '',            
                tag = prefix + 'socialshare_show-overlay';

            Coremetrics.tag('Element', pageID, tag);
        };

        $scope.shareOnMob = function(service, lang) {
            if (service !== 'weixin') {
                $window.open(SocialShare[service](lang), '_blank', 'width=608,height=342');
            } else {
                $scope.$emit('overlay:show', {
                    template: 'social-share',
                    weixin: true
                });
            }

            //Coremetrics tag          
            var pageID = 'MBL:' + AppGlobals.getAttr('cm_pageID'),
                windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '',              
                tag = prefix + 'socialshare-' + service;
            Coremetrics.tag('Element', pageID, tag);
        };

        $scope.langOnClick = function($event) {
            var globalLang,
                el = jQuery($event.target);

            jQuery('.lang-opt').removeClass('active');
            el.parent('li').addClass('active');

            globalLang = el.attr('data-lang');

            AppGlobals.setAttr('lang', globalLang);
            localStorageService.set('lang', globalLang);

            //set CM pageID global attr
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

            $rootScope.$broadcast('lang:change', {
                lang: globalLang
            });

            //Coremetrics tag
            var windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '',             
                tag = prefix + 'language-btn_' + globalLang;
            Coremetrics.tag('Element', pageID, tag);
        };

        $scope.footerCM = function() {
            var href = 'http://ebm.cheetahmail.com/r/regf2?aid=2083023216&a=0&n=2';
            $window.open(href, '_blank');

            //Coremetrics tag          
            var pageID = AppGlobals.getAttr('cm_pageID'),
                windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '',            
                tag = prefix + 'footer_email-signup';

            Coremetrics.tag('Element', pageID, tag);
        };

        $rootScope.$on('lang:change', function(ev, args) {
            $scope.lang = args.lang;
        });
    }
})();
