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
class OptionalAttribute {
    constructor(type) {
        this.type = type;
    }
}
function optional(type) {
    return lib_1.decorateParameter(new OptionalAttribute(type));
}
class InjectAttribute {
    constructor(type) {
        this.type = type;
    }
    get interceptor() {
        return this;
    }
    intercept(target, params, receiver) {
        return target.invoke(params, receiver);
    }
}
class UserRepository {
}
const inject = lib_1.decorateParameter(new InjectAttribute(UserRepository));
class Base34 {
    constructor(p) { }
}
let Controller34 = class Controller34 extends Base34 {
    constructor(p) {
        super();
    }
};
Controller34 = __decorate([
    lib_1.agent(),
    __param(0, inject),
    __metadata("design:paramtypes", [UserRepository])
], Controller34);
/*** user code begin ***/
class UserController34 extends Controller34 {
    constructor(p) {
        super(p);
    }
    listAllUser(user, id) { }
    addUser(id, user) { }
    getUser(users) { }
    updateUser(users) { }
    deprecatedMethod() { }
}
__decorate([
    __param(1, optional(UserRepository)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRepository, Object]),
    __metadata("design:returntype", void 0)
], UserController34.prototype, "listAllUser", null);
__decorate([
    __param(1, inject),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UserRepository]),
    __metadata("design:returntype", void 0)
], UserController34.prototype, "addUser", null);
__decorate([
    __param(0, lib_1.decorateParameter(new InjectAttribute(UserRepository))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRepository]),
    __metadata("design:returntype", void 0)
], UserController34.prototype, "getUser", null);
__decorate([
    __param(0, lib_1.decorateParameter({ role: 'user' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserRepository]),
    __metadata("design:returntype", void 0)
], UserController34.prototype, "updateUser", null);
describe('3.6. Get parameter attributes', () => {
    describe('# should able to', () => {
        it('get annotated properties', () => {
            const type = lib_1.Reflector(UserController34);
            expect(type.getOwnProperties().length).toBe(4);
            expect(type.findOwnProperties(p => p.hasInterceptor()).length).toBe(2);
            expect(type.findProperties(p => p.hasInterceptor()).size).toBe(1);
            expect(type.findProperties(p => p.hasInterceptor()).get(type)).toBeTruthy();
        });
        it('check interceptor', () => {
            const type = lib_1.Reflector(UserController34);
            expect(type.property('listAllUser').hasInterceptor()).toBeFalse();
            expect(type.property('listAllUser').hasOwnInterceptor()).toBeFalse();
            expect(type.property('getUser').hasInterceptor()).toBeTrue();
            expect(type.property('getUser').hasOwnInterceptor()).toBeFalse();
            expect(type.hasInterceptor()).toBeFalse();
            expect(type.hasOwnInterceptor()).toBeFalse();
            expect(lib_1.Reflector(Controller34).hasInterceptor()).toBeTrue();
            expect(lib_1.Reflector(Controller34).hasOwnInterceptor()).toBeTrue();
            expect(lib_1.Reflector(Base34).hasInterceptor()).toBeFalse();
            expect(lib_1.Reflector(Base34).hasOwnInterceptor()).toBeFalse();
        });
        it('get parameter types', () => {
            const type = lib_1.Reflector(UserController34);
            expect(type.property('listAllUser').getParameterTypes()).toEqual([UserRepository, Object]);
            expect(type.property('deprecatedMethod').getParameterTypes()).toBeUndefined();
            expect(type.getParameterTypes()).toBeUndefined();
            expect(lib_1.Reflector(Controller34).getParameterTypes()).toEqual([UserRepository]);
            expect(lib_1.Reflector(Base34).getParameterTypes()).toBeUndefined();
        });
        it('get attribute of giving type', () => {
            const property = lib_1.Reflector(UserController34).property('listAllUser');
            expect(property.getParameters().length).toBe(1);
            expect(property.getParameters().length).toBe(1);
            expect(property.parameter(0).type).toBe(UserRepository);
            expect(property.parameter(0).hasOwnAttribute()).toBeFalse();
            expect(property.parameter(0).findOwnAttributes(a => a instanceof InjectAttribute)).toEqual([]);
            expect(property.parameter(0).getOwnAttribute(InjectAttribute)).toBeUndefined();
            expect(property.parameter(0).getOwnAttributes(InjectAttribute)).toEqual([]);
            expect(property.parameter(1).type).toBe(Object);
            expect(property.parameter(1).hasOwnAttribute()).toBeTrue();
            expect(property.parameter(1).findOwnAttributes(a => a instanceof OptionalAttribute).length).toBe(1);
            expect(property.parameter(1).getOwnAttribute(OptionalAttribute)).toBeInstanceOf(OptionalAttribute);
            expect(property.parameter(1).getOwnAttributes(OptionalAttribute).length).toBe(1);
        });
        it('get all attributes of giving type', () => {
            const property = lib_1.Reflector(UserController34).property('listAllUser');
            expect(property.parameter(0).getOwnAttributes(OptionalAttribute).length).toBe(0);
            expect(property.parameter(1).getOwnAttributes(OptionalAttribute).length).toBe(1);
        });
        it('get all attributes', () => {
            const property = lib_1.Reflector(UserController34).property('listAllUser');
            expect(property.parameter(0).getOwnAttributes().length).toBe(0);
            expect(property.parameter(1).getOwnAttributes().length).toBe(1);
        });
        it('find attributes using inline filter function', () => {
            const property = lib_1.Reflector(UserController34).property('listAllUser');
            expect(property.parameter(0).findOwnAttributes(a => !!a).length).toBe(0);
            expect(property.parameter(1).findOwnAttributes(a => !!a).length).toBe(1);
        });
        it('find attributes using external filter function with filter criteria', () => {
            function InstanceOf(attr, criteria) {
                return attr instanceof criteria;
            }
            const property = lib_1.Reflector(UserController34).property('listAllUser');
            expect(property.parameter(0).findOwnAttributes(InstanceOf, OptionalAttribute).length).toBe(0);
            expect(property.parameter(1).findOwnAttributes(InstanceOf, OptionalAttribute).length).toBe(1);
        });
    });
    describe('# should not able to', () => {
        it('get non-annotated parameter', () => {
            const property = lib_1.Reflector(UserController34).property('listAllUser');
            expect(property.getParameter(0)).toBeUndefined();
        });
    });
});
