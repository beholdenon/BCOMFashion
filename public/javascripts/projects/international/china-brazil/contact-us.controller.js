(function() {
	'use strict';

	angular
		.module('controllers')
		.controller('ContactUsCtrl', ContactUsCtrl);

	function ContactUsCtrl($rootScope, $scope, $window, $timeout, appGlobals){
		$scope.cu = {
			arrivingDate: null,
			departingdate: null
		};
        $scope.lang = appGlobals.getAttr('lang');
        $scope.copy = appGlobals.getAttr('copy');
        $scope.store = ($scope.lang) ? angular.copy($scope.copy[$scope.lang].contactUs.right.stores) : null;

		$scope.phoneNumberPattern = (function() {
		    var regexp = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
		    return {
		        test: function(value) {
		            if( $scope.requireTel === false ) {
		                return true;
		            }
		            console.log(value);
		            return regexp.test(value);
		        }
		    };
		})();

		$scope.parties = [
			{id: 1, name: '1'},
			{id: 2, name: '2'},
			{id: 3, name: '3'},
			{id: 4, name: '4'},
			{id: 5, name: '5'},
			{id: 6, name: '6'},
			{id: 7, name: '7'},
			{id: 8, name: '8'},
			{id: 9, name: '9'},
			{id: 10, name: '10'},
			{id: 11, name: '10+'}
		];

		$scope.sendMail = function(cu) {
	        if ($scope.emailForm.$valid){
	        	var link,
	        		email = 'international_visitors@bloomingdales.com',
	        		subject = 'Notify Us Of Your Trip',
	        		data = angular.copy(cu),
	        		body = 'name = ' + data.name + '\n' +
	        			   'email = ' + data.email + '\n' +
	        			   'phone = ' + data.phone + '\n' +
	        			   'partySize = ' + data.partySize + '\n' +
	        			   'arrivingdate = ' + data.arrivingdate + '\n' +
	        			   'departingdate = ' + data.departingdate + '\n' +
	        			   'store = ' + data.store + '\n';

			    link = 'mailto:'+ email + '?subject=' + $window.escape(subject) + '&body=' + $window.escape(body); 

			    $window.location.href = link;

			    jQuery('.form-sent-successfully').fadeIn();

				$timeout(function() {
					$scope.cu = {};
					$scope.emailForm.$setPristine();
					$scope.emailForm.$setUntouched();
					jQuery('.form-sent-successfully').fadeOut();
				}, 3500);
				
				return true;
	        }

	        return false;
		};

	    $rootScope.$on('lang:change', function(ev, args) {
	        $scope.lang = args.lang;
	        $scope.store = angular.copy($scope.copy[$scope.lang].contactUs.right.stores);
	    });			
	}
})();