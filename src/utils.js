"use strict";
exports.__esModule = true;
exports.assert = exports.bytes = exports.bytesToU8Array = exports.u8ArrayToBytes = void 0;
function u8ArrayToBytes(array) {
    var ret = "";
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var e = array_1[_i];
        ret += String.fromCharCode(e);
    }
    return ret;
}
exports.u8ArrayToBytes = u8ArrayToBytes;
// TODO this function is a bit broken and the type can't be string
// TODO for more info: https://github.com/near/near-sdk-js/issues/78
function bytesToU8Array(bytes) {
    var ret = new Uint8Array(bytes.length);
    for (var i = 0; i < bytes.length; i++) {
        ret[i] = bytes.charCodeAt(i);
    }
    return ret;
}
exports.bytesToU8Array = bytesToU8Array;
function bytes(strOrU8Array) {
    if (typeof strOrU8Array == "string") {
        return checkStringIsBytes(strOrU8Array);
    }
    else if (strOrU8Array instanceof Uint8Array) {
        return u8ArrayToBytes(strOrU8Array);
    }
    throw new Error("bytes: expected string or Uint8Array");
}
exports.bytes = bytes;
function checkStringIsBytes(str) {
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 255) {
            throw new Error("string ".concat(str, " at index ").concat(i, ": ").concat(str[i], " is not a valid byte"));
        }
    }
    return str;
}
function assert(b, str) {
    if (b) {
        return;
    }
    else {
        throw Error("assertion failed: " + str);
    }
}
exports.assert = assert;
