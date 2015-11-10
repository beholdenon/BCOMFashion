(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('MainCtrl', MainCtrl);

    function MainCtrl($rootScope, $scope, $window, $location, localStorageService, appGlobals, socialshare) {
        $scope.lang = appGlobals.getAttr('lang');
        $scope.copy = appGlobals.getAttr('copy');

        $scope.goto = function(view) {
            if (view.indexOf('http') === 0) {
                $window.open(view);
            } else {
                $location.url(view);

                //reposition view on top of the page
                $window.scrollTo(0, 0);

                //close mobile nav menu 
                if (jQuery('.off-canvas-wrap').hasClass('move-right')) jQuery('.left-off-canvas-toggle').click();
            }
        };

        $scope.showSocialShareOverlay = function() {
            $scope.$emit('overlay:show', {
                template: 'social-share'
            });
        };

        $scope.shareOnMob = function(service, lang) {
            if (service !== 'weixin'){
                $window.open(socialshare[service](lang), '_blank', 'width=608,height=342');
            } else {
                $scope.$emit('overlay:show', {
                    template: 'social-share',
                    weixin: true
                });                
            }            
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
        };

        $rootScope.$on('lang:change', function(ev, args) {
            $scope.lang = args.lang;
        });
    }
})();