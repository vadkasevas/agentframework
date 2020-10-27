"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotSupportedError = void 0;
class NotSupportedError extends SyntaxError {
    constructor(operation) {
        super(`${operation} is not supported`);
    }
}
exports.NotSupportedError = NotSupportedError;
