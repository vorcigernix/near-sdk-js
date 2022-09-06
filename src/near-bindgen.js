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
exports.NearBindgen = exports.view = exports.call = exports.initialize = void 0;
var near = require("./api");
function initialize(target, key, descriptor) {
}
exports.initialize = initialize;
function call(target, key, descriptor) {
}
exports.call = call;
function view(target, key, descriptor) {
}
exports.view = view;
function NearBindgen(_a) {
    var _b = _a.requireInit, requireInit = _b === void 0 ? false : _b;
    return function (target) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1._create = function () {
                return new target();
            };
            class_1._getState = function () {
                var rawState = near.storageRead("STATE");
                return rawState ? this._deserialize(rawState) : null;
            };
            class_1._saveToStorage = function (obj) {
                near.storageWrite("STATE", this._serialize(obj));
            };
            class_1._getArgs = function () {
                return JSON.parse(near.input() || "{}");
            };
            class_1._serialize = function (value) {
                return JSON.stringify(value);
            };
            class_1._deserialize = function (value) {
                return JSON.parse(value);
            };
            class_1._reconstruct = function (classObject, plainObject) {
                var _a;
                for (var item in classObject) {
                    if (((_a = classObject[item].constructor) === null || _a === void 0 ? void 0 : _a.deserialize) !== undefined) {
                        classObject[item] = classObject[item].constructor.deserialize(plainObject[item]);
                    }
                    else {
                        classObject[item] = plainObject[item];
                    }
                }
                return classObject;
            };
            class_1._requireInit = function () {
                return requireInit;
            };
            return class_1;
        }(target));
    };
}
exports.NearBindgen = NearBindgen;
