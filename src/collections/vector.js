"use strict";
exports.__esModule = true;
exports.VectorIterator = exports.Vector = void 0;
var near = require("../api");
var utils_1 = require("../utils");
var ERR_INDEX_OUT_OF_BOUNDS = "Index out of bounds";
var ERR_INCONSISTENT_STATE = "The collection is an inconsistent state. Did previous smart contract execution terminate unexpectedly?";
function indexToKey(prefix, index) {
    var data = new Uint32Array([index]);
    var array = new Uint8Array(data.buffer);
    var key = (0, utils_1.u8ArrayToBytes)(array);
    return prefix + key;
}
/// An iterable implementation of vector that stores its content on the trie.
/// Uses the following map: index -> element
var Vector = /** @class */ (function () {
    function Vector(prefix) {
        this.length = 0;
        this.prefix = prefix;
    }
    Vector.prototype.isEmpty = function () {
        return this.length == 0;
    };
    Vector.prototype.get = function (index) {
        if (index >= this.length) {
            return null;
        }
        var storageKey = indexToKey(this.prefix, index);
        return JSON.parse(near.storageRead(storageKey));
    };
    /// Removes an element from the vector and returns it in serialized form.
    /// The removed element is replaced by the last element of the vector.
    /// Does not preserve ordering, but is `O(1)`.
    Vector.prototype.swapRemove = function (index) {
        if (index >= this.length) {
            throw new Error(ERR_INDEX_OUT_OF_BOUNDS);
        }
        else if (index + 1 == this.length) {
            return this.pop();
        }
        else {
            var key = indexToKey(this.prefix, index);
            var last = this.pop();
            if (near.storageWrite(key, JSON.stringify(last))) {
                return JSON.parse(near.storageGetEvicted());
            }
            else {
                throw new Error(ERR_INCONSISTENT_STATE);
            }
        }
    };
    Vector.prototype.push = function (element) {
        var key = indexToKey(this.prefix, this.length);
        this.length += 1;
        near.storageWrite(key, JSON.stringify(element));
    };
    Vector.prototype.pop = function () {
        if (this.isEmpty()) {
            return null;
        }
        else {
            var lastIndex = this.length - 1;
            var lastKey = indexToKey(this.prefix, lastIndex);
            this.length -= 1;
            if (near.storageRemove(lastKey)) {
                return JSON.parse(near.storageGetEvicted());
            }
            else {
                throw new Error(ERR_INCONSISTENT_STATE);
            }
        }
    };
    Vector.prototype.replace = function (index, element) {
        if (index >= this.length) {
            throw new Error(ERR_INDEX_OUT_OF_BOUNDS);
        }
        else {
            var key = indexToKey(this.prefix, index);
            if (near.storageWrite(key, JSON.stringify(element))) {
                return JSON.parse(near.storageGetEvicted());
            }
            else {
                throw new Error(ERR_INCONSISTENT_STATE);
            }
        }
    };
    Vector.prototype.extend = function (elements) {
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            this.push(element);
        }
    };
    Vector.prototype[Symbol.iterator] = function () {
        return new VectorIterator(this);
    };
    Vector.prototype.clear = function () {
        for (var i = 0; i < this.length; i++) {
            var key = indexToKey(this.prefix, i);
            near.storageRemove(key);
        }
        this.length = 0;
    };
    Vector.prototype.toArray = function () {
        var ret = [];
        for (var _i = 0, _a = this; _i < _a.length; _i++) {
            var v = _a[_i];
            ret.push(v);
        }
        return ret;
    };
    Vector.prototype.serialize = function () {
        return JSON.stringify(this);
    };
    // converting plain object to class object
    Vector.deserialize = function (data) {
        var vector = new Vector(data.prefix);
        vector.length = data.length;
        return vector;
    };
    return Vector;
}());
exports.Vector = Vector;
var VectorIterator = /** @class */ (function () {
    function VectorIterator(vector) {
        this.current = 0;
        this.vector = vector;
    }
    VectorIterator.prototype.next = function () {
        if (this.current < this.vector.length) {
            var value = this.vector.get(this.current);
            this.current += 1;
            return { value: value, done: false };
        }
        return { value: null, done: true };
    };
    return VectorIterator;
}());
exports.VectorIterator = VectorIterator;
