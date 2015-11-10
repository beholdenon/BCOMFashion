(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('OverlayCtrl', OverlayCtrl);

    function OverlayCtrl($rootScope, $scope, $window, $timeout, appGlobals, localStorageService, socialshare) {
        $scope.overlay = {};
        $scope.overlay.weixinOn = false;
        $scope.QRcopy = socialshare.weixin;

        $scope.closeOverlay = function() {
            var touch = jQuery('.off-canvas-wrap').hasClass('touch');

            if (touch || !this.$parent.overlay.weixinOn) {
                $scope.overlay.isShowed = false;
                jQuery('html, body').removeClass('noscroll');
                jQuery('.off-canvas-wrap').removeClass('touch');
                $window.noBounce.remove({
                    animate: true
                });
                if (touch) $scope.overlay.weixinOn = false;
            } else {
                $scope.overlay.weixinOn = false;
            }
        };

        $scope.selLang = function($event) {
            var el = jQuery($event.target),
                globalLang = el.attr('data-lang'),
                navElSel = jQuery('.lang-opt a[data-lang="' + globalLang + '"]');

            navElSel.parent('li').addClass('active');

            appGlobals.setAttr('lang', globalLang);
            localStorageService.set('lang', globalLang);

            $scope.overlay.isShowed = false;
            $rootScope.$emit('lang:change', {
                lang: globalLang
            });
      
            jQuery('html, body').removeClass('noscroll');
            $window.noBounce.remove({
                animate: true
            });
        };

        $scope.share = function(service, lang) {
            if (service !== 'weixin'){
                $window.open(socialshare[service](lang), '_blank', 'width=608,height=342');console.log(lang);
            } else {
                $scope.overlay.weixinOn = true;
            }
        };

        $rootScope.$on('overlay:show', function(ev, args) {
            $scope.overlay.template = args.template;
            $scope.overlay.weixinOn = args.weixin;
            $scope.overlay.isShowed = true;

            if (jQuery('.off-canvas-wrap').hasClass('move-right')) {
                jQuery('.left-off-canvas-toggle').click();
                jQuery('.off-canvas-wrap').addClass('touch');
            }
            
            jQuery('html, body').addClass('noscroll');
            $window.noBounce.init({
                animate: true
            });
        });
    }
})();
