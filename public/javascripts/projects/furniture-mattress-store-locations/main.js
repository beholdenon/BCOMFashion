'use strict';

console.log('Test...');

require( [ "jquery", "bcomCoremetrics" ], function ( $, Coremetrics ) {

    $(document).ready(function(){
        var cmPageID = "Furniture_Mattress_Locations",
            cmCategoryID = "Customer_Service",
            pushAttrs;

        Coremetrics.pageViewTag( {
            pageId: cmPageID,
            categoryId: cmCategoryID,
            searchTerm: "",
            searchResults: "",
            attributes: pushAttrs
        } );

    });
});