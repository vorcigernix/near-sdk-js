"use strict";
exports.__esModule = true;
exports.LookupMap = void 0;
var near = require("../api");
var LookupMap = /** @class */ (function () {
    function LookupMap(keyPrefix) {
        this.keyPrefix = keyPrefix;
    }
    LookupMap.prototype.containsKey = function (key) {
        var storageKey = this.keyPrefix + JSON.stringify(key);
        return near.storageHasKey(storageKey);
    };
    LookupMap.prototype.get = function (key) {
        var storageKey = this.keyPrefix + JSON.stringify(key);
        var raw = near.storageRead(storageKey);
        if (raw !== null) {
            return JSON.parse(raw);
        }
        return null;
    };
    LookupMap.prototype.remove = function (key) {
        var storageKey = this.keyPrefix + JSON.stringify(key);
        if (near.storageRemove(storageKey)) {
            return JSON.parse(near.storageGetEvicted());
        }
        return null;
    };
    LookupMap.prototype.set = function (key, value) {
        var storageKey = this.keyPrefix + JSON.stringify(key);
        var storageValue = JSON.stringify(value);
        if (near.storageWrite(storageKey, storageValue)) {
            return JSON.parse(near.storageGetEvicted());
        }
        return null;
    };
    LookupMap.prototype.extend = function (objects) {
        for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
            var kv = objects_1[_i];
            this.set(kv[0], kv[1]);
        }
    };
    LookupMap.prototype.serialize = function () {
        return JSON.stringify(this);
    };
    // converting plain object to class object
    LookupMap.deserialize = function (data) {
        return new LookupMap(data.keyPrefix);
    };
    return LookupMap;
}());
exports.LookupMap = LookupMap;
