'use strict';
/* globals BLOOMIES */

(function(){
  window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();
  
  window.BLOOMIES.coremetrics.pageViewExploreAttributes = new window.BLOOMIES.coremetrics.exploreAttributes();
	
  var hasMBL = ( window.BLOOMIES.isMobile === true ? "mbl:" : ""); 
  var cmCat = hasMBL + 'BWEDD_Best_Wedding_Dates_US';

  $('#methodology_open_btn').on('click', function() {
    BLOOMIES.coremetrics.cmCreateConversionEventTag(hasMBL +  'How_does_this_work' , 1, cmCat);
  });

  $('#methodology_close_btn').on('click', function() {
    BLOOMIES.coremetrics.cmCreateConversionEventTag(hasMBL +  'How_does_this_work' , 2, cmCat);
  });

  $('a.social_btn').on('click', function() {
    BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL +  'BWEDD_Share-{' + $(this).find('.social-likes__button').text() + '}' , cmCat);
  });

  $('.social-likes__widget_facebook, .social-likes__widget_facebook').on('click', function() {
    BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL +  'BWEDD_Share-{ Facebook }' , cmCat);
  });

  $('.social-likes__widget_twitter, .social-likes__widget_twitter').on('click', function() {
    BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL +  'BWEDD_Share-{ Twitter }' , cmCat);
  });

	$(window).on('calendarLoad', function() {
    setTimeout( function(){
      var locationFormat = $('#city_autocomplete').val();
      locationFormat = locationFormat.replace(/,\s/g,'_').replace(/\s/g,'-');

      if ( locationFormat !== '' ) {
        window.BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL + 'BWEDD_Search-{' + locationFormat + '}', cmCat);
      }
    }, 250);
  });

  $(document).ready( function() {
    window.BLOOMIES.coremetrics.cmCreatePageviewTag(hasMBL + 'BWEDD_Best_Wedding_Dates_US', cmCat);
  });

})();