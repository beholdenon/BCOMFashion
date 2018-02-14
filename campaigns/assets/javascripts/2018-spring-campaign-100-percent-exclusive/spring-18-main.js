//Custom Modernizr build to check video autoplay support
!function(A,e,o){function t(A,e){return typeof A===e}function n(){var A,e,o,n,a,l,i;for(var r in s)if(s.hasOwnProperty(r)){if(A=[],e=s[r],e.name&&(A.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(o=0;o<e.options.aliases.length;o++)A.push(e.options.aliases[o].toLowerCase());for(n=t(e.fn,"function")?e.fn():e.fn,a=0;a<A.length;a++)l=A[a],i=l.split("."),1===i.length?Modernizr[i[0]]=n:(!Modernizr[i[0]]||Modernizr[i[0]]instanceof Boolean||(Modernizr[i[0]]=new Boolean(Modernizr[i[0]])),Modernizr[i[0]][i[1]]=n),c.push((n?"":"no-")+i.join("-"))}}function a(A){var e=h.className,o=Modernizr._config.classPrefix||"";if(R&&(e=e.baseVal),Modernizr._config.enableJSClass){var t=new RegExp("(^|\\s)"+o+"no-js(\\s|$)");e=e.replace(t,"$1"+o+"js$2")}Modernizr._config.enableClasses&&(e+=" "+o+A.join(" "+o),R?h.className.baseVal=e:h.className=e)}function l(){return"function"!=typeof e.createElement?e.createElement(arguments[0]):R?e.createElementNS.call(e,"http://www.w3.org/2000/svg",arguments[0]):e.createElement.apply(e,arguments)}function i(A,e){if("object"==typeof A)for(var o in A)d(A,o)&&i(o,A[o]);else{A=A.toLowerCase();var t=A.split("."),n=Modernizr[t[0]];if(2==t.length&&(n=n[t[1]]),"undefined"!=typeof n)return Modernizr;e="function"==typeof e?e():e,1==t.length?Modernizr[t[0]]=e:(!Modernizr[t[0]]||Modernizr[t[0]]instanceof Boolean||(Modernizr[t[0]]=new Boolean(Modernizr[t[0]])),Modernizr[t[0]][t[1]]=e),a([(e&&0!=e?"":"no-")+t.join("-")]),Modernizr._trigger(A,e)}return Modernizr}var c=[],s=[],r={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(A,e){var o=this;setTimeout(function(){e(o[A])},0)},addTest:function(A,e,o){s.push({name:A,fn:e,options:o})},addAsyncTest:function(A){s.push({name:null,fn:A})}},Modernizr=function(){};Modernizr.prototype=r,Modernizr=new Modernizr;var h=e.documentElement,R="svg"===h.nodeName.toLowerCase();Modernizr.addTest("video",function(){var A=l("video"),e=!1;try{e=!!A.canPlayType,e&&(e=new Boolean(e),e.ogg=A.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),e.h264=A.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),e.webm=A.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),e.vp9=A.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),e.hls=A.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(o){}return e});var d;!function(){var A={}.hasOwnProperty;d=t(A,"undefined")||t(A.call,"undefined")?function(A,e){return e in A&&t(A.constructor.prototype[e],"undefined")}:function(e,o){return A.call(e,o)}}(),r._l={},r.on=function(A,e){this._l[A]||(this._l[A]=[]),this._l[A].push(e),Modernizr.hasOwnProperty(A)&&setTimeout(function(){Modernizr._trigger(A,Modernizr[A])},0)},r._trigger=function(A,e){if(this._l[A]){var o=this._l[A];setTimeout(function(){var A,t;for(A=0;A<o.length;A++)(t=o[A])(e)},0),delete this._l[A]}},Modernizr._q.push(function(){r.addTest=i}),Modernizr.addAsyncTest(function(){function A(l){n++,clearTimeout(e);var c=l&&"playing"===l.type||0!==a.currentTime;return!c&&t>n?void(e=setTimeout(A,o)):(a.removeEventListener("playing",A,!1),i("videoautoplay",c),void(a.parentNode&&a.parentNode.removeChild(a)))}var e,o=200,t=5,n=0,a=l("video"),c=a.style;if(!(Modernizr.video&&"autoplay"in a))return void i("videoautoplay",!1);c.position="absolute",c.height=0,c.width=0;try{if(Modernizr.video.ogg)a.src="data:video/ogg;base64,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";else{if(!Modernizr.video.h264)return void i("videoautoplay",!1);a.src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ=="}}catch(s){return void i("videoautoplay",!1)}a.setAttribute("autoplay",""),a.style.cssText="display:none",h.appendChild(a),setTimeout(function(){a.addEventListener("playing",A,!1),e=setTimeout(A,o)},0)}),n(),a(c),delete r.addTest,delete r.addAsyncTest;for(var E=0;E<Modernizr._q.length;E++)Modernizr._q[E]();A.Modernizr=Modernizr}(window,document);

$(function () {


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

    
    $('.spring-18-scroll-to-btn').on('click', function () {
        $('html, body').animate({
            scrollTop: $('.spring-18-main-wrapper').offset().top + 'px'
        }, 800);
        return false;
    });
    
    
    // Landing page video

    var playPauseVideoBtn = $('.spring-18-play-pause-video-btn');
    var videoContainer = $('.spring-18-landing-video-container');
    var videoID = videoContainer.data('video-id');
    
    if (videoID !== undefined) {
        getBrightcoveVideoData(function (data) {

            var videoData = getVideoSrcData(data);
            videoContainer.append('<video autoplay playsinline muted loop poster="' + videoData.videoPosterSrc + '"><source src="' + videoData.videoSrc + '" type="video/mp4"></video>');

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

   
    // Show play button, if video autoplay is not supported (old iOS version and some Androids versions)
    Modernizr.on('videoautoplay', function (autoPlayIsSupported) {
        if(!autoPlayIsSupported) {
            playPauseVideoBtn.addClass('is-paused');
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

    
    // ----- carousel

    var imageHolder = $('.spring-18-carousel-img-holder');
    var rightArrowBtn = $('.spring-18-image-carousel-right-arrow');
    var leftArrowBtn = $('.spring-18-image-carousel-left-arrow');
    var carousel = $('.spring-18-carousel-images');
    
    showHideArrowBtns();
    
    ifTouchSupported();
    
    $(window).on('resize', function() {
        showHideArrowBtns();
        ifTouchSupported();
    });

    rightArrowBtn.on('click', function () {
        updateCarouselPosition('left');
    });

    leftArrowBtn.on('click', function () {
        updateCarouselPosition('right');
    });

    carousel.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
        showHideArrowBtns();
    });
    
    function updateCarouselPosition (direction) {
        var offset = getOffset(direction);
        if (direction === 'left') {
            offset = -(offset);
        }
        var carouselPosition = carousel.position().left + offset;
        carousel.css('left', carouselPosition + 'px');
    }

    function getOffset(direction) {

        var offset = 0;
        var invisiblePartWidth = 0;
        var windowWidth = $(window).width();
        
        imageHolder.each(function () {
            var _this = $(this);
            var thisWidth = _this.innerWidth();
            var isNotVisiblePart = null;
            
            if (direction === 'left') {
                isNotVisiblePart = isBeyondRightEdge(_this);
            } else if (direction === 'right') {
                isNotVisiblePart = isBeyondLeftEdge(_this);
            }
            if (isNotVisiblePart) {
                invisiblePartWidth += thisWidth;
            }
        });

        if (invisiblePartWidth < windowWidth) {
            offset = invisiblePartWidth;
        } else {
            imageHolder.each(function () {
                var _this = $(this);
                var thisWidth = _this.innerWidth();
                if (inViewport(_this)) {
                    offset += thisWidth;
                }
            });
        }

        return offset;
    }
    
    function inViewport(element) {
        var elementBounds = element[0].getBoundingClientRect();
        return (
            //elementBounds.top >= 0 //&&
            elementBounds.left >= 0 &&
            //elementBounds.bottom <= $(window).height() &&
            elementBounds.right <= $(window).width()
        );
    }

    function isBeyondRightEdge(element) {
        var elementBounds = element[0].getBoundingClientRect();
        return (
            elementBounds.right > $(window).width()
        );
    }

    function isBeyondLeftEdge(element) {
        var elementBounds = element[0].getBoundingClientRect();
        return (
            elementBounds.left < 0
        );
    }
    
    function showHideArrowBtns() {
        if(carousel.length > 0) {
            if (carousel.position().left >= 0) {
                leftArrowBtn.fadeOut();
            } else {
                leftArrowBtn.fadeIn();
            }

            var spaceBeyondRightSide = 0;
            imageHolder.each(function () {
                var _this = $(this);
                var thisWidth = _this.innerWidth();
                if (isBeyondRightEdge(_this)) {
                    spaceBeyondRightSide += thisWidth;
                }
            });
            if (spaceBeyondRightSide > 0) {
                rightArrowBtn.fadeIn();
            } else {
                rightArrowBtn.fadeOut();
            }
            
        }
    }
    
    function ifTouchSupported() {
        var msTouchEnabled = window.navigator.msMaxTouchPoints;
        var generalTouchEnabled = "ontouchstart" in document.createElement("div");

        if(msTouchEnabled || generalTouchEnabled) {
            carousel.addClass('touchable');
            leftArrowBtn.hide();
            rightArrowBtn.hide();
        }
    }
    
    
});
