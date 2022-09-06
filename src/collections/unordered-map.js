"use strict";
exports.__esModule = true;
exports.UnorderedMap = void 0;
var near = require("../api");
var utils_1 = require("../utils");
var vector_1 = require("./vector");
var ERR_INCONSISTENT_STATE = "The collection is an inconsistent state. Did previous smart contract execution terminate unexpectedly?";
function serializeIndex(index) {
    var data = new Uint32Array([index]);
    var array = new Uint8Array(data.buffer);
    return (0, utils_1.u8ArrayToBytes)(array);
}
function deserializeIndex(rawIndex) {
    var array = (0, utils_1.bytesToU8Array)(rawIndex);
    var data = new Uint32Array(array.buffer);
    return data[0];
}
function getIndexRaw(keyIndexPrefix, key) {
    var indexLookup = keyIndexPrefix + JSON.stringify(key);
    var indexRaw = near.storageRead(indexLookup);
    return indexRaw;
}
var UnorderedMap = /** @class */ (function () {
    function UnorderedMap(prefix) {
        this.prefix = prefix;
        this.keyIndexPrefix = prefix + "i";
        var indexKey = prefix + "k";
        var indexValue = prefix + "v";
        this.keys = new vector_1.Vector(indexKey);
        this.values = new vector_1.Vector(indexValue);
    }
    Object.defineProperty(UnorderedMap.prototype, "length", {
        get: function () {
            var keysLen = this.keys.length;
            var valuesLen = this.values.length;
            if (keysLen != valuesLen) {
                throw new Error(ERR_INCONSISTENT_STATE);
            }
            return keysLen;
        },
        // noop, called by deserialize
        set: function (_l) { },
        enumerable: false,
        configurable: true
    });
    UnorderedMap.prototype.isEmpty = function () {
        var keysIsEmpty = this.keys.isEmpty();
        var valuesIsEmpty = this.values.isEmpty();
        if (keysIsEmpty != valuesIsEmpty) {
            throw new Error(ERR_INCONSISTENT_STATE);
        }
        return keysIsEmpty;
    };
    UnorderedMap.prototype.get = function (key) {
        var indexRaw = getIndexRaw(this.keyIndexPrefix, key);
        if (indexRaw) {
            var index = deserializeIndex(indexRaw);
            var value = this.values.get(index);
            if (value) {
                return value;
            }
            else {
                throw new Error(ERR_INCONSISTENT_STATE);
            }
        }
        return null;
    };
    UnorderedMap.prototype.set = function (key, value) {
        var indexLookup = this.keyIndexPrefix + JSON.stringify(key);
        var indexRaw = near.storageRead(indexLookup);
        if (indexRaw) {
            var index = deserializeIndex(indexRaw);
            return this.values.replace(index, value);
        }
        else {
            var nextIndex = this.length;
            var nextIndexRaw = serializeIndex(nextIndex);
            near.storageWrite(indexLookup, nextIndexRaw);
            this.keys.push(key);
            this.values.push(value);
            return null;
        }
    };
    UnorderedMap.prototype.remove = function (key) {
        var indexLookup = this.keyIndexPrefix + JSON.stringify(key);
        var indexRaw = near.storageRead(indexLookup);
        if (indexRaw) {
            if (this.length == 1) {
                // If there is only one element then swap remove simply removes it without
                // swapping with the last element.
                near.storageRemove(indexLookup);
            }
            else {
                // If there is more than one element then swap remove swaps it with the last
                // element.
                var lastKey = this.keys.get(this.length - 1);
                if (!lastKey) {
                    throw new Error(ERR_INCONSISTENT_STATE);
                }
                near.storageRemove(indexLookup);
                // If the removed element was the last element from keys, then we don't need to
                // reinsert the lookup back.
                if (lastKey != key) {
                    var lastLookupKey = this.keyIndexPrefix + JSON.stringify(lastKey);
                    near.storageWrite(lastLookupKey, indexRaw);
                }
            }
            var index = deserializeIndex(indexRaw);
            this.keys.swapRemove(index);
            return this.values.swapRemove(index);
        }
        return null;
    };
    UnorderedMap.prototype.clear = function () {
        for (var _i = 0, _a = this.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var indexLookup = this.keyIndexPrefix + JSON.stringify(key);
            near.storageRemove(indexLookup);
        }
        this.keys.clear();
        this.values.clear();
    };
    UnorderedMap.prototype.toArray = function () {
        var ret = [];
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var v = _a[_i];
            ret.push(v);
        }
        return ret;
    };
    UnorderedMap.prototype[Symbol.iterator] = function () {
        return new UnorderedMapIterator(this);
    };
    UnorderedMap.prototype.extend = function (kvs) {
        for (var _i = 0, kvs_1 = kvs; _i < kvs_1.length; _i++) {
            var _a = kvs_1[_i], k = _a[0], v = _a[1];
            this.set(k, v);
        }
    };
    UnorderedMap.prototype.serialize = function () {
        return JSON.stringify(this);
    };
    // converting plain object to class object
    UnorderedMap.deserialize = function (data) {
        var map = new UnorderedMap(data.prefix);
        // reconstruct UnorderedMap
        map.length = data.length;
        // reconstruct keys Vector
        map.keys = new vector_1.Vector(data.prefix + "k");
        map.keys.length = data.keys.length;
        // reconstruct values Vector
        map.values = new vector_1.Vector(data.prefix + "v");
        map.values.length = data.values.length;
        return map;
    };
    return UnorderedMap;
}());
exports.UnorderedMap = UnorderedMap;
var UnorderedMapIterator = /** @class */ (function () {
    function UnorderedMapIterator(unorderedMap) {
        this.keys = new vector_1.VectorIterator(unorderedMap.keys);
        this.values = new vector_1.VectorIterator(unorderedMap.values);
    }
    UnorderedMapIterator.prototype.next = function () {
        var key = this.keys.next();
        var value = this.values.next();
        if (key.done != value.done) {
            throw new Error(ERR_INCONSISTENT_STATE);
        }
        return { value: [key.value, value.value], done: key.done };
    };
    return UnorderedMapIterator;
}());
