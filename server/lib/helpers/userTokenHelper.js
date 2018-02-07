'use strict';

let crypto = require('crypto');

function toHex(str) {
    let hex = '';
    for(let i=0; i<str.length; i++) {
        hex += str.charCodeAt(i).toString(16);
    }
    return hex;
}

function formatDate(date) {
    let mm = date.getMonth() + 1, // getMonth() is zero-based
        dd = date.getDate();

    return [date.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
    ].join('');
}

function setUserToken(req) {
    let md5,
        bvUserToken,
        date,
        key = "am9q8B",
        userStr;

    //only continue if it's product review page AND user is signed in AND BazaarVoiceToken is not set
    if (req && req.route && /product\/review/.test(req.route.path) &&
        req.state && req.state.bloomingdales_online_uid &&
        req.state.GCs && req.state.GCs.indexOf("BazaarVoiceToken1_92_") === -1) {

        md5 = crypto.createHash('md5');
        date = new Date();

        userStr = "date=" + formatDate(date) + "&userid=" + req.state.bloomingdales_online_uid;
        md5.update( key + userStr );
        bvUserToken = md5.digest('hex') + toHex(userStr);
    }

    return bvUserToken;
}

module.exports = setUserToken;

