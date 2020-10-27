"use strict";
/* tslint:disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisabledMetadataAttribute = void 0;
class DisabledMetadataAttribute {
    beforeDecorate(target, targetKey, descriptor) {
        return false;
    }
}
exports.DisabledMetadataAttribute = DisabledMetadataAttribute;
