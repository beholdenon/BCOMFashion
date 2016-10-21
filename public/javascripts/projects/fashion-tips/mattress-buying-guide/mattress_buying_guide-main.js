require(['jquery'], function($) {

    /* jshint camelcase:false */
    /* globals BLOOMIES */

    'use strict';

    var namespace = {
        projectGlobalPrefix: 'mattress_buying_guide',
        environment: 'astra', //legacy || astra 
        environmentProjectFolder: 'cat_splash', // for a Legacy project, set this to the folder name which is created in the /specialProjects,
        // for an Astra project, set this to { homepage_pools || cat_splash }
        coremetrics: 'fall15_mattressguide',
        state: {
            isDesktop: true
        },
        socialShare: {
            facebookTitle: 'Mattress Buying Guide | Bloomingdales.com',
            facebookDescription: 'Discover your perfect mattress and learn everything you ever wanted to know about innersprings and California Kings.',
            facebookImageFileName: 'mattress_buying_guide_Facebook.jpg',
            twitterTitle: 'Discover your perfect mattress and learn everything you ever wanted to know about innersprings and California Kings. http://bit.ly/1TrTZpV',
            pinterestTitle: 'Mattress Buying Guide | Bloomingdales.com',
            pinterestImageFileName: 'mattress_buying_guide_Pinterest.jpg'
        },
        urls: {
            pageURL: '/fashion-index/mattress-buying-guide.jsp',
            baseURL: 'http://www.bloomingdales.com',
            serverURL: 'http://' + window.location.host,
            facebookShareURL: '',
            twitterShareURL: '',
            pinterestShareURL: ''
        },
        quizUrls: {

            'innerspring-firm-twin': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Innerspring,Twin?id=1001973',
            'innerspring-firm-full': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Innerspring,Full?id=1001973',
            'innerspring-firm-queen': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Innerspring,Queen?id=1001973',
            'innerspring-firm-king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Innerspring,King?id=1001973',
            'innerspring-firm-cal_king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Innerspring,California%20King?id=1001973',
            'innerspring-medium-twin': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Innerspring,Twin?id=1001973',
            'innerspring-medium-full': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Innerspring,Full?id=1001973',
            'innerspring-medium-queen': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Innerspring,Queen?id=1001973',
            'innerspring-medium-king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Innerspring,King?id=1001973',
            'innerspring-medium-cal_king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Innerspring,California%20King?id=1001973',
            'innerspring-plush-twin': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Innerspring,Twin?id=1001973',
            'innerspring-plush-full': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Innerspring,Full?id=1001973',
            'innerspring-plush-queen': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Innerspring,Queen?id=1001973',
            'innerspring-plush-king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Innerspring,King?id=1001973',
            'innerspring-plush-cal_king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Innerspring,California%20King?id=1001973',
            'latex-firm-twin': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Latex,Twin?id=1001973',
            'latex-firm-full': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Latex,Full?id=1001973',
            'latex-firm-queen': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Latex,Queen?id=1001973',
            'latex-firm-king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Latex,King?id=1001973',
            'latex-firm-cal_king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Latex,California%20King?id=1001973',
            'latex-medium-twin': '',
            'latex-medium-full': '',
            'latex-medium-queen': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Latex,Queen?id=1001973',
            'latex-medium-king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Latex,King?id=1001973',
            'latex-medium-cal_king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Latex,California%20King?id=1001973',
            'latex-plush-twin': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Latex,Twin?id=1001973',
            'latex-plush-full': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Latex,Full?id=1001973',
            'latex-plush-queen': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Latex,Queen?id=1001973',
            'latex-plush-king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Latex,King?id=1001973',
            'latex-plush-cal_king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Latex,California%20King?id=1001973',
            'memory_foam-firm-twin': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Memory%20Foam,Twin?id=1001973',
            'memory_foam-firm-full': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Memory%20Foam,Full?id=1001973',
            'memory_foam-firm-queen': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Memory%20Foam,Queen?id=1001973',
            'memory_foam-firm-king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Memory%20Foam,King?id=1001973',
            'memory_foam-firm-cal_king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Memory%20Foam,California%20King?id=1001973',
            'memory_foam-medium-twin': '',
            'memory_foam-medium-full': '',
            'memory_foam-medium-queen': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Memory%20Foam,Queen?id=1001973',
            'memory_foam-medium-king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Memory%20Foam,King?id=1001973',
            'memory_foam-medium-cal_king': '',
            'memory_foam-plush-twin': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Memory%20Foam,Twin?id=1001973',
            'memory_foam-plush-full': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Memory%20Foam,Full?id=1001973',
            'memory_foam-plush-queen': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Memory%20Foam,Queen?id=1001973',
            'memory_foam-plush-king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Memory%20Foam,King?id=1001973',
            'memory_foam-plush-cal_king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Memory%20Foam,California%20King?id=1001973',
            'pillow_top-firm-twin': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Pillow Top,Twin?id=1001973',
            'pillow_top-firm-full': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Pillow Top,Full?id=1001973',
            'pillow_top-firm-queen': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Pillow Top,Queen?id=1001973',
            'pillow_top-firm-king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Pillow Top,King?id=1001973',
            'pillow_top-firm-cal_king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Pillow Top,California%20King?id=1001973',
            'pillow_top-medium-twin': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Pillow%20Top,Twin?id=1001973',
            'pillow_top-medium-full': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Pillow%20Top,Full?id=1001973',
            'pillow_top-medium-queen': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Pillow%20Top,Queen?id=1001973',
            'pillow_top-medium-king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Pillow%20Top,King?id=1001973',
            'pillow_top-medium-cal_king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Medium%20Firm|Medium%20Plush,Pillow%20Top,California%20King?id=1001973',
            'pillow_top-plush-twin': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Pillow Top,Twin?id=1001973',
            'pillow_top-plush-full': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Pillow Top,Full?id=1001973',
            'pillow_top-plush-queen': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Pillow Top,Queen?id=1001973',
            'pillow_top-plush-king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Pillow Top,King?id=1001973',
            'pillow_top-plush-cal_king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Pillow Top,California%20King?id=1001973',
            'hybrid-firm-twin': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Hybrid,Twin?id=1001973',
            'hybrid-firm-full': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Hybrid,Full?id=1001973',
            'hybrid-firm-queen': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Hybrid,Queen?id=1001973',
            'hybrid-firm-king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Hybrid,King?id=1001973',
            'hybrid-firm-cal_king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Firm,Hybrid,California%20King?id=1001973',
            'hybrid-medium-twin': '',
            'hybrid-medium-full': '',
            'hybrid-medium-queen': '',
            'hybrid-medium-king': '',
            'hybrid-medium-cal_king': '',
            'hybrid-plush-twin': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Hybrid,Twin?id=1001973',
            'hybrid-plush-full': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Hybrid,Full?id=1001973',
            'hybrid-plush-queen': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Hybrid,Queen?id=1001973',
            'hybrid-plush-king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Hybrid,King?id=1001973',
            'hybrid-plush-cal_king': '/shop/home/mattresses/Mattress_comfort,Mattress_construction,Mattress_size/Plush,Hybrid,California%20King?id=1001973'

        }
    };

    $(window).load(function () {

        if ($('.bl_mobile').length > 0) {
            namespace.state.isDesktop = false;
          //  namespace.coremetrics = 'MBL:' + namespace.coremetrics;
            initMobile();
        } else {
            if ($('.bl_tablet').length > 0) {
                // remove hover class on tablet
                $('#RTW_Lux_F15_desktop_nav').removeClass('nav_desktop_hover_state');
                $('#RTW_Lux_F15_desktop_back_to_top').hide();
            }
            initDesktop();
            removeLoader();
        }

        // listeners:
        $('ul.mattress_buying_guide_nav_links_list a').on('click', function () {
            var attrCm = $(this).data('cm');
            if (typeof attrCm === 'string' && attrCm.length > 0) {
                BLOOMIES.coremetrics.cmCreatePageElementTag('topnav--' + attrCm, namespace.coremetrics.replace("MBL:", ""));
            }
        });

        $('a.desktop-artwork-link, a.mobile-artwork-link').on('click', function () {
            var attrCm = $(this).data('cm');
            if (typeof attrCm === 'string' && attrCm.length > 0) {
                BLOOMIES.coremetrics.cmCreatePageElementTag(attrCm, namespace.coremetrics.replace("MBL:", ""));
            }
        });

        $('a.quiz_button, a.quiz_mobile_button').on('click', function () {
            var attrCm = $(this).data('choice'),
                attrStep = $(this).data('step');

            if (typeof attrCm === 'string' && attrCm.length > 0) {
                BLOOMIES.coremetrics.cmCreatePageElementTag(attrStep + '_' + attrCm, namespace.coremetrics.replace("MBL:", ""));
            }
        });

        // social share
        $('#' + namespace.projectGlobalPrefix + '_desktop_socialshare_facebook').on('click', function () {
            window.open(namespace.urls.facebookShareURL, '_blank', 'width=608,height=342');
            coreMetrics('Element', namespace.coremetrics, 'social-fb');
        });
        $('#' + namespace.projectGlobalPrefix + '_desktop_socialshare_twitter').on('click', function () {
            window.open(namespace.urls.twitterShareURL, '_blank', 'width=740,height=340');
            coreMetrics('Element', namespace.coremetrics, 'social-twitter');
        });
        $('#' + namespace.projectGlobalPrefix + '_desktop_socialshare_pinterest').on('click', function () {
            window.open(namespace.urls.pinterestShareURL, '_blank', 'width=770,height=380');
            coreMetrics('Element', namespace.coremetrics, 'social-pinterest');
        });


        socialShare();
    });

    function initDesktop() {

        $('#' + namespace.projectGlobalPrefix + '_desktop_main_container').addClass('loaded');
        $('#' + namespace.projectGlobalPrefix + '_desktop_header').addClass('active');

        if (window.location.hash === '') {
            coreMetrics('Pageview', namespace.coremetrics, namespace.coremetrics + '--hp');
        }
        stickyNav();
        //window.setTimeout(function(){stickyNav();}, 2100);
        deepLinks();

    }

    function initMobile() {
        if (namespace.environment === 'legacy') {
            loadMobileCSS('/web20/assets/style/specialProjects/' + namespace.environmentProjectFolder + '/' + namespace.projectGlobalPrefix + '_style-mobile.css');
        } else if (namespace.environment === 'astra') {
            loadMobileCSS('/dyn_img/' + namespace.environmentProjectFolder + '/' + namespace.projectGlobalPrefix + '_style-mobile.css');
        } else if (namespace.environment === 'local') {
            loadMobileCSS(namespace.projectGlobalPrefix + '_style-mobile.css');
        } else {
            console.log('Error setting up the namespace');
        }

        window.setTimeout(function () {
            $('#' + namespace.projectGlobalPrefix + '_desktop_main_container').remove();
            $('#' + namespace.projectGlobalPrefix + '_mobile_main_container').show();

            $('#bl_main_lookbook_container').addClass(namespace.projectGlobalPrefix + '_mobile_main_container-bl_main_container_reset');

            $('#' + namespace.projectGlobalPrefix + '_mobile_main_container').addClass('loaded');

            removeLoader();
            //mobileSectionCoreMetrics();

            deepLinks();
            // localMobileDebug();

            mobileStickyNavBar();

            if (window.location.hash === '') {
                coreMetrics("Pageview", namespace.coremetrics.replace("MBL:", ""), namespace.coremetrics.replace("MBL:", "") + "--hp");
            }

        }, 100);
    }

    /*    function localMobileDebug() {

     if ((window.location.host).indexOf('lbrandao') >= 0 ) {

     $('header').remove();
     $('footer').remove();
     $('#bl_main_wrapper').css({'min-width' : 'auto'});
     $('#bl_main_container').css({'width' : '100%'});
     console.log('Mobile local debug mode on...');

     }
     }*/

    function removeLoader() {
        $('#' + namespace.projectGlobalPrefix + '_desktop_loader').fadeOut('slow');
    }

    function loadMobileCSS(href, before, media) {
        // ARGUMENTS EXPLAINED:
        // `href` is the URL for your CSS file.
        // `before` optionally defines the element we'll use as a reference for injecting our <link>
        // By default, `before` uses the first <script> element in the page.
        // However, since the order in which stylesheets are referenced matters, you might need a more specific location in your document.
        // If so, pass a different reference element to the `before` argument and it'll insert before that instead
        // note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
        var ss = window.document.createElement("link");
        var ref = before || window.document.getElementsByTagName("script")[0];
        var sheets = window.document.styleSheets;
        ss.rel = "stylesheet";
        ss.href = href;
        // temporarily, set media to something non-matching to ensure it'll fetch without blocking render
        ss.media = "only x";
        // inject link
        ref.parentNode.insertBefore(ss, ref);
        // This function sets the link's media back to `all` so that the stylesheet applies once it loads
        // It is designed to poll until document.styleSheets includes the new sheet.
        function toggleMedia() {
            var defined;
            for (var i = 0; i < sheets.length; i++) {
                if (sheets[i].href && sheets[i].href.indexOf(href) > -1) {
                    defined = true;
                }
            }
            if (defined) {
                ss.media = media || "all";
            }
            else {
                setTimeout(toggleMedia);
            }
        }

        toggleMedia();
        return ss;
    }

    function coreMetrics(tag_type, category_name, tag_value) {
        if (true){return;}
        if (tag_type === "Pageview") {
            try {
                BLOOMIES.coremetrics.cmCreatePageviewTag(tag_value, category_name);
            } catch (e) {
                trace("Coremetrics Library Not Found..." + e);
            }
            trace("{{{{{{{{ Pageview- category_name: " + category_name + " tag_value: " + tag_value + " }}}}}}}}");
        } else if (tag_type === "Element") {
            try {
                BLOOMIES.coremetrics.cmCreatePageElementTag(tag_value, category_name);
            } catch (e) {
                trace("Coremetrics Library Not Found... " + e);
            }

            trace("{{{{{{{{ Element- category_name: " + category_name + " tag_value: " + tag_value + " }}}}}}}}");
        }
    }

    function trace(log_string) {
        if (window.location.href.indexOf('bloomingdales.com') < 0) {
            if (window.console) {
                console.info(log_string);
            }
        }
    }

    function socialShare() {
        var baseURL = null;

        try {
            if (namespace.urls.serverURL.indexOf('.fds.com') !== -1) {
                baseURL = namespace.urls.serverURL;
            } else {
                baseURL = namespace.urls.baseURL;
            }
        } catch (e) {
            trace('Social share issue: ' + e);
        }

        var pageURL = namespace.urls.pageURL;
        pageURL = pageURL.substr(pageURL.lastIndexOf('/'));
        pageURL = pageURL.slice(0, -4);
        var baseURLAssets;

        try {
            if (namespace.environment === 'legacy') {
                baseURLAssets = 'http://assets.' + (window.location.host).replace('mdev1.', '') + '/web20/assets/img/specialProjects/' + namespace.environmentProjectFolder + '/';
            } else if (namespace.environment === 'astra') {
                baseURLAssets = 'http://' + (window.location.host).replace('mdev1.', '') + '/dyn_img/cat_splash/';
            }
        } catch (e) {
            trace('Social share issue: ' + e);
        }

        namespace.urls.pageURL = baseURL + namespace.urls.pageURL;

        namespace.urls.facebookShareURL = 'https://www.facebook.com/dialog/feed';
        namespace.urls.facebookShareURL += '?app_id=145634995501895';
        namespace.urls.facebookShareURL += '&name=' + encodeURIComponent(namespace.socialShare.facebookTitle);
        namespace.urls.facebookShareURL += '&description=' + encodeURIComponent(namespace.socialShare.facebookDescription);
        namespace.urls.facebookShareURL += '&link=' + encodeURIComponent(namespace.urls.pageURL);
        namespace.urls.facebookShareURL += '&picture=' + encodeURIComponent(baseURLAssets + namespace.socialShare.facebookImageFileName);
        namespace.urls.facebookShareURL += '&display=popup&redirect_uri=' + encodeURIComponent('https://www.facebook.com/');

        namespace.urls.twitterShareURL = 'http://twitter.com/intent/tweet?source=webclient&text=';
        namespace.urls.twitterShareURL += encodeURIComponent(namespace.socialShare.twitterTitle);

        namespace.urls.pinterestShareURL = 'http://pinterest.com/pin/create/button/?';
        namespace.urls.pinterestShareURL += 'url=' + encodeURIComponent(namespace.urls.pageURL);
        namespace.urls.pinterestShareURL += '&media=' + encodeURIComponent(baseURLAssets + namespace.socialShare.pinterestImageFileName);
        namespace.urls.pinterestShareURL += '&description=' + encodeURIComponent(namespace.socialShare.pinterestTitle);
    }

    function stickyNav() {

        var top = 0;

        var lockedHeaderEl = $('HEADER.responsive.locked');
        if (lockedHeaderEl.length > 0){
            if (lockedHeaderEl.css("position") === 'fixed'){
                $('#' + namespace.projectGlobalPrefix + '_desktop_nav').css({
                    'position': 'relative',
                    'margin-top': 0 - top - 29 + 'px',
                    'z-index': 0
                });
                return;
            }
        }
        if ($(window).scrollTop() <= ($('#' + namespace.projectGlobalPrefix + '_desktop_nav_placeholder').offset().top) - top) {
            $('#' + namespace.projectGlobalPrefix + '_desktop_nav').css({
                'position': 'relative',
                'margin-top': 0 - top - 29 + 'px'
            });

            // updateHash('');
        } else {
            $('#' + namespace.projectGlobalPrefix + '_desktop_nav').css({
                'top': top,
                'position': 'fixed',
                'margin-top': 0
            });
        }
    }

    function mobileStickyNavBar() {
        var mobileNavBar = $('#mattress_buying_guide_mobile_nav'),
            mobileNavPlaceHolderPosition = $('#mattress_buying_guide_mobile_nav_placeholder').offset().top;

        mobileNavBar.remove();
        $('body').append(mobileNavBar);
        mobileNavBar.css({'top': mobileNavPlaceHolderPosition});


        $('a#mattress_buying_guide_mobile_nav-arrow_down, a#mattress_buying_guide_mobile_nav_section_name').on('click', function () {
            event.preventDefault();
            var dropDown = $('#mattress_buying_guide_mobile_dropdown');

            if (dropDown.is(':visible') === false) {
                dropDown.slideDown('slow');
                BLOOMIES.coremetrics.cmCreatePageElementTag('topnav_open_dropdown', namespace.coremetrics.replace("MBL:", ""));
            }
        });

        $('a#mattress_buying_guide_mobile_nav-arrow_up').on('click', function () {
            event.preventDefault();
            var dropDown = $('#mattress_buying_guide_mobile_dropdown');

            if (dropDown.is(':visible') === true) {
                dropDown.slideUp('slow');
                BLOOMIES.coremetrics.cmCreatePageElementTag('topnav_close_dropdown', namespace.coremetrics.replace("MBL:", ""));
            }
        });

        $('#mattress_buying_guide_mobile_dropdown > li > a').on("click", function () {
            $('#mattress_buying_guide_mobile_dropdown').slideUp('slow');
            var hash = $(this).attr('href'),
                attrCm = $(this).data('cm');

            hash = hash.substring(1, hash.length);
            if (typeof attrCm === 'string' && attrCm.length > 0) {
                BLOOMIES.coremetrics.cmCreatePageElementTag('topnav--' + attrCm, namespace.coremetrics.replace("MBL:", ""));
            }
            //addressChange(event, hash);
        });

        $('#' + namespace.projectGlobalPrefix + '_mobile_socialshare_facebook').on('click', function () {
            window.open(namespace.urls.facebookShareURL, '_blank', 'width=608,height=342');
            coreMetrics('Element', namespace.coremetrics.replace("MBL:", ""), 'social-fb');
            console.log('clicked mobile FB');
        });
        $('#' + namespace.projectGlobalPrefix + '_mobile_socialshare_twitter').on('click', function () {
            window.open(namespace.urls.twitterShareURL, '_blank', 'width=740,height=340');
            coreMetrics('Element', namespace.coremetrics.replace("MBL:", ""), 'social-twitter');
        });
        $('#' + namespace.projectGlobalPrefix + '_mobile_socialshare_pinterest').on('click', function () {
            window.open(namespace.urls.pinterestShareURL, '_blank', 'width=770,height=380');
            coreMetrics('Element', namespace.coremetrics.replace("MBL:", ""), 'social-pinterest');
        });
    }

    function updateMobileStickyNavPosition() {
        var mobileNavBar = $('#mattress_buying_guide_mobile_nav'),
            mobileNavPlaceHolderPosition = $('#mattress_buying_guide_mobile_nav_placeholder').offset().top;

        if ($(window).scrollTop() < mobileNavPlaceHolderPosition) {
            mobileNavBar.css({
                'position': 'absolute',
                'top': mobileNavPlaceHolderPosition
            });

        } else {
            mobileNavBar.css({
                'position': 'fixed',
                'top': 0
            });
        }
    }

    $(window).on('hashchange', function () {
        deepLinks();
    });

    function deepLinks() {
        var hash = window.location.hash;
        if (hash !== '') {
            if ((window.location.hash.match(/\//g) || []).length > 0) {
                hash = hash.substring(1, hash.indexOf('/'));
            }
            else {
                hash = hash.substring(1, hash.length);
            }
            changeView(hash);
        }
    }

    function changeView(hash) {

        var deviceView = ( namespace.state.isDesktop === true ? '_desktop_' : '_mobile_' );

        if (( hash === 'comfort_guarantee' || hash === 'worrynomore' ) && namespace.state.isDesktop) {
            var targetOverlay = $('#mattress_buying_guide_desktop_overlay-' + hash),
                overlayHeight = targetOverlay.height() + 45;

            $('#mattress_buying_guide_desktop_main_container').height(overlayHeight);
            targetOverlay.show();

        } else {

            if ($('.mattress_buying_guide_desktop_overlay').is(":visible")) {
                $('.mattress_buying_guide_desktop_overlay').hide();
                $('#mattress_buying_guide_desktop_main_container').height('auto');
            }

            $('#' + namespace.projectGlobalPrefix + deviceView + hash).siblings().hide();
            $('#' + namespace.projectGlobalPrefix + deviceView + hash).fadeIn();

            if (namespace.state.isDesktop) {
                $('#' + namespace.projectGlobalPrefix + '_desktop_nav > ul > li > a').removeClass('active');
                $('#' + namespace.projectGlobalPrefix + '_desktop_nav_' + hash).addClass('active');
            } else {
                $('#mattress_buying_guide_mobile_nav_section_name').html($('#mattress_buying_guide_mobile_nav_' + hash).html());
                if ($('#' + namespace.projectGlobalPrefix + deviceView + hash).data('mobile-footer') === 'yes') {
                    $('#mattress_buying_guide_mobile_footer').fadeIn();
                } else {
                    $('#mattress_buying_guide_mobile_footer').fadeOut();
                }
            }

            if (hash !== '' && hash !== 'quiz') {
                coreMetrics("Pageview", namespace.coremetrics.replace("MBL:", ""), namespace.coremetrics.replace("MBL:", "") + "--" + ( hash === 'buying_guide' ? 'hp' : hash ));
            }
            if (hash.indexOf('quiz') >= 0) {
                quizView(deviceView);
            }
        }
        if ($('#' + namespace.projectGlobalPrefix + deviceView + 'nav').css('position') === 'fixed') {
            $("html, body").animate({scrollTop: $('#' + namespace.projectGlobalPrefix + deviceView + 'nav_placeholder').offset().top}, "slow");
        }

    }

    function quizView(deviceView) {

        var hash = window.location.hash,
            step = (hash.match(/\//g) || []).length;

        if (step === 0) {
            $('#mattress_buying_guide_quiz' + deviceView + '01').siblings().hide();
            $('#mattress_buying_guide_quiz' + deviceView + '01').fadeIn();

            coreMetrics("Pageview", namespace.coremetrics.replace("MBL:", ""), namespace.coremetrics.replace("MBL:", "") + "--find_your_mattress_size");
        } else if (step === 1) {
            $('#mattress_buying_guide_quiz' + deviceView + '02').siblings().hide();
            $('#mattress_buying_guide_quiz' + deviceView + '02').fadeIn();

            coreMetrics("Pageview", namespace.coremetrics.replace("MBL:", ""), namespace.coremetrics.replace("MBL:", "") + "--find_your_mattress_comfort_level");
        } else if (step === 2) {
            $('#mattress_buying_guide_quiz' + deviceView + '03').siblings().hide();
            $('#mattress_buying_guide_quiz' + deviceView + '03').fadeIn();

            var firstChoiceIndex = hash.indexOf('/'),
                secondChoiceIndex = hash.indexOf('/', firstChoiceIndex + 1),
                firstChoice = hash.substring(firstChoiceIndex + 1, secondChoiceIndex),
                secondChoice = hash.substring(secondChoiceIndex + 1);

            $('.quiz_last_step').each(function () {
                var stepId = this.id.replace('mattress_buying_guide_quiz' + deviceView, ''),
                    urlIndex = stepId + '-' + secondChoice + '-' + firstChoice,
                    choicesUrl = namespace.quizUrls[urlIndex];

                $(this).removeClass('mattress_buying_guide_choice_selected');
                if (choicesUrl === '' || !choicesUrl) {
                    $(this).addClass('mattress_buying_guide_inactive_link');
                    this.href = hash;
                } else {
                    $(this).removeClass('mattress_buying_guide_inactive_link');
                    this.href = choicesUrl;
                }

            });

            coreMetrics("Pageview", namespace.coremetrics.replace("MBL:", ""), namespace.coremetrics.replace("MBL:", "") + "--find_your_mattress_style");
        }

    }

    $('.quiz_step').on('click', function (event) {
        event.preventDefault();
        var choice = $(this).data('choice');
        window.location.hash += '/' + choice;
    });

    $('.quiz_last_step').on('click', function () {

        if (namespace.state.isDesktop) {
            var thisLink = $(this);
            if (!thisLink.hasClass('mattress_buying_guide_inactive_link')) {
                thisLink.addClass('mattress_buying_guide_choice_selected').siblings().removeClass('mattress_buying_guide_choice_selected');
            }
        }
    });

    $('mattress_buying_guide_inactive_link').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
    });


    $(window).scroll(function () {
        if (namespace.state.isDesktop) {
            stickyNav();
            //  floatingGrasphic();
        } else {
            updateMobileStickyNavPosition();
            // mobileSectionCoreMetrics();
        }
    });

    // Guide Logic

});
