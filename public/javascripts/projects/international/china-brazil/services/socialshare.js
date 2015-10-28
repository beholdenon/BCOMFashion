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
            lang = appGlobals.getAttr('lang');

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

            mediaURL += 'https://www.facebook.com/dialog/feed';
            mediaURL += '?app_id=145634995501895';
            mediaURL += '&name=' + $window.encodeURIComponent(copy[lang].socialshare.fb.name);
            mediaURL += '&description=' + $window.encodeURIComponent(copy[lang].socialshare.fb.description);
            mediaURL += '&link=' + $window.encodeURIComponent(pageUrl);
            mediaURL += '&picture=' + $window.encodeURIComponent(mediaUrl + '/International_FB02.jpg');
            mediaURL += '&display=popup';
            mediaURL += '&redirect_uri=' + $window.encodeURIComponent('https://www.facebook.com/');
            
            console.log('FBmediaURL ', mediaURL);
//https://www.facebook.com/dialog/feed?app_id=145634995501895&name=100%25%20BLOOMINGDALE%27s%20%7C%20bloomingdales.com&description=Over%201000%20exclusives.%20Over%20100%20designers.%201%20store.                                                                                                                   &link=http%3A%2F%2Fwww.bloomingdales.com%2Ffashion-index%2F100-percent-2015.jsp     &picture=http%3A%2F%2Fassets.bloomingdales.com%2Fdyn_img%2Fcat_splash%2Fb100pfall15-micro-social-pinterest-facebook.jpg&display=popup&redirect_uri=https%3A%2F%2Fwww.facebook.com%2F
//https://www.facebook.com/dialog/feed?app_id=145634995501895&name=International%20Tourism%20%7C%20bloomingdales.com&description=From%20designer%20clothing%20to%20the%20most-coveted%20beauty%20brands%2C%20explore%20all%20that%20Bloomingdale%27s%20has%20to%20offer%20on%20their%20updated%20international%20site.&link=http%3A%2F%2Fd4378572%3A3000%2Finternational%2Fchina-brazil%2F&picture=http%3A%2F%2Fd4378572%3A3000%2Ffashion%2Fimages%2Fprojects%2Finternational%2Fchina-brazil%2FInternational_FB02.jpg&display=popup&redirect_uri=https%3A%2F%2Fwww.facebook.com%2F
            
            return mediaURL;
        }

        function pinterest() {
            var mediaURL = '';

            mediaURL += 'http://pinterest.com/pin/create/button/';
            mediaURL += '?url=' + $window.encodeURIComponent(pageUrl);
            mediaURL += '&description=' + $window.encodeURIComponent(copy[lang].socialshare.pinterest.description);
            mediaURL += '&media=' + $window.encodeURIComponent(mediaUrl + '/International_PINTEREST01.jpg');

            return mediaURL;
        }

        function twitter() {
            var mediaURL = '';

            mediaURL += 'http://twitter.com/intent/tweet?source=webclient&text=';
            mediaURL += $window.encodeURIComponent(copy[lang].socialshare.twitter.text);

            return mediaURL;
        }

        function weibo() {
            var mediaURL = '';

            mediaURL += 'http://service.weibo.com/share/share.php?url=';
            mediaURL += '?url=' + $window.encodeURIComponent(pageUrl);
            mediaURL += '/sc&appkey=';
            mediaURL += '&title=' + $window.encodeURIComponent(copy[lang].socialshare.weibo.title);
            mediaURL += '&pic=&ralateUid=&language=zh_cn';

            return mediaURL;
        }

        function weixin() {
            return copy[lang].socialshare.weixin.text;
        }        
    }
})();
