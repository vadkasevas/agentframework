"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyDecorator = void 0;
const lib_1 = require("../../../lib");
function propertyDecorator() {
    return lib_1.decorateMember(new PropertyAttribute());
}
exports.propertyDecorator = propertyDecorator;
class PropertyAttribute {
    beforeDecorate(target, targetKey, descriptor) {
        return true;
    }
}
