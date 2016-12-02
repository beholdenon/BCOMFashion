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
            var url = $(this).data("link");
            if (window.Globals.deviceType === "mobile") {
                // Opens link in same window for mobile (phone)
                window.location.href = url;
            } else {   
                // New window for tablet and desktop 
                window.open( url );
            }
        });
        
        $("#go-back-button").click(function() {
            window.history.back();
        });
        
    });
    
});