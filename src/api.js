"use strict";
exports.__esModule = true;
exports.promiseResultsCount = exports.promiseBatchActionFunctionCallWeight = exports.promiseBatchActionDeleteAccount = exports.promiseBatchActionDeleteKey = exports.promiseBatchActionAddKeyWithFunctionCall = exports.promiseBatchActionAddKeyWithFullAccess = exports.promiseBatchActionStake = exports.promiseBatchActionTransfer = exports.promiseBatchActionFunctionCall = exports.promiseBatchActionDeployContract = exports.promiseBatchActionCreateAccount = exports.promiseBatchThen = exports.promiseBatchCreate = exports.promiseAnd = exports.promiseThen = exports.promiseCreate = exports.valueReturn = exports.accountLockedBalance = exports.accountBalance = exports.storageUsage = exports.input = exports.currentAccountId = exports.storageGetEvicted = exports.altBn128PairingCheck = exports.altBn128G1Sum = exports.altBn128G1Multiexp = exports.validatorTotalStake = exports.validatorStake = exports.storageHasKey = exports.storageRead = exports.logUtf16 = exports.logUtf8 = exports.panicUtf8 = exports.ecrecover = exports.ripemd160 = exports.keccak512 = exports.keccak256 = exports.sha256 = exports.randomSeed = exports.usedGas = exports.prepaidGas = exports.attachedDeposit = exports.epochHeight = exports.blockTimestamp = exports.blockHeight = exports.blockIndex = exports.predecessorAccountId = exports.signerAccountPk = exports.signerAccountId = exports.log = void 0;
exports.storageByteCost = exports.storageRemove = exports.storageWrite = exports.promiseReturn = exports.promiseResult = void 0;
var types_1 = require("./types");
var U64_MAX = Math.pow(2n, 64n) - 1n;
var EVICTED_REGISTER = U64_MAX - 1n;
function log() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    env.log("".concat(params
        .map(function (x) { return x === undefined ? 'undefined' : x; }) // Stringify undefined
        .map(function (x) { return typeof (x) === 'object' ? JSON.stringify(x) : x; }) // Convert Objects to strings
        .join(' ')) // Convert to string
    );
}
exports.log = log;
function signerAccountId() {
    env.signer_account_id(0);
    return env.read_register(0);
}
exports.signerAccountId = signerAccountId;
function signerAccountPk() {
    env.signer_account_pk(0);
    return env.read_register(0);
}
exports.signerAccountPk = signerAccountPk;
function predecessorAccountId() {
    env.predecessor_account_id(0);
    return env.read_register(0);
}
exports.predecessorAccountId = predecessorAccountId;
function blockIndex() {
    return env.block_index();
}
exports.blockIndex = blockIndex;
function blockHeight() {
    return blockIndex();
}
exports.blockHeight = blockHeight;
function blockTimestamp() {
    return env.block_timestamp();
}
exports.blockTimestamp = blockTimestamp;
function epochHeight() {
    return env.epoch_height();
}
exports.epochHeight = epochHeight;
function attachedDeposit() {
    return env.attached_deposit();
}
exports.attachedDeposit = attachedDeposit;
function prepaidGas() {
    return env.prepaid_gas();
}
exports.prepaidGas = prepaidGas;
function usedGas() {
    return env.used_gas();
}
exports.usedGas = usedGas;
function randomSeed() {
    env.random_seed(0);
    return env.read_register(0);
}
exports.randomSeed = randomSeed;
function sha256(value) {
    env.sha256(value, 0);
    return env.read_register(0);
}
exports.sha256 = sha256;
function keccak256(value) {
    env.keccak256(value, 0);
    return env.read_register(0);
}
exports.keccak256 = keccak256;
function keccak512(value) {
    env.keccak512(value, 0);
    return env.read_register(0);
}
exports.keccak512 = keccak512;
function ripemd160(value) {
    env.ripemd160(value, 0);
    return env.read_register(0);
}
exports.ripemd160 = ripemd160;
function ecrecover(hash, sig, v, malleabilityFlag) {
    var ret = env.ecrecover(hash, sig, v, malleabilityFlag, 0);
    if (ret === 0n) {
        return null;
    }
    return env.read_register(0);
}
exports.ecrecover = ecrecover;
// NOTE: "env.panic(msg)" is not exported, use "throw Error(msg)" instead
function panicUtf8(msg) {
    env.panic_utf8(msg);
}
exports.panicUtf8 = panicUtf8;
function logUtf8(msg) {
    env.log_utf8(msg);
}
exports.logUtf8 = logUtf8;
function logUtf16(msg) {
    env.log_utf16(msg);
}
exports.logUtf16 = logUtf16;
function storageRead(key) {
    var ret = env.storage_read(key, 0);
    if (ret === 1n) {
        return env.read_register(0);
    }
    else {
        return null;
    }
}
exports.storageRead = storageRead;
function storageHasKey(key) {
    var ret = env.storage_has_key(key);
    if (ret === 1n) {
        return true;
    }
    else {
        return false;
    }
}
exports.storageHasKey = storageHasKey;
function validatorStake(accountId) {
    return env.validator_stake(accountId);
}
exports.validatorStake = validatorStake;
function validatorTotalStake() {
    return env.validator_total_stake();
}
exports.validatorTotalStake = validatorTotalStake;
function altBn128G1Multiexp(value) {
    env.alt_bn128_g1_multiexp(value, 0);
    return env.read_register(0);
}
exports.altBn128G1Multiexp = altBn128G1Multiexp;
function altBn128G1Sum(value) {
    env.alt_bn128_g1_sum(value, 0);
    return env.read_register(0);
}
exports.altBn128G1Sum = altBn128G1Sum;
function altBn128PairingCheck(value) {
    var ret = env.alt_bn128_pairing_check(value);
    if (ret === 1n) {
        return true;
    }
    else {
        return false;
    }
}
exports.altBn128PairingCheck = altBn128PairingCheck;
function storageGetEvicted() {
    return env.read_register(EVICTED_REGISTER);
}
exports.storageGetEvicted = storageGetEvicted;
function currentAccountId() {
    env.current_account_id(0);
    return env.read_register(0);
}
exports.currentAccountId = currentAccountId;
function input() {
    env.input(0);
    return env.read_register(0);
}
exports.input = input;
function storageUsage() {
    return env.storage_usage();
}
exports.storageUsage = storageUsage;
function accountBalance() {
    return env.account_balance();
}
exports.accountBalance = accountBalance;
function accountLockedBalance() {
    return env.account_locked_balance();
}
exports.accountLockedBalance = accountLockedBalance;
function valueReturn(value) {
    env.value_return(value);
}
exports.valueReturn = valueReturn;
function promiseCreate(accountId, methodName, args, amount, gas) {
    return env.promise_create(accountId, methodName, args, amount, gas);
}
exports.promiseCreate = promiseCreate;
function promiseThen(promiseIndex, accountId, methodName, args, amount, gas) {
    return env.promise_then(promiseIndex, accountId, methodName, args, amount, gas);
}
exports.promiseThen = promiseThen;
function promiseAnd() {
    var promiseIndex = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        promiseIndex[_i] = arguments[_i];
    }
    return env.promise_and.apply(env, promiseIndex);
}
exports.promiseAnd = promiseAnd;
function promiseBatchCreate(accountId) {
    return env.promise_batch_create(accountId);
}
exports.promiseBatchCreate = promiseBatchCreate;
function promiseBatchThen(promiseIndex, accountId) {
    return env.promise_batch_then(promiseIndex, accountId);
}
exports.promiseBatchThen = promiseBatchThen;
function promiseBatchActionCreateAccount(promiseIndex) {
    env.promise_batch_action_create_account(promiseIndex);
}
exports.promiseBatchActionCreateAccount = promiseBatchActionCreateAccount;
function promiseBatchActionDeployContract(promiseIndex, code) {
    env.promise_batch_action_deploy_contract(promiseIndex, code);
}
exports.promiseBatchActionDeployContract = promiseBatchActionDeployContract;
function promiseBatchActionFunctionCall(promiseIndex, methodName, args, amount, gas) {
    env.promise_batch_action_function_call(promiseIndex, methodName, args, amount, gas);
}
exports.promiseBatchActionFunctionCall = promiseBatchActionFunctionCall;
function promiseBatchActionTransfer(promiseIndex, amount) {
    env.promise_batch_action_transfer(promiseIndex, amount);
}
exports.promiseBatchActionTransfer = promiseBatchActionTransfer;
function promiseBatchActionStake(promiseIndex, amount, publicKey) {
    env.promise_batch_action_stake(promiseIndex, amount, publicKey);
}
exports.promiseBatchActionStake = promiseBatchActionStake;
function promiseBatchActionAddKeyWithFullAccess(promiseIndex, publicKey, nonce) {
    env.promise_batch_action_add_key_with_full_access(promiseIndex, publicKey, nonce);
}
exports.promiseBatchActionAddKeyWithFullAccess = promiseBatchActionAddKeyWithFullAccess;
function promiseBatchActionAddKeyWithFunctionCall(promiseIndex, publicKey, nonce, allowance, receiverId, methodNames) {
    env.promise_batch_action_add_key_with_function_call(promiseIndex, publicKey, nonce, allowance, receiverId, methodNames);
}
exports.promiseBatchActionAddKeyWithFunctionCall = promiseBatchActionAddKeyWithFunctionCall;
function promiseBatchActionDeleteKey(promiseIndex, publicKey) {
    env.promise_batch_action_delete_key(promiseIndex, publicKey);
}
exports.promiseBatchActionDeleteKey = promiseBatchActionDeleteKey;
function promiseBatchActionDeleteAccount(promiseIndex, beneficiaryId) {
    env.promise_batch_action_delete_account(promiseIndex, beneficiaryId);
}
exports.promiseBatchActionDeleteAccount = promiseBatchActionDeleteAccount;
function promiseBatchActionFunctionCallWeight(promiseIndex, methodName, args, amount, gas, weight) {
    env.promise_batch_action_function_call_weight(promiseIndex, methodName, args, amount, gas, weight);
}
exports.promiseBatchActionFunctionCallWeight = promiseBatchActionFunctionCallWeight;
function promiseResultsCount() {
    return env.promise_results_count();
}
exports.promiseResultsCount = promiseResultsCount;
function promiseResult(resultIdx) {
    var status = env.promise_result(resultIdx, 0);
    if (status == types_1.PromiseResult.Successful) {
        return env.read_register(0);
    }
    else if (status == types_1.PromiseResult.Failed ||
        status == types_1.PromiseResult.NotReady) {
        return status;
    }
    else {
        throw Error("Unexpected return code: ".concat(status));
    }
}
exports.promiseResult = promiseResult;
function promiseReturn(promiseIdx) {
    env.promise_return(promiseIdx);
}
exports.promiseReturn = promiseReturn;
function storageWrite(key, value) {
    var exist = env.storage_write(key, value, EVICTED_REGISTER);
    if (exist === 1n) {
        return true;
    }
    return false;
}
exports.storageWrite = storageWrite;
function storageRemove(key) {
    var exist = env.storage_remove(key, EVICTED_REGISTER);
    if (exist === 1n) {
        return true;
    }
    return false;
}
exports.storageRemove = storageRemove;
function storageByteCost() {
    return 10000000000000000000n;
}
exports.storageByteCost = storageByteCost;
