'use strict';

define([
    'backbone',
    'jquery'
], function(Backbone, $) {

    window.BLOOMIES.initMobileNav = function() {
        // Add the height on some divs on the page to support the proper scrolling
        var heightEqualizer = function() {
            var pageHeight = window.innerHeight;
            var regionMainHeight = pageHeight - $('#region-header').outerHeight();
            $('#mobile-wrapper').css('min-height', regionMainHeight);
            if ($('body').hasClass('nav-toggle')) {
                $('#page-wrapper').css('height', pageHeight);
                $('#mobile-wrapper').css('height', regionMainHeight);
            } else {
                $('#page-wrapper').css('height', '');
                $('#mobile-wrapper').css('height', '');
            }
        };

        // Show/Hide the global navigation menu
        var navToggle = function() {
            $('body').toggleClass('nav-toggle');
            $('#nav-button-icon').toggleClass('active');
            heightEqualizer();
        };

        $(window).on('orientationchange resize', function() {
            heightEqualizer();
        });

        $('#nav-button').on('click', function(event) {
            event.preventDefault();
            navToggle();
        });

        $('#content-overlay').on('touchmove click', function() {
            if ($('body').hasClass('nav-toggle')) {
                navToggle();
            }
            return false;
        });

        function toggleChildren(selector) {
            $(selector).addClass('currentRow');
            $(selector + '_children').slideDown('slow');
            $('.firstlevel').addClass('no-show');
        }

        //SHOW LOYALLIST SUB-MENU
        $('#loyallist').on('click', function() {
            $('#viewpoints').removeClass('currentRow no-show');
            $('#enroll').removeClass('currentRow no-show');
            toggleChildren('#loyallist');
        });

        //SHOW REGISTRY SUB-MENU
        $('#registry').on('click', function() {
            $('#find').removeClass('currentRow no-show');
            $('#manage').removeClass('currentRow no-show');
            $('#create').removeClass('currentRow no-show');
            toggleChildren('#registry');
        });

        $('#top').on('click', function() {
            $('.children_wrapper').slideUp(0);
            $('.firstlevel').removeClass('no-show');
            $('#nav-menu li').removeClass('currentRow');
            $('#nav-menu li:not(#top)').removeClass('headerRow');
            $('#top').addClass('currentRow');
        });

        //HIDE NAVIGATION WHEN SEARCHING
        $('#mvSearchField').on('click', function() {
            if ($('body').hasClass('nav-toggle')) {
                navToggle();
            }
        });

        //SHOW CLEAR SEARCH BUTTON
        $('#mvSearchField').on('keyup', function() {
            if ($('.clearSearchBoxIcon').hasClass('hide')) {
                $('.clearSearchBoxIcon').toggleClass('hide');
            }
        });
        $('.clearSearchBoxIcon').on('click', function() {
            $('#mvSearchField').val('');
            $(this).toggleClass('hide');
        });
    };

    window.BLOOMIES.BBBappBtn = function() {
        // show/hide the DOWNLOAD THE BIG BROWN BAG APP footer btn based on the mobile OS detection
        var iOSbtn = $('#footer-app-ios'),
            Androidbtn = $('#footer-app-android');

        if (window.BLOOMIES.mobileOS === 'iOS') {
            Androidbtn.addClass('hidden');
            iOSbtn.removeClass('hidden');
        } else if (window.BLOOMIES.mobileOS === 'Android') {
            iOSbtn.addClass('hidden');
            Androidbtn.removeClass('hidden');
        } else {
            iOSbtn.addClass('hidden');
            Androidbtn.addClass('hidden');
        }
    };

    var initMobile = function() {
        window.BLOOMIES.initMobileNav();
        $('#brownBagItemsTotal').html(thisUser.getCartItemTotal()); // jshint ignore:line
    };
    return initMobile;

});
