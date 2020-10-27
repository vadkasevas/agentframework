"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentNotFoundError = void 0;
class AgentNotFoundError extends TypeError {
    constructor(type) {
        super(`Agent ${type.name} not found`);
        this.type = type;
    }
}
exports.AgentNotFoundError = AgentNotFoundError;
