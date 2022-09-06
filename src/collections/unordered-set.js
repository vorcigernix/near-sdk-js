"use strict";
exports.__esModule = true;
exports.UnorderedSet = void 0;
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
var UnorderedSet = /** @class */ (function () {
    function UnorderedSet(prefix) {
        this.prefix = prefix;
        this.elementIndexPrefix = prefix + "i";
        var elementsPrefix = prefix + "e";
        this.elements = new vector_1.Vector(elementsPrefix);
    }
    Object.defineProperty(UnorderedSet.prototype, "length", {
        get: function () {
            return this.elements.length;
        },
        // noop, called by deserialize
        set: function (_l) { },
        enumerable: false,
        configurable: true
    });
    UnorderedSet.prototype.isEmpty = function () {
        return this.elements.isEmpty();
    };
    UnorderedSet.prototype.contains = function (element) {
        var indexLookup = this.elementIndexPrefix + JSON.stringify(element);
        return near.storageHasKey(indexLookup);
    };
    UnorderedSet.prototype.set = function (element) {
        var indexLookup = this.elementIndexPrefix + JSON.stringify(element);
        if (near.storageRead(indexLookup)) {
            return false;
        }
        else {
            var nextIndex = this.length;
            var nextIndexRaw = serializeIndex(nextIndex);
            near.storageWrite(indexLookup, nextIndexRaw);
            this.elements.push(element);
            return true;
        }
    };
    UnorderedSet.prototype.remove = function (element) {
        var indexLookup = this.elementIndexPrefix + JSON.stringify(element);
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
                var lastElement = this.elements.get(this.length - 1);
                if (!lastElement) {
                    throw new Error(ERR_INCONSISTENT_STATE);
                }
                near.storageRemove(indexLookup);
                // If the removed element was the last element from keys, then we don't need to
                // reinsert the lookup back.
                if (lastElement != element) {
                    var lastLookupElement = this.elementIndexPrefix + JSON.stringify(lastElement);
                    near.storageWrite(lastLookupElement, indexRaw);
                }
            }
            var index = deserializeIndex(indexRaw);
            this.elements.swapRemove(index);
            return true;
        }
        return false;
    };
    UnorderedSet.prototype.clear = function () {
        for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
            var element = _a[_i];
            var indexLookup = this.elementIndexPrefix + JSON.stringify(element);
            near.storageRemove(indexLookup);
        }
        this.elements.clear();
    };
    UnorderedSet.prototype.toArray = function () {
        var ret = [];
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var v = _a[_i];
            ret.push(v);
        }
        return ret;
    };
    UnorderedSet.prototype[Symbol.iterator] = function () {
        return this.elements[Symbol.iterator]();
    };
    UnorderedSet.prototype.extend = function (elements) {
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            this.set(element);
        }
    };
    UnorderedSet.prototype.serialize = function () {
        return JSON.stringify(this);
    };
    // converting plain object to class object
    UnorderedSet.deserialize = function (data) {
        var set = new UnorderedSet(data.prefix);
        // reconstruct UnorderedSet
        set.length = data.length;
        // reconstruct Vector
        var elementsPrefix = data.prefix + "e";
        set.elements = new vector_1.Vector(elementsPrefix);
        set.elements.length = data.elements.length;
        return set;
    };
    return UnorderedSet;
}());
exports.UnorderedSet = UnorderedSet;
