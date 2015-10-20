'use strict';

angular.module('directives', [])
    .directive('globalNav', function() {
        return {
            templateUrl: 'components/global-nav.html'
        };
    })
    .directive('contactUs', function() {
        return {
            templateUrl: 'components/contact-us.html',
        };
    })
    .directive('pickDate', function() {
        return {
            restrict: 'A',
            // transclude: true,        	
            scope: true,
            link: function(scope, el) {
                var options1 = {
                        format: 'mm-dd-yyyy',
                        disableDblClickSelection: true
                    },
                    options2 = {
                        closeButton: true
                    };

                // set up datapicker on load
                angular.element(document).ready(function() {
                    scope.$pick1 = $(el).fdatepicker(options1);
                    scope.$pick2 = $(el).fdatepicker(options2);
                });

                // // implementation of disabled form fields
                var nowTemp = new Date();
                var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
                var checkin = $('.arriving-input').fdatepicker({
                    onRender: function(date) {
                        return date.valueOf() < now.valueOf() ? 'disabled' : '';
                    }
                }).on('changeDate', function(ev) {
                    if (ev.date.valueOf() > checkout.date.valueOf()) {
                        var newDate = new Date(ev.date);
                        scope.cu.arrivingdate = $('.arriving-input').val();
                        newDate.setDate(newDate.getDate() + 1);
                        checkout.update(newDate);
                        scope.cu.departingdate = $('.departing-input').val();
                    }
                    checkin.hide();
                    scope.emailForm.arrivingdate.$setDirty();
                    $('.departing-input')[0].focus();
                }).data('datepicker');
                var checkout = $('.departing-input').fdatepicker({
                    onRender: function(date) {
                        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
                    }
                }).on('changeDate', function() {
                    scope.cu.departingdate = $('.departing-input').val();                    
                    checkout.hide();
                    scope.emailForm.departingdate.$setDirty();
                }).data('datepicker');
            }
        };
    });
