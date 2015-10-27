'use strict';

angular.module('controllers')
    .controller('OverlayCtrl', function($rootScope, $scope, $window, $timeout, appGlobals, localStorageService) {

        $scope.overlay = {};

        $scope.closeOverlay = function() {
            $scope.overlay.isShowed = false;
            $('html, body').removeClass('noscroll');
            $window.noBounce.remove({animate: true});  
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
            $('html, body').removeClass('noscroll');
            $window.noBounce.remove({animate: true});     
        };

        $rootScope.$on('overlay:show', function(ev, args) {
            $scope.overlay.template = args.template;
            $scope.overlay.isShowed = true;
            $('html, body').addClass('noscroll');
            $window.noBounce.init({animate: true});
        });
    });
