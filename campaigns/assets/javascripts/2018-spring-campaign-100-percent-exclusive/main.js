$(function () {

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
    
    $( window ).load(function() {
        $.fn.coreTag('Pageview', thisCategoryID + '--teaser');
        $('[coremetricTag]').click(function () {
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

    initCoreMetrics();

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




    // Hero img and nintendo img width sync
    var heroImg = $('.tsr-18-hero-img');
    var nintendoImg = $('.tsr-18-nintendo-img');
    var heroImgOnMobilePart = $('.tsr-18-hero-mobile-part-img');

    // set heroImgWidth before heroImg is loaded
    // originalHeroWidth/originalHeroHeight = .9504;
    // var heroImgWidth = $('.tsr-18-container__section-left').height() * .9504;

    var nintendoImgLeftGap = 40;
    var nintendoImgLeftPos = 0;

    var heroImgWidth = heroImg.width();
    var heroImgLeft  = heroImg.offset().left;

    var heroImgOnMobilePartTop = -(heroImgOnMobilePart.height() - 4);

    heroImgOnMobilePart.css({'top': heroImgOnMobilePartTop  + 'px'});
    heroImg.one("load", function() {
        //alert('heroImg is loaded!');
        heroImgWidth = heroImg.width();
        heroImgLeft  = heroImg.offset().left;
        
        if (heroImgLeft > 0) {
            nintendoImgLeftPos = Math.abs(heroImgLeft) + nintendoImgLeftGap;
        } else {
            nintendoImgLeftPos = 0
        }

        setTimeout(function () {
            nintendoImg.css({'width': heroImgWidth + 'px', 'left': nintendoImgLeftPos + 'px'});
            heroImgOnMobilePart.css({'width': heroImgWidth + 'px', 'top': heroImgOnMobilePartTop  + 'px'});
        }, 400);
        

    }).each(function () {
        if (this.complete) {
            $(this).load();
        }
    });
    
    
    
    
    window.addEventListener("resize", function() {
        heroImgWidth = heroImg.width();
        heroImgOnMobilePartTop = -(heroImgOnMobilePart.height() - 4);

        heroImgLeft = heroImg.offset().left;

        if (heroImgLeft > 0) {
            nintendoImgLeftPos = Math.abs(heroImgLeft) + nintendoImgLeftGap;
        } else {
            nintendoImgLeftPos = 0
        }
        
        nintendoImg.css({'width': heroImgWidth + 'px', 'left': nintendoImgLeftPos + 'px'});
        heroImgOnMobilePart.css({'width': heroImgWidth + 'px', 'top': heroImgOnMobilePartTop  + 'px'});

    }, false);

});

