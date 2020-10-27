"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPromise = void 0;
/**
 * Return true if value is function
 */
function IsPromise(value) {
    return 'object' === typeof value && !!value && value instanceof Promise;
}
exports.IsPromise = IsPromise;
