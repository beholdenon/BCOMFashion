'use strict';

var APP = {
      cm: 'stylish_summer',
      social: {
            facebookTitle: 'SUMMER (STYLE) BUCKET LIST | bloomingdales.com',
            facebookDescription: 'Make the most of every sun-drenched minute with our cheeky checklist for an outrageously stylish summer.',
            facebookImageFileName: 'share_FB.jpg',
            twitterTitle: 'The outrageous bucket list @bloomingdales makes the most of every sun-drenched minute for your most stylish summer yet',
            pinterestTitle: 'SUMMER (STYLE) BUCKET LIST | bloomingdales.com',
            pinterestImageFileName: 'share_Pinterest.jpg',
            facebookURL: null,
            twitterURL: null,
            pinterestURL: null    
      },
      tags: [],

};

$(document).ready( function() {

      // social share
        $('.desktop_socialshare_facebook').on('click', function() {
            window.open(APP.social.facebookURL, '_blank', 'width=608,height=342');
            // APP.coremetrics('Element', APP.cm, 'social-fb');
        });
        $('.desktop_socialshare_twitter').on('click', function() {
            window.open(APP.social.twitterURL, '_blank', 'width=740,height=340');
            // APP.coremetrics('Element', APP.cm, 'social-twitter');
        });
        $('.desktop_socialshare_pinterest').on('click', function() {
            window.open(APP.social.pinterestURL, '_blank', 'width=770,height=380');
            // APP.coremetrics('Element', APP.cm, 'social-pinterest');
        }); 

        $('.desktop_back_to_top').on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 'slow', function(){
                //scrolling complete; appmed class "origin" to the button node
                $('.desktop_back_to_top').addClass('origin');
            });

            APP.coremetrics('Element', APP.cm, 'back_to_top');
        });

        //(req) CM business logic
    APP.coremetrics = function (tagType, categoryID, pageID) {
        var APP = this;

        if (tagType === 'Pageview') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, categoryID);
            } catch (e) {
                APP.logErr('CoreM_err: ' + e);
            }
            APP.logErr('CoreM ::: tagType: Pageview; categoryID: ' + categoryID + '; pageID: ' + pageID);
        } else if (tagType === 'Element') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(pageID, categoryID);
            } catch (e) {
                APP.logErr('CoreM_err: ' + e);
            }

            APP.logErr('CoreM ::: tagType: Element; categoryID: ' + categoryID + '; pageID: ' + pageID);
        }
    };

    //(req) custom logger for 'dev' environment
    APP.logErr = function (log) {
        //log errors only on DEV mode
        if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
            window.console.info(log);
        }
    };

    //(req) social share business logic
    APP.socialshare = function() {
        var baseURL = 'http://' + window.location.host + window.location.pathname,
            baseURLAssets = 'http://' + window.location.host + '/fashion/images/projects' + window.location.pathname;

        APP.social.facebookURL = 'https://www.facebook.com/dialog/feed';
        APP.social.facebookURL += '?app_id=145634995501895';
        APP.social.facebookURL += '&name=' + encodeURIComponent(APP.social.facebookTitle);
        APP.social.facebookURL += '&description=' + encodeURIComponent(APP.social.facebookDescription);
        APP.social.facebookURL += '&link=' + encodeURIComponent(baseURL);
        APP.social.facebookURL += '&picture=' + encodeURIComponent(baseURLAssets + APP.social.facebookImageFileName);
        APP.social.facebookURL += '&display=popup&redirect_uri=' + encodeURIComponent('https://www.facebook.com/');

        APP.social.twitterURL = 'http://twitter.com/intent/tweet?source=webclient&text=';
        APP.social.twitterURL += encodeURIComponent(APP.social.twitterTitle) + ' ' + encodeURIComponent(baseURL);

        APP.social.pinterestURL = 'http://pinterest.com/pin/create/button/?';
        APP.social.pinterestURL += 'url=' + encodeURIComponent(baseURL);
        APP.social.pinterestURL += '&media=' + encodeURIComponent(baseURLAssets + APP.social.pinterestImageFileName);
        APP.social.pinterestURL += '&description=' + encodeURIComponent(APP.social.pinterestTitle);
    };

    APP.floatingGraphic = function () {
        var windowBottom = $(document).scrollTop() + $(window).height(),
            backBottom = $('.desktop_back_to_top').offset().top + $('.desktop_back_to_top').height(),
            footerBottom = $('.desktop_footer').offset().top + $('.desktop_footer').height();
        
        
        if ( backBottom > windowBottom ) {
            $('.desktop_back_to_top').addClass('float').removeClass('abs').removeAttr('style');
        } else if ( backBottom >= footerBottom ) {
            $('.desktop_back_to_top').addClass('abs').addClass('remove').css('top', $('.desktop_footer').offset().top - ( $('.desktop_back_to_top').height() - $('.desktop_footer').height() ) );
        } else if ( $('.desktop_back_to_top').offset().top + $(window).height() > $('#header-2').offset().top ) {
            $('.desktop_back_to_top').show();
        } else {
            $('.desktop_back_to_top').hide();
        }
    };

    APP.scrollMetrics = function () {

        var scrolled = $(window).scrollTop() + $(window).height();

        $('section').each(function() {
            if ( $(this).attr('data-cm') !== undefined && scrolled > $(this).offset().top && APP.tags.indexOf( $(this).attr('data-cm') ) < 0 ) {
                APP.tags.push( $(this).attr('data-cm') );
                APP.coremetrics('Pageview', APP.cm, APP.cm + '_' + $(this).attr('data-cm'));
            }
        });

    };

    $(document).on('click', '.links > a, .section-head, img, p', function (evt) { 
         if ( $(this).attr('id') !== undefined ) { APP.coremetrics('Element', APP.cm, APP.cm + '_' + $(this).attr('id')); }
    });

    APP.coremetrics('Pageview', APP.cm, APP.cm + '--hp');

    $(window).scroll(function(){
        APP.floatingGraphic();
        APP.scrollMetrics();
    });
});

$(window).load(function() {
      APP.socialshare();
      APP.floatingGraphic();
});