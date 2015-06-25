'use strict';

define([
    'backbone',
    'jquery',
    'underscore',
    'coremetrics'
], function(Backbone, $, _, Coremetrics) {

    function adjustFlyoutPosition(flyout, totalFOBs, selectedFOBIndex, fobOffset, flyoutWidth, fobMenuWidth) {
        var flyoutPos,
            mainNavOffsetLeft = $('#nav ul').offset().left,
            fobOffsetLeft = fobOffset.left,
            NAV_WIDTH = $('#nav .row').width();

        if (selectedFOBIndex < (totalFOBs / 2)) { //left aligned flyout
            if ((fobOffsetLeft + (fobMenuWidth / 2) - mainNavOffsetLeft) >= (flyoutWidth / 2)) {
                flyoutPos = fobOffsetLeft + (fobMenuWidth / 2) - (flyoutWidth / 2);
            } else {
                flyoutPos = mainNavOffsetLeft;
            }
        } else { // right aligned flyout
            if (((mainNavOffsetLeft + NAV_WIDTH) - fobOffsetLeft) >= (flyoutWidth / 2)) {
                flyoutPos = (fobOffsetLeft + (fobMenuWidth / 2)) - (flyoutWidth / 2);
            } else {
                flyoutPos = (mainNavOffsetLeft + NAV_WIDTH) - flyoutWidth;
            }
        }

        flyout.css('left', flyoutPos + 'px');
    }

    var build = {
        topnav: function() {
            $.ajax({
                url: '/shop/topnav?application=SITE&jsonp=false',
                contentType: 'application/json; charset=utf-8',
                dataType: 'html',
                method: 'GET',
                data: {
                    // 'category'   : val,
                    // 'depth'      : '3',
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).success(function(res) {
                $('#nav .row').html(res);

                $('#nav #mainNav a').each(function() {
                    if ($(this).attr('href').charAt(0) === '/') {
                        $(this).attr('href', 'http://www.bloomingdales.com' + $(this).attr('href'));
                    }
                });

            }).fail(function() {
                console.log('============[ navigation build failure ]============');
            });
        },

        flyouts: function() {
            $.ajax({
                url: '/shop/flyout?application=SITE&jsonp=false',
                contentType: 'application/json; charset=utf-8',
                dataType: 'html',
                method: 'GET',
                data: {
                    '&categoryIds': '1003044,1001351,13668,2910,16961,16958,3376,2921,3864,3866,3865,394'
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }).success(function(res) {
                var resBlob = res;

                //replace relative path for Loyalist popup in Beauty flyout
                var relativePopup = '/popup.ognc?popupID=504191';
                resBlob = resBlob.replace(relativePopup, 'http://www.bloomingdales.com' + relativePopup);

                $('#globalFlyouts').html(resBlob);
                $('#globalFlyouts a').each(function() {
                    if ($(this).attr('href').charAt(0) === '/') {
                        $(this).attr('href', 'http://www.bloomingdales.com' + $(this).attr('href'));
                    }
                });
            }).fail(function() {
                console.log('============[ flyout build failure ]============');
            });
        }
    };

    // var user = {
    //     get: function() {
    //         $.ajax({
    //             method: 'GET',
    //             dataType: 'json',
    //             url: '/secure/v2/user',
    //             data: {
    //                 'show': 'summary',
    //             },
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //             }
    //         }).success(function(res) {
    //             console.log(res);
    //             return res;
    //         });
    //     },
    // };

    // var bag = {
    //     get: function() {
    //         $.ajax({
    //             method: 'GET',
    //             dataType: 'json',
    //             url: '/api/v2/shoppingbag',
    //             data: {
    //                 'userid': '64354129',
    //             },
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //             }
    //         }).success(function(res) {
    //             console.log(res);
    //             return res.bagid;
    //         });
    //     },

    //     add: function(ev, addID, addColor, addSize, addType, addQuantity, addPromocode) {
    //         console.log(addID);
    //         $.ajax({
    //             method: 'POST',
    //             url: '/api/v2/shoppingbag/item',
    //             data: {
    //                 'productid': addID
    //             }
    //         }).success(function(res) {
    //             console.log(res);
    //         }).fail(function(res) {
    //             console.log('atb failure: ', res);
    //         });
    //     },

    //     count: function() {
    //         $.ajax({
    //             method: 'GET',
    //             dataType: 'json',
    //             url: '/api/v2/shoppingbag/bagItemCount',
    //             data: {
    //                 // 'bagid'  : ,
    //                 'userid': '64354129',
    //             },
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //             }
    //         }).success(function(res) {
    //             if (res.bagItemCount > 0) {
    //                 $('#cartCount').html(res.bagItemCount + ' Items');
    //             } else {
    //                 $('#cartCount').html('(0)');
    //             }
    //         });
    //     },
    // };

    var init = function() {
        build.topnav();
        build.flyouts();

        //var userInfo = user.get();
        //var bagID = bag.get();
        //bag.count(bagID);

        // =========== FLYOUT HANDLING FOR DESKTOP NATIVE HEADER
        var catNum = '',
            delay = 200, // hover time before flyout appears.
            timeoutConst;

        $('#nav').on('mouseenter', '#mainNav > li', function() {
            //BIND ONLY TO DESKTOP EXPERIENCE
            if ($(window).width() > 980 && (!$('body').hasClass('tablet'))) {
                if (hamburgerMinFOBSFlag === true) {
                    hamburgerMaxFOBS();
                }

                var thing = $(this);
                timeoutConst = setTimeout(function() {
                    thing.addClass('selected').siblings().removeClass('selected');
                    catNum = thing.attr('id').substr(thing.attr('id').lastIndexOf('_') + 1);
                    $('#flyout_' + catNum).removeClass('flyout-off').addClass('flyout-on');

                    adjustFlyoutPosition($('#flyout_' + catNum), $('#mainNav > li').length - 1, thing.index() + 1, $('#nav .row').css('margin-left'), $('#flyout_' + catNum).width(), 962);
                }, delay);
            }
        }).on('mouseleave', '#mainNav > li', function() {
            if ($(window).width() > 980 && (!$('body').hasClass('tablet'))) {
                clearTimeout(timeoutConst);
                $('#flyout_' + catNum).removeClass('flyout-on').addClass('flyout-off');
                $(this).removeClass('selected');
            }
        }).on('click', '#mainNav > li', function(ev) {
            var target = ev.currentTarget,
                anchor = $(target).children();

            //bind coremetrics listeners
            Coremetrics.linkClickTag(anchor);

            if (($(window).width() <= 980 || $('body').hasClass('tablet')) && (!$(target).hasClass('active'))) {
                ev.preventDefault();
                hamburgerFlyoutAction(target);
            }
        });

        $('#globalFlyouts').on('mouseenter', function() {
            if ($(window).width() > 980 && (!$('body').hasClass('tablet'))) {
                $('#flyout_' + catNum).addClass('flyout-on').removeClass('flyout-off');
                $('#flexLabel_' + catNum).addClass('selected');
            }
        }).on('mouseleave', function() {
            if ($(window).width() > 980 && (!$('body').hasClass('tablet'))) {
                $('#flyout_' + catNum).removeClass('flyout-on').addClass('flyout-off');
                $('#flexLabel_' + catNum).removeClass('selected');
            }
        }).on('click', 'div > div > div > div > ul > li > a',function() {
            var target = this; 

            //bind coremetrics listeners
            Coremetrics.linkClickTag(target);
        });

        function cmNavBtn() {
            if ($('#hamburger-content-overlay').hasClass('active')) {
                Coremetrics.elementTag({
                    elementID: window.Globals.Coremetrics.pageID || 'heroku',
                    elementCategory: 'Tablet_Global_Navigation Open'
                });
            } else {
                Coremetrics.elementTag({
                    elementID: window.Globals.Coremetrics.pageID || 'heroku',
                    elementCategory: 'Tablet_Global_Navigation Close'
                });
            }
        }

        // =========== FLYOUT HANDLING FOR HAMBURHER MENU
        function hamburgerMenuAction(ev) {
            ev.preventDefault();
            ev.stopImmediatePropagation();

            $('#hamburger-content-overlay').toggleClass('active');

            //bind coremetrics on hamburger button
            cmNavBtn();

            $('#nav').animate({
                height: 'toggle'
            }, {
                duration: 500,
                complete: function() {
                    $('#globalFlyouts').hide();
                    $('#nav').toggleClass('active');
                    $('#hamburgerMenuIcon').toggleClass('active');
                    $('#mainNav li.active').removeClass('active');
                }
            });

            // freeze the window when hamburger menu is opened
            var body = $('body');
            if (body.css('overflow') === 'visible') {
                body.css('overflow', 'hidden');
            } else {
                body.css('overflow', 'visible');
            }

            return false;
        }

        $('#hamburgerMenuIcon, #hamburger-content-overlay').on('click', function(ev) {
            hamburgerMinFOBS();
            hamburgerMenuAction(ev);
        });

        var hamburgerMinFOBSFlag = false,
            fobs = [
                //100%
                '#flyout_1003044 > div > div:nth-child(2)',
                '#flyout_1003044 > div > div:nth-child(3)',
                //WHAT'S NEW
                '#flyout_13668 > div > div:nth-child(2)',
                //WOMEN
                '#flyout_2910 > div > div:nth-child(3)',
                '#flyout_2910 > div > div:nth-child(4)',
                //SHOES
                '#flyout_16961 > div > div:nth-child(3)',
                '#flyout_16961 > div > div:nth-child(4)',
                //HANDBAGS
                '#flyout_16958 > div > div:nth-child(3)',
                '#flyout_16958 > div > div:nth-child(4)',
                //JEWELRY & ACCESSORIES
                '#flyout_3376 > div > div:nth-child(3)',
                '#flyout_3376 > div > div:nth-child(4)',
                //BEAUTY
                '#flyout_2921 > div > div:nth-child(3)',
                '#flyout_2921 > div > div:nth-child(4)',
                //MEN
                '#flyout_3864 > div > div:nth-child(3)',
                '#flyout_3864 > div > div:nth-child(4)',
                //KIDS
                '#flyout_3866 > div > div:nth-child(3)',
                '#flyout_3866 > div > div:nth-child(4)',
                //HOME
                '#flyout_3865 > div > div:nth-child(4)',
                //GIFTS
                '#flyout_3948 > div > div:nth-child(2)',
                '#flyout_3948 > div > div:nth-child(3)',
                //REGISTRY
                '#flyout_1001498 > div > div:nth-child(2)',
                '#flyout_3977 > div > div:nth-child(3)',
                //SALE
                '#flyout_3977 > div > div:nth-child(2)'
            ];

        function hamburgerMinFOBS() {
            //hide the sections containing images
            hamburgerMinFOBSFlag = true;

            $.each(fobs, function(index, value) {
                $(value).hide();
            });
        }

        function hamburgerMaxFOBS() {
            //show the sections containing images
            hamburgerMinFOBSFlag = false;

            $.each(fobs, function(index, value) {
                $(value).show();
            });
        }

        function hamburgerFlyoutAction(target) {
            var categoryID = target.id.substr(target.id.indexOf('_') + 1),
                anchor,
                elementID; 

            //Turn off current active main category
            $('#mainNav li.active').removeClass('active');
            //Add active class to selected category

            //Hide all Flyouts
            $('#globalFlyouts > div').removeClass('activeNav');

            //Show the selected flyout
            $('#flyout_' + categoryID).addClass('activeNav');

            //If the hamburger flyouts are hidden, slide them out
            if ($('#globalFlyouts').is(':hidden')) {
                $('#globalFlyouts').show();
            }

            $(target).addClass('active');

            //bind coremetrics listener
            anchor = $(target).children().attr('href');
            elementID = anchor.split('_').pop(); 
            elementID = elementID.split('-');
            elementID = elementID[1];

            Coremetrics.elementTag({
                elementID: elementID,
                elementCategory: 'Tablet_Global_Navigation'
            });

            return false;
        }

        //on desktop, resizing from tablet to desktop: show FOBs & Flyouts + hide hamburger active submenu
        $(window).on('resize', function() {           
            if ($(window).width() > 980 && (!$('body').hasClass('tablet')) && ($('#nav').hasClass('active') || $('#nav').attr('style') === 'display: none;')) {
                $('#nav').removeClass('active').attr('style', '');
                $('#globalFlyouts').attr('style', '');
                $('#hamburgerMenuIcon, #mainNav li.active, #hamburger-content-overlay').removeClass('active');
            }

            //pageview coremetrics on window resize
            if ($(window).width() > 980 && window.Globals.Coremetrics.attr42 === 'Desktop Minimized'){
                Coremetrics.pageViewTag(window.Globals.pageID, window.Globals.catID, '');
                window.Globals.Coremetrics.attr42 = '';
            }      
            if ($(window).width() <= 980 && window.Globals.Coremetrics.attr42 === ''){
                Coremetrics.pageViewTag(window.Globals.pageID, window.Globals.catID, 'Desktop Minimized');
                window.Globals.Coremetrics.attr42 = 'Desktop Minimized';
            }                       
        });
    };

    return init;
});