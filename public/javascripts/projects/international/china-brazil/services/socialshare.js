'use strict';

angular.module('services')
    .factory('socialshare', function($window) {
        var pageUrl = '/international/china-brazil/',
            mediaUrl = '/fashion/images/projects/international/china-brazil',
            hostURL = 'http://' + $window.location.host,
            links = {
                facebook: '',
                pinterest: '',
                twitter: '',
                weibo: ''
            };

        // adjust pageUrl and mediaUrl
        pageUrl = hostURL + pageUrl;
        mediaUrl = hostURL + mediaUrl;

        // facebook
        links.facebook += 'https://www.facebook.com/dialog/feed';
        links.facebook += '?app_id=145634995501895';
        links.facebook += '&name=' + $window.encodeURIComponent('International Tourism | bloomingdales.com');
        links.facebook += '&description=' + $window.encodeURIComponent('From designer clothing to the most-coveted beauty brands, explore all that Bloomingdale\'s has to offer on their updated international site.');
        links.facebook += '&link=' + $window.encodeURIComponent(pageUrl);
        links.facebook += '&picture=' + $window.encodeURIComponent(mediaUrl + '/International_FB02.jpg');
        links.facebook += '&redirect_uri=' + $window.encodeURIComponent('https://www.facebook.com/');

        // pinterest
        links.pinterest += 'http://pinterest.com/pin/create/button/';
        links.pinterest += '?url=' + $window.encodeURIComponent(pageUrl);
        links.pinterest += '&description=' + $window.encodeURIComponent('International Tourism | bloomingdales.com');
        links.pinterest += '&media=' + $window.encodeURIComponent(mediaUrl + '/International_PINTEREST01.jpg');

        // twitter
        links.twitter += 'http://twitter.com/intent/tweet?source=webclient&text=';
        links.twitter += $window.encodeURIComponent('Love to shop @bloomingdales? Check out their international site for the latest designer clothing, accessories & beauty. http://bit.ly/aaa');

        //weibo
        links.weibo += 'http://service.weibo.com/share/share.php?url=';
        links.weibo += '?url=' +  $window.encodeURIComponent(pageUrl);
        links.weibo += '/sc&appkey=';
        links.weibo += '&title=' + $window.encodeURIComponent('Discover Bloomingdale\'s luxury fashions, storied history and world-class hospitality on their updated international site.');
        links.weibo += '&pic=&ralateUid=&language=zh_cn';

        return links;
    });
