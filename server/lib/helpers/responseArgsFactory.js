/**
 * Created by u067265 on 1/12/17.
 * A way of normalizing the `args` object we've been using for our handlers.
 * The exported function also separates the concern of figuring out what view template
 * we need to give to our response (as that should be a separate concern).
 */

'use strict';

let deviceDetectionHelper = require('./deviceDetection'),

    isMobile = deviceType => deviceType.toLowerCase() === 'mobile',
    isTablet = deviceType => deviceType.toLowerCase() === 'tablet',

    argsFactory = () => {
        return {
            timeStamp: new Date(),
            isMobile: false,
            isTablet: false,
            headTitle: '',
            headMeta: '',
            headCanonical: '',
            tealiumScriptEnabled: process.env.tealiumScriptEnabled === "true",
            tealiumType: process.env.ENV_TYPE === "prod" ? "prod" : "qa"
        };
    },

    /**
     * Returns a purely generated args object with the `isMobile` and `isTablet` properties set
     * using the device detection module or returns the passed in one with the aforementioned props set on it.
     * @param req {Request} - Node request object (given to handlers via Hapi).
     * @param argsToUse [Object] - Optional args object to use instead of the default.
     * @returns {*|{timeStamp, isMobile, isTablet, headTitle, headMeta, headCanonical}}
     */
    argsWithDeviceMetaData = (req, argsToUse) => {
        const _args = argsToUse || argsFactory(),
            detectedDeviceType = deviceDetectionHelper.detectDevice(req);
        _args.isMobile = isMobile(detectedDeviceType);
        _args.isTablet = isTablet(detectedDeviceType);
        return _args;
    };

module.exports = argsWithDeviceMetaData;
