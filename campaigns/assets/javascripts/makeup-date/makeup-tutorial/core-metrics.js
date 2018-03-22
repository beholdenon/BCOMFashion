'use strict';

(function() {


    $( "html" ).attr({
        lang: "en"
    });

    var hasMBL = (isDevice2() ? "mbl:" : "");

    function isDevice2 () {
        return ( window.innerWidth <= 600 );
    }

    $( window ).load(function() {

        var pageID = 'spring18_makeupdate',
            catID =  'xx-xx-xx-xx',
            attr = '';

        //populate the Globals ns
        window.Globals.Coremetrics.pageID = pageID;
        window.Globals.Coremetrics.catID = catID;

        if (window.BLOOMIES && window.BLOOMIES.coremetrics) {

            if ($(window).width() < 980 && window.Globals.deviceType !== 'mobile'){
                attr = 'Desktop Minimized';
            }
            window.Globals.Coremetrics.attr42 = attr;
        }


        $.fn.coreTag('Pageview', 'spring18_makeupdate' );

        $('[coremetricTag]').on('click tap', 'a', function(event) {


            var id;

            if ( $(this).attr('data-id') ) {


                //Coremetrics for product scroll (carousel)

                id = "-_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_--_-" + $(this).attr('data-id');
                $.fn.coreTag('Element', 'product-scroll', id);


            } else {


                // Not product scroll (carousel) links

                $.fn.coreTag('Element', $( this ).attr("coremetricTag"));
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

    $.fn.coreTag = function(tagType, elementID, id) {

        console.log(tagType);
        console.log(elementID);
        console.log(id);

        var thisCategoryID = "spring18_makeupdate";

        if (tagType === 'Pageview') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageviewTag(hasMBL+elementID, hasMBL+thisCategoryID, '', '');
            } catch (e) {
                $.fn.trace('CoreM_err: ' + e);
            }
            $.fn.trace('###### CoreM Pageview; thisCategoryID: ' +hasMBL + thisCategoryID + '; elementID: ' +hasMBL+ elementID);
        } else if (tagType === 'Element') {
            try {
                window.BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL + elementID.substring(0, 49), hasMBL+thisCategoryID, id);
            } catch (e) {
                $.fn.trace('CoreM_err: ' + e);
            }
            $.fn.trace('###### CoreM Element; thisCategoryID: ' + hasMBL+ thisCategoryID + '; elementID: ' +hasMBL+ elementID.substring(0, 49));
        }
    };

    $.fn.trace = function(log) {
        if (window.location.href.indexOf('www.bloomingdales.com') < 0) {
            window.console.info(log);
        }
    };

})();
