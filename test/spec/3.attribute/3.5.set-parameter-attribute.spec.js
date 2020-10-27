"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
class MandatoryAttribute {
}
describe('3.5. Set class method attribute', () => {
    describe('# should able to', () => {
        it('add attribute to class method parameter using custom function', () => {
            function mandatory() {
                return lib_1.decorateParameter(new MandatoryAttribute());
            }
            /*** user code begin ***/
            class MyController351 {
                listAllUser(department, limit) { }
            }
            __decorate([
                __param(0, mandatory()), __param(0, mandatory()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, Number]),
                __metadata("design:returntype", void 0)
            ], MyController351.prototype, "listAllUser", null);
            /*** user code end ***/
            const parameter = lib_1.Reflector(MyController351)
                .property('listAllUser')
                .parameter(0);
            expect(parameter.hasOwnAttribute()).toBeTrue();
            const mandatoryAttribute = parameter.getOwnAttribute(MandatoryAttribute);
            expect(mandatoryAttribute).toBeTruthy();
            expect(mandatoryAttribute).toBeInstanceOf(MandatoryAttribute);
        });
        it('add attribute to class method parameter using const', () => {
            const Mandatory = lib_1.decorateParameter(new MandatoryAttribute());
            /*** user code begin ***/
            class MyController352 {
                listAllUser(department) { }
            }
            __decorate([
                __param(0, Mandatory),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", void 0)
            ], MyController352.prototype, "listAllUser", null);
            /*** user code end ***/
            const parameter = lib_1.Reflector(MyController352)
                .property('listAllUser')
                .getParameters()[0];
            expect(parameter).toBeTruthy();
            const mandatoryAttribute = parameter.getOwnAttribute(MandatoryAttribute);
            expect(mandatoryAttribute).toBeInstanceOf(MandatoryAttribute);
        });
        it('add attribute to class method parameter using helper function', () => {
            /*** user code begin ***/
            class MyController353 {
                listAllUser(department) { }
            }
            __decorate([
                __param(0, lib_1.decorateParameter(new MandatoryAttribute())),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String]),
                __metadata("design:returntype", void 0)
            ], MyController353.prototype, "listAllUser", null);
            /*** user code end ***/
            const parameter = lib_1.Reflector(MyController353)
                .property('listAllUser')
                .getParameter(0);
            if (!parameter) {
                throw new Error('property should not null');
            }
            expect(parameter).toBeTruthy();
            const mandatoryAttribute = parameter.getOwnAttribute(MandatoryAttribute);
            expect(mandatoryAttribute).toBeInstanceOf(MandatoryAttribute);
        });
        it('add attribute to class method parameter using Reflector', () => {
            /*** user code begin ***/
            class MyController353 {
                listAllUser(department) { }
            }
            /*** user code end ***/
            lib_1.Reflector(MyController353)
                .property('listAllUser')
                .parameter(0)
                .addAttribute(new MandatoryAttribute());
            const parameter1 = lib_1.Reflector(MyController353)
                .property('listAllUser')
                .getParameter(0);
            if (!parameter1) {
                throw new Error('property should not null');
            }
            expect(parameter1).toBeTruthy();
            const mandatoryAttribute = parameter1.getOwnAttribute(MandatoryAttribute);
            expect(mandatoryAttribute).toBeInstanceOf(MandatoryAttribute);
        });
    });
});
