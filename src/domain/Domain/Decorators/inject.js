"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = void 0;
const core_1 = require("../../../dependencies/core");
const InjectAttribute_1 = require("../Attributes/InjectAttribute");
/**
 * Inject an existing instance in current domain scope. will be `null` if no matching instance found.
 *
 * @param type
 */
function inject(type) {
    return core_1.decorateMember(new InjectAttribute_1.InjectAttribute(type));
}
exports.inject = inject;
