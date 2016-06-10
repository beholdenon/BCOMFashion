window.TEMPLATE = window.TEMPLATE || {};

window.TEMPLATE.vertical = (function(window, document, $) {
    'use strict';

    var APP = {
        cm: 'MBL:spring16_summerparties', //---> coremetrics project prefix
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
            facebookTitle: 'Three Epic Summer Parties | bloomingdales.com',
            facebookDescription: 'From breezy beach gatherings and pool parties to fun and floral garden soirees, our summer entertaining gets a bright boost with three stylish hosts.',
            facebookImageFileName: 'share_FB.jpg',
            twitterTitle: 'Find endless reasons to celebrate with entertaining inspiration from three stylish hosts. http://fashion.bloomingdales.com/lookbooks/summer-party-dining-guide-2016/',
            pinterestTitle: 'Three Epic Summer Parties | bloomingdales.com',
            pinterestImageFileName: 'share_Pinterest.jpg',
            facebookURL: null,
            twitterURL: null,
            pinterestURL: null    
        },
        mobile: {
            topnav: [
                'malibu-bbq',
                'bondi-pool-party',
                'artist-garden-party',
                'hosts-gifts',
                'guest-house'
            ],
            navActiveSection: 'SUMMER PARTIES'
        }
    };

/***********************************************/
/*                    CTRLS                    */
/***********************************************/      
    //(req) mobile initialiazation wrapper   
    APP.init = function () {
        var self = this;

        $('#bl_main_container').addClass('mobile_main_container-bl_main_container_reset');

        //append mobile sticky footer
        var footerStickyHTML = '<div class="mobile_back_to_top_container" style="position: relative; bottom: 0px;"><a class="mobile_back_to_top mobile_button" href="#">back to top</a></div>';
        $('body').append(footerStickyHTML);

        self.stickyFooter();
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
            self.bindListeners();
        }, 1000);

        APP.socialshare();


        self.coremetrics('Pageview', self.cm, self.cm + '--hp');
    };

    //(req) remove loader after DOM loads
    APP.removeLoader = function () {
        $('.mobile_loader').fadeOut();

        window.setTimeout(function() {
            $('.mobile_loader').remove();
        }, 1000);        
    };

    //(opt) dynamic mobile NAVIGATION markup insert
    APP.insertNavigation = function () {
        var topnavPlaceholder = '<div class="mobile_topnav_placeholder"></div>',
            topnav = '<div class="mobile_topnav"><aside><span></span></aside><div class="mobile_topnav_head"></div></div>';
       
        $('.mobile_main_container').css('margin-top', 60);
        $('.mobile_main_container').before(topnavPlaceholder);
        $('body').append(topnav);
//        $('.mobile_topnav > div').text(APP.mobile.topnav[0]);
        $('.mobile_topnav > div').text(APP.mobile.navActiveSection);


        var topnavContainer = '<div class="mobile_topnav_container"><ul>',
            i, j, 
            n = APP.mobile.topnav.length;

        for (i = 1; i < n; i++) {
            j = i + 1;
            topnavContainer += '<li><a id="mobile_topnav_container_section' + j + '" href="#">' + APP.mobile.topnav[i] + '</a></li>';
        }
        topnavContainer += '</ul></div>';

        $('.mobile_main_container').append(topnavContainer);
    };

    //(req) dynamic sticky footer insert to solve 'position: fixed' issue on mobile devices
    APP.stickyFooter = function () {
        var elem = $('.mobile_back_to_top_container');

        if ($('#footer-links').is(':in-viewport')) {
            var pos = $('body > footer').height();

            elem.css({
                'position': 'relative',
                'bottom': pos + 70
            });
        } else {
            elem.css({
                'position': 'fixed',
                'bottom': 0
            });
        }
    };

    //(req) coremetrics ctrl for mobile nav
    APP.cmNav = function () {
        var self = this,
            sectionsInViewport = [];

        $('.mobile_main_container section:in-viewport').each(function() {
            var hash = $(this).attr('id');
            hash = hash.replace('mobile_', '');
            sectionsInViewport.push(hash);
        });

        if (sectionsInViewport.length === 1) {
            $('.mobile_main_container section').removeClass('active');
            $('#mobile_' + sectionsInViewport[0]).addClass('active');

            if (self.views.sectionInViewport !== sectionsInViewport[0]) {
                self.views.sectionInViewport = sectionsInViewport[0];
                self.coremetrics('Pageview', self.cm, self.cm + '-section-' + self.views.sectionInViewport);
            }
        } else if (sectionsInViewport.length === 2) {
            $('.mobile_main_container section').removeClass('active');

            $('.mobile_main_container section').each(function() {
                var el = $(this).attr('id');
                if (el.indexOf(self.views.sectionInViewport) > -1) {
                    $('#mobile_' + el).addClass('active');
                }
            });
        }
    };

    //(req) add 'active' class on mobile header section when is visible
    APP.headerVisible = function () {
        $('.mobile_header').is(':in-viewport') ? $('.mobile_header').addClass('active') : $('.mobile_header').removeClass('active');  // jshint ignore:line
    };

    //(req) when landing on a deeplinked page, use the hash to scroll to the section
    APP.deepLinks = function () {
        var self = this,
            hash = $.address.value();

        if (hash !== '/') {
            hash = hash.substring(1, hash.length - 1);
            //self.scrollToSection(hash);
            self.goToSection(hash);

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


        self.mobile.navActiveSection=section;
        $('.mobile_topnav > div').text(self.mobile.navActiveSection+'');

        $.address.value(section+'/');
        
        var sectionIndex = $.inArray(section, self.mobile.topnav);
        $('.mobile_main_container section').eq(sectionIndex).addClass('visible');

        //trigger lazy load manually on active section
        $('img.lazy').show().lazyload();   
                    
        //CM - Pageview
        self.coremetrics('Pageview', self.cm, self.cm + '-' + section);         
    };


    //(req) images and videos that have 'data-url' attribute are marked as 'hot'
    APP.isThisHotMedia = function (elementID) {
        var attr = $(elementID).attr('data-url');
        
        return (typeof attr !== typeof undefined && attr !== false && attr !== '#') ? true : false;
    };

    //(req) global mobile listeners for interaction & setting CM tags
    APP.bindListeners = function() {
        var self = this;

        // TOPNAV: show/hide to open/close dropdown menu
        $('.mobile_topnav > div').on('click', function(event){
            event.stopPropagation();

            var $topnav = $(this).parent();

            if ($topnav.hasClass('active')){
                //this closes the nav menu
                $topnav.removeClass('active');
                $('.mobile_main_container > section.visible').removeClass('visible');
                $('.mobile_topnav_container ul li.active, .mobile_topnav_container').removeClass('active');        
                $('.mobile_main_container > section').eq(0).addClass('visible');
                $('.mobile_footer').addClass('visible');
                _scrolledDown();

                self.mobile.navActiveSection = self.mobile.topnav[0];

                $.address.value('/');
            } else {
                //this opens up the nav menu
                self.mobile.navActiveSection = $('.mobile_topnav > div').text();
                
                $('.mobile_topnav > div').text(self.mobile.topnav[0]);
                
                $topnav.addClass('active');
                $('.mobile_topnav_container').addClass('active');
                $('.mobile_main_container > section.visible, .mobile_back_to_top_container, .mobile_footer').removeClass('visible');
                $('.mobile_topnav_container ul li.active, .mobile_topnav div').removeClass('active');                             

                var sectionIndex = $.inArray(self.mobile.navActiveSection, self.mobile.topnav); 
                if (sectionIndex === 0) {
                    $('.mobile_topnav div').addClass('active');
                } else {
                    if(sectionIndex !== -1) $('.mobile_topnav_container ul li').eq(sectionIndex-1).addClass('active');
                }  

                //CM - Element
                self.coremetrics('Element', self.cm, 'topnav-open');              
            }
        });

        // TOPNAV: tap on arrow to open/close dropdown menu
        $('.mobile_topnav > aside').on('click', function(event){
            event.stopPropagation();

            var _self = this,
                $topnav = $(_self).parent();

            if ($topnav.hasClass('active')){
                //this closes the nav menu
                $topnav.removeClass('active');
                $('.mobile_topnav_container, .mobile_topnav_container ul li.active, .mobile_topnav div').removeClass('active');
                $('.mobile_footer').addClass('visible');
                _scrolledDown();

                $('.mobile_topnav > div').text(self.mobile.navActiveSection);

                if(self.mobile.navActiveSection !== 'SUMMER PARTIES') self.goToSection(self.mobile.navActiveSection);
                else self.goToSection(self.mobile.topnav[0]);

                //CM - Element
                self.coremetrics('Element', self.cm, 'topnav-close');
            } else {
                //this opens up the nav menu
                self.mobile.navActiveSection = $('.mobile_topnav > div').text();

                $('.mobile_topnav > div').text(self.mobile.topnav[0]);

                $topnav.addClass('active');
                $('.mobile_topnav_container').addClass('active');
                $('.mobile_main_container > section.visible, .mobile_back_to_top_container, .mobile_footer').removeClass('visible');
                $('.mobile_topnav_container ul li.active, .mobile_topnav div').removeClass('active');

                var sectionIndex = $.inArray(self.mobile.navActiveSection, self.mobile.topnav);
                if (sectionIndex === 0) {
                    $('.mobile_topnav div').addClass('active');
                } else {
                    if(sectionIndex !== -1) $('.mobile_topnav_container ul li').eq(sectionIndex-1).addClass('active');
                }                        

                //CM - Element
                self.coremetrics('Element', self.cm, 'topnav-open');              
            }
        });

        //TOPNAV: section select touch event
        $('.mobile_topnav_container ul li').on('click', function(event){
            event.preventDefault();
            event.stopPropagation();

            var section = $(this).children().text();

            $('.mobile_topnav_container, .mobile_topnav').removeClass('active');
            $('.mobile_footer').addClass('visible');
            _scrolledDown();

            self.mobile.navActiveSection = section;

            self.goToSection(section);

            //CM - Element
            self.coremetrics('Element', self.cm, self.cm + '--topnav_' + section);            
        });

        //img touch event
        $('.mobile_main_container img').on('click', function() {
            if (self.isThisHotMedia(this)) {
                var hash = $(this).attr('data-url');
                window.open(hash, '_blank');
                hash = hash.replace('http://m.bloomingdales.com/shop/', '');
                hash = hash.split('?')[0];
                hash = hash.substring(hash.indexOf('/') + 1);
                self.coremetrics('Element', self.cm, 'shop_now_' + hash + '-image');
            }
        });

        //button touch events
        $('.mobile_button').on('click', function() {
            self.coremetrics('Element', self.cm, 'shop_all_featured'); //could use regex to better identify each cta
        });
        $('.mobile_shop_all').on('click', function() {
            self.coremetrics('Element', self.cm, 'shop_all_bottom');
        });
        $('.mobile_info_header > a').on('click', function() {
            self.coremetrics('Element', self.cm, 'shop_all_top');
        });
        $('.mobile_back_to_top').on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 'slow', function(){
                //scrolling complete; appmed class "origin" to the button node
                $('.mobile_back_to_top').addClass('origin');
                $('.mobile_back_to_top_container').removeClass('visible');
            });

            self.coremetrics('Element', self.cm, 'back_to_top');
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
            APP.stickyFooter();
            APP.cmNav();
            APP.headerVisible();
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

    //(opt: only for HTML5 video components) HTML5 video ctrl for mobile
    APP.autoPlayHTML5Video = function () {
        var video = $('.mobile_main_container section article video').get(0);
        
        //force video re-play automatically after 1s
        setTimeout(function(){
            $('body').one('touchstart load',function(){
                video.play();
            }).trigger('load');
        },1000);        
    };     

    //(opt: only for image sliders) image sliders ctrl for mobile
    APP.imageSlider = function () {
        window.setTimeout(function() {
            APP.slider = $('.bxslider').bxSlider({
                pager: false,
                preloadImages: 'all',
                oneToOneTouch: false,
                useCSS: true,
                easing: 'ease-in-out',
                swipeThreshold: 80,
                onSliderLoad: onSliderLoad,
                onSlideAfter: onSliderSwipe,
                onSlideNext: onSliderSwipeRight,
                onSlidePrev: onSliderSwipeLeft
            });                

            var slidesCount = APP.slider.getSlideCount();

            function onSliderLoad () {
                $('.bxslider li').css('width', window.innerWidth);
            }

            function onSliderSwipeRight() {
                APP.coremetrics('Element', APP.cm, 'slider-right-arrow');
            }

            function onSliderSwipeLeft() {
                APP.coremetrics('Element', APP.cm, 'slider-left-arrow');
            }

            function onSliderSwipe(slideElement, oldIndex, newIndex) {
                var index = newIndex + 1;

                $('.mobile_image_slider_counter').text(index + '/' + slidesCount);

                $(slideElement).siblings().removeClass('active');
                $(slideElement).addClass('active');                
                
                // APP.coremetrics('Pageview', APP.cm, 'slider-slide' + index);
            }      
        }, 1000);        
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
                window.BLOOMIES.coremetrics.cmCreatePageElementTag( pageID.substring(0, 49), categoryID);
            } catch (e) {
                self.logErr('CoreM_err: ' + e);
            }

            self.logErr('CoreM ::: tagType: Element; categoryID: ' + categoryID + '; pageID: ' + pageID.substring(0, 49) );
        }
    };    

    //(req) social share business logic
    APP.socialshare = function() {
        var self = this,
            baseURL = 'http://' + window.location.host + window.location.pathname,
            baseURLAssets = 'http://' + window.location.host + '/fashion/images/projects' + window.location.pathname;

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

        APP.insertNavigation(); //---> add this when your app includes NAV MENU
    });    

    return APP;

}(window, document, jQuery));