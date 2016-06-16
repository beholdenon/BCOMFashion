'use strict';

(function(window, $) {

    var BOPS = {
        cmCat: 'Ways_to_Shop',
        cmPageId: 'bops',
        cmTag: 'ways_to_shop-_-bops-_-',

        init: function () {
            var self = this;
            self.coremetrics('Pageview', self.cmCat, self.cmPageId);
        },

        coremetrics: function (tagType, categoryID, pageID) {
            var self = this;

            if (tagType === 'Pageview') {
                try {
                    window.BLOOMIES.coremetrics.cmCreatePageviewTag(pageID, categoryID);
                } catch (e) {
                    self.logErr('CoreM_err: ' + e);
                }
                self.logErr('CoreM ::: tagType: Pageview; categoryID: ' + categoryID + '; pageID: ' + pageID);
            } else if (tagType === 'Element') {
                try {
                    window.BLOOMIES.coremetrics.cmCreatePageElementTag(pageID, categoryID);
                } catch (e) {
                    self.logErr('CoreM_err: ' + e);
                }

                self.logErr('CoreM ::: tagType: Element; categoryID: ' + categoryID + '; pageID: ' + pageID);
            }
        },

        logErr: function (log) {
            //log errors only in DEV mode
            if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
                window.console.info(log);
            }
        }
    };

    $('#bl_main_container > div > section > article.bottom > a').on('click', function () {
        var cmTag = BOPS.cmTag + $(this).attr('rel');
        BOPS.coremetrics('Element', BOPS.cmCat, cmTag);
    });


    $(window).load(function() {
        BOPS.init();
    });

}(window, jQuery));