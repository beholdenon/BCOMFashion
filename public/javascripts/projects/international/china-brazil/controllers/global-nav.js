'use strict';

angular.module('controllers')
	.controller('ContactUs', ['$scope', '$window', '$timeout', function($scope, $window, $timeout){
		$scope.cu = {};

		$scope.phoneNumberPattern = (function() {
		    var regexp = /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
		    return {
		        test: function(value) {
		            if( $scope.requireTel === false ) {
		                return true;
		            }
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

		$scope.store = [
			{id: 'New York', name: 'New York', disabled: 'true'},
			{id: '59th Street Flagship, New York City', name: '59th Street Flagship, New York City', disabled: 'false'},
			{id: 'SoHo, New York City', name: 'SoHo, New York City', disabled: 'false'},
			{id: 'Hawaii', name: 'Hawaii', disabled: 'true'},
			{id: 'Ala Moana, Honolulu', name: 'Ala Moana, Honolulu', disabled: 'false'},
			{id: 'Illinois', name: 'Illinois', disabled: 'true'},
			{id: 'North Michigan Avenue, Chicago', name: 'North Michigan Avenue, Chicago', disabled: 'false'},
			{id: 'Medinah Home, Chicago', name: 'Medinah Home, Chicago', disabled: 'false'},
			{id: 'California', name: 'California', disabled: 'true'},
			{id: 'Beverly Center, Los Angeles', name: 'Beverly Center, Los Angeles', disabled: 'false'},
			{id: 'Century City, Los Angeles', name: 'Century City, Los Angeles', disabled: 'false'},
			{id: 'Fashion Valley, San Diego', name: 'Fashion Valley, San Diego', disabled: 'false'},
			{id: 'Glendale Galleria, Glendale', name: 'Glendale Galleria, Glendale', disabled: 'false'},
			{id: 'Newport Fashion Island, Newport Beach', name: 'Newport Fashion Island, Newport Beach', disabled: 'false'},
			{id: 'San Francisco Centre, San Francisco', name: 'San Francisco Centre, San Francisco', disabled: 'false'},
			{id: 'Santa Monica Place, Santa Monica', name: 'Santa Monica Place, Santa Monica', disabled: 'false'},
			{id: 'Sherman Oaks Fashion Square, Sherman Oaks', name: 'Sherman Oaks Fashion Square, Sherman Oaks', disabled: 'false'},
			{id: 'South Coast Plaza, Costa Mesa', name: 'South Coast Plaza, Costa Mesa', disabled: 'false'},
			{id: 'Florida', name: 'Florida', disabled: 'true'},
			{id: 'Aventura', name: 'Aventura', disabled: 'false'},
			{id: 'Orlando', name: 'Orlando', disabled: 'false'}
		];

		$scope.sendMail = function(cu) {
console.log(cu);

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

			    $('.form-sent-successfully').fadeIn();

				$timeout(function() {
					$scope.cu = {};
					$scope.emailForm.$setPristine();
					$scope.emailForm.$setUntouched();
					$('.form-sent-successfully').fadeOut();
				}, 2500);
				
				return true;
            }

            return false;
		};
	}]);