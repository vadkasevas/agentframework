"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleton = void 0;
const core_1 = require("../../../dependencies/core");
const SingletonAttribute_1 = require("../Attributes/SingletonAttribute");
function singleton(type) {
    return core_1.decorateMember(new SingletonAttribute_1.SingletonAttribute(type));
}
exports.singleton = singleton;
