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
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
class MethodAttribute {
    constructor(method, path) {
        this.method = method;
        this.path = path;
    }
}
describe('3.3. Set class method attribute', () => {
    describe('# should able to', () => {
        it('add attribute to class method using custom function', () => {
            function method(method, path) {
                return lib_1.decorateMember(new MethodAttribute(method, path));
            }
            /*** user code begin ***/
            class MyController331 {
                listAllUser() { }
            }
            __decorate([
                method('GET', '/list'),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], MyController331.prototype, "listAllUser", null);
            /*** user code end ***/
            const property = lib_1.Reflector(MyController331).property('listAllUser');
            const methodAttribute = property.getOwnAttribute(MethodAttribute);
            expect(methodAttribute).toBeInstanceOf(MethodAttribute);
            expect(methodAttribute && methodAttribute.method).toBe('GET');
            expect(methodAttribute && methodAttribute.path).toBe('/list');
        });
        it('add attribute to class method using const', () => {
            const get = lib_1.decorateMember(new MethodAttribute('GET'));
            /*** user code begin ***/
            class MyController332 {
                listAllUser() { }
            }
            __decorate([
                get,
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], MyController332.prototype, "listAllUser", null);
            /*** user code end ***/
            const property = lib_1.Reflector(MyController332).property('listAllUser');
            const methodAttribute = property.getOwnAttribute(MethodAttribute);
            expect(methodAttribute).toBeInstanceOf(MethodAttribute);
            expect(methodAttribute && methodAttribute.method).toBe('GET');
            expect(methodAttribute && methodAttribute.path).toBeUndefined();
        });
        it('add attribute to class method using helper function', () => {
            /*** user code begin ***/
            class MyController333 {
                listAllUser() { }
            }
            __decorate([
                lib_1.decorateMember(new MethodAttribute('GET', '/list')),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], MyController333.prototype, "listAllUser", null);
            /*** user code end ***/
            const property = lib_1.Reflector(MyController333).property('listAllUser');
            const methodAttribute = property.getOwnAttribute(MethodAttribute);
            expect(methodAttribute).toBeInstanceOf(MethodAttribute);
            expect(methodAttribute && methodAttribute.method).toBe('GET');
            expect(methodAttribute && methodAttribute.path).toBe('/list');
        });
        it('add attribute to class method using Reflector API', () => {
            /*** user code begin ***/
            class MyController334 {
                listAllUser() { }
            }
            /*** user code end ***/
            const property = lib_1.Reflector(MyController334).property('listAllUser');
            property.addAttribute(new MethodAttribute('GET', '/list'));
            const methodAttribute = property.getOwnAttribute(MethodAttribute);
            const methodAttributes = property.getOwnAttributes(MethodAttribute);
            expect(methodAttribute).toBeInstanceOf(MethodAttribute);
            expect(methodAttribute && methodAttribute.method).toBe('GET');
            expect(methodAttribute && methodAttribute.path).toBe('/list');
            expect(methodAttributes.length).toBe(1);
        });
    });
});
