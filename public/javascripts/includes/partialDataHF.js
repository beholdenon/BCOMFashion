'use strict';

//jshint scripturl:true

define(function() {

	var partialData = {};
    partialData.header = {
        seasonalAd: {
            "adKeys": ["null_ad_1"],
            "id": 0,
            "items": [{
                "adLinkKeys": ["null_ad_1_adLink_1"],
                "adLinks": [{
                    "adId": 0,
                    "coordinates": "0,0,947,47",
                    "key": "null_ad_1_adLink_1",
                    "text": "1220Seasonal2016",
                    "url": "http://www1.bloomingdales.com/shop/fashion-lookbooks-videos-style-guide?id=13668&cm_sp=hp-_-seasonal_ad-_-fpl_fall16"
                }],
                "fileName": "1220_Seasonal_Ad_01.jpg",
                "height": 50,
                "id": 0,
                "key": "null_ad_1",
                "text": "",
                "width": 962
            }],
            "key": "",
            "name": "SEASONAL_AD"
        },
        seasonalAction: {
            seasonalActionOff: {
                "adKeys": ["null_ad_1"],
                "id": 0,
                "items": [{
                    "adLinkKeys": [],
                    "adLinks": [],
                    "fileName": "1220_seasonal-ad_02v2.jpg",
                    "height": 28,
                    "id": 0,
                    "key": "null_ad_1",
                    "text": "",
                    "width": 294
                }],
                "key": "",
                "name": "SEASONAL_ACTION_OFF"
            },
            seasonalActionOn: {
                "adKeys": ["null_ad_1"],
                "id": 0,
                "items": [{
                    "adLinkKeys": [],
                    "adLinks": [],
                    "fileName": "1220_seasonal-ad_02v2.jpg",
                    "height": 28,
                    "id": 0,
                    "key": "null_ad_1",
                    "text": "",
                    "width": 294
                }],
                "key": "",
                "name": "SEASONAL_ACTION_ON"
            },
        },
        headerGna: {
            "adKeys": ["null_ad_1"],
            "id": 0,
            "items": [{
                "adLinkKeys": ["null_ad_1_adLink_1"],
                "adLinks": [{
                    "adId": 0,
                    "coordinates": "",
                    "key": "null_ad_1_adLink_1",
                    "text": "",
                    "url": "javascript:pop('/popup.ognc?popupID=525128&cm_sp=hp-_-header-_-loyallist_freeship_exclusions','myDynaPop','width=575,height=550')"
                }],
                "fileName": "0221_header.gif",
                "height": 15,
                "id": 0,
                "key": "null_ad_1",
                "text": "Global Header",
                "width": 334
            }],
            "key": "",
            "name": "HEADER_GNA"
        },
        search: {
            searchAutoCompleteEnabled: "true",
            mobileSearchAutoCompleteEnabled: "true",
            apolloServiceEndpoint: "suggester",
            autoCompleteMaxSuggestions: "10",
            autCompletePulseRate: "300",
            autoCompleteRetryAttempt: "2",
            autoCompleteRequestTimeout: "2000"
        }
    };
    partialData.footer = {
        "adKeys": ["null_ad_1"],
        "id": 0,
        "items": [{
            "adLinkKeys": ["null_ad_1_adLink_1"],
            "adLinks": [{
                "adId": 0,
                "coordinates": "",
                "key": "null_ad_1_adLink_1",
                "text": "",
                "url": "javascript:pop('/popup.ognc?popupID=525128&cm_sp=hp-_-footer-_-loyallist_freeship_exclusions','myDynaPop','width=575,height=550')"
            }],
            "fileName": "0221_footer.jpg",
            "height": 85,
            "id": 0,
            "key": "null_ad_1",
            "text": "Global Header",
            "width": 130
        }],
        "key": "",
        "name": "FOOTER_GNA"
    };
	
	return partialData;

});

	