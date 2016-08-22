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