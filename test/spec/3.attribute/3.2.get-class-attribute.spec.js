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
/**
 * The tests shows 3 ways to add attribute to a class at design time
 */
class ControllerAttribute {
    constructor(path) {
        this.path = path;
    }
}
function controller(path) {
    return lib_1.decorateClass(new ControllerAttribute(path));
}
class RoleAttribute {
    constructor(role) {
        this.role = role;
    }
}
function admin() {
    return lib_1.decorateClass(new RoleAttribute('admin'));
}
let UserController321 = class UserController321 {
    constructor(department) {
        this.department = department;
    }
    listAllUser() {
        return ['David', 'Emma', 'William', 'James', 'John', 'Michael'];
    }
};
UserController321 = __decorate([
    admin(),
    controller('/api/user'),
    __metadata("design:paramtypes", [String])
], UserController321);
describe('3.2. Get class attribute', () => {
    describe('# should able to', () => {
        it('get parameters', () => {
            const type = lib_1.Reflector(UserController321);
            // constructor parameter type is annotated if class got decorator
            expect(type.getParameterTypes()).toEqual([String]);
            // no annotated parameters
            expect(type.getParameters()).toEqual([]);
        });
        it('check attribute', () => {
            const type = lib_1.Reflector(UserController321);
            expect(type.hasOwnAttribute(ControllerAttribute)).toBeTrue();
        });
        it('get attribute', () => {
            const type = lib_1.Reflector(UserController321);
            const controllerAttribute = type.getOwnAttribute(ControllerAttribute);
            expect(controllerAttribute).toBeInstanceOf(ControllerAttribute);
            expect(controllerAttribute && controllerAttribute.path).toBe('/api/user');
        });
        it('get all controller attributes', () => {
            const type = lib_1.Reflector(UserController321);
            const found = type.getOwnAttributes(ControllerAttribute);
            expect(found).toBeInstanceOf(Array);
            expect(found.length).toBe(1);
        });
        it('get all controller attributes', () => {
            const type = lib_1.Reflector(UserController321);
            const found = type.getOwnAttributes();
            expect(found).toBeInstanceOf(Array);
            expect(found.length).toBe(2);
        });
        it('find attribute using ControllerAttribute', () => {
            const type = lib_1.Reflector(UserController321);
            const found = type.findOwnAttributes((attribute) => {
                return attribute instanceof ControllerAttribute;
            });
            expect(found).toBeInstanceOf(Array);
            expect(found.length).toBe(1);
        });
        it('find attribute using filter function', () => {
            const type = lib_1.Reflector(UserController321);
            function FindAttributeByType(attribute, type) {
                return attribute instanceof type;
            }
            const found = type.findOwnAttributes(FindAttributeByType, ControllerAttribute);
            expect(found).toBeInstanceOf(Array);
            expect(found.length).toBe(1);
        });
    });
    describe('# should not able to', () => {
        it('get annotated properties', () => {
            const type = lib_1.Reflector(UserController321);
            // no annotated property in UserController
            expect(type.hasOwnProperties()).toBeFalse();
        });
    });
});
