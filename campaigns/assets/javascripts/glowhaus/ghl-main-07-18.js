/* jshint ignore:start */
//Custom Modernizr build to check video autoplay support
!function(A,e,o){function t(A,e){return typeof A===e}function n(){var A,e,o,n,a,l,i;for(var r in s)if(s.hasOwnProperty(r)){if(A=[],e=s[r],e.name&&(A.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(o=0;o<e.options.aliases.length;o++)A.push(e.options.aliases[o].toLowerCase());for(n=t(e.fn,"function")?e.fn():e.fn,a=0;a<A.length;a++)l=A[a],i=l.split("."),1===i.length?Modernizr[i[0]]=n:(!Modernizr[i[0]]||Modernizr[i[0]]instanceof Boolean||(Modernizr[i[0]]=new Boolean(Modernizr[i[0]])),Modernizr[i[0]][i[1]]=n),c.push((n?"":"no-")+i.join("-"))}}function a(A){var e=h.className,o=Modernizr._config.classPrefix||"";if(R&&(e=e.baseVal),Modernizr._config.enableJSClass){var t=new RegExp("(^|\\s)"+o+"no-js(\\s|$)");e=e.replace(t,"$1"+o+"js$2")}Modernizr._config.enableClasses&&(e+=" "+o+A.join(" "+o),R?h.className.baseVal=e:h.className=e)}function l(){return"function"!=typeof e.createElement?e.createElement(arguments[0]):R?e.createElementNS.call(e,"http://www.w3.org/2000/svg",arguments[0]):e.createElement.apply(e,arguments)}function i(A,e){if("object"==typeof A)for(var o in A)d(A,o)&&i(o,A[o]);else{A=A.toLowerCase();var t=A.split("."),n=Modernizr[t[0]];if(2==t.length&&(n=n[t[1]]),"undefined"!=typeof n)return Modernizr;e="function"==typeof e?e():e,1==t.length?Modernizr[t[0]]=e:(!Modernizr[t[0]]||Modernizr[t[0]]instanceof Boolean||(Modernizr[t[0]]=new Boolean(Modernizr[t[0]])),Modernizr[t[0]][t[1]]=e),a([(e&&0!=e?"":"no-")+t.join("-")]),Modernizr._trigger(A,e)}return Modernizr}var c=[],s=[],r={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(A,e){var o=this;setTimeout(function(){e(o[A])},0)},addTest:function(A,e,o){s.push({name:A,fn:e,options:o})},addAsyncTest:function(A){s.push({name:null,fn:A})}},Modernizr=function(){};Modernizr.prototype=r,Modernizr=new Modernizr;var h=e.documentElement,R="svg"===h.nodeName.toLowerCase();Modernizr.addTest("video",function(){var A=l("video"),e=!1;try{e=!!A.canPlayType,e&&(e=new Boolean(e),e.ogg=A.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),e.h264=A.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),e.webm=A.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),e.vp9=A.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),e.hls=A.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(o){}return e});var d;!function(){var A={}.hasOwnProperty;d=t(A,"undefined")||t(A.call,"undefined")?function(A,e){return e in A&&t(A.constructor.prototype[e],"undefined")}:function(e,o){return A.call(e,o)}}(),r._l={},r.on=function(A,e){this._l[A]||(this._l[A]=[]),this._l[A].push(e),Modernizr.hasOwnProperty(A)&&setTimeout(function(){Modernizr._trigger(A,Modernizr[A])},0)},r._trigger=function(A,e){if(this._l[A]){var o=this._l[A];setTimeout(function(){var A,t;for(A=0;A<o.length;A++)(t=o[A])(e)},0),delete this._l[A]}},Modernizr._q.push(function(){r.addTest=i}),Modernizr.addAsyncTest(function(){function A(l){n++,clearTimeout(e);var c=l&&"playing"===l.type||0!==a.currentTime;return!c&&t>n?void(e=setTimeout(A,o)):(a.removeEventListener("playing",A,!1),i("videoautoplay",c),void(a.parentNode&&a.parentNode.removeChild(a)))}var e,o=200,t=5,n=0,a=l("video"),c=a.style;if(!(Modernizr.video&&"autoplay"in a))return void i("videoautoplay",!1);c.position="absolute",c.height=0,c.width=0;try{if(Modernizr.video.ogg)a.src="data:video/ogg;base64,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";else{if(!Modernizr.video.h264)return void i("videoautoplay",!1);a.src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ=="}}catch(s){return void i("videoautoplay",!1)}a.setAttribute("autoplay",""),a.style.cssText="display:none",h.appendChild(a),setTimeout(function(){a.addEventListener("playing",A,!1),e=setTimeout(A,o)},0)}),n(),a(c),delete r.addTest,delete r.addAsyncTest;for(var E=0;E<Modernizr._q.length;E++)Modernizr._q[E]();A.Modernizr=Modernizr}(window,document);

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


$(function () {


    var adobeAnalytics = $.fn.tealiumTagUtil();

    $(window).on('load', function () {
        var currentPageName = adobeAnalytics.getCurrentPageName();
        adobeAnalytics.fireTealiumPageLoadTag({
            'page_type': 'marketing',
            'page_name': currentPageName
        });
    });


    $('.glh-header__shop-btn').on('click', function () {
        adobeAnalytics.fireTealiumViewTag({
            'event_name': 'shop glowhaus'
        });
    });

    // ----------- Mobile nav switcher

    var mainContainer = $('.glh');
    var viewportWidth = $(window).width();
    $('#m-nav-switcher').on('click', function () {
        mainContainer.toggleClass('glh-m-nav-is-open');

        adobeAnalytics.fireTealiumLinkTag({
            'event_name' : 'mobile nav toggle'
        });
    });
    $(window).resize(function () {
        if (viewportWidth >= 767) {
            mainContainer.removeClass('glh-m-nav-is-open');
        }
    });

    // ----------- Pages data start

    var landingPopups = [
        {
            'type': 'img', 'action': 'img-popup',
            'height': 328,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2652616+2669832+2685185',
            'thumb': '0011_Lacquer_Lip_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 187,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2677290+2696053',
            'thumb': '0016_Coming_Home_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 328,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2652616+2669832+2685185',
            'thumb': '0017_Lacquer_Lip_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 218,
            'imgShopLink': 'https://www.bloomingdales.com/shop/product/lime-crime-plushies-soft-focus-lip-veil?ID=2866827',
            'thumb': '0020_Lacquer_Lip_Single_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 269,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2899599+3074624+2988124',
            'thumb': '0022_Pop_Of_Color_Liner_Bloomingdales_20180508-thumb.jpg'
        },
        // !!! --- renamed
        {
            'type': 'img', 'action': 'img-popup',
            'height': 248,
            'imgShopLink': 'https://TBD- will provide at QA',
            'thumb': '0024_Hair_Bloomingdales_20180508_01-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 328,
            'imgShopLink': 'https://TBD- will provide at QA',
            'thumb': '0024_Hair_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 229,
            'imgShopLink': 'https://www.bloomingdales.com/shop/product/lime-crime-plushies-soft-focus-lip-veil?ID=2866827',
            'thumb': '0034_Lacquer_Lip_Single_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 187,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2953405+2866827+2648594',
            'thumb': '0037_Lacquer_Lip_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 328,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2677290+2696053',
            'thumb': '0041_Coming_Home_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 408,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2677290+2696053',
            'thumb': '0047_Coming_Home_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 232,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2677290+2696053',
            'thumb': '0056_Pop_Of_Color_Liner_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 204,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2953405+2866827',
            'thumb': '0059_Lacquer_Lip_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 285,
            'imgShopLink': 'https://TBD- will provide at QA',
            'thumb': '0065_Hair_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 205,
            'imgShopLink': 'https://TBD- will provide at QA',
            'thumb': '0081_Hair_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 226,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2652616+2669832+2685185',
            'thumb': '0083_Lacquer_Lip_Single_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 245,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2652616+2669832+2685185',
            'thumb': '0084_Lacquer_Lip_Single_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 330,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2899599+3074624+2988124',
            'thumb': '0087_Pop_Of_Color_Liner_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 221,
            'imgShopLink': 'https://www.bloomingdales.com/shop/product/context-liquid-lacquer?ID=2953405',
            'thumb': '0091_Lacquer_Lip_Single_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 241,
            'imgShopLink': 'https://www.bloomingdales.com/shop/product/context-liquid-lacquer?ID=2953405',
            'thumb': '0094_Lacquer_Lip_Single_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 241,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2899599+3074624+2988124',
            'thumb': '0107_Pop_Of_Color_Liner_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 408,
            'imgShopLink': 'https://TBD- will provide at QA',
            'thumb': '0125_Hair_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 213,
            'imgShopLink': 'https://www.bloomingdales.com/shop/product/context-liquid-lacquer?ID=2953405',
            'thumb': '0126_Lacquer_Lip_Single_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 357,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2899599+3074624+2988124',
            'thumb': '0127_Pop_Of_Color_Liner_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 313,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2866827+2652616',
            'thumb': '0135_Lacquer_Lip_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 327,
            'imgShopLink': 'https://www.bloomingdales.com/shop/product/suva-beauty-hydra-fx?ID=2693416',
            'thumb': '0187_Pop_Of_Color_Liner_Bloomingdales_20180508-thumb.jpg'
        },
        // -- !!! ---- renamed
        {
            'type': 'img', 'action': 'img-popup',
            'height': 248,
            'imgShopLink': 'https://www.bloomingdales.com/shop/product/suva-beauty-hydra-fx?ID=2693416',
            'thumb': '0198_Pop_Of_Color_Liner_Bloomingdales_20180508_01-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 408,
            'imgShopLink': 'https://www.bloomingdales.com/shop/product/suva-beauty-hydra-fx?ID=2693416',
            'thumb': '0198_Pop_Of_Color_Liner_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 256,
            'imgShopLink': 'https://www.bloomingdales.com/shop/product/suva-beauty-hydra-fx?ID=2693416',
            'thumb': '0201_Pop_Of_Color_Liner_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 347,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2953408+2548967+2950536',
            'thumb': '0216_Hair_Bloomingdales_20180508-thumb.jpg'
        },
        // -- !!! ---- renamed
        {
            'type': 'img', 'action': 'img-popup',
            'height': 248,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2953405+2866827+2648594',
            'thumb': '0218_Lacquer_Lip_Bloomingdales_20180508_01-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2953405+2866827+2648594',
            'thumb': '0218_Lacquer_Lip_Bloomingdales_20180508-thumb.jpg',
            'height': 408
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 313,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2953408+2548967+2950536',
            'thumb': '0238_Hair_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 187,
            'imgShopLink': 'https://www.bloomingdales.com/shop/product/suva-beauty-hydra-fx?ID=2693416',
            'thumb': '0250_Pop_Of_Color_Liner_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 278,
            'imgShopLink': 'https://www.bloomingdales.com/shop/product/suva-beauty-hydra-fx?ID=2693416',
            'thumb': '0260_Pop_Of_Color_Liner_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 247,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2953408+2548967+2950536',
            'thumb': '0273_Hair_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 313,
            'imgShopLink': 'https://www.bloomingdales.com/shop/product/suva-beauty-hydra-fx?ID=2693416',
            'thumb': '0277_Pop_Of_Color_Liner_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 269,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2953408+2548967+2950536',
            'thumb': '0314_Hair_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 334,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2866827+2652616',
            'thumb': '0334_Lacquer_Lip_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 313,
            'imgShopLink': 'https://TBD- will provide at QA',
            'thumb': '0348_Hair_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 258,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2866827+2652616',
            'thumb': '0385_Lacquer_Lip_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 187,
            'imgShopLink': 'https://www.bloomingdales.com/shop/search?keyword=2953405+2866827+2648594',
            'thumb': '0390_Lacquer_Lip_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 187,
            'imgShopLink': 'https://TBD- will provide at QA',
            'thumb': '0392_Hair_Bloomingdales_20180508-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 405,
            'imgShopLink': 'https://www.bloomingdales.com/shop/product/lime-crime-diamond-dew?ID=2809238',
            'thumb': 'landing37-thumb.jpg'
        },
        {
            'type': 'img', 'action': 'img-popup',
            'height': 389,
            'imgShopLink': 'https://www.bloomingdales.com/shop/product/lime-crime-diamond-dew?ID=2809238',
            'thumb': 'landing58-thumb.jpg'
        },
    ];

    var landingPopupsVideos = [
        {
            'type': 'img',
            'action': 'html-video-popup',
            'name': 'LacqueredLips',
            'thumb': 'lacquered-lips_lp-video-thumb.jpg',
            'height': 211
        },
        {
            'type': 'img',
            'action': 'html-video-popup',
            'name': 'PostParty',
            'thumb': 'post-party_lp-video-thumb.jpg',
            'height': 199
        },
        {
            'type': 'img',
            'action': 'html-video-popup',
            'name': 'SportyStripes',
            'thumb': 'sporty-stripes_lp-video-thumb.jpg',
            'height': 157
        },
        {
            'type': 'img',
            'action': 'html-video-popup',
            'name': 'TexturedTresses',
            'thumb': 'textured-tresses_lp-video-thumb.jpg',
            'height': 233
        },
        {
            'type': 'img',
            'action': 'html-video-popup',
            'name': 'WingedShadow',
            'thumb': 'winged-shadow_lp-video-thumb.jpg',
            'height': 199
        },
    ];

    var landingPopupsGIFs = [
        {
            'type': 'video', 'thumb': 'Glowhaus_Fall18_LacquerLips-2.mp4',
            'height': 282
        },
        {
            'type': 'video', 'thumb': 'Glowhaus_Fall18_LacquerLips-3.mp4',
            'height': 282
        },
        {
            'type': 'video', 'thumb': 'Glowhaus_Fall18_WingedShadow.mp4',
            'height': 200
        },
        {
            'type': 'video', 'thumb': 'Glowhaus_Fall18_WingedShadow-3.mp4',
            'height': 180
        },
        {
            'type': 'video', 'thumb': 'Glowhaus_Fall18_WingedShadow-2.mp4',
            'height': 250
        },
        {
            'type': 'video', 'thumb': 'Glowhaus_Fall18_TexturedTresses.mp4',
            'height': 180
        },
        {
            'type': 'video', 'thumb': 'Glowhaus_Fall18_TexturedTresses-5.mp4',
            'height': 282
        },
        {
            'type': 'video', 'thumb': 'Glowhaus_Fall18_TexturedTresses-4.mp4',
            'height': 250
        },
        {
            'type': 'video', 'thumb': 'Glowhaus_Fall18_TexturedTresses-3.mp4',
            'height': 180
        },
        {
            'type': 'video', 'thumb': 'Glowhaus_Fall18_TexturedTresses-2.mp4',
            'height': 180
        },
        {
            'type': 'video', 'thumb': 'Glowhaus_Fall18_SportyStripes.mp4',
            'height': 180
        },
        {
            'type': 'video', 'thumb': 'Glowhaus_Fall18_SportyStripes-2.mp4',
            'height': 282
        },
        {
            'type': 'video', 'thumb': 'Glowhaus_Fall18_Post-Party.mp4',
            'height': 200
        },
        {
            'type': 'video', 'thumb': 'Glowhaus_Fall18_LacquerLips.mp4',
            'height': 282
        },
    ];

    var landingPopupsBrands = [
        //html-brand-popup - Grab and Glow
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'beautyblender',
            'thumb': 'brand-02.jpg',
            'height': 139
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'BioRepublic',
            'thumb': 'brand-16.jpg',
            'height': 187
        },
        {   'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Lano',
            'thumb': 'brand-11.jpg',
            'height': 171
        },
        {   'type': 'img', 'action': 'html-brand-popup',
            'name': 'kaprielle',
            'thumb': 'brand-15.jpg',
            'height': 117},
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'makeuperaser',
            'thumb': 'landingthumb_brand25.jpg',
            'height': 98
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'makeupdrop',
            'thumb': 'landingthumb_brand26.jpg',
            'height': 153
        },
        {   'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Patchology',
            'thumb': 'brand-20.jpg',
            'height': 192
        },
        {   'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Preheels',
            'thumb': 'brand-21.jpg',
            'height': 202
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Shhhowercap',
            'thumb': 'brand-22.jpg',
            'height': 202
        },
        {   'type': 'img',
            'action': 'html-brand-popup',
            'name': 'winkylux',
            'thumb': 'brand-06.jpg',
            'height': 68
        },
        // html-brand-popup - Main
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'The Better Skin Co',
            'thumb': 'landingthumb_brand1.jpg',
            'height': 141
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'The BrowGal',
            'thumb': 'landingthumb_brand2.jpg',
            'height': 117
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Bon Parfumeur',
            'thumb': 'brand-17.jpg',
            'height': 214
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'CONTEXT',
            'thumb': 'landingthumb_brand3.jpg',
            'height': 146
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'COVER FX',
            'thumb': 'landingthumb_brand4.jpg',
            'height': 133
        },
        {   'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Drybar',
            'thumb': 'brand-18.jpg',
            'height': 242
        },
        {   'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Frank Body',
            'thumb': 'brand-12.jpg',
            'height': 171
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'GLAMGLOW',
            'thumb': 'landingthumb_brand7.jpg',
            'height': 165
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Grown Alchemist',
            'thumb': 'brand-13.jpg',
            'height': 162
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Kosas',
            'thumb': 'landingthumb_brand9.jpg',
            'height': 64
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Lash Star Beauty',
            'thumb': 'brand-14.jpg',
            'height': 66
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Lime Crime',
            'thumb': 'landingthumb_brand12.jpg',
            'height': 98
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Lit Cosmetics',
            'thumb': 'brand-05.jpg',
            'height': 174
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Mario Badescu',
            'thumb': 'landingthumb_brand18.jpg',
            'height': 141
        },
        {   'type': 'img',
            'action': 'html-brand-popup',
            'name': 'NUDESTIX',
            'thumb': 'brand-03.jpg',
            'height': 85
        },
        {   'type': 'img',
            'action': 'html-brand-popup',
            'name': 'RMS Beauty',
            'thumb': 'brand-04.jpg',
            'height': 129
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Rouge Bunny Rouge',
            'thumb': 'landingthumb_brand17.jpg',
            'height': 177
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Saturday Skin',
            'thumb': 'brand-09.jpg',
            'height': 173
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Supergoop',
            'thumb': 'landingthumb_brand19.jpg',
            'height': 83
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Sigma Beauty',
            'thumb': 'brand-10.jpg',
            'height': 64
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'SUVA Beauty',
            'thumb': 'brand-07.jpg',
            'height': 119
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'The Vamp Stamp',
            'thumb': 'brand-08.jpg',
            'height': 93
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Too Cool for School',
            'thumb': 'brand-19.jpg',
            'height': 192
        },
        // --------------- 06,07 2018
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'STARSKIN',
            'thumb': 'landingthumb_brand27.jpg',
            'height': 168
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Verb',
            'thumb': 'landingthumb_brand28.jpg',
            'height': 195
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Kopari Beauty',
            'thumb': 'landingthumb_brand29.jpg',
            'height': 184
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'Briogeo',
            'thumb': 'landingthumb_brand30.jpg',
            'height': 172
        },
        {
            'type': 'img',
            'action': 'html-brand-popup',
            'name': 'FRENCH GIRL',
            'thumb': 'landingthumb_brand31.jpg',
            'height': 191
        },
    ];

    var landingPopupsDeco = [

        {'type': 'deco', 'thumb': 'deco-03.jpg', 'height': 90},
        {'type': 'deco', 'thumb': 'deco-04.jpg', 'height': 85},
        {'type': 'deco', 'thumb': 'deco-05.jpg', 'height': 311},
        {'type': 'deco', 'thumb': 'deco-09.jpg', 'height': 143},
        {'type': 'deco', 'thumb': 'deco-13.jpg', 'height': 68},
        {'type': 'deco', 'thumb': 'deco-18.jpg', 'height': 171},
        {'type': 'deco', 'thumb': 'deco-22.jpg', 'height': 128},
        {'type': 'deco', 'thumb': 'deco-23.jpg', 'height': 108},
        {'type': 'deco', 'thumb': 'deco-24.jpg', 'height': 64},

    ];

    // Popup pages with video and products list

    var videoPagePopupsData = {

        'LacqueredLips': {
            'heading': 'Lacquered Lips',
            'videoID': '5804490501001',
            'productslist': [
                {
                    'thumb': 'lacquered-lips-thumb1.jpg',
                    'vendor': 'Rouge Bunny Rouge',
                    'product': 'Sweet Excesses Glassy Gloss in Rhubarb Custard',
                    'link': 'https://www.bloomingdales.com/shop/product/rouge-bunny-rouge-sweet-excesses-glassy-gloss?ID=2652616'
                },
                {
                    'thumb': 'lacquered-lips-thumb2.jpg',
                    'vendor': 'Lime Crime',
                    'product': 'Hi-Lite Highlighter Palette in Opals',
                    'link': 'https://www.bloomingdales.com/shop/product/lime-crime-hi-lite-highlighter-palette?ID=2669832'
                },
                {
                    'thumb': 'lacquered-lips-thumb3.jpg',
                    'vendor': 'CONTEXT',
                    'product': 'Liquid Lacquer in Lay It Down',
                    'link': 'https://www.bloomingdales.com/shop/product/context-liquid-lacquer?ID=2953405'
                },
                {
                    'thumb': 'lacquered-lips-thumb4.jpg',
                    'vendor': 'Lano',
                    'product': 'Lanolips 101 Ointment Multipurpose Superbalm',
                    'link': 'https://www.bloomingdales.com/shop/product/lano-lanolips-101-ointment-multipurpose-superbalm?ID=2648594'
                },
                {
                    'thumb': 'lacquered-lips-thumb5.jpg',
                    'vendor': 'Sigma Beauty',
                    'product': 'F40 Large Angled Contour Brush',
                    'link': 'https://www.bloomingdales.com/shop/product/sigma-beauty-f40-large-angled-contour-brush?ID=2685185'
                },
                {
                    'thumb': 'lacquered-lips-thumb6.jpg',
                    'vendor': 'Lime Crime',
                    'product': 'Plushies Soft Focus Lip Veil in Grape Jelly',
                    'link': 'https://www.bloomingdales.com/shop/product/lime-crime-plushies-soft-focus-lip-veil?ID=2866827'
                }
            ]
        },

        'PostParty': {
            'heading': 'Post-Party Skin Care Routine',
            'videoID': '5804492994001',
            'productslist': [
                {
                    'thumb': 'postparty-thumb1.jpg',
                    'vendor': 'Kopari Beauty',
                    'product': 'Organic Coconut Melt',
                    'link': 'https://www.bloomingdales.com/shop/product/kopari-beauty-organic-coconut-melt?ID=2989534'
                },
                {
                    'thumb': 'postparty-thumb2.jpg',
                    'vendor': 'Kopari Beauty',
                    'product': 'Coconut Face Cream',
                    'link': 'https://www.bloomingdales.com/shop/product/kopari-beauty-face-the-day-night-coconut-skin-care-essentials-kit-50-value?ID=2989535'
                },
                {
                    'thumb': 'postparty-thumb3.jpg',
                    'vendor': 'STARSKIN',
                    'product': 'Silkmud Pink French Clay Purifying Liftaway Mud Sheet Mask',
                    'link': 'https://www.bloomingdales.com/shop/product/starskin-silkmud-pink-french-clay-purifying-liftaway-mud-sheet-mask?ID=2969637'
                },
                {
                    'thumb': 'N---------------A',
                    'vendor': 'FRENCH GIRL',
                    'product': 'Rose Lip Polish',
                    'link': 'https://N---------------A'
                },
                {
                    'thumb': 'postparty-thumb4.jpg',
                    'vendor': 'Lit Cosmetics',
                    'product': 'Glitter Pigment Lit Kit in Hello Sunshine',
                    'link': 'https://www.bloomingdales.com/shop/product/lit-cosmetics-glitter-pigment-lit-kit?ID=2677290'
                },
                {
                    'thumb': 'postparty-thumb5.jpg',
                    'vendor': 'RMS Beauty',
                    'product': 'Luminizer X Quad',
                    'link': 'https://www.bloomingdales.com/shop/product/rms-beauty-luminizer-x-quad?ID=2696053'
                }
            ]
        },

        'SportyStripes': {
            'heading': 'Sporty Stripes',
            'videoID': '5803290950001',
            'productslist': [
                {
                    'thumb': 'sporty-stripes-thumb1.jpg',
                    'vendor': 'SUVA Beauty',
                    'product': 'Hydra FX in Fanny Pack & Acid Trip',
                    'link': 'https://www.bloomingdales.com/shop/product/suva-beauty-hydra-fx?ID=2693416'
                },
                {
                    'thumb': 'sporty-stripes-thumb2.jpg',
                    'vendor': 'SUVA Beauty',
                    'product': 'Hydra FX in Acid Trip',
                    'link': 'https://www.bloomingdales.com/shop/product/suva-beauty-hydra-fx?ID=2693416'
                }
            ]
        },

        'TexturedTresses': {
            'heading': 'Textured Tresses',
            'videoID': '5804497081001',
            'productslist': [
                {
                    'thumb': 'N---------------A',
                    'vendor': 'Verb',
                    'product': 'Dry Shampoo',
                    'link': 'https://N---------------A'
                },
                {
                    'thumb': 'textured-tresses-thumb1.jpg',
                    'vendor': 'CONTEXT',
                    'product': 'Renew Styling Mist',
                    'link': 'https://www.bloomingdales.com/shop/product/context-renew-styling-mist?ID=2953408'
                },
                {
                    'thumb': 'textured-tresses-thumb2.jpg',
                    'vendor': 'Drybar',
                    'product': 'The Tiny Tress Press Detailing Iron',
                    'link': 'https://www.bloomingdales.com/shop/product/drybar-the-tiny-tress-press-detailing-iron?ID=2548967'
                },
                {
                    'thumb': 'textured-tresses-thumb3.jpg',
                    'vendor': 'Drybar',
                    'product': 'The Kicker Finishing Spray Wax',
                    'link': 'https://www.bloomingdales.com/shop/product/drybar-the-kicker-finishing-spray-wax?ID=2950536'
                },
                {
                    'thumb': 'textured-tresses-thumb4.jpg',
                    'vendor': 'Briogeo',
                    'product': 'Blossom & Bloom Ginseng + Biotin Volumizing Spray',
                    'link': 'https://www.bloomingdales.com/shop/product/briogeo-blossom-bloom-ginseng-biotin-volumizing-spray?ID=3013356'
                }
            ]
        },

        'WingedShadow': {
            'heading': 'Winged Shadow',
            'videoID': '5803295069001',
            'productslist': [
                {
                    'thumb': 'winged-shadow-thumb1.jpg',
                    'vendor': 'Lime Crime',
                    'product': 'Venus XL Palette',
                    'link': 'https://www.bloomingdales.com/shop/product/lime-crime-venus-xl-palette?ID=2899599'
                },
                {
                    'thumb': 'winged-shadow-thumb2.jpg',
                    'vendor': 'The Vamp Stamp',
                    'product': 'Vink Vortex Liquid Eyeliner in Rose & Bronze',
                    'link': 'https://www.bloomingdales.com/shop/product/index.ognc?ID=3074624'
                },
                {
                    'thumb': 'winged-shadow-thumb3.jpg',
                    'vendor': 'The Vamp Stamp',
                    'product': 'Vixen Wing Eyeliner Stamp',
                    'link': 'https://www.bloomingdales.com/shop/product/index.ognc?ID=2988124'
                }
            ]
        },


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
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/SUVA%20Beauty?id=1035059'
        },
        'The Vamp Stamp': {
            'theGlowDownCopy': 'Celebrity makeup artist Veronica Lorenz created this ingenious eyeliner tool when a medical condition weakened her grip. She devised a solution that didn’t require steady hands or years of practice: a stamp you coat in pigment and place on your lash line for a perfectly symmetrical cat-eye. Now there’s no more winging it when it comes to achieving the ideal line every time.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/the-vamp-stamp-vavavoom-medium-wing-eyeliner-stamp?ID=2649356',
            'bestsellerHeading': 'VaVaVoom Kitten Wing Stamp',
            'bestsellerCopy': 'You can do an even cat-eye without fail. Just dip the tool in ink and stamp it on your lid for the ultimate shortcut.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/The%20Vamp%20Stamp?id=1035059',
            'videoID': '5573561609001'
        },

        'Bon Parfumeur': {
            'theGlowDownCopy': 'Founder Ludovic Bonneton imagined his French perfume line as a fragrance wardrobe that could be mixed, matched and layered. The bottles are color-coded by category, including floral, fruity and woody, and the labels highlight the three main notes, making it super simple to find your signature scent.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/bon-parfumeur-eau-de-parfum-501?ID=2725818',
            'bestsellerHeading': 'Eau de Parfum 101',
            'bestsellerCopy': 'Earthy musk tempers romantic rose for a perfume that is both sweet and sophisticated.',
            'shopLinkUrl': 'https://www.bloomingdales.com/buy/bon-parfumeur'
        },
        'Drybar': {
            'theGlowDownCopy': 'As the founder of game-changing blowout chain Drybar, Alli Webb has made good hair her business. The salons’ signature yellow styling tools—like a powerful dryer that’s up to 20 percent faster than other professional tools—and products designed to make DIY styling a breeze are all you need to master any look from stick-straight to spirals—no appointment needed.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/drybar-detox-dry-shampoo-3.5-oz.?ID=173562',
            'bestsellerHeading': 'Detox Dry Shampoo',
            'bestsellerCopy': 'Microfine rice powders absorb oil to restore volume and instantly refresh hair—basically, it’s the ultimate blowout extender.',
            'shopLinkUrl': 'https://www.bloomingdales.com/buy/drybar'
        },
        'Too Cool for School': {
            'theGlowDownCopy': 'We’re not ashamed to admit that we totally judged a book by its cover—or, in this case, a mascara by its package. This unconventional Korean beauty brand collaborates with artists, so you’ll find whimsical drawings of dinosaurs on the CC creams and quirky cats on the lip balms. But there’s so much more than meets the eye: Egg-infused masks and moisturizers treat everything from acne to signs of aging, lip tints have epic staying power and cleansers deliver results that are beyond skin deep.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/too-cool-for-school-egg-cream-mask-hydration?ID=2788521',
            'bestsellerHeading': 'Egg Cream Mask Hydration',
            'bestsellerCopy': 'Egg extracts, coconut water, anti-agers and botanical extracts whip dry, dull skin into shape.',
            'shopLinkUrl': 'https://www.bloomingdales.com/buy/too-cool-for-school'
        },


        'Lano': {
            'heading': 'Lano',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/lano-lanolips-101-ointment-multipurpose-superbalm?ID=2648594',
            'bestsellerHeading': 'Lanolips 101 Ointment Multipurpose Superbalm',
            'bestsellerCopy': 'Do you ever dream about an all&dash;in&dash;one balm you can literally put anywhere? This is it—and there are more than 101 ways to use it.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Lano?id=1035059'
        },
        'beautyblender': {
            'heading': 'beautyblender',
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
        },
        'BioRepublic': {
            'heading': 'BioRepublic',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/biorepublic-lost-baggage-under-eye-emergency-repair-mask?ID=1667902',
            'bestsellerHeading': 'Lost Baggage Under Eye Emergency Repair Mask',
            'bestsellerCopy': 'Whether you’re recovering from a late night, facing an early morning or both, a few minutes with this peptide-packed eye treatment will breathe new life into tired eyes, hydrating and firming to send dark circles and bags packing.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/product/biorepublic-lost-baggage-under-eye-emergency-repair-mask?ID=1667902'
        },
        'Shhhowercap': {
            'heading': 'Shhhowercap',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/shhhowercap-nanotech-fabric-turban-shower-cap?ID=2423287',
            'bestsellerHeading': 'Nanotech Fabric Turban Shower Cap',
            'bestsellerCopy': 'Never before has a shower cap been called “chic!” This 100 percent waterproof upgrade keeps your hair frizz-free during even the steamiest of showers. The fabric repels moisture at a molecular level and the rubber grip protects your hairline so your blowout lives to see another day.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/product/shhhowercap-nanotech-fabric-turban-shower-cap?ID=2423287'
        },
        'Patchology': {
            'heading': 'Patchology',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/patchology-wink-a-kiss-flashpatch-5-minute-hydrogels?ID=2716599',
            'bestsellerHeading': 'Wink & A Kiss FlashPatch 5-Minute Hydrogels',
            'bestsellerCopy': 'Add this multitasking kit to your night-out prep. The Anytime Perk-Me-Up patches deliver caffeine and collagen to refresh eyes, while The Super Smooth Talker gels plump and soften lips with peptides and green tea extracts.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/product/patchology-wink-a-kiss-flashpatch-5-minute-hydrogels?ID=2716599'
        },
        'Preheels': {
            'heading': 'Preheels',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/preheels-blister-prevention-spray?ID=2635210',
            'bestsellerHeading': 'Women’s Blister Prevention Spray',
            'bestsellerCopy': 'Three years of scientific research resulted in this flexible, clear film that blocks shoe friction to stop blisters from forming. Just spray and let dry for a genius solution to breaking in new shoes or pesky rubbing.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/product/preheels-blister-prevention-spray?ID=2635210'
        },


        // 06,07 2018
        'FRENCH GIRL': {
            'theGlowDownCopy': 'Founder Kristeen Griffin&dash;Grimes spent her childhood on the coast of Washington surrounded by all things natural. Fast&dash;forward to adulthood, and Griffin&dash;Grimes found herself a tour guide in the south of France. The two worlds may be thousands of miles apart, but they&#39;re kindred in spirit: fields and farms, vines and flowers, and pure and wholesome living. Inspired by her travels, in 2010 she launched a beauty line made of organic and sustainable ingredients to appeal to the French girl in all of us. On those days you wish you could escape to a lavender field in Provence (i.e., every day), unleash your joie de vivre stateside and indulge in the decadent array of creams, oils and polishes.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/--0000000--?ID=2635210',
            'bestsellerHeading': 'Rose Lip Polish',
            'bestsellerCopy': 'The blend of sugar, shea butter, coconut oil and rose essential oil sloughs, hydrates and plumps your pout for a perfect muah every time. ',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/French%20Girl?id=1035059'
        },
        'Kopari Beauty': {
            'theGlowDownCopy': 'The Hawaiian brand calls coconut the "jack-of-all-fruits", and it’s easy to see why. Replete with fatty acids and rich in antioxidants that easily absorb into the skin, coconut oil leaves your whole body super hydrated and supple¬. But Kopari didn’t stop there: It combined pure, organic coconut oil with potent natural ingredients—all without sulfates, silicones, parabens or GMOs to really take its products to the next level. And the result? Multitasking marvels you can use from head to toe.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/kopari-beauty-organic-coconut-melt?ID=2989534',
            'bestsellerHeading': 'Organic Coconut Melt',
            'bestsellerCopy': 'The tub of 100% organic coconut oil is a workhorse: Use it as a hair mask, body moisturizer, makeup remover, dry shave oil, a bath boost, an under&dash;eye treatment and a stretch-mark preventer.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Kopari%20Beauty?id=1035059'
        },

        'Briogeo': {
            'theGlowDownCopy': 'The NYC&dash;based hair care label has won a serious following for hitting the sweet spot between natural and effective. Full of nourishing, clean ingredients, and free of sulfates, parabens, phthalates, silicones, DEA or synthetic color, these winning formulas address every hair need under the sun, whether your goal is to volumize, de&dash;frizz, repair or soothe. Add it all up and the mane attraction is clear: crazy good products you can confidently feel good about using.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/briogeo-dont-despair-repair-deep-conditioning-mask?ID=3004760',
            'bestsellerHeading': 'Don&#39;t Despair, Repair! Deep Conditioning Mask',
            'bestsellerCopy': 'The weekly treatment answers the SOS of straw-like strands with a luster-restoring blend of B vitamins, rosehip and argan oils, algae and biotin.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/Briogeo?id=1035059'
        },

        'STARSKIN': {
            'theGlowDownCopy': 'The skin care line sets the bar high: a visible difference in your complexion in one treatment. How now? Potent sheet masks, natch. Choose your mask by skin goal&mdash;plumping, hydrating, firming, brightening and more—and let the pampering begin. Cruelty&dash;free and made without parabens, phthalates, mineral oils, sulfates or synthetic dyes, the at-home treatments actually give you that "I woke up like this" star-quality skin.',
            'bestsellerImgLink': 'https://www.bloomingdales.com/shop/product/starskin-red-carpet-ready-hydrating-bio-cellulose-second-skin-face-mask?ID=2956691',
            'bestsellerHeading': 'Red Carpet Ready Hydrating Bio&dash;Cellulose Second Skin Face Mask',
            'bestsellerCopy': 'The 20&dash;minute sheet mask delivers a bottle&#39;s worth of skin serum for a supersmooth, plump complexion&mdash;no filter needed.',
            'shopLinkUrl': 'https://www.bloomingdales.com/shop/makeup-perfume-beauty/glowhaus-makeup-skin-care/Brand/STARSKIN?id=1035059'
        },

        'Verb': {
            'theGlowDownCopy': 'Launched by Austin-based stylists, this popular line is for those who want salon-quality hair care without the price tag&mdash;and let&#39;s be honest, who doesn&#39;t? Whether you&#39;re looking for volume, texture, curl definition or hydration, the collection is full of healthy&dash;hair ingredients like sunflower seed extract and olive oil, and free of any harsh stuff, like sulfates, parabens or gluten. Tack on that every product costs $16, and it&#39;s easy to see what all the hype is about.',
            'bestsellerImgLink': '__link__',
            'bestsellerHeading': 'Ghost Shampoo',
            'bestsellerCopy': 'We&#39;re all for products that ghost&mdash;aka disappear without a trace&mdash;and this wash delivers. Infused with moringa oil, it adds shine and smooths frizz without weighing down hair.',
            'shopLinkUrl': '__link__'
        }

    };

    // Video pages content
    var videoPagePics = [
        {'name': 'LacqueredLips', 'thumb': 'lacquered-lips.jpg', 'heading': 'Lacquered Lips'},
        {'name': 'PostParty', 'thumb': 'post-party.jpg', 'heading': 'Post-Party Skin Care Routine'},
        {'name': 'SportyStripes', 'thumb': 'sporty-stripes.jpg', 'heading': 'Sporty Stripes'},
        {'name': 'TexturedTresses', 'thumb': 'textured-tresses.jpg', 'heading': 'Textured Tresses'},
        {'name': 'WingedShadow', 'thumb': 'winged-shadow.jpg', 'heading': 'Winged Shadow'}
    ];

    // ----------- Pages data end


    var imagePlaceHolder = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // transparent

    var imgThumbsDir = '/b/fashion/campaigns/images/glowhaus/landing/thumbs/';
    var imgFullSizeDir = '/b/fashion/campaigns/images/glowhaus/landing/fullsize-img/';

    var videoProductsThumbsDir = '/b/fashion/campaigns/images/glowhaus/videos/products-thumbs/';

    var popupPageTemplateUrl = '/b/fashion/campaigns/images/glowhaus/html-popups/popup.html';

    var landingPageTileList = $('ul#glh-images-tile');
    var defaultThumbWidth = 280;
    var videoSelector = '.glh-video';

    var imgLinkText = "Shop the look";

    var videoAutoPlaySupported = function () {
        Modernizr.on('videoautoplay', function (result) {
            return result;
        });
    };


    var plyrPlayBtn = '<span class="plyr__play-large"><svg id="plyr-play" viewBox="0 0 18 18" width="100%" height="100%"><path d="M15.562 8.1L3.87.225C3.052-.337 2 .225 2 1.125v15.75c0 .9 1.052 1.462 1.87.9L15.563 9.9c.584-.45.584-1.35 0-1.8z"></path></svg><span class="plyr__sr-only">Play</span></span>';

    // remove/clear all list elements
    landingPageTileList.empty();

    shuffleArray(landingPopups);
    shuffleArray(landingPopupsVideos);

    var oneOrZero = 0;
    var ind = 0;

    // Distribute popupsVideos
    var step = Math.floor(landingPopups.length / landingPopupsVideos.length);
    for (var i = 0; i < landingPopupsVideos.length; i++) {
        oneOrZero = Math.round(Math.random());
        ind = i * step + i + step + oneOrZero;
        landingPopups.splice(ind, 0, landingPopupsVideos[i]);
    }

    // Distribute MP4s
    shuffleArray(landingPopupsGIFs);
    step = Math.floor(landingPopups.length / landingPopupsGIFs.length);
    for (var e = 0; e < landingPopupsGIFs.length; e++) {
        oneOrZero = Math.round(Math.random());
        ind = e * step + e + step + oneOrZero;
        landingPopups.splice(ind, 0, landingPopupsGIFs[e]);
    }

    // Distribute brand popups
    shuffleArray(landingPopupsBrands);
    var brandsShortList = landingPopupsBrands.slice(0, 30);
    for (var q = 0; q < brandsShortList.length; q++) {
        oneOrZero = Math.round(Math.random());
        ind = q * 2 + q + 1 + oneOrZero;
        landingPopups.splice(ind, 0, brandsShortList[q]);
    }

    // Distribute deco images
    shuffleArray(landingPopupsDeco);
    step = Math.floor(landingPopups.length / landingPopupsDeco.length);
    for (var y = 0; y < landingPopupsDeco.length; y++) {
        oneOrZero = Math.round(Math.random());
        ind = y * step + y + step + oneOrZero;
        landingPopups.splice(ind, 0, landingPopupsDeco[y]);
    }

    // Create landing page image tile
    $.each(landingPopups, function (i) {

        var tileItem = landingPopups[i];
        var media = tileItem.type;
        var originalHeight = tileItem.height;
        var fullSizeImg = imgFullSizeDir + tileItem.thumb.replace('-thumb', '');
        var thumbImg = imgThumbsDir + tileItem.thumb;
        var typeOfAction = tileItem.action;


        // analytics cm_sp tag
        var cm_sp_differentiated_sffx = '&cm_sp=' + imgLinkText.replace(/\s+/g, '-').toLowerCase() + '_' + Math.floor(Math.random() * 1000) + 1;
        var shopLink = tileItem.imgShopLink + cm_sp_differentiated_sffx;

        var setImgHeight = function (item) {
            var value = originalHeight * (item.width() / defaultThumbWidth);
            item.find('img').css('height', value);
            item.find('video').css('height', value);
        };

        var imgMarkup = '<img title="' + imgLinkText + '" alt="glowhaus generic photo ' + i + '" data-width="' + defaultThumbWidth +
            '" data-height="' + originalHeight +
            '" data-tmp-src="' + thumbImg +
            '" data-img-shop-link="' + shopLink +
            '" src="' + imagePlaceHolder + '">';

        var prodImgMarkup = '<img alt="' + tileItem.name + ' ' + i + '" data-width="' + defaultThumbWidth +
            '" data-height="' + originalHeight +
            '" data-tmp-src="' + thumbImg +
            '" src="' + imagePlaceHolder + '">';

        var imgItem, videoItem = '';

        if (media === 'img') {
            if (typeOfAction === 'img-popup') {
                //if (imgPopupsCounter < imgPopupsLimit) {
                imgItem = $('<li><a aria-haspopup="true" role="button" class="image-popup-link" data-name="POPUP-IMAGE" ' +
                    'href="' + fullSizeImg + '">' + imgMarkup + '</a></li>')
                    .appendTo(landingPageTileList);
                setImgHeight(imgItem);
                // imgPopupsCounter++;
                // }
            } else if (typeOfAction === 'html-video-popup') {
                imgItem = $('<li><a aria-haspopup="true" role="button" class="html-video-popup" data-name="' + tileItem.name + '" ' +
                    'href="' + popupPageTemplateUrl + '?v=' + i + '">' + imgMarkup +
                    '<span class="plyr-play-btn__holder">' + plyrPlayBtn + '</span>' +
                    '</a></li>')
                    .appendTo(landingPageTileList);
                setImgHeight(imgItem);
            } else if (typeOfAction === 'html-brand-popup') {
                imgItem = $('<li><a aria-haspopup="true" role="button" class="html-brand-popup no-play-btn" data-name="' + tileItem.name + '" ' +
                    'href="' + popupPageTemplateUrl + '?v=' + i + '">' + prodImgMarkup + '</a></li>')
                    .appendTo(landingPageTileList);
                setImgHeight(imgItem);
            }
        } else if (media === 'video') {
            if (videoAutoPlaySupported) {
                videoItem = $('<li class="glh-masonry-item__video-thumb"><video class="glh-video-thumb" autoplay playsinline loop data-width="' + defaultThumbWidth +
                    '" data-height="' + originalHeight +
                    '" data-tmp-src="' + thumbImg +
                    '" src="' + imagePlaceHolder + '"></video></li>')
                    .appendTo(landingPageTileList);
                setImgHeight(videoItem);
            } else {
                // show .jpg if .mp4 is not supported
                var videoThumb = thumbImg.substr(0, thumbImg.lastIndexOf('.')) + '.jpg';
                imgItem = $('<li class="glh-masonry-item__deco-item">' +
                    '<img alt="glowhaus generic photo" data-width="' + defaultThumbWidth +
                    '" data-height="' + originalHeight +
                    '" data-tmp-src="' + videoThumb +
                    '" src="' + imagePlaceHolder + '"></li>')
                    .appendTo(landingPageTileList);
                setImgHeight(imgItem);
            }
        } else if (media === 'deco') {
            imgItem = $('<li class="glh-masonry-item__deco-item">' + imgMarkup + '</li>').appendTo(landingPageTileList);
            setImgHeight(imgItem);
        }
    });


    $(window).resize(function () {
        $('ul#glh-images-tile li img, ul#glh-images-tile li video').each(function () {
            $(this).css('height', $(this).attr('data-height') * $('ul#glh-images-tile li').width() / $(this).attr('data-width'));
        });
    });


    //Images - Landing image-tile lazyload and appearance
    $('ul#glh-images-tile li img').each(function () {
        var img = $(this);
        var _delay = randomNumberFromRangeExt(100, 600) * 10;
        setTimeout(function () {
            img.renameAttr('data-tmp-src', 'data-src');
            img.on('lazyload', function () {
                $(this).addClass('animated fadeInUp');
                setTimeout(function () {
                    img.parent().find('.img-tile-patch').fadeIn(1000);
                    img.parent().find('.plyr-play-btn__holder').addClass('show');
                }, 1000);
            }).lazyLoadXT();
        }, _delay);
    });

    //Videos - Landing image-tile lazyload and appearance
    $('ul#glh-images-tile li video').each(function () {
        var video = $(this);
        var _delay = randomNumberFromRangeExt(100, 600) * 10;
        setTimeout(function () {
            video.renameAttr('data-tmp-src', 'data-src');
            video.lazyLoadXT();
            video.addClass('animated fadeInUp');
        }, _delay);
    });

    // ---------------------- Stick the patches

    var imgPopupLink = $('.image-popup-link');
    var patchesDir = '/b/fashion/campaigns/images/glowhaus/landing/patches/';
    var imgPopupLinkCount = imgPopupLink.length;
    var pathch1 = '<img  alt="glowhaus generic photo" style="display:none;z-index:996;left:calc(100% - 78px)" class="img-tile-patch top" src="' + patchesDir + 'patch1.svg">';
    var pathch2 = '<img  alt="glowhaus generic photo" style="display:none;z-index:996" class="img-tile-patch bottom" src="' + patchesDir + 'patch2.svg">';
    var pathch3 = '<img  alt="glowhaus generic photo" style="display:none;z-index:996" class="img-tile-patch top" src="' + patchesDir + 'patch3.svg">';
    var pathch4 = '<img  alt="glowhaus generic photo" style="display:none;z-index:996" class="img-tile-patch bottom" src="' + patchesDir + 'patch4.svg">';
    var pathchIndex = Math.floor(imgPopupLinkCount / 3);
    // pathch1
    imgPopupLink.eq(5).append(pathch1).css('z-index', '996').parent().css({'z-index':'996','transform': 'translate3d(0,0,0)'});
    // pathch2
    imgPopupLink.eq(pathchIndex).append(pathch2).css('z-index', '996').parent().css({'z-index':'996','transform': 'translate3d(0,0,0)'});
    // pathch3
    imgPopupLink.eq(pathchIndex * 2).append(pathch3).css('z-index', '996').parent().css({'z-index':'996','transform': 'translate3d(0,0,0)'});
    // pathch4
    imgPopupLink.eq(imgPopupLinkCount - 5).append(pathch4).css('z-index', '996').parent().css({'z-index':'996','transform': 'translate3d(0,0,0)'});


    //* ------------------------------------ IMAGE POPUP ------------------------------------- */

    var popupCloseBtnEvent = false;

    imgPopupLink.magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom',
        closeOnContentClick: true,
        zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out'
        },
        callbacks: {
            open: function (item) {
                popupCloseBtnEvent = false;
                // init coremetrics for close btn
                popupCloseBtnMetrics('close-btn_IMAGE-POPUP');

                $('.mfp-figure').find('img')
                    .on('load', function () {
                        $(this).attr('tabindex', '1').focus();
                    });
                $('.mfp-close').attr('tabindex', '0');

                // Image caption with "shop the look" link
                var imgShopLink = this.st.el.find('img').data('img-shop-link');
                $('.mfp-title').html('<a coremetrictag="shop-now_IMAGE-POPUP" href="' + imgShopLink + '">' + imgLinkText + '</a>');

                adobeAnalytics.fireTealiumLinkTag({
                    'page_name' : 'image popup'
                });
            },
            close: function () {
                if (!popupCloseBtnEvent) {
                    $.fn.coreTag('Element', 'closed-on-background-click__IMAGE-POPUP');
                }
                $('.mfp-title').html('');

                adobeAnalytics.fireTealiumLinkTag({
                    'event_name' : 'popup closed'
                });
            }
        }
    });

    /* ------------------------------------- HTML POPUP -------------------------------------- */

    var videoPageTileList = $('.glh-videos-list');
    var videoPageIndexPicsDir = '/b/fashion/campaigns/images/glowhaus/videos/index-thumbs/';
    var brandsPageIndexPicsDir = '/b/fashion/campaigns/images/glowhaus/learn/featured-brands/';
    var productPageToOpen = '';
    var productPageToOpenCleanName = '';
    var currentVideoCompleted = false;
    var currentVideoLaunched = false;

    var currentVideoPosition = 0;
    var totalDuration = 0;

    var videoPlayerOptions = {
        iconUrl: '/b/fashion/campaigns/images/glowhaus/assets/plyr.svg',
        tooltips: {controls: true},
        captions: {defaultActive: true}
    };

    var getVideoPosterAndSrc = function (data) {
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
        _container.find('video')
            .on('pause', function (e) {
                var videoDuratiion = e.target.duration;
                var videoCurrentTime = e.target.currentTime;
                //to avoid firing pause and ended events in the same time
                if (videoCurrentTime < videoDuratiion) {
                    coreMetricsForVideo('video-' + productPageToOpenCleanName, 'video_Pause', videoCurrentTime);
                    adobeAnalytics.fireTealiumVideoTag('video pause', productPageToOpenCleanName, videoDuratiion, videoCurrentTime);
                }
            })
            .on('play', function (e) {
                currentVideoLaunched = true;
                coreMetricsForVideo('video-' + productPageToOpenCleanName, 'video_Play', e.target.currentTime);
                adobeAnalytics.fireTealiumVideoTag('video play', productPageToOpenCleanName, e.target.duration, e.target.currentTime);
            })
            .on('timeupdate', function (e) {
                currentVideoPosition = e.target.currentTime;
            })
            .on('ended', function (e) {
                currentVideoCompleted = true;
                coreMetricsForVideo('video-' + productPageToOpenCleanName, 'video_Completed', e.target.currentTime);
                adobeAnalytics.fireTealiumVideoTag('video completion', productPageToOpenCleanName, e.target.duration, e.target.currentTime);
            });
    };

    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function() {
        var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
        var event = state ? 'video full screen on' : 'video full screen off';

        adobeAnalytics.fireTealiumViewTag({
            'event_name': event,
            'video_name': productPageToOpenCleanName
        });
    });

    var videoMarkup = function (_data) {
        var videoPosterSrc = getVideoPosterAndSrc(_data).videoPosterSrc;
        var videoSrc = getVideoPosterAndSrc(_data).videoSrc;
        return '<video class="glh-video" poster="' + videoPosterSrc + '" controls>' +
            '<source src="' + videoSrc + '" type="video/mp4">' +
            '<a href="' + videoSrc + '" download>Download</a></video>';
    };

    var videoSetupWrapper = function (_data) {
        var popupVideoContainer = $('.glh-popup__video-container');
        popupVideoContainer.append(videoMarkup(_data));
        setUpVideoEvents(popupVideoContainer);
        plyr.setup(document.querySelector(videoSelector), videoPlayerOptions);

        adobeAnalytics.fireTealiumViewTag({
            'event_name': 'video launch',
            'video_name': productPageToOpenCleanName,
            'video_length': _data.duration
        });
    };


    // Create Video page image tile

    videoPageTileList.empty();

    $.each(videoPagePics, function (i) {
        var picHeading = videoPagePics[i].heading;
        $('<li><a aria-haspopup="true" role="button" class="glh-videos-tutorial-item play-video-btn" data-name="' + videoPagePics[i].name + '" href="' + popupPageTemplateUrl +
            '"><span class="videos-list-item__img-wrapper"><img alt="' + picHeading + '" src="' + videoPageIndexPicsDir + videoPagePics[i].thumb + '">' +
            plyrPlayBtn +
            '</span>' +
            '<h5 class="glh-videos-tutorial-item__label">' + picHeading + '</h5></a>' +
            '</li>').appendTo(videoPageTileList);
    });


    $('.html-video-popup, .glh-videos-tutorial-item').magnificPopup({
        type: 'ajax',
        removalDelay: 300,
        mainClass: 'mfp-fade',
        callbacks: {
            beforeOpen: function () {
                productPageToOpen = this.st.el.attr('data-name');
                productPageToOpenCleanName = productPageToOpen.toUpperCase().replace(/[^A-Z0-9]/ig, '-');

                adobeAnalytics.fireTealiumLinkTag({
                    'page_name' : 'video popup',
                    'video_name' : videoPagePopupsData[productPageToOpen].heading
                });

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
                    coreMetricsForVideo('video-' + productPageToOpenCleanName, 'video_Aborted', currentVideoPosition);
                }

                adobeAnalytics.fireTealiumLinkTag({
                    'event_name' : 'popup closed'
                });
                adobeAnalytics.fireTealiumVideoTag('video player closed', videoPagePopupsData[productPageToOpen].heading, totalDuration, currentVideoPosition);

                currentVideoCompleted = false;
                currentVideoLaunched = false;
                currentVideoPosition = 0;
                totalDuration = 0;
            },
            ajaxContentAdded: function () {

                var prodName = videoPagePopupsData[productPageToOpen].heading;
                var ajaxPopup = $('#ajax-popup-div');
                ajaxPopup.focus();

                ajaxPopup.attr('aria-labelledby', prodName);

                popupCloseBtnMetrics('close-btn_VIDEO-POPUP_' + productPageToOpenCleanName);

                //Video page – heading
                $('.glh-popup__brand-heading').html(prodName);

                //Video page – product's list
                var thisProductName = productPageToOpen.toLowerCase();
                //var thisProductPath = videoProductsThumbsDir + thisProductName + '/' + thisProductName + '-';
                var thisProductPath = videoProductsThumbsDir + thisProductName + '/';
                var prodList = videoPagePopupsData[productPageToOpen].productslist;
                $('.ghl-thumbs-links-list').empty();
                $.each(prodList, function (item) {
                    var _item = prodList[item];
                    var itemTitle = _item.vendor;
                    var cm_sp_link = '&cm_sp=shop-' + itemTitle.replace(/\s+/g, '-').toLowerCase();
                    $('.ghl-thumbs-links-list').append('<li><a coremetricTag="shop-product_' + itemTitle.toUpperCase().replace(/[^A-Z0-9]/ig, '-') + '" ' +
                        'href="' + _item.link + cm_sp_link + '">' +
                        '<img alt="' + itemTitle + '" src="' + thisProductPath + _item.thumb + '">' +
                        '<h5>' + itemTitle + '</h5>' +
                        '<p>' + _item.product + '</p></a></li>');
                });

                $('.ghl-thumbs-links-list a').on('click', function () {
                    $.fn.coreTag('Element', $(this).attr("coremetrictag"));
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

                adobeAnalytics.fireTealiumLinkTag({
                    'page_name' : productPageToOpenCleanName + ' popup'
                });

            },
            open: function () {
                popupCloseBtnEvent = false;
                // init coremetrics for close btn
                popupCloseBtnMetrics(productPageToOpenCleanName);

            },
            close: function () {
                adobeAnalytics.fireTealiumLinkTag({
                    'event_name' : 'popup closed'
                });
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

                var ajaxPopup = $('#ajax-popup-div');
                ajaxPopup.focus();

                var cormetricsValue = productPageToOpen.toUpperCase().replace(/[^A-Z0-9]/ig, '-');

                popupCloseBtnMetrics('close-btn_BRAND-POPUP_' + cormetricsValue);

                $('.ghl-thumbs-links-list').empty();

                var brandsPageItem = brandsPagePopupsData[productPageToOpen];

                //Brand page – heading

                var brandsPageItemHeading = brandsPageItem.heading;
                var popupBrandHeading = $('.glh-popup__brand-heading');
                popupBrandHeading.attr('aria-label', productPageToOpen);

                if (brandsPageItemHeading == undefined) {

                    ajaxPopup.attr('aria-labelledby', productPageToOpen);

                    var brandLogoUrl = brandsPageIndexPicsDir + productPageToOpen.toLowerCase().replace(/\s/g, '') + '-logo.jpg';

                    popupBrandHeading.html('<img alt="' + productPageToOpen + ' logo" src="' + brandLogoUrl + '">');

                    var theGlowDownDescription = '<h2 class="glh-popup__subheading">The Glow-Down:</h2><p class="glh-popup__description-copy">' + brandsPageItem.theGlowDownCopy + '</p>';
                    $('.glh-popup__theglowdown-description').html(theGlowDownDescription);

                    // analytics cm_sp tag
                    var cm_sp_name = '&cm_sp=shop-' + productPageToOpen.replace(/\s+/g, '-').toLowerCase();
                    // resolve '.' and '!' issue in product's name
                    if (productPageToOpen === 'The Better Skin Co') {
                        $('.glh-popup__shop-link-holder').html('<a coremetricTag="shop-now-' + cormetricsValue + '" ' +
                            'class="glh-popup__shop-link" href="' + brandsPageItem.shopLinkUrl + cm_sp_name + '">Shop ' + productPageToOpen + '.</a>');
                    } else if (productPageToOpen === 'Supergoop') {
                        $('.glh-popup__shop-link-holder').html('<a coremetricTag="shop-now-' + cormetricsValue + '" ' +
                            'class="glh-popup__shop-link" href="' + brandsPageItem.shopLinkUrl + cm_sp_name + '">Shop ' + productPageToOpen + '!</a>');
                    } else {
                        $('.glh-popup__shop-link-holder').html('<a coremetricTag="shop-now-' + cormetricsValue + '" ' +
                            'class="glh-popup__shop-link" href="' + brandsPageItem.shopLinkUrl + cm_sp_name + '">Shop ' + productPageToOpen + '</a>');
                    }
                } else {
                    popupBrandHeading.html(brandsPageItemHeading);
                    ajaxPopup.attr('aria-labelledby', brandsPageItemHeading);

                    // analytics cm_sp tag
                    var cm_sp_differentiated_name = '&cm_sp=shop-now_' + Math.floor(Math.random() * 1000) + 1;
                    $('.glh-popup__shop-link-holder').html('<a coremetricTag="shop-now-' + cormetricsValue + '" ' +
                        'class="glh-popup__shop-link cm-sp-shop-now" href="' + brandsPageItem.shopLinkUrl + cm_sp_differentiated_name + '">Shop Now</a>');
                }


                var bestsellerImgUrl = brandsPageIndexPicsDir + productPageToOpen.toLowerCase().replace(/\s/g, '') + '-product.jpg';
                // analytics cm_sp image-link tag
                var cm_sp_image_link = '&cm_sp=' + productPageToOpen.replace(/\s+/g, '-').toLowerCase() + '_image';
                $('.glh-popup__bestseller-img-holder').html('<a coremetricTag="shop-product_image-link_' + cormetricsValue + '" ' +
                    'href="' + brandsPageItem.bestsellerImgLink + cm_sp_image_link + '">' +
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


    //*  ----------- Landing page "go to url" transition
    $('.bye-bye').on('click', function (e) {
        if ($(window).width() >= 767) {
            e.preventDefault();
            var goTo = $(this).attr('href');

            $('ul#glh-images-tile li').children().each(function () {
                var _delay = randomNumberFromRangeExt(50, 150) * 10;
                var self = $(this);
                setTimeout(function () {
                    self.removeClass('fadeInUp').addClass('animated fadeOutDown');
                }, _delay);
            });

            // max delay 1500 plus 'animated fadeOutDown' default duration 1000
            setTimeout(function () {
                window.location = goTo;
            }, 2500);
        }
    });


    // ----------- Utils

    function coreMetricsForVideo(tag_value, attribute16_value, attribute17_value) {
        var categoryID = "spring18_glowhaus";
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


    function popupCloseBtnMetrics(coremetricsTagValue) {
        var closeBtn = $('.mfp-close');
        closeBtn.attr('aria-label', 'Close dialog');
        closeBtn.attr('coremetricTag', coremetricsTagValue)
            .on('click', function () {
                popupCloseBtnEvent = true;
                $.fn.coreTag('Element', $(this).attr("coremetrictag"));
            });
        closeBtn.html('&#215;');
    }

    function randomNumberFromRangeExt(min, max) {
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

});
