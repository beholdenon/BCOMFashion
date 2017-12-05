require(['jquery', 'globals'], function($, Globals) {
    'use strict';
    
    function getBanner() {
        $.ajax({
            type: 'GET',
            url: '/b/v3/admedia/global?poolName=SHOPPINGSERVICESBANNER',
            headers: { 'X-Macys-ClientId': 'NavApp' },
            success: function(data) {
                var imageFileName,
                    imageLink,
                    imageCoordinates,
                    imageAltText,
                    banner = document.getElementById("banner"),
                    image = document.getElementById("banner-img"),
                    assetHost = Globals.getValue("props.assetsHost");

                if (data.mediaPoolMapper && data.mediaPoolMapper.mediaPoolItem) {
                    var mediaItem = data.mediaPoolMapper.mediaPoolItem[0];
                    if (mediaItem.mediaItemMapper && mediaItem.mediaItemMapper.mediaItem) {
                        var itemMapper = mediaItem.mediaItemMapper.mediaItem[0];
                        if (itemMapper.filename) {
                            imageFileName = itemMapper.filename;
                            image.height = itemMapper.height;
                            image.width = itemMapper.width;
                        }
                        if (itemMapper.mediaLinkMapper && itemMapper.mediaLinkMapper.mediaLinkItem) {
                            var mediaLinkItemMapper = itemMapper.mediaLinkMapper.mediaLinkItem[0];
                            imageLink = mediaLinkItemMapper.fullLinkURL;
                            imageCoordinates = mediaLinkItemMapper.coordinates;
                            imageAltText = mediaLinkItemMapper.text;
                        }
                    }
                }
                
                if (imageFileName && imageLink && imageCoordinates && imageAltText) {                    
                    image.src = assetHost + "/dyn_img/promo/" + imageFileName;
                    banner.href = imageLink;
                    banner.coords = imageCoordinates;
                    banner.alt = imageAltText;
                }                
            },
            failure: function(data) {
                console.error("Failure fetching banner image in shopping-services-main.js ", data);
            }
        });
    }    
    
    $(document).ready(function(){
        getBanner();
    });
});