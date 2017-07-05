(function(){
	
  var hasMBL = ( window.BLOOMIES.isMobile === true ? "mbl:" : ""); 
  var cm_cat = hasMBL + 'BWEDD_Best_Wedding_Dates_US';

  $('#methodology_open_btn').on('click', function() {
    BLOOMIES.coremetrics.cmCreateConversionEventTag(hasMBL +  'How_does_this_work' , 1, cm_cat);
  });

  $('#methodology_close_btn').on('click', function() {
    BLOOMIES.coremetrics.cmCreateConversionEventTag(hasMBL +  'How_does_this_work' , 2, cm_cat);
  });

  $('a.social_btn').on('click', function() {
    BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL +  'BWEDD_Share-{' + $(this).find('.social-likes__button').text() + '}' , cm_cat);
  });

	$(window).on('calendarLoad', function() {
    var locationFormat = $('#city_autocomplete').val();
    locationFormat = locationFormat.replace(/,\s/g,'_').replace(/\s/g,'-');

    window.BLOOMIES.coremetrics.cmCreatePageElementTag(hasMBL + 'BWEDD_Search-{' + locationFormat + '}', cm_cat);
  });

  $(window).load(function() {
    window.BLOOMIES.coremetrics.cmCreatePageviewTag(hasMBL + 'BWEDD_Best_Wedding_Dates_US', cm_cat);
  });

})();