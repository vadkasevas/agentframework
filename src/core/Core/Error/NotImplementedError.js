"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotImplementedError = void 0;
class NotImplementedError extends SyntaxError {
    constructor(operation) {
        super(`${operation} is not implemented yet`);
    }
}
exports.NotImplementedError = NotImplementedError;
