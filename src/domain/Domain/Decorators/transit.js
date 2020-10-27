"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transit = void 0;
const core_1 = require("../../../dependencies/core");
const TransitAttribute_1 = require("../Attributes/TransitAttribute");
function transit(type) {
    return core_1.decorateMember(new TransitAttribute_1.TransitAttribute(type));
}
exports.transit = transit;
