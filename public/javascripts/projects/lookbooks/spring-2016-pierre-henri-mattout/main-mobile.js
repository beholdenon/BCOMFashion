window.TEMPLATE = window.TEMPLATE || {};

window.TEMPLATE.vertical = (function(window, document, $) {
    'use strict';

    var APP = {
        cm: 'MBL:spring16_mensphm', //---> coremetrics project prefix
        views: {
            sectionInViewport: null
        },
        vars: {
            test: null,
            loadingComplete: false,
            heroHeight: null,
            heroOffset: null,
            navHeight: null,
            sectionID: [],
            sectionPos: []
        },
        social: {
            facebookTitle: 'Introducing PHM SAINT PERES | Bloomingdales.com',
            facebookDescription: 'Parisian sophistication with a prodigious dash of New York street smarts, PHM Saint Pères combines cult labels with prestigious brands in an exclusive concept shop for men.',
            facebookImageFileName: 'MENS_PHM_POPUP_FACEBOOK.jpg',
            twitterTitle: 'Introducing PHM Saint Pères: an exclusive concept shop men’s of cult labels and prestigious brands @bloomingdales http://bit.ly/1SKhVrh',
            pinterestTitle: 'PHM SAINT PERES | Bloomingdales.com',
            pinterestImageFileName: 'MENS_PHM_POPUP_PINTEREST.jpg',
            facebookURL: null,
            twitterURL: null,
            pinterestURL: null    
        },
    };

/***********************************************/
/*                    CTRLS                    */
/***********************************************/      
    //(req) mobile initialiazation wrapper   
    APP.init = function () {
        var self = this,
        cmSufix = '--hp';

        $('#bl_main_container').addClass('mobile_main_container-bl_main_container_reset');

        self.deepLinks();

        $('img.lazy').show().lazyload({
            threshold: 200,
            effect: 'fadeIn'
        });

        $('.mobile_main_container').addClass('loaded');
        $('mobile_header').addClass('active');

        self.removeLoader();

        if ($('.mobile_image_slider').length > 0) APP.imageSlider(); //init slider if there is one 

        window.setTimeout(function() {
            self.mobileStickyNavBar();
            self.updateMobileStickyNavPosition();
            self.bindListeners();
        }, 1000);

        APP.socialshare();

        if( window.location.pathname.indexOf('interview') > 0){
            cmSufix = '--interview';
        } else if( window.location.pathname.indexOf('no-results') > 0 ){
            cmSufix = '--no-results';
        }

        self.coremetrics('Pageview', self.cm, self.cm + cmSufix );
    };

    //(req) remove loader after DOM loads
    APP.removeLoader = function () {
        $('.mobile_loader').fadeOut();

        window.setTimeout(function() {
            $('.mobile_loader').remove();
        }, 1000);        
    };
    
    //(req) coremetrics ctrl for mobile nav

    APP.mobileStickyNavBar = function () {
        var mobileNavBar = $('#phm_mobile_nav'),
            mobileNavPlaceHolderPosition = $('.mobile_topnav_placeholder').offset().top;

        mobileNavBar.remove();
        $('body').append( mobileNavBar );
        mobileNavBar.css({ 'top' : mobileNavPlaceHolderPosition });


        $( 'a#phm2016_mobile_nav-arrow_down' ).on( 'click', function ( event ) {                
            event.preventDefault();
            var dropDown = $('#phm2016_mobile_dropdown');

            if ( dropDown.is(':visible') === false ) {
                dropDown.slideDown();
                //BLOOMIES.coremetrics.cmCreatePageElementTag( 'topnav_open_dropdown', namespace.coremetrics.replace("MBL:", "") );
            }               
        });

        $( 'a#phm2016_mobile_nav-arrow_up' ).on( 'click', function ( event ) {                
            event.preventDefault();
            var dropDown = $('#phm2016_mobile_dropdown');

            if ( dropDown.is(':visible') === true ) {
                dropDown.slideUp();
               // BLOOMIES.coremetrics.cmCreatePageElementTag( 'topnav_close_dropdown', namespace.coremetrics.replace("MBL:", "") );
            }                
        });

    };

    APP.updateMobileStickyNavPosition = function () {
        var mobileNavBar = $('#phm_mobile_nav'),
            mobileNavPlaceHolderPosition = $('.mobile_topnav_placeholder').offset().top;

        if($(window).scrollTop() < mobileNavPlaceHolderPosition ){
            mobileNavBar.css({
                'position':'absolute',
                'top': mobileNavPlaceHolderPosition
            });

        }else{
            mobileNavBar.css({
                'position':'fixed',
                'top': '-2px'
            });
        }
    };

    //(req) add 'active' class on mobile header section when is visible
    APP.headerVisible = function () {
        $('.mobile_header').is(':in-viewport') ? $('.mobile_header').addClass('active') : $('.mobile_header').removeClass('active'); // jshint ignore:line
    };

    //(req) when landing on a deeplinked page, use the hash to scroll to the section
    APP.deepLinks = function () {
        var self = this,
            hash = $.address.value();

        if (hash !== '/') {
            hash = hash.substring(1, hash.length - 1);
            self.scrollToSection(hash);
        }
    };

    //(req) scroll page to a particular section/element in the page
    APP.scrollToSection = function (hash) {
        if (typeof hash !== 'undefined'){
            var offset = 50;  

            try {
                $('html, body').animate({ scrollTop: $('#mobile_' + hash).offset().top -  offset}, 'slow');
            } catch (err) {
                $('html, body').scrollTop(0);                
            }
        }
    };

    //(opt) go to section ctrl for single page app with TOPNAV
    APP.goToSection = function(section){
        var self = this;

        $('.mobile_main_container section.visible').removeClass('visible');
        $('#footer-links').removeClass('active');

        $('.mobile_topnav > div').text(self.mobile.navActiveSection);

        $.address.value(section);
        
        var sectionIndex = $.inArray(section, self.mobile.topnav);
        $('.mobile_main_container section').eq(sectionIndex).addClass('visible');

        //trigger lazy load manually on active section
        $('img.lazy').show().lazyload();

        //redraw slider
        if ($('.mobile_main_container section.visible .bxslider').length > 0) {
            self.slider.redrawSlider();
        }

        //autoplay HTML5 video
        // if ($('.mobile_main_container section.visible video').length > 0) {
        //     self.autoPlayHTML5Video();
        // }        
                    
        //CM - Pageview
        self.coremetrics('Pageview', self.cm, self.cm + '-' + section);         
    };

    //(req) global mobile listeners for interaction & setting CM tags
    APP.bindListeners = function() {
        var self = this;

        $('a.phm_mobile_link, a.phm_mobile_nav_link').on('click', function () {
            var cmAttr = $(this).attr('id');
            self.coremetrics( 'Element', self.cm, cmAttr );
        });

        $('#phm2016_mobile_back_to_top_button').on('click', function ( event ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 'slow' );
        });

        // social share
        $('.mobile_socialshare_facebook').on('click', function() {
            window.open(self.social.facebookURL, '_blank', 'width=608,height=342');
            self.coremetrics('Element', self.cm, 'social-fb');
        });
        $('.mobile_socialshare_twitter').on('click', function() {
            window.open(self.social.twitterURL, '_blank', 'width=740,height=340');
            self.coremetrics('Element', self.cm, 'social-twitter');
        });
        $('.mobile_socialshare_pinterest').on('click', function() {
            window.open(self.social.pinterestURL, '_blank', 'width=770,height=380');
            self.coremetrics('Element', self.cm, 'social-pinterest');
        });  

        $(window).scroll(function() {
            APP.headerVisible();
            self.updateMobileStickyNavPosition();
            _scrolledDown();
        });  

        function _scrolledDown() {
            var offset = document.body.scrollTop;

            if (offset > 0) {
                $('.mobile_back_to_top').removeClass('origin');
                $('.mobile_back_to_top_container').addClass('visible');
            } else {
                $('.mobile_back_to_top').addClass('origin');
                $('.mobile_back_to_top_container').removeClass('visible');                    
            }
        }            
    };

    //(req) CM business logic
    APP.coremetrics = function (tagType, categoryID, pageID) {
        var self = this;

        if (tagType === 'Pageview') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, categoryID);
            } catch (e) {
                self.logErr('CoreM_err: ' + e);
            }
            self.logErr('CoreM ::: tagType: Pageview; categoryID: ' + categoryID + '; pageID: ' + pageID);
        } else if (tagType === 'Element') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(pageID, categoryID);
            } catch (e) {
                self.logErr('CoreM_err: ' + e);
            }

            self.logErr('CoreM ::: tagType: Element; categoryID: ' + categoryID + '; pageID: ' + pageID);
        }
    };    

    //(req) social share business logic
    APP.socialshare = function() {
        var self = this,
            baseURL = 'http://' + window.location.host + window.location.pathname,
            baseURLAssets = 'http://' + window.location.host + '/b/fashion/images/projects/lookbooks/spring-2016-pierre-henri-mattout/';

        self.social.facebookURL = 'https://www.facebook.com/dialog/feed';
        self.social.facebookURL += '?app_id=145634995501895';
        self.social.facebookURL += '&name=' + encodeURIComponent(self.social.facebookTitle);
        self.social.facebookURL += '&description=' + encodeURIComponent(self.social.facebookDescription);
        self.social.facebookURL += '&link=' + encodeURIComponent(baseURL);
        self.social.facebookURL += '&picture=' + encodeURIComponent(baseURLAssets + self.social.facebookImageFileName);
        self.social.facebookURL += '&display=popup&redirect_uri=' + encodeURIComponent('https://www.facebook.com/');

        self.social.twitterURL = 'http://twitter.com/intent/tweet?source=webclient&text=';
        self.social.twitterURL += encodeURIComponent(self.social.twitterTitle);

        self.social.pinterestURL = 'http://pinterest.com/pin/create/button/?';
        self.social.pinterestURL += 'url=' + encodeURIComponent(baseURL);
        self.social.pinterestURL += '&media=' + encodeURIComponent(baseURLAssets + self.social.pinterestImageFileName);
        self.social.pinterestURL += '&description=' + encodeURIComponent(self.social.pinterestTitle);
    };

    //(req) custom logger for 'dev' environment
    APP.logErr = function (log) {
        //log errors only on DEV mode
        if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
            window.console.info(log);
        }
    };
/***********************************************/
/*                   BOOTSTRAP                 */
/***********************************************/      
    $(window).load(function() {
        APP.init();

        //APP.insertNavigation(); //---> add this when your app includes NAV MENU
    });    

    return APP;

}(window, document, jQuery));