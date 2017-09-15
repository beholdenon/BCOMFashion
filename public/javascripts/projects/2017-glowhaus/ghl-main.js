/* jshint ignore:start */

(function($){
    'use strict';

    $.fn.extend({
        renameAttr: function (name, newName, removeData) {
            var val;
            return this.each(function () {
                val = jQuery.attr(this, name);
                jQuery.attr(this, newName, val);
                jQuery.removeAttr(this, name);
                // remove original data
                if (removeData !== false) {
                    jQuery.removeData(this, name.replace('data-', ''));
                }
            });
        }
    });

    /*
    $.fn.shuffle = function() {

        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
            });

        this.each(function(i){
            //console.log(i);
            $(this).replaceWith($(shuffled[i]));
        });

        return $(shuffled);

    };
    */
    
})(jQuery);


$(function() {
    'use strict';
    
    // ----------- Mobile nav switcher
    
    var mainContainer = $('.glh');
    var viewportWidth = $(window).width();
    $('#m-nav-switcher').on('click', function () {
        mainContainer.toggleClass('glh-m-nav-is-open');
    });
    $(window).resize(function() {
        if(viewportWidth >= 767){
            mainContainer.removeClass('glh-m-nav-is-open');
        }
    });

    
    
    // ----------- Landing page tile
    
    var landingPagePics = [
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing1-thumb.jpg',   'height': 377},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing2-thumb.jpg',   'height': 199},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing3-thumb.jpg',   'height': 288},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing4-thumb.jpg',   'height': 250},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing5-thumb.jpg',   'height': 340},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing6-thumb.jpg',   'height': 420},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing7-thumb.jpg',   'height': 250},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing8-thumb.jpg',   'height': 289},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing9-thumb.jpg',   'height': 235},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing10-thumb.jpg',  'height': 420},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing11-thumb.jpg',  'height': 362},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing12-thumb.jpg',  'height': 187},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing13-thumb.jpg',  'height': 182},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing14-thumb.jpg',  'height': 187},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing15-thumb.jpg',  'height': 363},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing16-thumb.jpg',  'height': 161},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing17-thumb.jpg',  'height': 420},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing18-thumb.jpg',  'height': 200},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing19-thumb.jpg',  'height': 246},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing20-thumb.jpg',  'height': 420},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing21-thumb.jpg',  'height': 204},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing22-thumb.jpg',  'height': 187},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing23-thumb.jpg',  'height': 272},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing24-thumb.jpg',  'height': 277},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing25-thumb.jpg',  'height': 216},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing26-thumb.jpg',  'height': 420},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing27-thumb.jpg',  'height': 194},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing28-thumb.jpg',  'height': 420},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing29-thumb.jpg',  'height': 117},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing30-thumb.jpg',  'height': 243},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing31-thumb.jpg',  'height': 250},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing32-thumb.jpg',  'height': 144},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing33-thumb.jpg',  'height': 420},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing34-thumb.jpg',  'height': 293},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing35-thumb.jpg',  'height': 187},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing36-thumb.jpg',  'height': 138},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing37-thumb.jpg',  'height': 405},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing38-thumb.jpg',  'height': 288},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing39-thumb.jpg',  'height': 231},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing40-thumb.jpg',  'height': 124},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing41-thumb.jpg',  'height': 348},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing42-thumb.jpg',  'height': 149},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing43-thumb.jpg',  'height': 280},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing44-thumb.jpg',  'height': 187},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing45-thumb.jpg',  'height': 310},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing46-thumb.jpg',  'height': 334},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing47-thumb.jpg',  'height': 187},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing48-thumb.jpg',  'height': 187},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing49-thumb.jpg',  'height': 270},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing50-thumb.jpg',  'height': 208},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing51-thumb.jpg',  'height': 420},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing52-thumb.jpg',  'height': 331},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing53-thumb.jpg',  'height': 195},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing54-thumb.jpg',  'height': 183},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing55-thumb.jpg',  'height': 254},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing56-thumb.jpg',  'height': 379},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing57-thumb.jpg',  'height': 285},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing58-thumb.jpg',  'height': 389},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing59-thumb.jpg',  'height': 299},
        {'type': 'img',  'action': 'img-popup',   'thumb': 'landing60-thumb.jpg',  'height': 103},


        {'type': 'img',  'action': 'html-video-popup',   'href': 'landing-html-video-popup.html?name=MetallicLips', 'thumb': 'video-01.jpg',  'height': 222},
        {'type': 'img',  'action': 'html-video-popup',   'href': 'landing-html-video-popup.html?name=AllOverHighlighter', 'thumb': 'video-02.jpg',  'height': 222},
        {'type': 'img',  'action': 'html-video-popup',   'href': 'landing-html-video-popup.html?name=MetallicLips', 'thumb': 'video-03.jpg',  'height': 222},
        {'type': 'img',  'action': 'html-video-popup',   'href': 'landing-html-video-popup.html?name=AllOverHighlighter', 'thumb': 'video-04.jpg',  'height': 222},
        {'type': 'img',  'action': 'html-video-popup',   'href': 'landing-html-video-popup.html?name=MetallicLips', 'thumb': 'video-05.jpg',  'height': 222},
        {'type': 'img',  'action': 'html-video-popup',   'href': 'landing-html-video-popup.html?name=AllOverHighlighter', 'thumb': 'video-06.jpg',  'height': 222},


        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-01.jpg',  'height': 127},
        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-02.jpg',  'height': 139},
        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-03.jpg',  'height': 85},
        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-04.jpg',  'height': 129},
        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-05.jpg',  'height': 174},
        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-06.jpg',  'height': 68},
        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-07.jpg',  'height': 119},
        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-08.jpg',  'height': 93},
        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-09.jpg',  'height': 173},
        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-10.jpg',  'height': 64},
        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-11.jpg',  'height': 171},
        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-12.jpg',  'height': 171},
        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-13.jpg',  'height': 162},
        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-14.jpg',  'height': 66},
        {'type': 'img',  'action': 'html-brand-popup',   'href': 'html-video-5573554980001.html', 'thumb': 'brand-15.jpg',  'height': 117},


        {'type':  'deco',  'thumb': 'deco-01.jpg',   'height': 146},
        {'type':  'deco',  'thumb': 'deco-02.jpg',   'height': 211},
        {'type':  'deco',  'thumb': 'deco-03.jpg',   'height': 90},
        {'type':  'deco',  'thumb': 'deco-04.jpg',   'height': 85},
        {'type':  'deco',  'thumb': 'deco-05.jpg',   'height': 311},
        {'type':  'deco',  'thumb': 'deco-06.jpg',   'height': 168},
        {'type':  'deco',  'thumb': 'deco-07.jpg',   'height': 94},
        {'type':  'deco',  'thumb': 'deco-08.jpg',   'height': 94},
        {'type':  'deco',  'thumb': 'deco-09.jpg',   'height': 177},
        {'type':  'deco',  'thumb': 'deco-10.jpg',   'height': 211},
        {'type':  'deco',  'thumb': 'deco-11.jpg',   'height': 80},
        {'type':  'deco',  'thumb': 'deco-12.jpg',   'height': 125},
        {'type':  'deco',  'thumb': 'deco-13.jpg',   'height': 168},
        {'type':  'deco',  'thumb': 'deco-14.jpg',   'height': 55},
        {'type':  'deco',  'thumb': 'deco-15.jpg',   'height': 183},
        {'type':  'deco',  'thumb': 'deco-16.jpg',   'height': 92},
        {'type':  'deco',  'thumb': 'deco-17.jpg',   'height': 60},
        {'type':  'deco',  'thumb': 'deco-18.jpg',   'height': 171},

        {'type':  'video',  'thumb': 'Glowhaus_gif1.mp4',   'height': 162},
        {'type':  'video',  'thumb': 'Glowhaus_gif2.mp4',   'height': 280},
        {'type':  'video',  'thumb': 'Glowhaus_gif3.mp4',   'height': 280},
        {'type':  'video',  'thumb': 'Glowhaus_gif4.mp4',   'height': 280},
        {'type':  'video',  'thumb': 'Glowhaus_gif5.mp4',   'height': 280},
        {'type':  'video',  'thumb': 'Glowhaus_gif6.mp4',   'height': 162},
        {'type':  'video',  'thumb': 'Glowhaus_gif7.mp4',   'height': 280},
        {'type':  'video',  'thumb': 'Glowhaus_gif8.mp4',   'height': 280},
        {'type':  'video',  'thumb': 'Glowhaus_gif9.mp4',   'height': 162},
        {'type':  'video',  'thumb': 'Glowhaus_gif10.mp4',  'height': 280},
        {'type':  'video',  'thumb': 'Glowhaus_gif11.mp4',  'height': 162},
        {'type':  'video',  'thumb': 'Glowhaus_gif12.mp4',  'height': 280},
        {'type':  'video',  'thumb': 'Glowhaus_gif13.mp4',  'height': 280},
        {'type':  'video',  'thumb': 'Glowhaus_gif14.mp4',  'height': 280},
        {'type':  'video',  'thumb': 'Glowhaus_gif15.mp4',  'height': 280},
        {'type':  'video',  'thumb': 'Glowhaus_gif16.mp4',  'height': 280},
        {'type':  'video',  'thumb': 'Glowhaus_gif17.mp4',  'height': 280},
        {'type':  'video',  'thumb': 'Glowhaus_gif18.mp4',  'height': 162}

    ];

    var videoPagePopups = {

        'MetallicLips': {
            'heading': 'Metallic Lips',
            'videoID': '5573558771001',
            'productslist': [
                {
                    'thumbUrl': 'https://placeholdit.co//i/250x310?bg=c9c9c9?text=THUMB-1',
                    'title': 'Rouge Bunny Rouge',
                    'description': 'Long-Lasting Lip Pencil in Marco',
                    'link': 'https://www.google.com'
                },
                {
                    'thumbUrl': 'https://placeholdit.co//i/250x310?bg=c9c9c9?text=THUMB-2',
                    'title': 'Lime Crime',
                    'description': 'Matte Velvetines in Marshmallow',
                    'link': 'https://www.google.com'
                },
                {
                    'thumbUrl': 'https://placeholdit.co//i/250x310?bg=c9c9c9?text=THUMB-3',
                    'title': 'Lime Crime',
                    'description': 'Diamond Crushers in Choke',
                    'link': 'https://www.google.com'
                }
            ]
        },
        'AllOverHighlighter': {
            'heading': 'All-Over Highlighter',
            'videoID': '5573562723001',
            'productslist': [
                {
                    'thumbUrl': 'https://placeholdit.co//i/250x310?bg=c9cf09?text=THUMB-1',
                    'title': 'Lime Crime',
                    'description': 'Hi-Lite Palette in Blossoms',
                    'link': 'https://www.google.com'
                },
                {
                    'thumbUrl': 'https://placeholdit.co//i/250x310?bg=f0c9c9?text=THUMB-2',
                    'title': 'Lash Star Beauty',
                    'description': 'Flash of Brilliance Skin Illuminator in Phosphorescence',
                    'link': 'https://www.google.com'
                },
                {
                    'thumbUrl': 'https://placeholdit.co//i/250x310?bg=c9c9c9?text=THUMB-3',
                    'title': 'COVER FX',
                    'description': 'Custom Enhancer Drops in Candlelight',
                    'link': 'https://www.google.com'
                },
                {
                    'thumbUrl': 'https://placeholdit.co//i/250x310?bg=c9c9f0?text=THUMB-3',
                    'title': 'MakeupDrop',
                    'description': 'Silicone Makeup Applicator',
                    'link': 'https://www.google.com'
                }
            ]
        }

    };
    
    //var black = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    //var transparent = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    //var gray = 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

    var imagePlaceHolder     = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // transparent
    var imgThumbsDir         = '/b/fashion/images/projects/2017-glowhaus/landing/thumbs/';
    var imgFullSizeDir       = '/b/fashion/images/projects/2017-glowhaus/landing/fullsize-img/';
    var landingHTMLPopupsDir = '/b/fashion/images/projects/2017-glowhaus/landing/html-popups/';

    var tileList             = $('ul#glh-images-tile');
    var defaultThumbWidth    = 280;

    // remove/clear all list elements
    tileList.empty();
    shuffleArray(landingPagePics);
    
    $.each(landingPagePics, function (i) {

        var tileItem       = landingPagePics[i];
        var media          = tileItem.type;
        var originalHeight = tileItem.height; 
        var fullSizeImg    = imgFullSizeDir + tileItem.thumb.replace('-thumb','');
        var thumbImg       = imgThumbsDir + tileItem.thumb;
        var typeOfAction   = tileItem.action;

        var setImgHeight = function(item) {
            var value = originalHeight * (item.width() / defaultThumbWidth);
            item.find('img').css('height', value);
            item.find('video').css('height', value);
        };

        var imgItem, videoItem = '';
        
        if (media === 'img') {
            if (typeOfAction === 'img-popup') {
                imgItem = $('<li><a class="image-popup-link" href="' + fullSizeImg +
                    '"><img data-width="' + defaultThumbWidth +
                    '" data-height="' + originalHeight +
                    '" data-tmp-src="' + thumbImg +
                    '" src="' + imagePlaceHolder + '"></a></li>')
                    .appendTo(tileList);
                setImgHeight(imgItem);
            } else if (typeOfAction === 'html-video-popup') {
                imgItem = $('<li><a class="html-video-popup" href="' + landingHTMLPopupsDir + tileItem.href +
                    '"><img data-width="' + defaultThumbWidth +
                    '" data-height="' + originalHeight +
                    '" data-tmp-src="' + thumbImg +
                    '" src="' + imagePlaceHolder + '"></a></li>')
                    .appendTo(tileList);
                setImgHeight(imgItem);
            }else if (typeOfAction === 'html-brand-popup') {
                imgItem = $('<li><a class="html-video-popup no-play-btn" href="' + landingHTMLPopupsDir + tileItem.href +
                    '"><img data-width="' + defaultThumbWidth +
                    '" data-height="' + originalHeight +
                    '" data-tmp-src="' + thumbImg +
                    '" src="' + imagePlaceHolder + '"></a></li>')
                    .appendTo(tileList);
                setImgHeight(imgItem);
            }
        } else if (media === 'video') {
            videoItem = $('<li class="glh-masonry-item__video-thumb"><video preload autoplay playsinline loop data-width="' + defaultThumbWidth +
                '" data-height="' + originalHeight +
                '" data-tmp-src="' + thumbImg +
                '" src="' + imagePlaceHolder + '"></video></li>')
                .appendTo(tileList);
            setImgHeight(videoItem);
        } else if (media === 'deco') {
            imgItem = $('<li class="glh-masonry-item__deco-item"><img data-width="' + defaultThumbWidth +
                '" data-height="' + originalHeight +
                '" data-tmp-src="' + thumbImg +
                '" src="' + imagePlaceHolder + '"></li>')
                .appendTo(tileList);
            setImgHeight(imgItem);
        }
    });


    $(window).resize(function () {
        $('ul#glh-images-tile li img, ul#glh-images-tile li video').each(function () {
            $(this).css('height', $(this).attr('data-height') * $('ul#glh-images-tile li').width() / $(this).attr('data-width'));
        });
    });


    $('ul#glh-images-tile li img').each(function () {
        var img = $(this);
        var rand = randomNumberFromRange(100, 600);
        setTimeout(function () {
            img.renameAttr('data-tmp-src', 'data-src');
            img.on('lazyload', function () {
                $(this).addClass('animated fadeInUp');
            }).lazyLoadXT();
        }, rand * 10);
    });

    $('ul#glh-images-tile li video').each(function () {
        var video = $(this);
        var rand = randomNumberFromRange(100, 600);
        setTimeout(function () {
            video.renameAttr('data-tmp-src', 'data-src');
            video.lazyLoadXT();
            video.addClass('animated fadeInUp');
        }, rand * 10);
    });
    
    // Prevent Default click action for all links 
    $('ul#glh-images-tile li a').each(function () {
        $(this).click(function (event) {
            event.preventDefault();
        });
    });


    function randomNumberFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 10) + min);
    }

    function shuffleArray(array) {
        var counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            var index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            var temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

    /* ----------------------------------------- IMAGE POPUP ------------------------------------------------------*/

    $('.image-popup-link').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom',
        closeOnContentClick: true,
        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it
            duration: 300,
            easing: 'ease-in-out',

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function (openerElement) {
                // openerElement is the element on which popup was initialized, in this case its <a> tag
                // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });

    /* ----------------------------------------- VIDEO POPUP ------------------------------------------------------*/

    function openVideoPopUp(markup, selector) {
        $.magnificPopup.open({
            items: {
                src: markup,
                type: 'inline'
            },
            closeBtnInside: true,
            closeOnBgClick: true,

            removalDelay: 300,
            mainClass: 'mfp-fade',

            callbacks: {
                beforeOpen: function () {
                    //this.st.mainClass = 'mfp-move-from-top';
                },
                open: function () {
                    //player setup and options
                    //var instances = plyr.setup(document.querySelector('.glh-video-in-popup'), {
                    var instances = plyr.setup(document.querySelector('.' + selector + ''), {
                        //debug: true,
                        //title:              'Video demo',
                        iconUrl: '/b/fashion/images/projects/2017-glowhaus/assets/plyr.svg',
                        tooltips: {
                            controls: true
                        },
                        captions: {
                            defaultActive: true
                        }
                    });

                }
            }
        });
    }

    /*
    // Homepage video popups
    var homePagePopupPlayerLink = $('.video-popup-link');

    var popupVideoPoster = '';
    var popupVideoSrc = '';
    var popupVideoCaptions = '';
    var trackTag = '';

    homePagePopupPlayerLink.on('click', function (e) {
        e.preventDefault();
        var _link = $(this);
        popupVideoPoster = _link.attr('data-popup-video-poster');
        popupVideoSrc = _link.attr('data-popup-video-src');
        popupVideoCaptions = _link.attr('data-popup-video-captions');

        if (popupVideoCaptions != undefined) {
            trackTag = '<track kind="captions" label="English" srclang="en" src="' + popupVideoCaptions + '" default>';
        } else {
            trackTag = '';
        }

        var popupMarkup = '<div class="glh-video-popup-container">' +
            '<video class="glh-video-in-popup" poster="' + popupVideoPoster + '" controls crossorigin>' +
            '<!-- Video files -->' +
            '<source src="' + popupVideoSrc + '" type="video/mp4">' +
            '<!-- Text track file -->' + trackTag +
            '<!-- Fallback for browsers that dont support the <video> element --> ' +
            '<a href="' + popupVideoSrc + '" download>Download</a>' +
            '</video>' +
            '</div>';

        openVideoPopUp(popupMarkup, _link.attr('class'));
        
        
    });
*/
    
    // Videos-Page video popups
    var videosPagePopupPlayerLink = $('.glh-videos-list-item');

    videosPagePopupPlayerLink.each(function () {
        var thisLink = $(this);
        var thisVideoID = thisLink.attr('data-video-id');
        var img = $(this).find('img');

        SERVICES.brightCove.video_data(function (data) {
            
            var videos = data.sources;
            var videoPosterSrc = data.poster;

            img.attr('data-src', videoPosterSrc);
            img.on('lazyload', function () {
                $(this).css('visibility', 'visible').addClass('animated fadeInUp');
            }).lazyLoadXT();

            thisLink.on('click', function (e) {
                e.preventDefault();
                
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

                // /*
                var videoPopupMarkup = '<div class="glh-video-popup-container">' +
                    '<video class="glh-video-in-popup" poster="' + videoPosterSrc + '" controls crossorigin>' +
                    '<!-- Video files -->' +
                    '<source src="' + finalVideosData[0].src + '" type="video/mp4">' +
                    //'<!-- Text track file -->' + trackTag +
                    '<!-- Fallback for browsers that dont support the <video> element --> ' +
                    '<a href="' + finalVideosData[0].src + '" download>Download</a>' +
                    '</video>' +
                    '</div>';

                openVideoPopUp(videoPopupMarkup, thisLink.attr('class'));


            });

        }, thisVideoID);
    });
    
    /* ----------------------------------------- AJAX HTML PAGE ------------------------------------------------------*/

    // popup at learn/bramds page
    $('.ajax-popup-link').magnificPopup({
        type: 'ajax',
        // Delay in milliseconds before popup is removed
        removalDelay: 300,

        // Class that is added to popup wrapper and background
        // make it unique to apply your CSS animations just to this exact popup
        mainClass: 'mfp-fade',
        callbacks: {
            parseAjax: function (mfpResponse) {
                // mfpResponse.data is a "data" object from ajax "success" callback
                // for simple HTML file, it will be just String
                // You may modify it to change contents of the popup
                // For example, to show just #some-element:
                // mfpResponse.data = $(mfpResponse.data).find('#some-element');

                // mfpResponse.data must be a String or a DOM (jQuery) element

                ///console.log('Ajax content loaded:', mfpResponse);
            },
            ajaxContentAdded: function () {
                // Ajax content is loaded and appended to DOM
                if ($('.glh-video-in-popup').length ) {
                    var instances = plyr.setup(document.querySelector('.glh-video-in-popup'), {
                        //debug: true,
                        //title:              'Video demo',
                        iconUrl: '/b/fashion/images/projects/2017-glowhaus/assets/plyr.svg',
                        tooltips: {
                            controls: true
                        },
                        captions: {
                            defaultActive: true
                        }
                    });
                }
            }
        }
    });



    var getParameterByName = function (paramName, url) {
        //if (!url) url = window.location.href;
        paramName = paramName.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    var pageToOpen = '';

    // Landing page video-popup
    $('.html-video-popup').magnificPopup({
        type: 'ajax',
        // Delay in milliseconds before popup is removed
        removalDelay: 300,

        // Class that is added to popup wrapper and background
        // make it unique to apply your CSS animations just to this exact popup
        mainClass: 'mfp-fade',
        callbacks: {
            beforeOpen: function() {
                pageToOpen  = getParameterByName('name', this.st.el.attr('href'));
                //console.log(pageToOpen);
                //console.log(videoPagePopups[pageToOpen]);
            },
            parseAjax: function (mfpResponse) {
                // mfpResponse.data is a "data" object from ajax "success" callback
                // for simple HTML file, it will be just String
                // You may modify it to change contents of the popup
                // For example, to show just #some-element:
                // mfpResponse.data = $(mfpResponse.data).find('#some-element');

                // mfpResponse.data must be a String or a DOM (jQuery) element

                ///console.log('Ajax content loaded:', mfpResponse);

                
            },
            ajaxContentAdded: function () {
                // Ajax content is loaded and appended to DOM

                //Video page – heading
                $('.glh-popup__brand-heading').text(videoPagePopups[pageToOpen].heading);
                
                //Video page – product's list
                var prodList = videoPagePopups[pageToOpen].productslist;
                $('.ghl-thumbs-links-list').empty();
                $.each( prodList, function(item) {
                    $('.ghl-thumbs-links-list').append('<li><a href="' + prodList[item].link + '">' +
                        '<img src="' + prodList[item].thumbUrl + '">' +
                        '<h5>' + prodList[item].title + '</h5>' +
                        '<p>' + prodList[item].description + '</p></a></li>');
                });

                //Video page – video markup
                var thisVideoID = videoPagePopups[pageToOpen].videoID;

                SERVICES.brightCove.video_data(function (data) {

                    var videos = data.sources;
                    var videoPosterSrc = data.poster;
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

                    var videoMarkup = '<video class="glh-video" poster="' + videoPosterSrc + '" controls crossorigin>' +
                        '<!-- Video files -->' +
                        '<source src="' + finalVideosData[0].src + '" type="video/mp4">' +
                        //'<!-- Text track file -->' + trackTag +
                        '<!-- Fallback for browsers that dont support the <video> element --> ' +
                        '<a href="' + finalVideosData[0].src + '" download>Download</a></video>';
                    
                    $('.glh-popup__video-container').append(videoMarkup);
                    
                    var instances = plyr.setup(document.querySelector('.glh-video'), {
                        //debug: true,
                        //title:              'Video demo',
                        iconUrl: '/b/fashion/images/projects/2017-glowhaus/assets/plyr.svg',
                        tooltips: {
                            controls: true
                        },
                        captions: {
                            defaultActive: true
                        }
                    });

                }, thisVideoID);

                /*

                if ($('.glh-video-in-popup').length ) {
                    var instances = plyr.setup(document.querySelector('.glh-video-in-popup'), {
                        //debug: true,
                        //title:              'Video demo',
                        iconUrl: '/b/fashion/images/projects/2017-glowhaus/assets/plyr.svg',
                        tooltips: {
                            controls: true
                        },
                        captions: {
                            defaultActive: true
                        }
                    });
                }

                */
            }
        }
    });

    /* --------- Learn page popups ---------*/

    var pathToLeanPagePopupsDir = '/b/fashion/images/projects/2017-glowhaus/learn/html-popups/';
    $('.glh-learn-list-item').each(function () {
        var _link = $(this);
        var _href = _link.attr('href');
        _link.attr('href', pathToLeanPagePopupsDir + _href);
    });


});
