/**
 * Created by u067265 on 11/23/16.
 */
// define(['jquery', 'lodash', 'cookie'],
(function () {

    'use strict';

    var // defaultProtocol = 'https:',
        // defaultHostname = 'api.bloomingdales.com',
        Cookie = require('cookie'),
        defaultPathname = '/bag/add',
        defaultDataType = 'json',
        defaultRequestConfig = { // jquery ajax request default config
            dataType: defaultDataType,
            method: null,
            url: defaultPathname
        },
        // onlineCookieName = 'bloomingdales_online',
        userGuidCookieName = 'bloomingdales_online_guid',
        userIdCookieName = 'bloomingdales_online_uid',
        bagGuidCookieName = 'bloomingdales_bagguid',

        isset = function (value) {
            return typeof value !== 'null' && typeof value !== 'undefined';
        },

        jsonClone = function (obj) {
            return JSON.parse(JSON.stringify(obj));
        },

        cookieOrDefault = function (cookieName, defaultValue) {
            return Cookie.get(cookieName) || (defaultValue ? defaultValue : null);
        },

        userIdCookieOrElse = function (defaultValue) {
            return cookieOrDefault(userIdCookieName, defaultValue);
        },

        userGuidCookieOrElse = function (defaultValue) {
            return cookieOrDefault(userIdCookieName, defaultValue);
        },

        requestConfigFactory = function () {
            return jsonClone(defaultRequestConfig);
        },

        requestConfigFromOptions = function (options) {
            return $.extend.apply($, [true, requestConfigFactory()].concat(Array.prototype.slice.call(arguments)));
        },

        setCookiesFromResponse = function (response) {
            var cookieExpire = new Date( new Date().getTime() + 9 * 24 * 3600 * 1000 );

            // 'online_uid' cookie
            if (response.bag.owner.userId && !Cookie.get(userIdCookieName)) {
                Cookie.set(userIdCookieName,
                    response.bag.owner.userId, null, {expires: cookieExpire});
            }

            // 'online_guid' cookie
            if (response.bag.owner.userGuid && !Cookie.get(userGuidCookieName)) {
                Cookie.set(userGuidCookieName,
                    response.bag.owner.userGuid, null, {expires: cookieExpire});
            }

            // 'baguid' cookie
            if (response.bag.bagGUID && !Cookie.get(bagGuidCookieName)) {
                Cookie.set(bagGuidCookieName,
                    response.bag.bagGUID, null, {expires: cookieExpire});
            }

            return response;
        },

        serializeRequestParams = function (paramsObj, aggregator) {
            return _.map(paramsObj, function (value, key) {
                return [key, value];
            })
                .reduce(function (str, item) {
                    if (item[1] === null || typeof item[1] === 'undefined') {
                        return str;
                    }
                    return str + (str.length > 0 ? '&' : '') +
                        item[0] + '=' + encodeURIComponent(item[1]);
                }, aggregator || '');
        },

        // getBagRequest = function () {
        //     return _.compose($.ajax, requestConfigFromOptions)({
        //         data: JSON.stringify(item),
        //         method: 'GET',
        //     }).then(setCookiesFromResponse);
        // },

        paramsWithBaseUrl = function (baseUrl, requestParams) {
            var filteredRequestParams = Object.keys(requestParams).reduce(function (agg, key) {
                    if (baseUrl.indexOf(key + '=') === -1 && isset(requestParams[key])) {
                        agg[key] = requestParams[key];
                    }
                    return agg;
                }, {}),
                serialized = serializeRequestParams(filteredRequestParams),
                baseUrlHasParams = baseUrl.indexOf('?') > -1,
                serializedItemsPrefix = baseUrlHasParams ? '' : '?';
            return baseUrl + (serialized.length > 0 ? serializedItemsPrefix + serialized : '');
        },

        addToBagRequestUrl = function (baseUrl, params) {
            params = params || {};
            var userId = userIdCookieOrElse(),
                userGuid = userGuidCookieOrElse();
            if (!params.userId && userId) {
                params.userId = userId;
            }
            else if (!params.userGuid && userGuid) {
                params.userGuid = userGuid;
            }
            return paramsWithBaseUrl(baseUrl, params);
        },

        addToBagRequestUrlFromResponse = function (baseUrl, response) {
            var bag = response && response.bag ? bag : null,
                bagOwner = bag && response.bag.owner ? response.bag.owner : null,
                userId = bag && bagOwner && bagOwner.userId ? bagOwner.userId : null,
                userGuid = bag && bagOwner && bagOwner.userGuid ? bagOwner.userGuid : null,
                params = {userId: userId, userGuid: userGuid};
            return addToBagRequestUrl(baseUrl, params);
        },

        addToBagRequestConfig = function (requestBody, url, config) {
            return requestConfigFromOptions({
                data: requestBody,
                method: 'POST',
                url: url
            }, config);
        },

        addToBagRequest = function (requestBody, requestUrl, requestParams) {
            var config = addToBagRequestConfig(requestBody, requestUrl, requestParams);
            return $.post(config.url, JSON.stringify(requestBody), 'json');
        },

        addToBagRequestRecursive = function (items, onRequestSuccess, onRequestFailure, requestBaseUrl) {
            requestBaseUrl = requestBaseUrl || defaultPathname;
            onRequestFailure = onRequestFailure || function () {};
            onRequestSuccess = onRequestSuccess || function () {};

            var clonedItems = jsonClone(items),
                request = addToBagRequest(clonedItems.shift(), addToBagRequestUrl(requestBaseUrl))
                    .then(setCookiesFromResponse)
                    .then(onRequestSuccess)
                    .fail(onRequestFailure);

            return clonedItems.length > 0 ? request.then(function (response) {
                return addToBagRequestRecursive(
                    clonedItems, onRequestSuccess, onRequestFailure,
                    addToBagRequestUrlFromResponse(requestBaseUrl, response)
                );
            }) : request;
        };

    // Return BagServiceV1
    var BagServiceV1 = Object.create({}, {
        // getBag: {value: getBagRequest, enumerable: true},
        addToBag: {value: addToBagRequest, enumerable: true},
        addToBagRecursive: {value: addToBagRequestRecursive, enumerable: true},
        // updateBag: {value: updateBagRequest, enumerable: true},
        // deleteFromBag: {value: deleteFromBagRequest, enumerable: true}
    });

    Object.defineProperty(BLOOMIES, 'BagServiceV1', {
        value: BagServiceV1,
        enumerable: true
    });

    return BagServiceV1;

}());
