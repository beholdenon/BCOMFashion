(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($rootScope, $scope, $window, $location, localStorageService, appGlobals, socialshare, Coremetrics) {
        $scope.lang = appGlobals.getAttr('lang');
        var copy = $scope.copy = appGlobals.getAttr('copy');

        $scope.goto = function($event, view) {
            var pageID = appGlobals.getAttr('cm_pageID'),
                windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '';

            if (view.indexOf('http') === 0) {
                $window.open(view);

                //Coremetrics tag
                switch (view) {
                    case 'http://www1.bloomingdales.com/':
                        view = 'top-nav_shop';
                        break;
                    case 'http://www1.bloomingdales.com/shop/fashion-lookbooks-videos-style-guide?id=13668':
                        view = 'hp-shop-whats-new';
                        break;
                }
                Coremetrics.tag('Element', pageID, prefix + view);
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
                var url = null,
                    device = (windowWidth < 641) ? 'mobileLinks:' : 'desktopLinks';

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
            var pageID = appGlobals.getAttr('cm_pageID'),
                windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '',            
                tag = prefix + 'socialshare_show-overlay';
            Coremetrics.tag('Element', pageID, tag);
        };

        $scope.shareOnMob = function(service, lang) {
            if (service !== 'weixin') {
                $window.open(socialshare[service](lang), '_blank', 'width=608,height=342');
            } else {
                $scope.$emit('overlay:show', {
                    template: 'social-share',
                    weixin: true
                });
            }

            //Coremetrics tag          
            var pageID = 'MBL:' + appGlobals.getAttr('cm_pageID'),
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

            appGlobals.setAttr('lang', globalLang);
            localStorageService.set('lang', globalLang);

            $rootScope.$broadcast('lang:change', {
                lang: globalLang
            });

            //Coremetrics tag
            var pageID = appGlobals.getAttr('cm_pageID'),
                windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '',             
                tag = prefix + 'language-btn_' + globalLang;
            Coremetrics.tag('Element', pageID, tag);
        };

        $rootScope.$on('lang:change', function(ev, args) {
            $scope.lang = args.lang;
        });
    }
})();
