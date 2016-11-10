'use strict'; 

//jshint scripturl:true

define([
    'globals',
    'bcomHFR/HeaderFooterModel',
    'bcomHeader/newHeader/HeaderApp',
    'bcomFooter/FooterApp',
    'partialDataHF'
], function( Globals, HeaderFooterModel, HeaderApp, FooterApp, PartialData ) {

	var init = function() {
	    
        (function(){

            if( window.Globals.deviceType !== 'mobile' || window.location.search.indexOf('stop_mobi=yes') > -1 ){
                Globals.setValue('props.spoHFDesktopExperienceEnabled', true);
            }

        })();

            var headerApp,
                footerApp,
                footerModelData = PartialData.footer,
                headerFooterModel = new HeaderFooterModel(),
                partialData = PartialData.header;

        headerApp = new HeaderApp( { partialData : partialData, hfrModel: headerFooterModel });
        footerApp = new FooterApp({data: footerModelData, hfrModel: headerFooterModel});
    };          
    
    return init;
});