/* globals SERVICES */

$( window ).load(function() {

//===============================================================================================================//
//===============================================================================================================//

	'use strict';

	$.fn.coreTag('Pageview', 'fall16_100percent--video');

    $('#hundredpercentvideo').on('play', function () { 
        $.fn.coreTag('Element', "video-play");
    });
    $('#hundredpercentvideo').on('pause', function () {
        $.fn.coreTag('Element', "video-pause");
    });
    $('#hundredpercentvideo').on('ended', function () {
        $.fn.coreTag('Element', "video-ended");
    });


    var tar = $("#hundredpercentvideo"),
        id = tar.attr('data-id');
    
    SERVICES.brightCove.getURL( function(res) {
        tar.attr('src', res);
    }, id);



   
});

