(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($rootScope, $scope, $window, $location, localStorageService, AppGlobals, SocialShare, Coremetrics) {
        $scope.lang = AppGlobals.getAttr('lang');
        $scope.weixinOn = false;
        $scope.flagModal = false;
        $scope.socialModal = false;

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
                        Coremetrics.tag('Element', prefix + pageID, prefix + view);
                        break;
                    case 'http://www1.bloomingdales.com/':
                        // $event.preventDefault();
                        view = 'hp_shop-online';
                        Coremetrics.tag('Element', prefix + pageID, prefix + view);
                        break;                        
                    case 'http://www1.bloomingdales.com/shop/fashion-lookbooks-videos-style-guide?id=13668':
                        view = 'hp-shop-whats-new';
                        Coremetrics.tag('Element', prefix + pageID, prefix + view);
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

                Coremetrics.tag('Element', prefix + pageID, prefix + view);
            } else {
                var url = null;
                var device = (windowWidth < 641) ? 'mobileLinks' : 'desktopLinks';

                url = copy.ENG.home.shop[device][view];

                $window.open(url, '_blank');

                //Coremetrics tag
                view = 'hp_shop_' + view;
                Coremetrics.tag('Element', prefix + pageID, prefix + view);
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

            Coremetrics.tag('Element', prefix + pageID, tag);
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
            Coremetrics.tag('Element', prefix + pageID, tag);
        };

        $scope.langOnClick = function($event) {
            var globalLang,
                el = jQuery($event.target);

            globalLang = el.attr('data-lang') || el.parent().attr('data-lang');

            AppGlobals.setAttr('lang', globalLang);
            localStorageService.set('lang', globalLang);

            AppGlobals.setAttr('cm_pageID', $scope.globalLangSwitch(globalLang));

            $rootScope.$broadcast('lang:change', {
                lang: globalLang
            });
            jQuery('.top-bar-section .flags').toggleClass('active');

            //Coremetrics tag
            var windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '',             
                tag = prefix + 'language-btn_' + globalLang;
            Coremetrics.tag('Element', prefix + $scope.globalLangSwitch(globalLang), tag);
        };

        $scope.langModal = function ($event) {
            var globalLang,
                el = jQuery($event.target);

            if ( $scope.flagModal === true ) {
                $scope.flagModal = false;
            } else {
                $scope.flagModal = true;
            }
            $scope.socialModal = false;
            $scope.weixinOn = false;

            globalLang = el.attr('data-lang') || el.parent().attr('data-lang'); 

            AppGlobals.setAttr('lang', globalLang);
            localStorageService.set('lang', globalLang);     
            
            //set CM pageID global attr
            var pageID = null;

            switch(globalLang) {
                case 'POR':
                    pageID = 'brazil_show-overlay ';
                    break;
                case 'CN':
                    pageID = 'china_show-overlay ';
                    break;
                case 'ESP':
                    pageID = 'spanish_show-overlay ';
                    break;
                case 'JP':
                    pageID = 'japan_show-overlay ';
                    break;
                default:
                    pageID = 'english_show-overlay ';
            }
            AppGlobals.setAttr('cm_pageID', pageID);

            //Coremetrics tag
            var windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '',             
                tag = prefix + pageID;
            Coremetrics.tag('Element', prefix + $scope.globalLangSwitch(globalLang), tag);
        };

        $scope.shareModal = function () {
            if ( $scope.socialModal === true ) {
                $scope.socialModal = false;
            } else {
                $scope.socialModal = true;
            }
            $scope.flagModal = false;
            $scope.weixinOn = false;  

            //Coremetrics tag          
            var windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '',            
                tag = prefix + 'socialshare_show-overlay';                   
            Coremetrics.tag('Element', prefix + $scope.globalLangSwitch($scope.lang), tag);  
        };

        $scope.share = function(service, lang) {
            if (service !== 'weixin'){
                $window.open(SocialShare[service](lang), '_blank', 'width=608,height=342');
            } else {
                $scope.weixinOn = true;
            }

            //Coremetrics tag          
            var pageID = AppGlobals.getAttr('cm_pageID'),
                windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '',            
                tag = prefix + 'socialshare-';                   
            Coremetrics.tag('Element', prefix + pageID, tag + service);               
        };

        $scope.footerCM = function() {
            var href = 'http://ebm.cheetahmail.com/r/regf2?aid=2083023216&a=0&n=2';
            $window.open(href, '_blank');

            //Coremetrics tag          
            var pageID = AppGlobals.getAttr('cm_pageID'),
                windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '',            
                tag = prefix + 'footer_email-signup';

            Coremetrics.tag('Element', prefix + pageID, tag);
        };

        $rootScope.$on('lang:change', function(ev, args) {
            $scope.lang = args.lang;
        });

        $scope.pdfDownloadCM = function (lang) {
            var globalLang = lang,
                linkType = ($window.innerWidth < 641) ? 'mobileLink' : 'desktopLink';

            if (linkType === 'mobileLink') {
                $("#pdf-download-link").removeAttr( "target" );
            } else {
                $("#pdf-download-link").attr("target","_blank");
            }

            AppGlobals.setAttr('lang', globalLang);
            localStorageService.set('lang', globalLang);           

            AppGlobals.setAttr('cm_pageID', $scope.globalLangSwitch(globalLang));

            var windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '',             
                tag = prefix + 'download-pdf';
            Coremetrics.tag('Element', prefix + $scope.globalLangSwitch(globalLang), tag);
        };

        $scope.globalLangSwitch = function (globalLang) {
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
                    pageID = 'fall15_japanmicrosite';
                    break;
                default:
                    pageID = 'fall15_englishmicrosite';
            }

            return pageID;
        };
            
        $scope.closeThis = function () {
            $scope.flagModal = false;
            $scope.socialModal = false;
        };
    }
})();
