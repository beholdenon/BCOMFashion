$(function () {

    $.fn.fitText = function( kompressor, options ) {

        // Setup options
        var compressor = kompressor || 1,
            settings = $.extend({
                'minFontSize' : Number.NEGATIVE_INFINITY,
                'maxFontSize' : Number.POSITIVE_INFINITY
            }, options);

        return this.each(function(){

            // Store the object
            var $this = $(this);

            // Resizer() resizes items based on the object width divided by the compressor * 10
            var resizer = function () {
                $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
            };

            // Call once to set.
            resizer();

            // Call on resize. Opera debounces their resize by default.
            $(window).on('resize.fittext orientationchange.fittext', resizer);

        });

    };
    // $("#responsive_headline").fitText(1.2); // Turn the compressor up   (resizes more aggressively)
    // $("#responsive_headline").fitText(0.8); // Turn the compressor down (resizes less aggressively)
    // $("#responsive_headline").fitText(1.2, { minFontSize: '20px', maxFontSize: '40px' });

    // Prevent tabbing out of the nav items when nav is active
    var navItem = $('.spring-18-nav a'),
        navItemContent = $('.nav-item-content'),
        pageBody = $('body'),
        navActive = false,
        navSwitcher = $('#spring-18-nav-switcher'),
        lastTabbable = $('#last-nav-tabbable');
    
    toggleTabbable(navItem, navActive);
    toggleTabbable(navItemContent, navActive);

    navItem.on('keydown', function (event) {
        if (event.keyCode !== 9) {
            return;
        }
        if (event.target.id === lastTabbable.attr('id') && !event.shiftKey) {
            navSwitcher.focus();
            return false;
        }
    });

    // Nav switcher
    navSwitcher.on('click', function () {
        pageBody.toggleClass('spring-18-nav-is-active');
        navActive = pageBody.hasClass('spring-18-nav-is-active');
        toggleTabbable(navItem, navActive)
    });
    
    // Change header background on-scroll
    var stickyHeader = $('.spring-18-sticky-header');
    $(window).scroll(function () {
        var fromTop = $(this).scrollTop();
        if(fromTop > 120) {
            stickyHeader.addClass('bg-bold');
        } else {
            stickyHeader.removeClass('bg-bold');
        }
    });
    
    // Marquee animation
    $('.spring-18-marquee-animation').marquee({
        //speed in milliseconds of the marquee
        duration: 10000,
        //gap in pixels between the tickers
        gap: 20,
        //time in milliseconds before the marquee will start animating
        delayBeforeStart: 0,
        //'left' or 'right'
        direction: 'left',
        //true or false - should the marquee be duplicated to show an effect of continues flow
        duplicated: true
    });
    // Stop marquee animation
    $('.spring-18-marquee-container').on('click', function () {
       $('.js-marquee-wrapper').css({'transform':'none','animation':'unset'})
    });

    // Back to top
    $('.spring-18-back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });


    // Mr. Mario position is related to scroll direction 
    var lastScrollTop = 0,
        delta = 5,
        mrMario = $('.spring-18-mr-mario');
    $(window).scroll(function(event){
        var st = $(this).scrollTop();
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        if (st > lastScrollTop){
            // downscroll code
            mrMario.removeClass('go-back');
        } else {
            // upscroll code
            mrMario.addClass('go-back');
        }
        lastScrollTop = st;
    });

    
    console.log('spring-18-carousel-images: ' + $('.spring-18-carousel-images div').length);
    
    
    // Landing page video

    var playPauseVideoBtn = $('.spring-18-play-pause-video-btn');
    var videoContainer = $('.spring-18-landing-video-container');
    var videoID = videoContainer.data('video-id');
    
    if (videoID !== undefined) {
        getBrightcoveVideoData(function (data) {

            var videoData = getVideoSrcData(data);
            videoContainer.append('<video autoplay muted poster="' + videoData.videoPosterSrc + '"><source src="' + videoData.videoSrc + '" type="video/mp4"></video>');

            var originalVideoWidth = videoData.videoWidth;
            var originalVideoHeight = videoData.videoHeight;
            var video = videoContainer.find('video');

            // re-scale image/video when viewport resize
            $(window).resize(function(){

                // get the parent element size
                var containerWidth = video.parent().width();
                var containerHeight = video.parent().height();

                // use largest scale factor of horizontal/vertical
                var scaleWidth = containerWidth / originalVideoWidth;
                var scaleHeight = containerHeight / originalVideoHeight;
                var scale = scaleWidth > scaleHeight ? scaleWidth : scaleHeight;

                // scale the video
                video.width(scale * originalVideoWidth);
                video.height(scale * originalVideoHeight);

            });

            // trigger re-scale on pageload
            $(window).trigger('resize');

            video.bind('play', function (e) {
                playBtnState(playPauseVideoBtn, 'play');
            });
            video.bind('pause', function (e) {
                playBtnState(playPauseVideoBtn, 'pause');
            });

        }, videoID);
    }
    
    // Play/Pause button
    playPauseVideoBtn.on('click', function () {
        var _this = $(this);
        var video = videoContainer.find('video').get(0);
        if (video.paused) {
            _this.attr('coremetrictag','play-video-btn');
            video.play();
            playBtnState(_this, 'pause');
        } else {
            _this.attr('coremetrictag','pause-video-btn');
            video.pause();
            playBtnState(_this, 'play');
        }
    });

    // Social
    var social = {
        facebookTitle: '100% Bloomingdale\'s | bloomingdales.com',
        facebookDescription: 'The fall collections are here! Don\'t miss any of these utterly unique, extremely exclusive designer collaborations.',
        facebookImageFileName: '2018-spring-campaign-100-percent-facebook.jpg',
        twitterTitle: 'The 100% Bloomingdale\'s fall collections are here! Don\'t miss any of these exclusive designer collaborations! http://fashion.bloomingdales.com/2016-fall-campaign-100-percent-exclusive/',
        pinterestTitle: '100% Bloomingdale\'s',
        pinterestImageFileName: '2018-spring-campaign-100-percent-pinterest.jpg',
        facebookURL: null,
        twitterURL: null,
        pinterestURL: null
    };

    setupSocial();

    
    // Utils
    
    function setupSocial() {

        var baseURL = 'http://' + window.location.host + window.location.pathname,
            baseURLAssets = 'http://' + window.location.host + '/b/fashion/campaigns/images/2018-spring-campaign-100-percent-exclusive/social/';
        
        
        var facebookURL = 'https://www.facebook.com/sharer/sharer.php';
        facebookURL += '?u=' + encodeURIComponent(baseURL);
        facebookURL += '&quote=' + encodeURIComponent(social.facebookTitle + " " + social.facebookDescription);
        
        var twitterURL = 'http://twitter.com/intent/tweet?source=webclient&text=';
        twitterURL += encodeURIComponent(social.twitterTitle);
        
        var pinterestURL = 'http://pinterest.com/pin/create/button/?';
        pinterestURL += 'url=' + encodeURIComponent(baseURL);
        pinterestURL += '&media=' + encodeURIComponent(baseURLAssets + social.pinterestImageFileName);
        pinterestURL += '&description=' + encodeURIComponent(social.pinterestTitle);

        $('.spring-18-pinterest-link').attr('href', pinterestURL);
        $('.spring-18-twitter-link').attr('href', twitterURL);
        $('.spring-18-facebook-link').attr('href', facebookURL);

        $('.spring-18-instagram-link').attr('href', "https://www.instagram.com/bloomingdales/");

        $('.spring-18-social-links').find('a').each(function () {
            $(this).attr('target','_blank');
        })

    }

    function playBtnState(_btn, _flag) {
        if (_flag === "play") {
            _btn.addClass('is-playing').removeClass('is-paused');
        } else if (_flag === "pause") {
            _btn.addClass('is-paused').removeClass('is-playing');
        }
    }

    function toggleTabbable(item, flag) {
        if (flag) {
            item.each(function () {
                $(this).attr('tabindex', '0');
            });
        } else {
            item.each(function () {
                $(this).attr('tabindex', '-1');
            });
        }
    }
    
    function getBrightcoveVideoData(callback, videoID)  {
        var accountID = 75934411001;
        var policyKey = 'BCpkADawqM0NvUfP8kau23tpJMWdg09UoT0lqv-Aoqc98Q-ug4rTtp17hA99TA9yLT4-SJm-oIpkYExCvnGqb1fpbxMZM1Y8Yy1Hol4HdRpWGuJHGskT_7155ak';
        var path = 'https://edge.api.brightcove.com/playback/v1/accounts/' + accountID + '/videos/' + videoID;
        $.ajax({
            type: "GET",
            url: path,
            cache: false,
            contentType: 'application/json',
            crossDomain: true,
            processData: true,
            headers: {
                Accept: 'application/json;pk=' + policyKey
            },
            success: function (brightcoveVideoData) {
                callback(brightcoveVideoData);
            },
            error: function (xhr, status, errorThrown) {
                console.log(errorThrown + '\n' + status + '\n' + xhr.statusText);
            }
        });
    }

    function getVideoSrcData (data) {
        var videos = data.sources;
        var removeVideosIndex = [];
        videos.forEach(function (element, index) {
            if (element.src == undefined || element.container.toLowerCase() !== 'mp4') {
                removeVideosIndex.push(index);
            } else {
                if (element.src.includes('http://')) {
                    removeVideosIndex.push(index);
                }
            }
        });
        var finalVideosData = $.grep(videos, function (n, i) {
            return $.inArray(i, removeVideosIndex) == -1;
        });
        function videoWidthComparator(a, b) {
            return parseInt(a.width, 10) - parseInt(b.width, 10);
        }
        finalVideosData.sort(videoWidthComparator).reverse();

        return {'videoPosterSrc': data.poster, 'videoSrc': finalVideosData[0].src, 'videoWidth': finalVideosData[0].width, 'videoHeight': finalVideosData[0].height}
    }


    // ----------------------------------------- CoreMetrics ------------------------------------

    var hasMBL = (isDevice() ? "mbl:" : "");


    // init global app namespace object
    window.Globals = {
        env: window.ENV_CONFIG || 'dev',
        deviceType: null,
        mobileOS: window.MOBILE_OS,
        Coremetrics: {
            pageID: null,
            catID: null,
            attr42: null
        }
    };


    var thisCategoryID = "spring18_100percent"; 
    var coremetricsPageID = $('.spring-18').data('coremetrics-page-id');

    $( window ).load(function() {
        $.fn.coreTag('Pageview', thisCategoryID + '--' + coremetricsPageID);
        $('[coremetrictag]').click(function () {
            $.fn.coreTag('Element', $(this).attr("coremetrictag"));
        });
    });


    $.fn.coreTag = function(tagType, pageID) {
        if (tagType === 'Pageview') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(hasMBL+pageID, hasMBL+thisCategoryID, '', '');
            } catch (e) {
                $.fn.trace('CoreM_err: ' + e);
            }
            $.fn.trace('###### CoreM Pageview; thisCategoryID: ' +hasMBL+ thisCategoryID + '; pageID: ' +hasMBL+ pageID);
        } else if (tagType === 'Element') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL+pageID.substring(0, 49), hasMBL+thisCategoryID);
            } catch (e) {
                $.fn.trace('CoreM_err: ' + e);
            }
            $.fn.trace('###### CoreM Element; thisCategoryID: ' +hasMBL+ thisCategoryID + '; pageID: ' +hasMBL+ pageID.substring(0, 49));
        }
    };

    $.fn.trace = function(log) {
        if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
            window.console.info(log);
        }
    };

    function isDevice () {
        return ( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) );
    }

    initCoreMetrics(thisCategoryID);

    function setEnvironment() {
        if (window.Globals.env === 'dev') {
            return cmSetTest(); // jshint ignore:line
        } else if (window.Globals.env === 'production') {
            if (window.location.host === 'fashion.bloomingdales.com'){
                return cmSetProduction(); // jshint ignore:line
            } else {
                return cmSetTest(); // jshint ignore:line
            }
        } else {
            throw 'ERROR: unidentified env variable';
        }
    }

    function pageName() {
        //return the last segment of the page URL to be used as an pageview CM id
        var path = window.location.pathname.split('/');
        return path[path.length - 2];
    }

    function initCoreMetrics(categoryID) {
        window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();
        
        var pageID = 'fashion_' + pageName(),
            catID = categoryID || 'xx-xx-xx-xx',
            attr = '';

        //populate the Globals ns
        window.Globals.Coremetrics.pageID = pageID;
        window.Globals.Coremetrics.catID = catID;

        if (window.BLOOMIES && window.BLOOMIES.coremetrics) {
            setEnvironment();

            if ($(window).width() < 980 && window.Globals.deviceType !== 'mobile'){
                attr = 'Desktop Minimized';
            } else {
                attr = '';
            }
            window.Globals.Coremetrics.attr42 = attr;
        }
    }



});
