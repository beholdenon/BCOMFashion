require(['jquery'], function($) {
    
    'use strict';
    
    $(document).ready(function() {
        
        var userAgent = navigator.userAgent,
            safariLink;
            
        // The link for Safari is already set by default to the desktop
        // in index html file
        if (/iPhone/i.test(userAgent) || /iPad/i.test(userAgent)) {
            safariLink = "https://support.apple.com/en-us/HT201265";
            $("#safari").data("link", safariLink);
        }
        
        $(".browser-icon").click(function() {
            window.open( $(this).data("link") );
        });
        
        $("#go-back-button").click(function() {
            window.history.back();
        });
        
    });
    
});