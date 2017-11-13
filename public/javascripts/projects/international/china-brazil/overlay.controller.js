(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('OverlayCtrl', OverlayCtrl);

    function OverlayCtrl($rootScope, $scope, $window, $timeout, AppGlobals, localStorageService, SocialShare, Coremetrics) {
        $scope.overlay = {};
        $scope.overlay.weixinOn = false;
        $scope.QRcopy = SocialShare.weixin;

        $scope.closeOverlay = function() {
            var touch = $('.off-canvas-wrap').hasClass('touch');

            if (touch || !this.$parent.overlay.weixinOn) {
                $scope.overlay.isShowed = false;
                $('html, body').removeClass('noscroll');
                $('.off-canvas-wrap').removeClass('touch');
                $window.noBounce.remove({
                    animate: true
                });
                if (touch) $scope.overlay.weixinOn = false;
            } else {
                $scope.overlay.weixinOn = false;
            }

            //Coremetrics tag
            var pageID = AppGlobals.getAttr('cm_pageID'),
                windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '',             
                tag = prefix + 'overlay_close';                   
            Coremetrics.tag('Element', prefix + pageID, tag);                
        };

        $scope.selLang = function($event) {
            var el = $($event.target),
                globalLang = el.attr('data-lang'),
                navElSel = $('.lang-opt a[data-lang="' + globalLang + '"]');

            navElSel.parent('li').addClass('active');

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
                case 'ESP':
                    pageID = 'fall15_spanishmicrosite';
                    break;
                case 'JP':
                    pageID = 'fall15_japanmicrosite';
                    break;
                default:
                    pageID = 'fall15_englishmicrosite';
            }
            AppGlobals.setAttr('cm_pageID', pageID);

            $scope.overlay.isShowed = false;
            $rootScope.$emit('lang:change', {
                lang: globalLang
            });
      
            $('html, body').removeClass('noscroll');
            $window.noBounce.remove({
                animate: true
            });

            //Coremetrics tag          
            var windowWidth = $window.innerWidth,
                prefix = (windowWidth < 641) ? 'MBL:' : '',
                tag = prefix + 'select-language-overlay';                              
            Coremetrics.tag('Element', prefix + pageID, tag);              
        };

        $rootScope.$on('overlay:show', function(ev, args) {
            $scope.overlay.template = args.template;
            $scope.overlay.weixinOn = args.weixin || null;
            $scope.overlay.isShowed = true;

            if ($('.off-canvas-wrap').hasClass('move-right')) {
                $('.left-off-canvas-toggle').click();
                $('.off-canvas-wrap').addClass('touch');
            }
            
            $('html, body').addClass('noscroll');
            $window.noBounce.init({
                animate: true
            });
        });
    }
})();
