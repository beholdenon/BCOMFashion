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


        {'type': 'img',  'action': 'html-video-popup',   'name': 'MetallicLips',        'thumb': 'video-1.jpg',  'height': 222},
        {'type': 'img',  'action': 'html-video-popup',   'name': 'AllOverHighlighter',  'thumb': 'video-2.jpg',  'height': 222},
        {'type': 'img',  'action': 'html-video-popup',   'name': 'NoMakeupMakeup',      'thumb': 'video-3.jpg',  'height': 222},
        {'type': 'img',  'action': 'html-video-popup',   'name': 'UltimateSkinPrep',    'thumb': 'video-4.jpg',  'height': 222},
        {'type': 'img',  'action': 'html-video-popup',   'name': 'UnicornEyes',         'thumb': 'video-5.jpg',  'height': 222},
        {'type': 'img',  'action': 'html-video-popup',   'name': 'CoolLinerLooks',      'thumb': 'video-6.jpg',  'height': 222},


        {'type': 'img',  'action': 'html-brand-popup',   'name': 'FLiRT Cosmetics',    'thumb': 'brand-01.jpg',  'height': 127},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'beautyblender',      'thumb': 'brand-02.jpg',  'height': 139},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'NUDESTIX',           'thumb': 'brand-03.jpg',  'height': 85},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'RMS Beauty',         'thumb': 'brand-04.jpg',  'height': 129},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'Lit Cosmetics',      'thumb': 'brand-05.jpg',  'height': 174},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'winkylux',           'thumb': 'brand-06.jpg',  'height': 68},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'SUVA Beauty',        'thumb': 'brand-07.jpg',  'height': 119},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'The Vamp Stamp',     'thumb': 'brand-08.jpg',  'height': 93},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'Saturday Skin',      'thumb': 'brand-09.jpg',  'height': 173},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'Sigma Beauty',       'thumb': 'brand-10.jpg',  'height': 64},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'Lano',               'thumb': 'brand-11.jpg',  'height': 171},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'Frank Body',         'thumb': 'brand-12.jpg',  'height': 171},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'Grown Alchemist',    'thumb': 'brand-13.jpg',  'height': 162},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'Lash Star Beauty',   'thumb': 'brand-14.jpg',  'height': 66},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'kaprielle',          'thumb': 'brand-15.jpg',  'height': 117},

        {'type': 'img',  'action': 'html-brand-popup',   'name': 'The Better Skin Co', 'thumb': 'landingthumb_brand1.jpg',  'height': 141},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'The BrowGal',        'thumb': 'landingthumb_brand2.jpg',  'height': 117},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'CONTEXT',            'thumb': 'landingthumb_brand3.jpg',  'height': 146},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'COVER FX',           'thumb': 'landingthumb_brand4.jpg',  'height': 133},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'GLAMGLOW',           'thumb': 'landingthumb_brand7.jpg',  'height': 165},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'Kosas',              'thumb': 'landingthumb_brand9.jpg',  'height': 64},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'Lime Crime',         'thumb': 'landingthumb_brand12.jpg', 'height': 98},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'Rouge Bunny Rouge',  'thumb': 'landingthumb_brand17.jpg', 'height': 177},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'Saturday Skin',      'thumb': 'landingthumb_brand18.jpg', 'height': 141},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'Supergoop',          'thumb': 'landingthumb_brand19.jpg', 'height': 83},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'makeuperaser',       'thumb': 'landingthumb_brand25.jpg', 'height': 98},
        {'type': 'img',  'action': 'html-brand-popup',   'name': 'makeupdrop',         'thumb': 'landingthumb_brand26.jpg', 'height': 153},


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
        {'type':  'deco',  'thumb': 'deco-13.jpg',   'height': 68},
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

    var videoPagePopupsData = {

        'MetallicLips': {
            'heading': 'Metallic Lips',
            'videoID': '5579707491001',
            'productslist': [
                {
                    'thumb': 'thumb1.jpg',
                    'title': 'Rouge Bunny Rouge',
                    'description': 'Long-Lasting Lip Pencil in&nbsp;Marco',
                    'link': 'https://www.bloomingdales.com/shop/product/rouge-bunny-rouge-forever-yours-long-lasting-lip-pencil?ID=2652627'
                },
                {
                    'thumb': 'thumb2.jpg',
                    'title': 'Lime Crime',
                    'description': 'Matte Velvetines in&nbsp;Marshmallow',
                    'link': 'https://www.bloomingdales.com/shop/product/lime-crime-velvetines-metallic-matte-lipstick?ID=2669809'
                },
                {
                    'thumb': 'thumb3.jpg',
                    'title': 'Lime Crime',
                    'description': 'Diamond Crushers in&nbsp;Choke',
                    'link': 'https://www.bloomingdales.com/shop/product/lime-crime-diamond-crushers-iridescent-lip-topper?ID=2669816'
                }
            ]
        },
        
        'AllOverHighlighter': {
            'heading': 'All-Over Highlighter',
            'videoID': '5579700152001',
            'productslist': [
                {
                    'thumb': 'thumb1.jpg',
                    'title': 'Lime Crime',
                    'description': 'Hi-Lite Palette in Blossoms',
                    'link': 'https://www.bloomingdales.com/shop/product/lime-crime-hi-lite-highlighter-palette?ID=2669832'
                },
                {
                    'thumb': 'thumb2.jpg',
                    'title': 'Lash Star Beauty',
                    'description': 'Flash of Brilliance Skin Illuminator in Phosphorescence',
                    'link': 'https://www.bloomingdales.com/shop/product/lash-star-beauty-flash-of-brilliance-skin-illuminator?ID=2642945'
                },
                {
                    'thumb': 'thumb3.jpg',
                    'title': 'COVER FX',
                    'description': 'Custom Enhancer Drops in Candlelight',
                    'link': 'https://www.bloomingdales.com/shop/product/cover-fx-custom-enhancer-drops?ID=2687217'
                },
                {
                    'thumb': 'thumb4.jpg',
                    'title': 'MakeupDrop',
                    'description': 'Silicone Makeup Applicator',
                    'link': 'https://www.bloomingdales.com/shop/product/makeupdrop-silicone-makeup-applicator?ID=2621052'
                }
            ]
        },

        'NoMakeupMakeup': {
            'heading': 'No-Makeup Makeup',
            'videoID': '5579707899001',
            'productslist': [
                {
                    'thumb': 'thumb1.jpg',
                    'title': 'COVER FX',
                    'description': 'Mattifying Primer with Anti-Acne Treatment',
                    'link': 'https://www.bloomingdales.com/shop/product/cover-fx-mattifying-primer-with-anti-acne-treatment?ID=2696056'
                },
                {
                    'thumb': 'thumb2.jpg',
                    'title': 'COVER FX',
                    'description': 'Natural Finish Foundation',
                    'link': 'https://www.bloomingdales.com/shop/product/cover-fx-natural-finish-foundation?ID=2687218'
                },
                {
                    'thumb': 'thumb3.jpg',
                    'title': 'Sigma',
                    'description': 'F80 Flat Kabuki Brush',
                    'link': 'https://www.bloomingdales.com/shop/product/sigma-beauty-f80-flat-kabuki-brush?ID=2685189'
                },
                {
                    'thumb': 'thumb4.jpg',
                    'title': 'RMS Beauty',
                    'description': 'Living Luminizer',
                    'link': 'https://www.bloomingdales.com/shop/product/rms-beauty-living-luminizer?ID=2653292'
                },
                {
                    'thumb': 'thumb5.jpg',
                    'title': 'Lash Star Beauty',
                    'description': 'Supreme Eyelash Curler',
                    'link': 'https://www.bloomingdales.com/shop/product/lash-star-beauty-supreme-eyelash-curler?ID=2642948'
                },
                {
                    'thumb': 'thumb6.jpg',
                    'title': 'Rouge Bunny Rouge',
                    'description': 'Witchery Modeling Mascara',
                    'link': 'https://www.bloomingdales.com/shop/product/rouge-bunny-rouge-witchery-modeling-mascara?ID=2651871'
                },
                {
                    'thumb': 'thumb7.jpg',
                    'title': 'Kosas',
                    'description': 'Weightless Lipstick in Rosewater',
                    'link': 'https://www.bloomingdales.com/shop/product/kosas-weightless-lipstick?ID=2679460'
                },
                {
                    'thumb': 'thumb8.jpg',
                    'title': 'NUDESTIX',
                    'description': 'Eyebrow Stylus Pencil &amp; Gel',
                    'link': 'https://www.bloomingdales.com/shop/product/nudestix-eyebrow-stylus-pencil-gel?ID=2653141'
                }
            ]
        },

        'UltimateSkinPrep': {
            'heading': 'Ultimate Skin Prep',
            'videoID': '5579718241001',
            'productslist': [
                {
                    'thumb': 'thumb1.jpg',
                    'title': 'CONTEXT',
                    'description': 'White Charcoal Detox Mask',
                    'link': 'https://www.bloomingdales.com/shop/product/context-white-charcoal-detox-mask?ID=2607002'
                },
                {
                    'thumb': 'thumb2.jpg',
                    'title': 'Kaprielle',
                    'description': 'Roses & Gold Anti-Aging Serum',
                    'link': 'https://www.bloomingdales.com/shop/product/kaprielle-roses-gold-anti-aging-serum?ID=2662424'
                },
                {
                    'thumb': 'thumb3.jpg',
                    'title': 'Grown Alchemist',
                    'description': 'Hydra-Repair Day Cream',
                    'link': 'https://www.bloomingdales.com/shop/product/grown-alchemist-hydra-repair-day-cream?ID=1425992'
                },
                {
                    'thumb': 'thumb4.jpg',
                    'title': 'Mario Badescu',
                    'description': 'Hyaluronic Eye Cream',
                    'link': 'https://www.bloomingdales.com/shop/product/mario-badescu-hyaluronic-eye-cream?ID=2684994'
                },
                {
                    'thumb': 'thumb5.jpg',
                    'title': 'Frank Body',
                    'description': 'Lip Scrub',
                    'link': 'https://www.bloomingdales.com/shop/product/frank-body-lip-scrub?ID=2661754'
                },
                {
                    'thumb': 'thumb6.jpg',
                    'title': 'Lano',
                    'description': 'Lanolips 101 Ointment Multipurpose Superbalm',
                    'link': 'https://www.bloomingdales.com/shop/product/lano-lanolips-101-ointment-multipurpose-superbalm?ID=2648594'
                },
                {
                    'thumb': 'thumb7.jpg',
                    'title': 'Supergoop!',
                    'description': 'Defense Refresh Setting Mist SPF 50',
                    'link': 'https://www.bloomingdales.com/shop/product/supergoop-defense-refresh-setting-mist-spf-50-3.4-oz.?ID=2648949'
                }
            ]
        },

        'UnicornEyes': {
            'heading': 'Unicorn Eyes',
            'videoID': '5579704123001',
            'productslist': [
                {
                    'thumb': 'thumb1.jpg',
                    'title': 'FLiRT Cosmetics',
                    'description': 'Molten Chic Metallic Eyeshadow&nbsp;Duo in&nbsp;Ride Ore Die',
                    'link': 'https://www.bloomingdales.com/shop/product/flirt-cosmetics-molten-chic-metallic-duo-compact?ID=2695140'
                },
                {
                    'thumb': 'thumb2.jpg',
                    'title': 'Rouge Bunny Rouge',
                    'description': ' Loose Glitter Pigment in&nbsp;Spun from Sunny Seawater',
                    'link': 'https://www.bloomingdales.com/shop/product/rouge-bunny-rouge-fire-drops-loose-glitter-pigment?ID=2652600'
                },
                {
                    'thumb': 'thumb3.jpg',
                    'title': 'RMS Beauty',
                    'description': 'Lip Shine in&nbsp;Sublime',
                    'link': 'https://www.bloomingdales.com/shop/product/rms-beauty-lip-shine?ID=2653311'
                },
                {
                    'thumb': 'thumb4.jpg',
                    'title': 'Saturday Skin',
                    'description': 'Daily Dew Hydrating Essence Mist',
                    'link': 'https://www.bloomingdales.com/shop/product/saturday-skin-daily-dew-hydrating-essence-mist?ID=2629815'
                }
            ]
        },

        'CoolLinerLooks': {
            'heading': 'Cool Liner Looks',
            'videoID': '5579707489001',
            'productslist': [
                {
                    'thumb': 'thumb1.jpg',
                    'title': 'Lash Star Beauty',
                    'description': 'Visionary Lashes 003',
                    'link': 'https://www.bloomingdales.com/shop/product/lash-star-beauty-visionary-lashes-003?ID=2642967'
                },
                {
                    'thumb': 'thumb2.jpg',
                    'title': 'The BrowGal',
                    'description': 'Skinny Eyebrow Pencil in Medium Brown 04',
                    'link': 'https://www.bloomingdales.com/shop/product/the-browgal-skinny-eyebrow-pencil?ID=2676828'
                }, {
                    'thumb': 'thumb3.jpg',
                    'title': 'Rouge Bunny Rouge',
                    'description': 'Devotion Ink Quartz Eyeliner in Opalescence Essence',
                    'link': '#'
                }, {
                    'thumb': 'thumb4.jpg',
                    'title': 'Rouge Bunny Rouge',
                    'description': 'Devotion Ink Quartz Eyeliner in Tiger Essence',
                    'link': 'https://www.bloomingdales.com/shop/product/rouge-bunny-rouge-devotion-ink-quartz-eyeliner?ID=2651902'
                }, {
                    'thumb': 'thumb5.jpg',
                    'title': 'FLiRT Cosmetics',
                    'description': 'Chic Happens Ombré Lip Kit in Slay All Day ',
                    'link': '#'
                }, {
                    'thumb': 'thumb6.jpg',
                    'title': 'FLiRT Cosmetics',
                    'description': 'Chic Happens Ombré Lip Kit in No Shame',
                    'link': 'https://www.bloomingdales.com/shop/product/flirt-cosmetics-chic-happens-ombre-lip-kit?ID=2695139'
                }, {
                    'thumb': 'thumb7.jpg',
                    'title': 'FLiRT Cosmetics',
                    'description': 'Dot Dot Dot Dual Eyeliner Art',
                    'link': 'https://www.bloomingdales.com/shop/product/flirt-cosmetics-dot-dot-dot-dual-eyeliner-art?ID=2695136'
                }
            ]
        }

    };

    var brandsPagePopupsData = {
        'The Better Skin Co': {
            'theGlowDownCopy': 'Natalya Rachkova brought her secret face cream recipe to the U.S. from her home country of Uzbekistan—and word started spreading quickly. What began as &quot;magic&quot; cream made in her kitchen is now a carefully edited collection of skin care essentials (think: a multitasking moisturizer, cleanser-mask hybrid and pimple potion). The paraben&dash;free, vegan formulas are handcrafted and work for all skin types.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/the-better-skin-co.-mirakle-cream?ID=2624033',
            'bestsellerHeading': 'Mirakle Cream',
            'bestsellerCopy': 'It seriously does it all: hydrates, balances, brightens and addresses just about any skin concern you have.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/The%20Better%20Skin%20Co.?id=1035059'
        },
        'The BrowGal': {
            'theGlowDownCopy': 'When it comes to brows, we put all our trust in celebrity makeup artist and &quot;brow whisperer&quot; Tonya Crooks. Her L.A.-based line includes everything you need to find and maintain your natural brow shape (spoiler: one size does not fit all). The collection of innovative pencils, highlighters and tools lets you customize your look for fuller, thicker brows that break the cookie&dash;cutter mold.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/the-browgal-convertible-brow-powder-pomade-duo?ID=2692371',
            'bestsellerHeading': 'The Convertible Brow Powder &amp; Pomade Duo',
            'bestsellerCopy': 'Use it dry for a natural finish, wet for more definition or both to create a full&dash;on glam look.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/The%20BrowGal?id=1035059',
            'videoID': '5573561604001'
        },
        'CONTEXT': {
            'theGlowDownCopy': 'We first fell in love with this brand because of its clean, nontoxic approach to skin care, which includes antioxidants and botanical oils that actually work. Then came the obsession with its essential&dash;extract&dash;packed lip colors and five-free nail polishes (formulated without potentially harmful chemicals). Now this line is one of our go-tos for everyday skin care and makeup&mdash;and its sleek packaging is on point for your next #topshelfie.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/context-white-charcoal-detox-mask?ID=2607002',
            'bestsellerHeading': 'White Charcoal Detox Mask',
            'bestsellerCopy': 'White charcoal powder removes dirt while also providing intense hydration—it’s legit magic.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/CONTEXT?id=1035059'
        },
        'COVER FX': {
            'theGlowDownCopy': 'It&#39;s easy to see why this brand is all over your IG feed. From primers and foundations to powders and bronzers, these products will perfect your complexion like no other. The revolutionary formulas (like pure pigment drops that mix into moisturizer for custom coverage) are meant to enhance your skin rather than mask it&mdash;and they&#39;re offered in a wide range of shades to match most skin tones.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/cover-fx-perfect-setting-powder?ID=2687220',
            'bestsellerHeading': 'Perfect Setting Powder',
            'bestsellerCopy': 'Translucent, talc-free and exactly what you need to look airbrushed IRL.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/COVER%20FX?id=1035059'
        },
        'FLiRT Cosmetics': {
            'theGlowDownCopy': 'Born on the &#39;gram, this social media&#8211;savvy brand is a collaboration between Est&#233;e Lauder and illustrator Donald Robertson. The playful collection includes dot liner pens to create artsy eye designs, temporary tattoos for festival looks and a false&dash;lash applicator that will blow your mind. Not to mention, everything is decorated with Robertson’s punchy illustrations, making the products themselves works of art.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/flirt-cosmetics-flashes-false-lash-applicator?ID=2695132',
            'bestsellerHeading': 'Flashes False&dash;Lash Applicator',
            'bestsellerCopy': 'This game&dash;changing tool dispenses false&dash;lash &quot;buds&quot; for a hassle&dash;free application and custom look.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/FLiRT%20Cosmetics?id=1035059'
        },
        'Frank Body': {
            'theGlowDownCopy': 'Created in Australia and made famous by bikini-clad beach babes, this coffee-based line uses only natural and naturally derived ingredients for its skin-smoothing scrubs and creams. Coffee grinds, brown sugar and sea salt are the headliners here, so it’s no surprise everything smells good enough to eat. Why coffee? The caffeine energizes the skin and perks things up, so it works wonders on the, um, behind region.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/frank-body-original-coffee-scrub?ID=2654120',
            'bestsellerHeading': 'Original Coffee Scrub',
            'bestsellerCopy': 'Smells like an orange mocha frapp&#233; and smooths skin for the softest legs of your life.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Frank%20Body?id=1035059',
            'videoID': '5573558771001'
        },
        'GLAMGLOW': {
            'theGlowDownCopy': 'Husband&dash;wife duo Glenn and Shannon Dellimore created their first mud mask for their actor friends who were looking to get camera&dash;ready. The glow&dash;getting product became so popular backstage in Hollywood, the Dellimores ended up launching their own line. Now there’s a mud mask for every one of your skin concerns: SUPERMUD<sup>&reg;</sup> to clear, YOUTHMUD<sup>&reg;</sup> to exfoliate, THIRSTYMUD&#8482; to hydrate and FLASHMUD&#8482; to brighten. Plus, the brand recently added cleansers and moisturizers to its lineup of must-haves.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/glamglow-gravitymud-firming-treatment?ID=2670172',
            'bestsellerHeading': 'GRAVITYMUD&#8482; Firming Treatment',
            'bestsellerCopy': 'This lifting, peel-off mask transforms from white to chrome as you wear it, giving you plenty of selfie ops.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/GLAMGLOW?id=1035059'
        },
        'Grown Alchemist': {
            'theGlowDownCopy': 'Full disclosure: We&#39;re suckers for packaging, and this skin care line&#39;s minimalist, apothecary-inspired bottles don&#39;t disappoint. Of course, its products are amazing, too. Using certified organic botanicals, natural actives and powerful antioxidants, the brand&#39;s anti-aging face and body formulas deliver visible results with ingredients you can feel good about.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/grown-alchemist-intensive-hand-cream?ID=2694801',
            'bestsellerHeading': 'Intensive Hand Cream',
            'bestsellerCopy': 'Super hydrating, never greasy and smells like roses—all in a pretty pink tube.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Grown%20Alchemist?id=1035059'
        },
        'Kosas': {
            'theGlowDownCopy': 'Because this L.A.&dash;based brand makes only lipsticks, it&#39;s focused on perfecting the art and science of lip color. Every shade in its natural collection is handmade with green tea, shea butter and sweet orange oil&mdash;plus, free of parabens, sulfates and phthalates. The sheer, buildable colors range from nudes to brights and feature a non&dash;drying matte finish. Trust us, you&#39;ll want one of each. ',
        'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/kosas-weightless-lipstick?ID=2679460',
        'bestsellerHeading': 'Weightless Lip Color in Rosewater',
        'bestsellerCopy': 'The perfect dusty pink shade that looks like your lips (but better)—and it’s super hydrating and plumping.',
        'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Kosas?id=1035059'
        },
        'Lano': {
            'theGlowDownCopy': 'Lanolin&mdash;a natural occurring wax found on sheepswool&mdash;is the star of this skin care brand out of Australia. Not only does it mimic skin lipids (aka it’s super compatible with your skin), but it can hold up to double its weight in water to deliver extreme hydration. The award&dash;winning line of lip, hand and body products is everything you need to stay moisturized year&dash;round. ',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/lano-lanolips-101-ointment-multipurpose-superbalm?ID=2648594',
            'bestsellerHeading': 'Lanolips 101 Ointment Multipurpose Superbalm',
            'bestsellerCopy': 'Do you ever dream about an all&dash;in&dash;one balm you can literally put anywhere? This is it—and there are more than 101 ways to use it.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Lano?id=1035059'
        },
        'Lash Star Beauty': {
            'theGlowDownCopy': 'Lashes are having a big moment, which is why we&#39;re obsessed (in a big way) with this beauty line dedicated solely to eyelashes. Whether you want to make a subtle statement or go all&dash;out extra, these products and tools&mdash;from heated curlers to a multitasking mascara&mdash;will be the stars of your makeup bag. Plus, the brand is cruelty&dash;free and everything is formulated with high&dash;quality ingredients.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/lash-star-beauty-full-control-lash-sculpting-mascara?ID=2632934',
            'bestsellerHeading': 'Full Control Lash Sculpting Mascara',
            'bestsellerCopy': 'Two wands are better than one for defined, volumized and totally transformed lashes.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Lash%20Star%20Beauty?id=1035059'
        },
        'Lime Crime': {
            'theGlowDownCopy': 'Known for its insanely pigmented lipsticks, this Insta&dash;famous brand offers a range of double&dash;tap&dash;worthy formulas—from velvety mattes to wild metallics. Founder Doe Deere set out to create &quot;makeup for unicorns,&quot; which is the perfect way to describe her line of rainbow brights and glitters. Plus, every single product is vegan and cruelty&dash;free.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/lime-crime-velvetines-matte-lipstick?ID=2669787',
            'bestsellerHeading': 'Matte Velvetines Lipstick in Red Rose',
            'bestsellerCopy': 'This OG liquid matte lipstick lasts all day and won’t dry out lips.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Lime%20Crime?id=1035059'
        },
        'Lit Cosmetics': {
            'theGlowDownCopy': 'When it comes to glitter, this makeup line is queen. The high&dash;shine collection is best known for its loose pigments, silicone&dash;filled syringes and metallic kits that let you add glitter wherever you want it&mdash;and keep it there. The signature two&dash;step method, which includes an adhesive base layer followed by round glitter pieces, gives you the most brilliant sparkle in a rainbow of hues.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/lit-cosmetics-glitter-pigment-lit-kit?ID=2677290',
            'bestsellerHeading': 'Cher Holographic Lit Kit',
            'bestsellerCopy': 'Multidimensional silver glitter tinted with pastels creates a holographic sparkle effect on lips and eyes.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Lit%20Cosmetics?id=1035059',
            'videoID': '5573553375001'
        },
        'Mario Badescu': {
            'theGlowDownCopy': 'Few names are as synonymous with a clear, glowing complexion as Mario Badescu. For more than 50 years he&#39;s created custom treatments with the most effective—and high-end—ingredients. Whether you&#39;re looking for powerful acne remedies or potent anti-aging treatments, his products offer tailor-made solutions to tackle any and all skin concerns.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/mario-badescu-drying-lotion?ID=2679461',
            'bestsellerHeading': 'Drying Lotion',
            'bestsellerCopy': 'Powerful salicylic acid and soothing calamine make stubborn breakouts virtually disappear overnight.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Grown%20Alchemist?id=1035059'
        },
        'NUDESTIX': {
            'theGlowDownCopy': 'A chemist mom and her model daughters are the beauties and brains behind this line of easy-to-use pencils enriched with vitamins, antioxidants and moisturizers. The range of barely there shades simplifies any makeup routine while creating a flawless finish. You can thank this cult-favorite line for providing the essentials to create the no-makeup makeup look that’s blowing up your feed.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/index.ognc?ID=2653106',
            'bestsellerHeading': 'Intense Matte Lip & Cheek Pencil',
            'bestsellerCopy': 'Swipe on this velvety color that feels creamy, looks rich and won’t feather for up to six hours.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/NUDESTIX?id=1035059',
            'videoID': '5573562723001'
        },
        'RMS Beauty': {
            'theGlowDownCopy': 'When celebrity makeup artist Rose-Marie Swift couldn’t find safe, nontoxic beauty products, she created her own. This A-list-approved line of highly pigmented makeup is made of mostly raw, food-grade organic ingredients, so the products not only look amazing, but they’re good for your body, too. Bonus: Almost everything comes in a portable pot and can be easily applied with your fingertips.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/rms-beauty-living-luminizer?ID=2653292',
            'bestsellerHeading': 'Living Luminizer',
            'bestsellerCopy': 'Sheer, super blendable and basically the most perfect highlighter ever.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/RMS%20Beauty?id=1035059'
        },
        'Rouge Bunny Rouge': {
            'theGlowDownCopy': 'Tapping into the fantasy and whimsy of makeup, this brand takes luxury to another level. Unique products like quartz-infused eyeliners, liquid bronzer drops and eye gloss transform your everyday routine into an out-of-this-world experience. Plus, the formulas are packed with mineral extracts, hydrators and anti-agers, blurring the line between makeup and skin care—and the results are truly magical.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/rouge-bunny-rouge-serene-light-skin-perfector?ID=2651563',
            'bestsellerHeading': 'Serene Light Skin Perfector',
            'bestsellerCopy': 'With just a hint of tint, this light-reflecting primer instantly boosts skin’s radiance.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Rouge%20Bunny%20Rouge?id=1035059',
            'videoID': '5573546907001'
        },
        'Saturday Skin': {
            'theGlowDownCopy': 'Celebrating the best day of the week, this skin care line gives your complexion that covetable glow you get from sleeping in on the weekends. The brand’s message—and snappable pink packaging—may be playful, but the results are major. The entire range of products features an exclusive peptide formula that stimulates the collagen and elastin regeneration process—so you look dewy and refreshed without a full eight hours.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/saturday-skin-daily-dew-hydrating-essence-mist?ID=2629815',
            'bestsellerHeading': 'Daily Dew Hydrating Essence Mist',
            'bestsellerCopy': 'When that afternoon slump hits, spritz on this moisturizing mist infused with kiwi and grape extracts for a quick pick-me-up.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Saturday%20Skin?id=1035059'
        },
        'Supergoop': {
            'theGlowDownCopy': 'In her 20s, Holly Thaggard’s friend was diagnosed with skin cancer, so Thaggard vowed to make sunscreen—the best defense against UV damage—something you’d want to wear every day. She spent three years tackling common SPF issues and developed an oil-free, skin-nourishing lotion that offers broad-spectrum protection with clean ingredients. Thaggard continues to innovate with powders, mists and mousses designed to keep skin healthy—rain or shine.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/supergoop-invincible-setting-powder-spf-45?ID=2648957',
            'bestsellerHeading': 'Invincible Setting Powder SPF 45',
            'bestsellerCopy': 'Consider this an added layer of protection that also sets makeup, controls oil and minimizes shine.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Supergoop%21?id=1035059',
            'videoID': '5573558804001'
        },
        'Sigma Beauty': {
            'theGlowDownCopy': 'An engineer and researcher used their expertise to craft some of the most innovative brushes in the beauty business. The award-winning tools feature hypoallergenic and antibacterial synthetic fibers designed to stand up to a lifetime of use. The founders continue to innovate, creating state-of-the-art designs with luxurious details, like hand-sanded wood handles. Whether you’re blending, contouring or lining, these brushes are your go-to for a seamless application.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/sigma-beauty-f80-flat-kabuki-brush?ID=2685189',
            'bestsellerHeading': 'Flat Kabuki F80',
            'bestsellerCopy': 'Introduce your liquid foundation to this flat-top brush ASAP to create an incredible high-def finish.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Sigma%20Beauty?id=1035059',
            'videoID': '5573554980001'
        },
        'SUVA Beauty': {
        'theGlowDownCopy': 'Taking its name from the vibrant capital of Fiji, this eye makeup line is best known for its range of pop colors and professional-grade palettes. Its shadows are formulated with built-in primers and intense pigments, making them essential for makeup artists and beauty bloggers alike. Whether you’re looking to create a simple smoky eye or something more exotic, this line of shadows and liners has just what you need.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/suva-beauty-8-shade-eyeshadow-palette?ID=2693415',
            'bestsellerHeading': 'Cupcakes &amp; Monsters 8-Shade Eyeshadow Palette',
            'bestsellerCopy': 'A wild, graffiti-inspired collection of vibrant mattes—all in the brand’s signature butter formula.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/NUDESTIX?id=1035059'
        },
        'The Vamp Stamp': {
            'theGlowDownCopy': 'Celebrity makeup artist Veronica Lorenz created this ingenious eyeliner tool when a medical condition weakened her grip. She devised a solution that didn’t require steady hands or years of practice: a stamp you coat in pigment and place on your lash line for a perfectly symmetrical cat-eye. Now there’s no more winging it when it comes to achieving the ideal line every time.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/the-vamp-stamp-vavavoom-medium-wing-eyeliner-stamp?ID=2649356',
            'bestsellerHeading': 'VaVaVoom Kitten Wing Stamp',
            'bestsellerCopy': 'You can do an even cat-eye without fail. Just dip the tool in ink and stamp it on your lid for the ultimate shortcut.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/The%20Vamp%20Stamp?id=1035059',
            'videoID': '5573561609001'
        },
        
        'beautyblender': {
            'heading': 'beautyblender&reg;',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/beautyblender-the-original-beautyblender?ID=2661588',
            'bestsellerHeading': 'the original beautyblender&reg;',
            'bestsellerCopy': 'You can find this little pink makeup sponge in just about every makeup artist’s bag—and for good reason. Its edgeless shape and unique material that expands when wet provide a streak-free application for a high-def finish.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/product/beautyblender-the-original-beautyblender?ID=2661588'
        },
        'kaprielle': {
            'heading': 'Kaprielle',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/kaprielle-24k-gold-luxury-face-mask-kit?ID=2662423',
            'bestsellerHeading': '24K Gold Luxury Face Mask Kit',
            'bestsellerCopy': 'The most indulgent mask ever. This two-step ritual includes a luxe rose serum infused with 24K gold pieces and small mask sheets to layer on top. The result is an anti-aging treatment that will leave you glowing.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/product/kaprielle-24k-gold-luxury-face-mask-kit?ID=2662423'
        },
        'makeuperaser': {
            'heading': 'Makeup Eraser',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/makeup-eraser-the-original-makeup-eraser-makeup-remover-cloth?ID=2629898',
            'bestsellerHeading': 'The Original MakeUp Eraser Makeup Remover Cloth',
            'bestsellerCopy': 'Just add water and this supersoft cloth will remove waterproof makeup and mascara instantly. Plus, it’s perfect for travel and lasts up to a thousand washes.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/product/makeup-eraser-the-original-makeup-eraser-makeup-remover-cloth?ID=2629898'
        },
        'winkylux': {
            'heading': 'Winky Lux',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/winky-lux-flower-balm?ID=2614388',
            'bestsellerHeading': 'Flower Balm',
            'bestsellerCopy': 'This coconut-scented balm-stain swipes on clear and then reacts to your lips’ pH level to create the perfect shade of pink. Each one contains a real flower inside, so it’s just as pretty in the tube as it is on.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/product/winky-lux-flower-balm?ID=2614388'
        },
        'makeupdrop': {
            'heading': 'MakeupDrop',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/makeupdrop-silicone-makeup-applicator?ID=2621052',
            'bestsellerHeading': 'Silicone Makeup Applicator',
            'bestsellerCopy': 'With its innovative silicone design, you won’t waste a drop of makeup as you apply foundation, blush, highlighter and concealer. Just add your product of choice to the teardrop-shaped tool, dab it on and blend it out.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/product/makeupdrop-silicone-makeup-applicator?ID=2621052',
            'videoID': '5573546894001'
        }
    };

    
    // video page content
    var videoPagePics = [
        {'name': 'MetallicLips',        'thumb': 'Metallic-Lips.jpg',         'heading': 'Metallic Lips'},
        {'name': 'AllOverHighlighter',  'thumb': 'All-Over-Highlighter.jpg',  'heading': 'All-Over Highlighter'},
        {'name': 'NoMakeupMakeup',      'thumb': 'No-Makeup-Makeup.jpg',      'heading': 'No-Makeup Makeup'},
        {'name': 'UltimateSkinPrep',    'thumb': 'Ultimate-Skin-Prep.jpg',    'heading': 'Ultimate Skin Prep'},
        {'name': 'UnicornEyes',         'thumb': 'Unicorn-Eyes.jpg',          'heading': 'Unicorn Eyes'},
        {'name': 'CoolLinerLooks',      'thumb': 'Cool-Liner-Looks.jpg',      'heading': 'Cool Liner Looks'}
    ];

    
    var imagePlaceHolder     = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // transparent
    var imgThumbsDir         = '/b/fashion/images/projects/2017-glowhaus/landing/thumbs/';
    var imgFullSizeDir       = '/b/fashion/images/projects/2017-glowhaus/landing/fullsize-img/';
    //var landingHTMLPopupsDir = '/b/fashion/images/projects/2017-glowhaus/html-popups/';

    var videoProductsThumbsDir = '/b/fashion/images/projects/2017-glowhaus/videos/products-thumbs/';

    var popupPageTemplateUrl = '/b/fashion/images/projects/2017-glowhaus/html-popups/popup.html';
    
    var landingPageTileList  = $('ul#glh-images-tile');
    var defaultThumbWidth    = 280;
    var videoSelector = '.glh-video';

    // remove/clear all list elements
    landingPageTileList.empty();
    shuffleArray(landingPagePics);

    var imgPopupsCounter = 0;
    //var itemsCounter = 0;
    
    // create landing page image tile
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
        
        var createImg = function() {
            return '<img data-width="' + defaultThumbWidth +
            '" data-height="' + originalHeight +
            '" data-tmp-src="' + thumbImg +
            '" src="' + imagePlaceHolder + '">';
        };

        var imgItem, videoItem = '';
        if (media === 'img') {
            if (typeOfAction === 'img-popup') {
                if (imgPopupsCounter < 36) {
                    imgItem = $('<li><a class="image-popup-link" data-name="POPUP-IMAGE" ' +
                        'href="' + fullSizeImg + '">' + createImg() + '</a></li>')
                        .appendTo(landingPageTileList);
                    setImgHeight(imgItem);
                    imgPopupsCounter++;
                }
            } else if (typeOfAction === 'html-video-popup') {
                imgItem = $('<li><a class="html-video-popup" data-name="' + tileItem.name + '" ' +
                    'href="' + popupPageTemplateUrl + '">' + createImg() + 
                    '<span class="plyr__play-large"><svg id="plyr-play" viewBox="0 0 18 18" width="100%" height="100%"><path d="M15.562 8.1L3.87.225C3.052-.337 2 .225 2 1.125v15.75c0 .9 1.052 1.462 1.87.9L15.563 9.9c.584-.45.584-1.35 0-1.8z"></path></svg><span class="plyr__sr-only">Play</span>' +
                    '</a></li>')
                    .appendTo(landingPageTileList);
                setImgHeight(imgItem);
            }else if (typeOfAction === 'html-brand-popup') {
                imgItem = $('<li><a class="html-brand-popup no-play-btn" data-name="' + tileItem.name + '" ' +
                    'href="' + popupPageTemplateUrl + '">' + createImg() + '</a></li>')
                    .appendTo(landingPageTileList);
                setImgHeight(imgItem);
            }
        } else if (media === 'video') {
            videoItem = $('<li class="glh-masonry-item__video-thumb"><video preload autoplay playsinline loop data-width="' + defaultThumbWidth +
                '" data-height="' + originalHeight +
                '" data-tmp-src="' + thumbImg +
                '" src="' + imagePlaceHolder + '"></video></li>')
                .appendTo(landingPageTileList);
            setImgHeight(videoItem);
           
        } else if (media === 'deco') {
            imgItem = $('<li class="glh-masonry-item__deco-item">' + createImg() + '</li>')
                .appendTo(landingPageTileList);
            setImgHeight(imgItem);
        }
    });

    $(window).resize(function () {
        $('ul#glh-images-tile li img, ul#glh-images-tile li video').each(function () {
            $(this).css('height', $(this).attr('data-height') * $('ul#glh-images-tile li').width() / $(this).attr('data-width'));
        });
    });
    
    //Landing image-tile lazyload and appearance 
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
    //Landing image-tile lazyload and appearance 
    $('ul#glh-images-tile li video').each(function () {
        var video = $(this);
        var rand = randomNumberFromRange(100, 600);
        setTimeout(function () {
            video.renameAttr('data-tmp-src', 'data-src');
            video.lazyLoadXT();
            video.addClass('animated fadeInUp');
        }, rand * 10);
    });


    //* ------------------------------------ IMAGE POPUP ------------------------------------- */
    
    var popupCloseBtnEvent = false;

    $('.image-popup-link').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom',
        closeOnContentClick: true,
        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it
            duration: 300,
            easing: 'ease-in-out'
        },
        callbacks: {
            open: function() {
                popupCloseBtnEvent = false;
                // init coremetrics for close btn
                popupCloseBtnMetrics ('close-btn_IMAGE-POPUP');
            },
            close: function() {
                if(!popupCloseBtnEvent) {
                    $.fn.coreTag('Element', 'closed-on-background-click__IMAGE-POPUP');
                }
            }
        }
    });
    
    /* ------------------------------------- HTML POPUP -------------------------------------- */
    
    var videoPageTileList = $('.glh-videos-list');
    var videoPageIndexPicsDir = '/b/fashion/images/projects/2017-glowhaus/videos/index-thumbs/';
    var brandsPageIndexPicsDir = '/b/fashion/images/projects/2017-glowhaus/learn/featured-brands/';
    var productPageToOpen = '';
    var productPageToOpenCleanName = '';
    var currentVideoCompleted = false;
    var currentVideoLaunched = false;

    var currentVideoPosition = 0;

    var videoPlayerOptions = {
        iconUrl: '/b/fashion/images/projects/2017-glowhaus/assets/plyr.svg',
        tooltips: {controls: true},
        captions: {defaultActive: true}
    };
    
    var getVideoPosterAndSrc = function(data) {
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
        
        return {'videoPosterSrc': data.poster, 'videoSrc': finalVideosData[0].src}
    };

    var setUpVideoEvents = function (_container) {
        _container.find('video').on('pause', function (e) {
                coreMetricsForVideo('video-' + productPageToOpenCleanName, 'video_Pause', e.target.currentTime);
            })
            .on('play', function (e) {
                currentVideoLaunched = true;
                coreMetricsForVideo('video-' + productPageToOpenCleanName, 'video_Play', e.target.currentTime);
            })
            .on('timeupdate', function (e) {
                //console.log(e.target.currentTime);
                currentVideoPosition = e.target.currentTime;
            })
            .on('ended', function (e) {
                currentVideoCompleted = true;
                coreMetricsForVideo('video-' + productPageToOpenCleanName, 'video_Completed', e.target.currentTime);
            });  
    };

    var videoMarkup = function (_data) {
        var videoPosterSrc = getVideoPosterAndSrc(_data).videoPosterSrc;
        var videoSrc = getVideoPosterAndSrc(_data).videoSrc;
        return '<video class="glh-video" poster="' + videoPosterSrc + '" controls crossorigin>' +
        '<source src="' + videoSrc + '" type="video/mp4">' +
        //'<!-- Text track file -->' + trackTag +
        '<a href="' + videoSrc + '" download>Download</a></video>';
    };
    
    var videoSetupWrapper = function (_data) {
        var popupVideoContainer = $('.glh-popup__video-container');
        popupVideoContainer.append(videoMarkup(_data));
        setUpVideoEvents(popupVideoContainer);
        plyr.setup(document.querySelector(videoSelector), videoPlayerOptions);
    };

    videoPageTileList.empty();
    
    $.each(videoPagePics, function (i) {
      $('<li><a class="glh-videos-tutorial-item play-video-btn" data-name="' + videoPagePics[i].name + '" href="' + popupPageTemplateUrl +
            '"><span class="videos-list-item__img-wrapper"><img src="' + videoPageIndexPicsDir + videoPagePics[i].thumb + '">' +
          '<span class="plyr__play-large"><svg id="plyr-play" viewBox="0 0 18 18" width="100%" height="100%"><path d="M15.562 8.1L3.87.225C3.052-.337 2 .225 2 1.125v15.75c0 .9 1.052 1.462 1.87.9L15.563 9.9c.584-.45.584-1.35 0-1.8z"></path></svg><span class="plyr__sr-only">Play</span></span>' +
          '</span>' +
          '<h5 class="glh-videos-tutorial-item__label">' + videoPagePics[i].heading  + '</h5></a>' +
          '</li>').appendTo(videoPageTileList);
    });
    
    $('.html-video-popup, .glh-videos-tutorial-item').magnificPopup({
        type: 'ajax',
        removalDelay: 300,
        mainClass: 'mfp-fade',
        callbacks: {
            beforeOpen: function() {
                productPageToOpen  = this.st.el.attr('data-name');
                productPageToOpenCleanName = productPageToOpen.toUpperCase().replace(/[^A-Z0-9]/ig, '-');
            },
            open: function() {
                popupCloseBtnEvent = false;
                // init coremetrics for close btn
                popupCloseBtnMetrics (productPageToOpenCleanName);
            },
            close: function() {
                if(!popupCloseBtnEvent) {
                    $.fn.coreTag('Element', 'closed-on-background-click__VIDEO-POPUP');
                }
                // !!!!!! Cormetrics for video on close - video is stopped / aborted
                if (!currentVideoCompleted && currentVideoLaunched) {
                    coreMetricsForVideo('video-' + productPageToOpenCleanName, 'video_Aborted', currentVideoPosition);
                }
                currentVideoCompleted = false;
                currentVideoLaunched = false;
                currentVideoPosition = 0;
            },
            ajaxContentAdded: function () {
                //var cormetricsValue = ;
                popupCloseBtnMetrics ('close-btn_VIDEO-POPUP_' + productPageToOpenCleanName);
                
                //Video page – heading
                $('.glh-popup__brand-heading').html(videoPagePopupsData[productPageToOpen].heading);

                //Video page – product's list
                var thisProductName = productPageToOpen.toLowerCase();
                var thisProductPath = videoProductsThumbsDir + thisProductName + '/' + thisProductName + '-';
                var prodList = videoPagePopupsData[productPageToOpen].productslist;
                $('.ghl-thumbs-links-list').empty();
                $.each(prodList, function (item) {
                    var _item = prodList[item];
                    var itemTitle = _item.title;
                    if(_item.title === 'The Better Skin Co') {
                        itemTitle = itemTitle + '.';
                    }
                    $('.ghl-thumbs-links-list').append('<li><a coremetricTag="shop-product_' + _item.title.toUpperCase().replace(/[^A-Z0-9]/ig, '-') + '" '+
                        'href="' + _item.link + '">' +
                        '<img src="' + thisProductPath + _item.thumb + '">' +
                        '<h5>' + itemTitle + '</h5>' +
                        '<p>' + _item.description + '</p></a></li>');
                });

                $('.ghl-thumbs-links-list a').on('click', function () {
                    $.fn.coreTag('Element', $( this ).attr( "coremetrictag" ));
                });


                var thisVideoID = videoPagePopupsData[productPageToOpen].videoID;
                SERVICES.brightCove.video_data(function (data) {
                    videoSetupWrapper(data);
                }, thisVideoID); 

            }
        }
    });

    $('.html-brand-popup, .glh-learn-list-item').magnificPopup({
        type: 'ajax',
        removalDelay: 300,
        mainClass: 'mfp-fade',
        callbacks: {
            beforeOpen: function () {
                productPageToOpen = this.st.el.attr('data-name');
                productPageToOpenCleanName = productPageToOpen.toUpperCase().replace(/[^A-Z0-9]/ig, '-');
            },
            open: function () {
                popupCloseBtnEvent = false;
                // init coremetrics for close btn
                popupCloseBtnMetrics(productPageToOpenCleanName);
            },
            close: function () {
                if (!popupCloseBtnEvent) {
                    $.fn.coreTag('Element', 'closed-on-background-click__VIDEO-POPUP');
                }
                // !!!!!! Cormetrics for video on close - video is stopped / aborted
                if (!currentVideoCompleted && currentVideoLaunched) {
                    coreMetricsForVideo(productPageToOpenCleanName + '_video', 'video_Aborted', currentVideoPosition);
                }
                currentVideoCompleted = false;
                currentVideoLaunched = false;
                currentVideoPosition = 0;
            },

            ajaxContentAdded: function () {

                var cormetricsValue = productPageToOpen.toUpperCase().replace(/[^A-Z0-9]/ig, '-');

                popupCloseBtnMetrics('close-btn_BRAND-POPUP_' + cormetricsValue);

                $('.ghl-thumbs-links-list').empty();

                var brandsPageItem = brandsPagePopupsData[productPageToOpen];

                //Brand page – heading


                if (brandsPageItem.heading == undefined) {
                    var brandLogoUrl = brandsPageIndexPicsDir + productPageToOpen.toLowerCase().replace(/\s/g, '') + '-logo.jpg';
                    $('.glh-popup__brand-heading').html('<img src="' + brandLogoUrl + '">');

                    var theGlowDownDescription = '<h3 class="glh-popup__subheading">The Glow-Down:</h3><p class="glh-popup__description-copy">' + brandsPageItem.theGlowDownCopy + '</p>';
                    $('.glh-popup__theglowdown-description').html(theGlowDownDescription);

                    // resolve '.' and '!' issue in product's name
                    if (productPageToOpen === 'The Better Skin Co') {
                        $('.glh-popup__shop-link-holder').html('<a coremetricTag="shop-now-' + cormetricsValue + '" ' +
                            'class="glh-popup__shop-link" href="' + brandsPageItem.shopLinkUrl + '">Shop ' + productPageToOpen + '.</a>');
                    } else if (productPageToOpen === 'Supergoop') {
                        $('.glh-popup__shop-link-holder').html('<a coremetricTag="shop-now-' + cormetricsValue + '" ' +
                            'class="glh-popup__shop-link" href="' + brandsPageItem.shopLinkUrl + '">Shop ' + productPageToOpen + '!</a>');
                    } else {
                        $('.glh-popup__shop-link-holder').html('<a coremetricTag="shop-now-' + cormetricsValue + '" ' +
                            'class="glh-popup__shop-link" href="' + brandsPageItem.shopLinkUrl + '">Shop ' + productPageToOpen + '</a>');
                    }
                } else {
                    $('.glh-popup__brand-heading').html(brandsPageItem.heading);

                    $('.glh-popup__shop-link-holder').html('<a coremetricTag="shop-now-' + cormetricsValue + '" ' +
                        'class="glh-popup__shop-link" href="' + brandsPageItem.shopLinkUrl + '">Shop Now</a>');
                }


                var bestsellerImgUrl = brandsPageIndexPicsDir + productPageToOpen.toLowerCase().replace(/\s/g, '') + '-product.jpg';
                $('.glh-popup__bestseller-img-holder').html('<a coremetricTag="shop-product_image-link_' + cormetricsValue + '" ' +
                    'href="' + brandsPageItem.bestsellerImgLink + '">' +
                    '<img src="' + bestsellerImgUrl + '"></a>');

                $('.glh-popup__bestseller-description').html('<h3 class="glh-popup__subheading">' + brandsPageItem.bestsellerHeading + '</h3>' +
                    '<p class="glh-popup__description-copy">' + brandsPageItem.bestsellerCopy + '</p>');

                $('.glh-popup__bestseller-img-holder a, .glh-popup__shop-link-holder a').on('click', function () {
                    $.fn.coreTag('Element', $(this).attr("coremetrictag"));
                });

                var thisVideoID = brandsPageItem.videoID;
                if (thisVideoID != undefined) {
                    SERVICES.brightCove.video_data(function (data) {
                        videoSetupWrapper(data);
                    }, thisVideoID);
                }
            }
        }
    });
    

    // Setup popup url for learn/brands page
    $('.glh-learn-list-item').each(function () {
        $(this).attr('href', popupPageTemplateUrl);
    });

    // Prevent default click action for all links and add coremetric attribute
    $('.glh-videos-list li a, ul#glh-images-tile li a, .glh-learn-list-item').each(function () {
        var _link = $(this);
        _link.click(function (event) {
            event.preventDefault();
        });
        var coremetricsTagValue = 'popup-link_' + _link.attr('data-name').toUpperCase().replace(/[^A-Z0-9]/ig, '-');
        _link.attr('coremetricTag', coremetricsTagValue);
    });

    
    // ----------- Utils


    //EXPECTED: Attribute 16 = Video Action ("0”=Launch; “1”=Pause; “2”=Play; “3”=Completion)
    // Attribute 17= Video Length (Total length played in seconds)

    function coreMetricsForVideo(tag_value, attribute16_value, attribute17_value) {
        var categoryID = "fall17_glowhaus";
        try {
            var explorerAttributes = new BLOOMIES.coremetrics.exploreAttributes;
            //16: evt.type,
            explorerAttributes.add({16: attribute16_value});
            //17: evt.position
            explorerAttributes.add({17: attribute17_value});
            BLOOMIES.coremetrics.cmCreatePageElementTag(tag_value, categoryID, explorerAttributes.toString());
            //BLOOMIES.coremetrics.cmCreatePageElementTag( tag_value, category_name );
        } catch (e) {
            console.log("Coremetrics Library Not Found... " + e);
        }
        console.log("*** Element- category_name: " + categoryID + " tag_value: " + tag_value + " attribute16_value (event Type) = " + attribute16_value + " attribute17_value: (event_Position) = " + attribute17_value + "***");

    }


    function popupCloseBtnMetrics (coremetricsTagValue) {
        $('.mfp-close').attr('coremetricTag', coremetricsTagValue)
            .on('click', function () {
                popupCloseBtnEvent = true;
                $.fn.coreTag('Element', $( this ).attr( "coremetrictag" ));
            });
    }
    /*
    function setUpVideo(_videoid, _container) {
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

            _container.append(videoMarkup);

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

        }, _videoid);
    }
    */
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
    /*
    function getParameterByName(paramName, url) {
        //if (!url) url = window.location.href;
        paramName = paramName.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    */
/*
    $('.bye-bye').on('click', function (e) {
        e.preventDefault();                   
        var goTo = $(this).attr('href');
        $('.glh-main-wrapper').fadeOut('slow', function () {
            setTimeout(function(){
                window.location = goTo;
            },500);
        });
    });
    */
});
