"use strict";
exports.__esModule = true;
exports.PromiseError = exports.PromiseResult = void 0;
var PromiseResult;
(function (PromiseResult) {
    PromiseResult[PromiseResult["NotReady"] = 0] = "NotReady";
    PromiseResult[PromiseResult["Successful"] = 1] = "Successful";
    PromiseResult[PromiseResult["Failed"] = 2] = "Failed";
})(PromiseResult = exports.PromiseResult || (exports.PromiseResult = {}));
var PromiseError;
(function (PromiseError) {
    PromiseError[PromiseError["Failed"] = 0] = "Failed";
    PromiseError[PromiseError["NotReady"] = 1] = "NotReady";
})(PromiseError = exports.PromiseError || (exports.PromiseError = {}));
