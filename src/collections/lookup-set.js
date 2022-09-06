"use strict";
exports.__esModule = true;
exports.LookupSet = void 0;
var near = require("../api");
var LookupSet = /** @class */ (function () {
    function LookupSet(keyPrefix) {
        this.keyPrefix = keyPrefix;
    }
    LookupSet.prototype.contains = function (key) {
        var storageKey = this.keyPrefix + JSON.stringify(key);
        return near.storageHasKey(storageKey);
    };
    // Returns true if the element was present in the set.
    LookupSet.prototype.remove = function (key) {
        var storageKey = this.keyPrefix + JSON.stringify(key);
        return near.storageRemove(storageKey);
    };
    // If the set did not have this value present, `true` is returned.
    // If the set did have this value present, `false` is returned.
    LookupSet.prototype.set = function (key) {
        var storageKey = this.keyPrefix + JSON.stringify(key);
        return !near.storageWrite(storageKey, '');
    };
    LookupSet.prototype.extend = function (keys) {
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            this.set(key);
        }
    };
    LookupSet.prototype.serialize = function () {
        return JSON.stringify(this);
    };
    // converting plain object to class object
    LookupSet.deserialize = function (data) {
        return new LookupSet(data.keyPrefix);
    };
    return LookupSet;
}());
exports.LookupSet = LookupSet;
