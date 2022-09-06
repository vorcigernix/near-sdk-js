"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PublicKey = exports.UnknownCurve = exports.Base58Error = exports.InvalidLengthError = exports.ParsePublicKeyError = exports.curveTypeFromStr = exports.CurveType = void 0;
var utils_1 = require("../utils");
var base_1 = require("@scure/base");
var CurveType;
(function (CurveType) {
    CurveType[CurveType["ED25519"] = 0] = "ED25519";
    CurveType[CurveType["SECP256K1"] = 1] = "SECP256K1";
})(CurveType = exports.CurveType || (exports.CurveType = {}));
function data_len(c) {
    switch (c) {
        case CurveType.ED25519:
            return 32;
        case CurveType.SECP256K1:
            return 64;
        default:
            throw new UnknownCurve();
    }
}
function split_key_type_data(value) {
    var idx = value.indexOf(":");
    if (idx >= 0) {
        return [curveTypeFromStr(value.substring(0, idx)), value.substring(idx + 1)];
    }
    else {
        return [CurveType.ED25519, value];
    }
}
function curveTypeFromStr(value) {
    switch (value) {
        case "ed25519":
            return CurveType.ED25519;
        case "secp256k1":
            return CurveType.SECP256K1;
        default:
            throw new UnknownCurve();
    }
}
exports.curveTypeFromStr = curveTypeFromStr;
var ParsePublicKeyError = /** @class */ (function (_super) {
    __extends(ParsePublicKeyError, _super);
    function ParsePublicKeyError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ParsePublicKeyError;
}(Error));
exports.ParsePublicKeyError = ParsePublicKeyError;
var InvalidLengthError = /** @class */ (function (_super) {
    __extends(InvalidLengthError, _super);
    function InvalidLengthError(length) {
        var _this = _super.call(this, "Invalid length: ".concat(length)) || this;
        _this.length = length;
        return _this;
    }
    return InvalidLengthError;
}(ParsePublicKeyError));
exports.InvalidLengthError = InvalidLengthError;
var Base58Error = /** @class */ (function (_super) {
    __extends(Base58Error, _super);
    function Base58Error(error) {
        var _this = _super.call(this, "Base58 error: ".concat(error)) || this;
        _this.error = error;
        return _this;
    }
    return Base58Error;
}(ParsePublicKeyError));
exports.Base58Error = Base58Error;
var UnknownCurve = /** @class */ (function (_super) {
    __extends(UnknownCurve, _super);
    function UnknownCurve() {
        return _super.call(this, "Unknown curve") || this;
    }
    return UnknownCurve;
}(ParsePublicKeyError));
exports.UnknownCurve = UnknownCurve;
var PublicKey = /** @class */ (function () {
    function PublicKey(data) {
        this.data = data;
        var curve_type = data.charCodeAt(0);
        var curve_len = data_len(curve_type);
        if (data.length != curve_len + 1) {
            throw new InvalidLengthError(data.length);
        }
        this.data = data;
    }
    PublicKey.prototype.curveType = function () {
        return this.data.charCodeAt(0);
    };
    PublicKey.fromString = function (s) {
        var _a = split_key_type_data(s), curve = _a[0], key_data = _a[1];
        var data;
        try {
            data = (0, utils_1.bytes)(base_1.base58.decode(key_data));
        }
        catch (err) {
            throw new Base58Error(err.message);
        }
        return new PublicKey(String.fromCharCode(curve) + data);
    };
    return PublicKey;
}());
exports.PublicKey = PublicKey;
