"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeNotFoundError = void 0;
class TypeNotFoundError extends TypeError {
    constructor(type) {
        super(`Type ${type.name} not found`);
        this.type = type;
    }
}
exports.TypeNotFoundError = TypeNotFoundError;
