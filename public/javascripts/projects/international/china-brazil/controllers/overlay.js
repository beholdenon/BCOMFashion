'use strict';

angular.module('controllers')
  .controller('OverlayCtrl', function ($scope, popUp) {

    $scope.popup = {};

    function doAction(action) {
      if (typeof action === 'function') {
        action();
      }
      if (!$scope.popup.always) {
        $scope.popup.isShowed = false;
      }
    }

    $scope.close = function () {
      doAction($scope.popup.buttonClose);
      popUp.reject();
    };

    $scope.action = function (data) {
      doAction($scope.popup.buttonAction);
      popUp.resolve(data);
    };

    popUp.init(function (popupOptions) {
      $scope.popup = popupOptions;
    });

  });
