'use strict';

angular.module('CNBRapp')
    .controller('MainController', function($timeout) {
        var vm = this;
        vm.title = 'MAIN PAGE';

        $timeout(function() {
            $('.header-bkg').height($('.header').height());
        }, 400);
    });
