'use strict';

angular.module('controllers')
    .controller('OverlayCtrl', function($rootScope, $scope, $window, $timeout, appGlobals, localStorageService) {

        $scope.overlay = {};

        $scope.close = function() {
            console.log('--closed--');
        };

        $scope.selLang = function($event) {
            var el = $($event.target),
                globalLang = el.attr('data-lang'),
                navElSel = $('.lang-opt a[data-lang="'+ globalLang +'"]');

            navElSel.parent('li').addClass('active');

            appGlobals.setAttr('lang', globalLang);
            localStorageService.set('lang', globalLang);

            $scope.overlay.isShowed = false;
            $scope.$emit('lang:change', {lang: globalLang});
            $scope.$on('$destroy', selLangOverlay);
            $('html, body').removeClass('noscroll');
            $window.noBounce.remove();     
        };

        var selLangOverlay = $rootScope.$on('overlay:show', function(ev, args) {
            $scope.overlay.template = args.template;
            $scope.overlay.isShowed = true;
            $('html, body').addClass('noscroll');
            $window.noBounce.init();
        });
    });
