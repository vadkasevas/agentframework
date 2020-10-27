"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadAgentChecker = void 0;
const lib_1 = require("../../../lib");
class BadAgentChecker extends lib_1.AgentAttribute {
    beforeDecorate(target, targetKey, descriptor) {
        return false;
    }
}
exports.BadAgentChecker = BadAgentChecker;
