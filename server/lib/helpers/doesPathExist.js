/**
 * Created by u067265 on 11/18/16.
 */

'use strict';

let fs = require('fs'),
    sjl = require('sjljs');

/**
 * Checks if file exists returns a promise that resolves with the passed in `filePath` if the file exists otherwise
 * rejects with an error string;  Usage:
 * ```
 *   doesPathExist (somePath)
 *
 *   // If file exists
 *   .then (doSomethingWithFilePath)
 *
 *   // If file doesn't exist
 *   .catch (doSomethingWithErrMessage);
 *
 * ```
 * @param filePath {String}
 * @returns {Promise} - Promise resolving to found file path or rejecting to err<String>.
 */
module.exports = function doesPathExist (filePath) {
    return new Promise ((resolve, reject) => {
        fs.access(filePath, err => {
            return !sjl.empty(err) ? reject(err) : resolve(filePath);
        });
    });
};
