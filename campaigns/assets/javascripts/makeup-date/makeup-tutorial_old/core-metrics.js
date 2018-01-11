'use strict';

(function() {


    $( "html" ).attr({
        lang: "en"
    });

    var hasMBL = (isDevice2() ? "mbl:" : "");

    function isDevice2 () {
        return ( window.innerWidth <= 600 );
    }

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


    $( window ).load(function() {


        $.fn.coreTag('Pageview', 'holiday17_makeupdate' );

        $('[coremetricTag]').on('click tap', 'a', function(event) {

            var id;

            if ( $(this).attr('data-id') ) {
                //Coremetrics for product scroll (carousel)

                id = "-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-" + $(this).attr('data-id');
                $.fn.coreTag('Element', 'product-scroll', id);


            } else {
                // Not product scroll (carousel) links
                $.fn.coreTag('Element', $( this ).attr( "coremetricTag" ));
            }


        });


        var cmSectionsTriggered = [];
        $(window).scroll(function() {
            $.each($('.section'), function(){
                var hT = $(this).offset().top,
                    hH = $(this).outerHeight(),
                    wH = $(window).height(),
                    wS = $(window).scrollTop();


                if (wS > ((hT-wH))){

                    if(cmSectionsTriggered.indexOf(this) == -1){
                        $.fn.coreTag('Element', $( this ).attr( "coremetricTag" ));
                        cmSectionsTriggered.push(this);
                    }

                }
            });
        });

    });

    $.fn.coreTag = function(tagType, pageID, id) {

        console.log(tagType);
        console.log(pageID);
        console.log(id);

        var thisCategoryID = "holiday17_makeupdate";

        if (tagType === 'Pageview') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(hasMBL+pageID, hasMBL+thisCategoryID, '', '');
            } catch (e) {
                $.fn.trace('CoreM_err: ' + e);
            }
            $.fn.trace('###### CoreM Pageview; thisCategoryID: ' +hasMBL + thisCategoryID + '; pageID: ' +hasMBL+ pageID);
        } else if (tagType === 'Element') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL + pageID.substring(0, 49), hasMBL+thisCategoryID, id);
            } catch (e) {
                $.fn.trace('CoreM_err: ' + e);
            }
            $.fn.trace('###### CoreM Element; thisCategoryID: ' + hasMBL+ thisCategoryID + '; pageID: ' +hasMBL+ pageID.substring(0, 49));
        }
    };

    $.fn.trace = function(log) {
        if (window.location.href.indexOf('www.bloomingdales.com') < 0) {
            window.console.info(log);
        }
    };

    initCoreMetrics();

    function setEnvironment() {
        if (window.Globals.env === 'dev') {
            return cmSetTest(); // jshint ignore:line
        } else if (window.Globals.env === 'production') {
            if (window.location.host === 'www.bloomingdales.com'){
                return cmSetProduction(); // jshint ignore:line
            } else {
                return cmSetTest(); // jshint ignore:line
            }
        } else {
            throw 'ERROR: unidentified env variable';
        }
    }

    function initCoreMetrics(categoryID) {
        window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();

        var pageID = 'holiday17_makeupdate',
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

})();
