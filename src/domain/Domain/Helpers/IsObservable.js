"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsObservable = void 0;
const IsFunction_1 = require("./IsFunction");
/**
 * Return true if value is observable
 */
function IsObservable(value) {
    return 'object' === typeof value && !!value && IsFunction_1.IsFunction(value['lift']) && IsFunction_1.IsFunction(value['subscribe']);
}
exports.IsObservable = IsObservable;
