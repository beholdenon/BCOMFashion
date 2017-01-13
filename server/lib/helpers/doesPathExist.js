/**
 * Created by u067265 on 11/18/16.
 */

'use strict';

let fs = require('fs'),
    sjl = require('sjljs');

module.exports = function doesPathExist (filePath) {
    return new Promise ((resolve, reject) => {
        fs.access(filePath, err => {
            return !sjl.empty(err) ? reject(err) : resolve(filePath);
        });
    });
};
