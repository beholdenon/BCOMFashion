'use strict'; 
const Zlib = require('zlib'),
    Boom = require('boom');

let serviceProxy = exports;

serviceProxy.timeout = 20e3;

serviceProxy.getHeaders = (request, apiKey) => {
    let headers = {};
    const subDomain = process.env.API_SUBDOMAIN;

    // Configure the service headers based on the the subdomain(api vs. services)
    if (subDomain === 'api') {
        headers = {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'x-macys-webservice-client-id': apiKey
        };
    } else if (subDomain === 'services') {
        headers = {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'x-macys-webservice-client-id': process.env.SERVICES_KEY,
            'x-macys-customer-id': process.env.SERVICES_KEY
        };
    }

    if (request && request.headers && request.headers['content-length']) {
        headers['content-length'] = request.headers['content-length'];
    }

    return headers;
};

serviceProxy.getHost = (request, proxyHost) => {
    const extractedHost = request.headers.host
        .split('.')
        .slice(1)
        .join('.')
        .replace(/:[0-9]+/, ''),
        envSubdomain = process.env.API_SUBDOMAIN;

    let useDynamicBinding = true;

    // We cannot use dynamic API binding if:
    //  - we are in production mode, but on a staging server (herokuapp), or
    //  - we are in dev mode, but using a host that does not contain a valid qa server (e.g., localhost)
    if ((process.env.NODE_ENV === 'production' && extractedHost === 'herokuapp.com') ||
        ((process.env.NODE_ENV === 'dev' || /^fashion-test\./.test(request.headers.host)) && !/qa\d+code(bloomingdales)/.test(extractedHost))) {
        useDynamicBinding = false;
    }

    if (useDynamicBinding) {
        return envSubdomain + '.' + extractedHost;
    } else {
        return envSubdomain + '.' + proxyHost;
    }
};

serviceProxy.getReqHeaderCookie = (requestCookies, cookieName) => {
    if (requestCookies && requestCookies[cookieName]) {
        return requestCookies[cookieName];
    }
    return '';
};

serviceProxy.errorHandler = (statusCode, request, reply, payload) => {
    /* jshint camelcase:false */
    let message = payload,
        callSwitch = () => {
            let logMessage;
            const logErrorObject = {
                macysOnlineUid: request.state ? request.state.macys_online_uid : '-',
                upstreamStatusCode: statusCode,
                upstreamMessage: message
            };

            request.log(['errorHandler', 'error'], logErrorObject);

            if (typeof message !== 'string') {
                logMessage = JSON.stringify(logErrorObject);
            } else {
                logMessage = '{ upstreamStatusCode: ' + statusCode + ', upstreamMessage: ' + message + ' }';
            }

            switch (true) {
                case statusCode === 301:
                    return reply(logErrorObject.upstreamMessage)
                        .code(statusCode);
                case statusCode === 504:
                    return reply(Boom.gatewayTimeout(logMessage));
                case statusCode >= 400 && statusCode < 500:
                    return reply(Boom.notFound(logMessage));
                default:
                    return reply(Boom.serverTimeout(logMessage));
            }
        };

    if (Buffer.isBuffer(payload)) {
        Zlib.unzip(payload, (err, chunk) => {
            try {
                message = chunk ? JSON.parse(chunk) : JSON.parse(payload);
            } catch (err) {
                message = payload.toString();
            }
            callSwitch();
        });
    } else {
        callSwitch();
    }
};

serviceProxy.parseHandler = (parser, request, res, payload, reply) => {
    // try/catch is synchronous, one of few cases its useful, JSON.parse
    try {
        return reply(parser._parse(request, JSON.parse(payload), res))
            .code(res.statusCode)
            .header('Upstream-Host', request.url.format(request.url));
    } catch (err) {
        return reply(Boom.internal('Failed parsing JSON input: ' + err, err));
    }
};

serviceProxy.defaultOnResponse = (err, res, request, reply) => {
    // See recommendations, reviews, or bopsUpc if status codes require custom handling

    if (err) {
        console.log("----------ERROR---------");
        console.log(err);
        console.log("------------------------");
        return serviceProxy.errorHandler(err.output.statusCode, request, reply, err.output.payload);
    }

    return res;
};

serviceProxy.onResponseRedirect = (err, res, request, reply) => {

    if (err) {
        return serviceProxy.errorHandler(err.output.statusCode, request, reply, err.output.payload);
    }

    return res;

};
