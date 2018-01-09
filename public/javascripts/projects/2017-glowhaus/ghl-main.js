/* jshint ignore:start */
//Custom Modernizr build to check video autoplay support
!function(A,e,o){function t(A,e){return typeof A===e}function n(){var A,e,o,n,a,l,i;for(var r in s)if(s.hasOwnProperty(r)){if(A=[],e=s[r],e.name&&(A.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(o=0;o<e.options.aliases.length;o++)A.push(e.options.aliases[o].toLowerCase());for(n=t(e.fn,"function")?e.fn():e.fn,a=0;a<A.length;a++)l=A[a],i=l.split("."),1===i.length?Modernizr[i[0]]=n:(!Modernizr[i[0]]||Modernizr[i[0]]instanceof Boolean||(Modernizr[i[0]]=new Boolean(Modernizr[i[0]])),Modernizr[i[0]][i[1]]=n),c.push((n?"":"no-")+i.join("-"))}}function a(A){var e=h.className,o=Modernizr._config.classPrefix||"";if(R&&(e=e.baseVal),Modernizr._config.enableJSClass){var t=new RegExp("(^|\\s)"+o+"no-js(\\s|$)");e=e.replace(t,"$1"+o+"js$2")}Modernizr._config.enableClasses&&(e+=" "+o+A.join(" "+o),R?h.className.baseVal=e:h.className=e)}function l(){return"function"!=typeof e.createElement?e.createElement(arguments[0]):R?e.createElementNS.call(e,"http://www.w3.org/2000/svg",arguments[0]):e.createElement.apply(e,arguments)}function i(A,e){if("object"==typeof A)for(var o in A)d(A,o)&&i(o,A[o]);else{A=A.toLowerCase();var t=A.split("."),n=Modernizr[t[0]];if(2==t.length&&(n=n[t[1]]),"undefined"!=typeof n)return Modernizr;e="function"==typeof e?e():e,1==t.length?Modernizr[t[0]]=e:(!Modernizr[t[0]]||Modernizr[t[0]]instanceof Boolean||(Modernizr[t[0]]=new Boolean(Modernizr[t[0]])),Modernizr[t[0]][t[1]]=e),a([(e&&0!=e?"":"no-")+t.join("-")]),Modernizr._trigger(A,e)}return Modernizr}var c=[],s=[],r={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(A,e){var o=this;setTimeout(function(){e(o[A])},0)},addTest:function(A,e,o){s.push({name:A,fn:e,options:o})},addAsyncTest:function(A){s.push({name:null,fn:A})}},Modernizr=function(){};Modernizr.prototype=r,Modernizr=new Modernizr;var h=e.documentElement,R="svg"===h.nodeName.toLowerCase();Modernizr.addTest("video",function(){var A=l("video"),e=!1;try{e=!!A.canPlayType,e&&(e=new Boolean(e),e.ogg=A.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),e.h264=A.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),e.webm=A.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),e.vp9=A.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),e.hls=A.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(o){}return e});var d;!function(){var A={}.hasOwnProperty;d=t(A,"undefined")||t(A.call,"undefined")?function(A,e){return e in A&&t(A.constructor.prototype[e],"undefined")}:function(e,o){return A.call(e,o)}}(),r._l={},r.on=function(A,e){this._l[A]||(this._l[A]=[]),this._l[A].push(e),Modernizr.hasOwnProperty(A)&&setTimeout(function(){Modernizr._trigger(A,Modernizr[A])},0)},r._trigger=function(A,e){if(this._l[A]){var o=this._l[A];setTimeout(function(){var A,t;for(A=0;A<o.length;A++)(t=o[A])(e)},0),delete this._l[A]}},Modernizr._q.push(function(){r.addTest=i}),Modernizr.addAsyncTest(function(){function A(l){n++,clearTimeout(e);var c=l&&"playing"===l.type||0!==a.currentTime;return!c&&t>n?void(e=setTimeout(A,o)):(a.removeEventListener("playing",A,!1),i("videoautoplay",c),void(a.parentNode&&a.parentNode.removeChild(a)))}var e,o=200,t=5,n=0,a=l("video"),c=a.style;if(!(Modernizr.video&&"autoplay"in a))return void i("videoautoplay",!1);c.position="absolute",c.height=0,c.width=0;try{if(Modernizr.video.ogg)a.src="data:video/ogg;base64,T2dnUwACAAAAAAAAAABmnCATAAAAAHDEixYBKoB0aGVvcmEDAgEAAQABAAAQAAAQAAAAAAAFAAAAAQAAAAAAAAAAAGIAYE9nZ1MAAAAAAAAAAAAAZpwgEwEAAAACrA7TDlj///////////////+QgXRoZW9yYSsAAABYaXBoLk9yZyBsaWJ0aGVvcmEgMS4xIDIwMDkwODIyIChUaHVzbmVsZGEpAQAAABoAAABFTkNPREVSPWZmbXBlZzJ0aGVvcmEtMC4yOYJ0aGVvcmG+zSj3uc1rGLWpSUoQc5zmMYxSlKQhCDGMYhCEIQhAAAAAAAAAAAAAEW2uU2eSyPxWEvx4OVts5ir1aKtUKBMpJFoQ/nk5m41mUwl4slUpk4kkghkIfDwdjgajQYC8VioUCQRiIQh8PBwMhgLBQIg4FRba5TZ5LI/FYS/Hg5W2zmKvVoq1QoEykkWhD+eTmbjWZTCXiyVSmTiSSCGQh8PB2OBqNBgLxWKhQJBGIhCHw8HAyGAsFAiDgUCw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDAwPEhQUFQ0NDhESFRUUDg4PEhQVFRUOEBETFBUVFRARFBUVFRUVEhMUFRUVFRUUFRUVFRUVFRUVFRUVFRUVEAwLEBQZGxwNDQ4SFRwcGw4NEBQZHBwcDhATFhsdHRwRExkcHB4eHRQYGxwdHh4dGxwdHR4eHh4dHR0dHh4eHRALChAYKDM9DAwOExo6PDcODRAYKDlFOA4RFh0zV1A+EhYlOkRtZ00YIzdAUWhxXDFATldneXhlSFxfYnBkZ2MTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTEhIVGRoaGhoSFBYaGhoaGhUWGRoaGhoaGRoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhESFh8kJCQkEhQYIiQkJCQWGCEkJCQkJB8iJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQREhgvY2NjYxIVGkJjY2NjGBo4Y2NjY2MvQmNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRISEhUXGBkbEhIVFxgZGxwSFRcYGRscHRUXGBkbHB0dFxgZGxwdHR0YGRscHR0dHhkbHB0dHR4eGxwdHR0eHh4REREUFxocIBERFBcaHCAiERQXGhwgIiUUFxocICIlJRcaHCAiJSUlGhwgIiUlJSkcICIlJSUpKiAiJSUlKSoqEBAQFBgcICgQEBQYHCAoMBAUGBwgKDBAFBgcICgwQEAYHCAoMEBAQBwgKDBAQEBgICgwQEBAYIAoMEBAQGCAgAfF5cdH1e3Ow/L66wGmYnfIUbwdUTe3LMRbqON8B+5RJEvcGxkvrVUjTMrsXYhAnIwe0dTJfOYbWrDYyqUrz7dw/JO4hpmV2LsQQvkUeGq1BsZLx+cu5iV0e0eScJ91VIQYrmqfdVSK7GgjOU0oPaPOu5IcDK1mNvnD+K8LwS87f8Jx2mHtHnUkTGAurWZlNQa74ZLSFH9oF6FPGxzLsjQO5Qe0edcpttd7BXBSqMCL4k/4tFrHIPuEQ7m1/uIWkbDMWVoDdOSuRQ9286kvVUlQjzOE6VrNguN4oRXYGkgcnih7t13/9kxvLYKQezwLTrO44sVmMPgMqORo1E0sm1/9SludkcWHwfJwTSybR4LeAz6ugWVgRaY8mV/9SluQmtHrzsBtRF/wPY+X0JuYTs+ltgrXAmlk10xQHmTu9VSIAk1+vcvU4ml2oNzrNhEtQ3CysNP8UeR35wqpKUBdGdZMSjX4WVi8nJpdpHnbhzEIdx7mwf6W1FKAiucMXrWUWVjyRf23chNtR9mIzDoT/6ZLYailAjhFlZuvPtSeZ+2oREubDoWmT3TguY+JHPdRVSLKxfKH3vgNqJ/9emeEYikGXDFNzaLjvTeGAL61mogOoeG3y6oU4rW55ydoj0lUTSR/mmRhPmF86uwIfzp3FtiufQCmppaHDlGE0r2iTzXIw3zBq5hvaTldjG4CPb9wdxAme0SyedVKczJ9AtYbgPOzYKJvZZImsN7ecrxWZg5dR6ZLj/j4qpWsIA+vYwE+Tca9ounMIsrXMB4Stiib2SPQtZv+FVIpfEbzv8ncZoLBXc3YBqTG1HsskTTotZOYTG+oVUjLk6zhP8bg4RhMUNtfZdO7FdpBuXzhJ5Fh8IKlJG7wtD9ik8rWOJxy6iQ3NwzBpQ219mlyv+FLicYs2iJGSE0u2txzed++D61ZWCiHD/cZdQVCqkO2gJpdpNaObhnDfAPrT89RxdWFZ5hO3MseBSIlANppdZNIV/Rwe5eLTDvkfWKzFnH+QJ7m9QWV1KdwnuIwTNtZdJMoXBf74OhRnh2t+OTGL+AVUnIkyYY+QG7g9itHXyF3OIygG2s2kud679ZWKqSFa9n3IHD6MeLv1lZ0XyduRhiDRtrNnKoyiFVLcBm0ba5Yy3fQkDh4XsFE34isVpOzpa9nR8iCpS4HoxG2rJpnRhf3YboVa1PcRouh5LIJv/uQcPNd095ickTaiGBnWLKVWRc0OnYTSyex/n2FofEPnDG8y3PztHrzOLK1xo6RAml2k9owKajOC0Wr4D5x+3nA0UEhK2m198wuBHF3zlWWVKWLN1CHzLClUfuoYBcx4b1llpeBKmbayaR58njtE9onD66lUcsg0Spm2snsb+8HaJRn4dYcLbCuBuYwziB8/5U1C1DOOz2gZjSZtrLJk6vrLF3hwY4Io9xuT/ruUFRSBkNtUzTOWhjh26irLEPx4jPZL3Fo3QrReoGTTM21xYTT9oFdhTUIvjqTkfkvt0bzgVUjq/hOYY8j60IaO/0AzRBtqkTS6R5ellZd5uKdzzhb8BFlDdAcrwkE0rbXTOPB+7Y0FlZO96qFL4Ykg21StJs8qIW7h16H5hGiv8V2Cflau7QVDepTAHa6Lgt6feiEvJDM21StJsmOH/hynURrKxvUpQ8BH0JF7BiyG2qZpnL/7AOU66gt+reLEXY8pVOCQvSsBtqZTNM8bk9ohRcwD18o/WVkbvrceVKRb9I59IEKysjBeTMmmbA21xu/6iHadLRxuIzkLpi8wZYmmbbWi32RVAUjruxWlJ//iFxE38FI9hNKOoCdhwf5fDe4xZ81lgREhK2m1j78vW1CqkuMu/AjBNK210kzRUX/B+69cMMUG5bYrIeZxVSEZISmkzbXOi9yxwIfPgdsov7R71xuJ7rFcACjG/9PzApqFq7wEgzNJm2suWESPuwrQvejj7cbnQxMkxpm21lUYJL0fKmogPPqywn7e3FvB/FCNxPJ85iVUkCE9/tLKx31G4CgNtWTTPFhMvlu8G4/TrgaZttTChljfNJGgOT2X6EqpETy2tYd9cCBI4lIXJ1/3uVUllZEJz4baqGF64yxaZ+zPLYwde8Uqn1oKANtUrSaTOPHkhvuQP3bBlEJ/LFe4pqQOHUI8T8q7AXx3fLVBgSCVpMba55YxN3rv8U1Dv51bAPSOLlZWebkL8vSMGI21lJmmeVxPRwFlZF1CpqCN8uLwymaZyjbXHCRytogPN3o/n74CNykfT+qqRv5AQlHcRxYrC5KvGmbbUwmZY/29BvF6C1/93x4WVglXDLFpmbapmF89HKTogRwqqSlGbu+oiAkcWFbklC6Zhf+NtTLFpn8oWz+HsNRVSgIxZWON+yVyJlE5tq/+GWLTMutYX9ekTySEQPLVNQQ3OfycwJBM0zNtZcse7CvcKI0V/zh16Dr9OSA21MpmmcrHC+6pTAPHPwoit3LHHqs7jhFNRD6W8+EBGoSEoaZttTCZljfduH/fFisn+dRBGAZYtMzbVMwvul/T/crK1NQh8gN0SRRa9cOux6clC0/mDLFpmbarmF8/e6CopeOLCNW6S/IUUg3jJIYiAcDoMcGeRbOvuTPjXR/tyo79LK3kqqkbxkkMRAOB0GODPItnX3Jnxro/25Ud+llbyVVSN4ySGIgHA6DHBnkWzr7kz410f7cqO/Syt5KqpFVJwn6gBEvBM0zNtZcpGOEPiysW8vvRd2R0f7gtjhqUvXL+gWVwHm4XJDBiMpmmZtrLfPwd/IugP5+fKVSysH1EXreFAcEhelGmbbUmZY4Xdo1vQWVnK19P4RuEnbf0gQnR+lDCZlivNM22t1ESmopPIgfT0duOfQrsjgG4tPxli0zJmF5trdL1JDUIUT1ZXSqQDeR4B8mX3TrRro/2McGeUvLtwo6jIEKMkCUXWsLyZROd9P/rFYNtXPBli0z398iVUlVKAjFlY437JXImUTm2r/4ZYtMy61hf16RPJIU9nZ1MABAwAAAAAAAAAZpwgEwIAAABhp658BScAAAAAAADnUFBQXIDGXLhwtttNHDhw5OcpQRMETBEwRPduylKVB0HRdF0A";else{if(!Modernizr.video.h264)return void i("videoautoplay",!1);a.src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAAs1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0OCByMjYwMSBhMGNkN2QzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNSAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTEgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAgAAAAIAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAGQAAAAAAAEAAAAAAZBtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACgAAAAEAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAE7bWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAA+3N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAgACAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAr/4QAYZ2QACqzZX4iIhAAAAwAEAAADAFA8SJZYAQAGaOvjyyLAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAQAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAABRzdHN6AAAAAAAAAsUAAAABAAAAFHN0Y28AAAAAAAAAAQAAADAAAABidWR0YQAAAFptZXRhAAAAAAAAACFoZGxyAAAAAAAAAABtZGlyYXBwbAAAAAAAAAAAAAAAAC1pbHN0AAAAJal0b28AAAAdZGF0YQAAAAEAAAAATGF2ZjU2LjQwLjEwMQ=="}}catch(s){return void i("videoautoplay",!1)}a.setAttribute("autoplay",""),a.style.cssText="display:none",h.appendChild(a),setTimeout(function(){a.addEventListener("playing",A,!1),e=setTimeout(A,o)},0)}),n(),a(c),delete r.addTest,delete r.addAsyncTest;for(var E=0;E<Modernizr._q.length;E++)Modernizr._q[E]();A.Modernizr=Modernizr}(window,document);

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
        {'type':  'deco',  'thumb': 'deco-09.jpg',   'height': 143},
        {'type':  'deco',  'thumb': 'deco-10.jpg',   'height': 211},
        {'type':  'deco',  'thumb': 'deco-11.jpg',   'height': 80},
        {'type':  'deco',  'thumb': 'deco-12.jpg',   'height': 91},
        {'type':  'deco',  'thumb': 'deco-13.jpg',   'height': 68},

        {'type':  'deco',  'thumb': 'deco-15.jpg',   'height': 183},
        {'type':  'deco',  'thumb': 'deco-16.jpg',   'height': 92},
        {'type':  'deco',  'thumb': 'deco-17.jpg',   'height': 60},
        {'type':  'deco',  'thumb': 'deco-18.jpg',   'height': 171},

        {'type':  'deco',  'thumb': 'deco-19.jpg',   'height': 151},
        {'type':  'deco',  'thumb': 'deco-20.jpg',   'height': 151},
        {'type':  'deco',  'thumb': 'deco-21.jpg',   'height': 151},
        {'type':  'deco',  'thumb': 'deco-22.jpg',   'height': 128},
        {'type':  'deco',  'thumb': 'deco-23.jpg',   'height': 108},


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


    var imagePlaceHolder       = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // transparent

    var imgThumbsDir           = '/b/fashion/images/projects/2017-glowhaus/landing/thumbs/';
    var imgFullSizeDir         = '/b/fashion/images/projects/2017-glowhaus/landing/fullsize-img/';

    var videoProductsThumbsDir = '/b/fashion/images/projects/2017-glowhaus/videos/products-thumbs/';

    var popupPageTemplateUrl   = '/b/fashion/images/projects/2017-glowhaus/html-popups/popup.html';
    
    var landingPageTileList  = $('ul#glh-images-tile');
    var defaultThumbWidth    = 280;
    var videoSelector = '.glh-video';

    var videoAutoPlaySupported = function () {
        Modernizr.on('videoautoplay', function (result) {
            return result;
        });
    };

    // remove/clear all list elements
    landingPageTileList.empty();
    shuffleArray(landingPagePics);
    shuffleArray(landingPagePics);

    var imgPopupsCounter = 0;
    //var itemsCounter = 0;

    var plyrPlayBtn = '<span class="plyr__play-large"><svg id="plyr-play" viewBox="0 0 18 18" width="100%" height="100%"><path d="M15.562 8.1L3.87.225C3.052-.337 2 .225 2 1.125v15.75c0 .9 1.052 1.462 1.87.9L15.563 9.9c.584-.45.584-1.35 0-1.8z"></path></svg><span class="plyr__sr-only">Play</span></span>';

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
        
        var imgMarkup = '<img alt="glowhaus generic photo ' + i + '" data-width="' + defaultThumbWidth +
            '" data-height="' + originalHeight +
            '" data-tmp-src="' + thumbImg +
            '" src="' + imagePlaceHolder + '">';

        var prodImgMarkup = '<img alt="' + tileItem.name + ' ' + i + '" data-width="' + defaultThumbWidth +
            '" data-height="' + originalHeight +
            '" data-tmp-src="' + thumbImg +
            '" src="' + imagePlaceHolder + '">';

        var imgItem, videoItem = '';
        if (media === 'img') {
            if (typeOfAction === 'img-popup') {
                if (imgPopupsCounter < 36) {
                    imgItem = $('<li><a aria-haspopup="true" role="button" class="image-popup-link" data-name="POPUP-IMAGE" ' +
                        'href="' + fullSizeImg + '">' +  imgMarkup + '</a></li>')
                        .appendTo(landingPageTileList);
                    setImgHeight(imgItem);
                    imgPopupsCounter++;
                }
            } else if (typeOfAction === 'html-video-popup') {
                imgItem = $('<li><a aria-haspopup="true" role="button" class="html-video-popup" data-name="' + tileItem.name + '" ' +
                    'href="' + popupPageTemplateUrl + '?v=' + i +'">' +  imgMarkup +
                    '<span class="plyr-play-btn__holder">' + plyrPlayBtn + '</span>' +
                    '</a></li>')
                    .appendTo(landingPageTileList);
                setImgHeight(imgItem);
            }else if (typeOfAction === 'html-brand-popup') {
                imgItem = $('<li><a aria-haspopup="true" role="button" class="html-brand-popup no-play-btn" data-name="' + tileItem.name + '" ' +
                    'href="' + popupPageTemplateUrl + '?v=' + i +'">' +  prodImgMarkup + '</a></li>')
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
            imgItem = $('<li class="glh-masonry-item__deco-item">' +  imgMarkup + '</li>')
                .appendTo(landingPageTileList);
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
            /*
            video.on('click', function(){
                $('.glh-video-thumb').each(function() {
                    $(this).removeAttr('loop').get(0).pause();
                    //$(this).get(0).pause();
                });
            });
            */
        }, _delay);
    });

    // ---------------------- Stick the patches
    var imgPopupLink = $('.image-popup-link');
    var patchesDir        = '/b/fashion/images/projects/2017-glowhaus/landing/patches/';
    var patchesNumber     = 4;
    var imgPopupLinkCount =  imgPopupLink.length;
    for (var q = 1; q <= patchesNumber; q++) {
        var index = getRandomInt(1, imgPopupLinkCount);
        var patch = '';
        if (isOdd(q) === 1) {
            patch = '<img  alt="glowhaus generic photo' + q + '" style="display:none;z-index:996" class="img-tile-patch top" src="' + patchesDir + 'patch' + q + '.svg">';
        } else {
            patch = '<img  alt="glowhaus generic photo' + q + '" style="display:none;z-index:996" class="img-tile-patch bottom" src="' + patchesDir + 'patch' + q + '.svg">';
        }
        if(index > imgPopupLinkCount - 4) {
            index = index + getRandomInt(1, 3);
        }
        imgPopupLink.eq(index).append(patch).css('z-index','996').parent().css('z-index','996');
    }
    
    //* ------------------------------------ IMAGE POPUP ------------------------------------- */
    
    var popupCloseBtnEvent = false;

    imgPopupLink.magnificPopup({
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

                //$('.mfp-figure').attr('id','mfp-figure').attr('tabindex','0');
                $('.mfp-figure').find('img')
                .on('load', function(){
                    $(this).attr('tabindex','1').focus();
                });
                $('.mfp-close').attr('tabindex','0');
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
                var vd = e.target.duration;
                var ct = e.target.currentTime;
                //to avoid firing pause and ended events in the same time
                if (ct < vd) {
                    coreMetricsForVideo('video-' + productPageToOpenCleanName, 'video_Pause', ct);
                }
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
        return '<video class="glh-video" poster="' + videoPosterSrc + '" controls>' +
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

                var prodName = videoPagePopupsData[productPageToOpen].heading;
                var ajaxPopup = $('#ajax-popup-div');
                ajaxPopup.focus();

                ajaxPopup.attr('aria-labelledby', prodName);
                
                popupCloseBtnMetrics ('close-btn_VIDEO-POPUP_' + productPageToOpenCleanName);
                
                //Video page – heading
                $('.glh-popup__brand-heading').html(prodName);

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
                        '<img alt="' + itemTitle + '" src="' + thisProductPath + _item.thumb + '">' +
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
                    popupBrandHeading.html(brandsPageItemHeading);

                    ajaxPopup.attr('aria-labelledby', brandsPageItemHeading);

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


    /* */
    if($('#glh-images-tile').length) {
        var stopAnimationDialog = '<div class="glh-stop-animation-btn-container">' +
            '<button tabindex="0" id="stop-animation-btn" class="glh-stop-animation-btn" role="button" aria-label="Stop animation on the page" aria-controls="animation">Stop all animation</button></div>';
        $('body').prepend(stopAnimationDialog);
        $('#stop-animation-btn').on('click', function () {
            $('.glh-video-thumb').each(function() {
                $(this).removeAttr('loop autoplay playsinline').get(0).pause();
            }); 
            $(this).parent().remove();
        });
       
    }
    
    // ----------- Utils

    function isOdd(num) { return num % 2;}

    //Returns a random integer between min (inclusive) and max (inclusive)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

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
        var closeBtn = $('.mfp-close');
        closeBtn.attr('aria-label', 'Close dialog');
        closeBtn.attr('coremetricTag', coremetricsTagValue)
            .on('click', function () {
                popupCloseBtnEvent = true;
                $.fn.coreTag('Element', $( this ).attr( "coremetrictag" ));
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
