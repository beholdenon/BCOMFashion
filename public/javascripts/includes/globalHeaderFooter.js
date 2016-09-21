'use strict'; 

//jshint scripturl:true

define([
    'globals',
    'bcomHFR/HeaderFooterModel',
    'bcomHeader/newHeader/HeaderApp',
    'bcomFooter/FooterApp',
    'propsConfig',
    'partialDataHF'
], function( Globals, HeaderFooterModel, HeaderApp, FooterApp, PropsConfig, PartialData ) {

	var init = function() {
	    
        (function(){
            var props = PropsConfig;
            if( window.Globals.deviceType !== 'mobile' || window.location.search.indexOf('stop_mobi=yes') > -1 ){
                props.spoHFDesktopExperienceEnabled = true;
            }

            Globals.setValue("props", props);
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