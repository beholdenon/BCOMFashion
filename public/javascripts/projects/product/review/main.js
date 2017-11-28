/**
 * Created by Alessandro Ribeiro on 8/2/17.
 */

'use strict';

var APP = {
        bvClientId: '7130inline',
        bvErrorMsg: 'Review Submission Currently Unavailable.'
    };

APP.init = function () {
    var self = this;

    self.coremetrics('Pageview', self.cm, self.cm);
    self.configDomain();
    self.bvLoadRRSubmission();
};

APP.bvLoadRRSubmission = function() {
    require(['cookie', 'globals', 'bcomBase'], function(Cookie, Globals, Base) {
        var currentUrl = window.location.href,
            bvUserToken = Cookie.get("BazaarVoiceToken", "GCs"),
            bvAuthenticateUser = (Base.getQueryParameter('bvauthenticateuser') === 'true' ? true : false) ,
            bvProductId = Base.getQueryParameter('bvproductid');

        if ( bvAuthenticateUser ) {
            if (bvUserToken) {
                window.location.href = 'http://reviews.bloomingdales.com/'+ APP.bvClientId +'/'+ bvProductId +'/writereview.htm?user='+ bvUserToken;
            } else {
                Cookie.set('FORWARDPAGE_KEY', currentUrl, undefined, {
                   expires: new Date( new Date().getTime() + ( 86400000 ) ),
                    domain: '.bloomingdales.com'
                });

                window.location.href = Globals.getValue('props.secureHost') + '/account/signin';
            }
        }
    });
};

APP.showBVUnavailableErrorMsg = function( bvErrorMsg ) {
   $('BVSubmissionContainer').html('<span id="BVUnavailableErrorMsg">'+ bvErrorMsg +'</span>');
};

//(req) CM business logic
APP.coremetrics = function (tagType, categoryID, pageID) {
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
};

//(req) custom logger for 'dev' environment
APP.logErr = function (log) {
    //log errors only on DEV mode
    if (window.location.href.indexOf('fashion.bloomingdales.com') < 0) {
        window.console.info(log);
    }
};

APP.configDomain = function() {
    var bloomiesDomainPattern = /bloomingdales.com$/i,
    qePattern = /fds.com$/i;

    if ( bloomiesDomainPattern.test( document.domain ) ) {
        document.domain = "bloomingdales.com";
    } else if ( qePattern.test( document.domain ) ) {
        document.domain = "fds.com";
    }
};

$(window).load(function() {
    APP.init();
});

