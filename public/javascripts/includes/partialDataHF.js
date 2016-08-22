'use strict';

//jshint scripturl:true

define(function() {

	var partialData = {};
	partialData.header = {
        seasonalAd: {
            "adKeys": [],
            "id": 0,
            "items": [],
            "key": "",
            "name": ""
        },
        seasonalAction: {
            seasonalActionOff: {
                "adKeys": [],
                "id": 0,
                "items": [],
                "key": "",
                "name": ""
            },
            seasonalActionOn: {
                "adKeys": [],
                "id": 0,
                "items": [],
                "key": "",
                "name": ""
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

	