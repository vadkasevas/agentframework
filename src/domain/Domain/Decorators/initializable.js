"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializable = void 0;
const core_1 = require("../../../dependencies/core");
const InitializableAttribute_1 = require("../Attributes/InitializableAttribute");
function initializable() {
    return core_1.decorateClass(new InitializableAttribute_1.InitializableAttribute());
}
exports.initializable = initializable;
