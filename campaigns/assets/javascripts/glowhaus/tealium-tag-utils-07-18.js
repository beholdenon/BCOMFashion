$(function ($) {

    var validEventTypes = [
        'view',
        'link',
    ];

    function isAllOK(eventType, data) {
        if (_.isUndefined(eventType) || _.isUndefined(data)) {
            console.error('Tag Manager Exception : eventType and/or data missing!');
            return false;
        }

        if (_.indexOf(validEventTypes, eventType) < 0) {
            console.error('Tag Manager Exception : invalid eventType!');
            return false;
        }

        if (_.isUndefined(window.utag)) {
            console.error('Tag Manager Exception: window.utag missing!');
            return false;
        }

        if (_.isUndefined(window.utag[eventType])) {
            console.error('Tag Manager Exception: utag.' + eventType + ' missing!');
            return false;
        }

        return true;
    }

    $.fn.tealiumTagUtil =  function() {
        //Add the page names for page load tags here
        var pageNamesObj = {
            'glowhaus': 'glowhaus landing',
            'makeup-looks-tutorials': 'glowhaus videos',
            'discover-new-makeup-skin-care-brands': 'glowhaus brands',
            'about': 'glowhaus about us'
        };

        function fireTag(eventType, data) {
            if (isAllOK(eventType, data)) {
                window.utag[eventType](data);
            }
        }

        var tagManagerObj = {

            //Gets the last part (after '/') in the pathname of the url
            getLastPathName: function () {
                var pathName = window.location.pathname,
                    pathArrObj = pathName.split("/"),
                    pathObjLength = pathArrObj.length;
                if (pathArrObj[pathObjLength - 1] === "") {
                    return pathArrObj[pathObjLength - 2];
                }
                else {
                    return pathArrObj[pathObjLength - 1];
                }
            },

            //Gets the current page name
            getCurrentPageName: function () {
                var currentPageName = this.getLastPathName();
                return pageNamesObj[currentPageName];
            },

            //Fires the link tag - Do not change this
            fireTealiumLinkTag: function (data) {
                fireTag('link', data);
            },

            //Fires the view tag - Do not change this
            fireTealiumViewTag: function (data) {
                fireTag('view', data);
            },

            //Fires the view tag on page loads
            fireTealiumPageLoadTag: function (data) {
                var pageName = this.getCurrentPageName();
                _.extend(data, {page_name: pageName});
                this.fireTealiumViewTag(data);
            },

            //Fires the link tag on actions performed on the video
            fireTealiumVideoTag: function (aEventName, aName, aLength, aElapsedTime) {
                this.fireTealiumLinkTag({
                    'event_name': aEventName,
                    'video_name': aName,
                    'video_length': aLength,
                    'video_time_viewed': aElapsedTime
                });
            }
        };

        return tagManagerObj;
    }

});