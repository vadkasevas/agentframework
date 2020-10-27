"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAgent = exports.GetType = exports.RememberType = exports.Knowledge = void 0;
const Wisdom_1 = require("./Wisdom");
class Knowledge {
    // core
    // key: Agent Proxy | Agent Constructor | Domain Agent Constructor, value: Original Constructor
    static get types() {
        return Wisdom_1.memorize(this, 'types');
    }
    static get invocations() {
        return Wisdom_1.memorize(this, 'invocations');
    }
}
exports.Knowledge = Knowledge;
function RememberType(agent, type) {
    Knowledge.types.set(agent, type);
    Knowledge.types.set(agent.prototype, type.prototype);
}
exports.RememberType = RememberType;
/**
 * Returns original type of the agent
 */
function GetType(type) {
    return Knowledge.types.get(type);
}
exports.GetType = GetType;
/**
 * Return true if giving type is an agent
 */
function IsAgent(test) {
    return Knowledge.types.has(test);
}
exports.IsAgent = IsAgent;
