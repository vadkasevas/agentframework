"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
/**
 * The tests shows 3 ways to add attribute to a class at design time
 */
class ControllerAttribute {
    constructor(path) {
        this.path = path;
    }
}
describe('3.1. Set class attribute', () => {
    describe('# should able to', () => {
        it('add attribute to class using custom function', () => {
            function controller(path) {
                return lib_1.decorateClass(new ControllerAttribute(path));
            }
            /*** user code begin ***/
            let MyClass311 = class MyClass311 {
            };
            MyClass311 = __decorate([
                controller('/api')
            ], MyClass311);
            /*** user code end ***/
            const attribute = lib_1.Reflector(MyClass311).getOwnAttribute(ControllerAttribute);
            expect(attribute).toBeInstanceOf(ControllerAttribute);
            expect(attribute && attribute.path).toBe('/api');
        });
        it('add attribute to class using const', () => {
            const controller = lib_1.decorateClass(new ControllerAttribute('/api'));
            /*** user code begin ***/
            let MyClass312 = class MyClass312 {
            };
            MyClass312 = __decorate([
                controller
            ], MyClass312);
            /*** user code end ***/
            const attribute = lib_1.Reflector(MyClass312).getOwnAttribute(ControllerAttribute);
            expect(attribute).toBeInstanceOf(ControllerAttribute);
            expect(attribute && attribute.path).toBe('/api');
        });
        it('add attribute to class using helper function', () => {
            /*** user code begin ***/
            let MyClass313 = class MyClass313 {
            };
            MyClass313 = __decorate([
                lib_1.decorateClass(new ControllerAttribute('/api'))
            ], MyClass313);
            /*** user code end ***/
            const attribute = lib_1.Reflector(MyClass313).getOwnAttribute(ControllerAttribute);
            expect(attribute).toBeInstanceOf(ControllerAttribute);
            expect(attribute && attribute.path).toBe('/api');
        });
        it('add attribute to class using Reflector api', () => {
            /*** user code begin ***/
            class MyClass314 {
            }
            /*** user code end ***/
            lib_1.Reflector(MyClass314).addAttribute(new ControllerAttribute('/api'));
            const attribute = lib_1.Reflector(MyClass314).getOwnAttribute(ControllerAttribute);
            expect(attribute).toBeInstanceOf(ControllerAttribute);
            expect(attribute && attribute.path).toBe('/api');
        });
    });
    describe('# should not able to', () => {
        it('add attribute with BeforeDecorate = false', () => {
            /*** user code begin ***/
            class NotAllowAttribute {
                beforeDecorate(target, key, descriptor) {
                    return false;
                }
            }
            let MyClass314 = class MyClass314 {
            };
            MyClass314 = __decorate([
                lib_1.decorate(new NotAllowAttribute(), lib_1.MemberKinds.Class)
            ], MyClass314);
            /*** user code end ***/
            const attribute = lib_1.Reflector(MyClass314).getOwnAttribute(NotAllowAttribute);
            expect(attribute).toBeUndefined();
        });
    });
});
