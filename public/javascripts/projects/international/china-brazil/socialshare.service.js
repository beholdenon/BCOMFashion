(function() {
    'use strict';

    angular
        .module('services')
        .factory('socialshare', socialshare);

    function socialshare($window, $location, $log, appGlobals) {
        var hostURL = 'http://' + $location.host() + ':' + $location.port(),
            pageUrl = hostURL + '/international/china-brazil/',
            mediaUrl = hostURL + '/fashion/images/projects/international/china-brazil',
            copy = appGlobals.getAttr('copy'),
            lang = appGlobals.getAttr('lang') || 'ENG';

        var service = {
            fb: fb(),
            pinterest: pinterest(),
            twitter: twitter(),
            weibo: weibo(),
            weixin: weixin()
        };

        return service;

        ////////////

        function fb() {
            var mediaURL = '';
            lang = lang || 'ENG';

            mediaURL += 'https://www.facebook.com/dialog/feed';
            mediaURL += '?app_id=145634995501895';
            mediaURL += '&name=' + $window.encodeURIComponent(copy[lang].socialshare.fb.name);
            mediaURL += '&description=' + $window.encodeURIComponent(copy[lang].socialshare.fb.description);
            mediaURL += '&link=' + $window.encodeURIComponent(pageUrl);
            mediaURL += '&picture=' + $window.encodeURIComponent(mediaUrl + '/International_FB02.jpg');
            mediaURL += '&display=popup';
            mediaURL += '&redirect_uri=' + $window.encodeURIComponent('https://www.facebook.com/');
            
            return mediaURL;
        }

        function pinterest() {
            var mediaURL = '';
            lang = lang || 'ENG';

            mediaURL += 'http://pinterest.com/pin/create/button/';
            mediaURL += '?url=' + $window.encodeURIComponent(pageUrl);
            mediaURL += '&description=' + $window.encodeURIComponent(copy[lang].socialshare.pinterest.description);
            mediaURL += '&media=' + $window.encodeURIComponent(mediaUrl + '/International_PINTEREST01.jpg');

            return mediaURL;
        }

        function twitter() {
            var mediaURL = '';
            lang = lang || 'ENG';

            mediaURL += 'http://twitter.com/intent/tweet?source=webclient&text=';
            mediaURL += $window.encodeURIComponent(copy[lang].socialshare.twitter.text);

            return mediaURL;
        }

        function weibo() {
            var mediaURL = '';
            lang = lang || 'ENG';

            mediaURL += 'http://service.weibo.com/share/share.php?url=';
            mediaURL += '?url=' + $window.encodeURIComponent(copy[lang].socialshare.weibo.url);
            mediaURL += '/sc&appkey=';
            mediaURL += '&title=' + $window.encodeURIComponent(copy[lang].socialshare.weibo.title);
            mediaURL += '&pic=&ralateUid=&language=zh_cn';

            return mediaURL;
        }

        function weixin() {
            lang = lang || 'ENG';
            
            return copy[lang].socialshare.weixin.text;
        }        
    }
})();
