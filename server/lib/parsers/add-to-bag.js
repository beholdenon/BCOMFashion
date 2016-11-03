/**
 * Created by u067265 on 11/3/16.
 */
/**
 * @file add-to-bag.js
 *
 * V1 add to bag parser - takes JSON response from upstream data source (api.bloomingdales.com),
 * and parses it into a format expected by the frontend.
 */

'use strict';

let sjl = require('sjljs'),
    addToBagMessages = require('./../../../configs/add-to-bag-messages'),
    unknownErrorMessageMsg = 'An unknown error occurred.';

function getErrorMessageFromErrorCode (code) {
    return sjl.notEmptyAndOfType (addToBagMessages[code], String) ?
        addToBagMessages[code] : unknownErrorMessageMsg + '  Error code: ' + code;
}

function getErrorMessagesFromErrors (errors) {
    return errors.map(error => getErrorMessageFromErrorCode(error.code));
}

function getErrorMessagesFromBagItems (bagItems) {
    if (sjl.isEmptyOrNotOfType(bagItems, Array)) {
        return [];
    }
    return bagItems.filter(item => {
        return sjl.notEmptyAndOfType(item.errors, Array);
    })
        .map (item => getErrorMessagesFromErrors(item.errors));
}

function getPayloadErrorMessages (payload) {

    // Bag items or `null`
    let bagItems = sjl.searchObj(payload, 'bag.items');

    // If no bag items don't look for any bag item error messages
    if (!bagItems) {
        return [];
    }

    return getErrorMessagesFromBagItems(bagItems);
}

module.exports = {

    /**
     * Internal function used to take an upstream response and manipulate it
     * before sending it back to the client.
     *
     * @param {Object} - Request The node request object
     * @param {Object} - Payload The JSON response from the upstream
     *
     * @return {Object} - the response data expected by the client
     */
    _parse: function (request, payload) {
        var response = sjl.jsonClone(payload) || {};

        // If request not successful, get error messages and forward them
        if (!payload || !payload.success) {
            let errorMessages = getPayloadErrorMessages(payload);
            response.errorMessages = errorMessages;
            response.errorMessage = errorMessages.length > 0 ? errorMessages[0] : unknownErrorMessageMsg;
            response.success = false;
        }

        // If success and is 'PUT' method
        else if (request.method === 'put') {
            response.updated = true;
        }

        // Return modified payload
        return response;
    }

};
