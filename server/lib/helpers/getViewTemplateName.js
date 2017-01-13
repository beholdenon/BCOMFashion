/**
 * Created by u067265 on 1/12/17.
 */

'use strict';

let path = require('path'),
    doesPathExist = require('../helpers/doesPathExist'),
    stripInitialForwardSlash = str => str.indexOf('/') === 0 ? str.substring(1) : str;

/**
 * Returns the view name/alias that is required by Hapi.js's `res.view` call.  This function also eliminates any guess
 * work on deciding which view to load 'index' or 'index-mobile' (as recently we were assuming that a
 * view has an 'index-mobile.html' if `deviceDetect` returns `true` which is erroneous because not all pages have a
 * mobile specific version.
 * @param viewAlias {String} - Actual view name if you wish to circumvent the resolution process.
 * @param requestPathPartial {String} - Pathname without the index/index-mobile.html parts also with
 * @param viewsPath {String} - Where views to check for are located;  I.e. '.../target/lib/views/'.
 * @param isForMobile {Boolean=false} - Boolean to check for existence of 'some-path/index-mobile.html' in `viewsPath` or not.  Default `false`.
 * @param resolver {Function} - A function to call with for both `resolve` and `reject` phases of promise;  Function will receive
 * resolved view name; 'some-path/index' or 'some-path/index-mobile'.
 * @returns {Promise} - A promise that resolves to the view name ('some/path/to/view/(index|index-mobile)')
 * depending on whether `isMobile` and the existence of the appropriate file given that boolean.
 */
module.exports = (viewAlias, requestPathPartial, viewsPath, isForMobile, resolver) => {
    isForMobile = typeof isForMobile === 'boolean' ? isForMobile : false;
    let viewAliasPath = path.join(stripInitialForwardSlash(requestPathPartial), 'index'),
        promise = new Promise((resolve, reject) => {
        if (typeof viewAlias === 'string' && viewAlias.length > 0) {
            resolve(viewAlias);
        }
        else if (isForMobile) {
            doesPathExist(path.join(viewsPath, requestPathPartial, 'index-mobile.html'))
                .then(() => resolve(viewAliasPath + '-mobile'))
                .catch(() => reject(viewAliasPath));
        }
        else {
            resolve(viewAliasPath);
        }
    });

    return resolver ?
        promise.then(resolver)
               .catch(resolver) : promise;
};
