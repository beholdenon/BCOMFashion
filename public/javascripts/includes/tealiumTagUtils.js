/*
** Author: Smita Panasa
**
** Created on: <July 03, 2018>
**
** Template for all the tealium tags to be fired in BCOMFashion special projects
*/
'use strict';

define([
  'underscore',
  'tagManagerUtil'
], function ( _, TagManagerUtil ) {

  //Add the page names for page load tags here
  var pageNamesObj = {
    '2017-glowhaus' : 'glowhaus landing',
    'makeup-looks-tutorials' : 'glowhaus videos',
    'discover-new-makeup-skin-care-brands' : 'glowhaus brands',
    'about' : 'glowhaus about us'
  };

  var tagManagerObj = {

    //Gets the last part (after '/') in the pathname of the url
    getLastPathName : function () {
      var pathName = window.location.pathname,
          pathArrObj = pathName.split("/"),
          pathObjLength = pathArrObj.length;
        if ( pathArrObj[pathObjLength - 1] === "" ) {
          return pathArrObj[pathObjLength - 2];
        }
        else {
          return pathArrObj[pathObjLength - 1];
        }
    },

    //Gets the current page name
    getCurrentPageName : function () {
      var currentPageName = this.getLastPathName();
      return pageNamesObj[currentPageName];
    },

    //Fires the link tag - Do not change this
    fireTealiumLinkTag : function ( data ) {
      TagManagerUtil.fireTag('link', data);
    },

    //Fires the view tag - Do not change this
    fireTealiumViewTag : function ( data ) {
      TagManagerUtil.fireTag('view', data);
    },

    //Fires the view tag on page loads
    fireTealiumPageLoadTag : function ( data ) {
      var pageName = this.getCurrentPageName();
      _.extend(data, {page_name: pageName});
      this.fireTealiumViewTag(data);
    },

    //Fires the link tag on actions performed on the video
    fireTealiumVideoTag : function ( aEventName, aName, aLength, aElapsedTime) {
      this.fireTealiumLinkTag({
        'event_name' : aEventName,
        'video_name' : aName,
        'video_length' : aLength,
        'video_time_viewed' : aElapsedTime
      });
    }
  };

  return tagManagerObj;
});