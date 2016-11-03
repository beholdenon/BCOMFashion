'use strict';

//jshint scripturl:true

define(function() {

    var partialData = {};
    partialData.header = {
        seasonalAd: {
            "adKeys": ["null_ad_1"],
            "id": 0,
            "items": [],
            "key": "",
            "name": "SEASONAL_AD"
        },
        seasonalAction: {
            seasonalActionOff: {
                "adKeys": ["null_ad_1"],
                "id": 0,
                "items": [],
                "key": "",
                "name": "SEASONAL_ACTION_OFF"
            },
            seasonalActionOn: {
                "adKeys": ["null_ad_1"],
                "id": 0,
                "items": [],
                "key": "",
                "name": "SEASONAL_ACTION_ON"
            },
        },
        headerGna: {
            "adKeys": ["null_ad_1"],
            "id": 0,
            "items": [],
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
        "items": [],
        "key": "",
        "name": "FOOTER_GNA"
    };

    return partialData;

});