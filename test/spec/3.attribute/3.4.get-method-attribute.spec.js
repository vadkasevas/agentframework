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
const lib_2 = require("../../../lib");
class MethodAttribute {
    constructor(method, path) {
        this.method = method;
        this.path = path;
    }
}
function method(method, path) {
    return lib_1.decorateMember(new MethodAttribute(method, path));
}
const get = lib_1.decorateMember(new MethodAttribute('GET'));
class Controller34 {
    listAllUser() { }
    addUser() { }
    getUser(user) { }
    renameUser() { }
}
__decorate([
    method('GET', '/base/user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Controller34.prototype, "listAllUser", null);
__decorate([
    lib_1.decorateMember(new MethodAttribute('POST', '/base/user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Controller34.prototype, "addUser", null);
__decorate([
    get,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Controller34.prototype, "getUser", null);
__decorate([
    lib_1.decorateMember(new MethodAttribute('POST', '/base/user/rename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Controller34.prototype, "renameUser", null);
/*** user code begin ***/
class UserController34 extends Controller34 {
    listAllUser() { }
    addUser() { }
    getUser(user) { }
    updateUser(user) { }
    deprecatedMethod() { }
}
__decorate([
    method('GET', '/user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController34.prototype, "listAllUser", null);
__decorate([
    lib_1.decorateMember(new MethodAttribute('POST', '/user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController34.prototype, "addUser", null);
__decorate([
    get,
    __param(0, lib_2.decorateParameter({
        role: 'user',
        interceptor: {
            intercept(target, params, receiver) {
                return target.invoke(params, receiver);
            }
        }
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController34.prototype, "getUser", null);
__decorate([
    get,
    method('GET', '/user'),
    lib_1.decorateMember(new MethodAttribute('POST', '/base/user/update')),
    lib_1.decorateMember({
        role: 'user',
        interceptor: {
            intercept(target, params, receiver) {
                return target.invoke(params, receiver);
            }
        }
    }),
    __param(0, lib_2.decorateParameter({ role: 'user' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController34.prototype, "updateUser", null);
describe('3.4. Get class method attributes', () => {
    describe('# should able to', () => {
        it('get annotated property', () => {
            const a = lib_2.Reflector(UserController34).getOwnProperty('listAllUser');
            const b = lib_2.Reflector(UserController34).getProperty('listAllUser');
            const c = lib_2.Reflector(Controller34).getOwnProperty('listAllUser');
            const d = lib_2.Reflector(Controller34).getProperty('listAllUser');
            expect(a).toEqual(b);
            expect(c).toEqual(d);
            expect(a).not.toBe(c);
        });
        it('get attribute of giving type', () => {
            const property = lib_2.Reflector(UserController34).property('listAllUser');
            expect(property.hasOwnAttribute(MethodAttribute)).toBeTrue();
            expect(property.getOwnAttribute(MethodAttribute)).toBeInstanceOf(MethodAttribute);
        });
        it('get all attributes of giving type', () => {
            const property = lib_2.Reflector(UserController34).property('updateUser');
            expect(property.getOwnAttributes(MethodAttribute).length).toBe(3);
        });
        it('get all attributes', () => {
            const property = lib_2.Reflector(UserController34).property('updateUser');
            expect(property.getOwnAttributes().length).toBe(4);
        });
        it('find attributes using inline filter function', () => {
            const property = lib_2.Reflector(UserController34).property('updateUser');
            expect(property.findOwnAttributes(attr => attr instanceof MethodAttribute).length).toBe(3);
        });
        it('find attributes using external filter function with filter criteria', () => {
            function InstanceOf(attr, criteria) {
                return attr instanceof criteria;
            }
            const property = lib_2.Reflector(UserController34).property('updateUser');
            expect(property.findOwnAttributes(InstanceOf, MethodAttribute).length).toBe(3);
        });
        it('check interceptor property', () => {
            const property = lib_2.Reflector(UserController34).property('getUser');
            expect(property.hasOwnInterceptor()).toBeFalse();
            expect(property.hasInterceptor()).toBeTrue(); // param interceptor
        });
        it('check interceptor property', () => {
            const property = lib_2.Reflector(UserController34).property('updateUser');
            expect(property.hasOwnInterceptor()).toBeTrue();
            expect(property.hasInterceptor()).toBeTrue();
        });
        it('get non-annotated property', () => {
            const property = lib_2.Reflector(UserController34).property('deprecatedMethod');
            expect(property).toBeTruthy();
            expect(property.hasInterceptor()).toBeFalse();
            expect(property.hasOwnInterceptor()).toBeFalse();
        });
    });
    describe('# should not able to', () => {
        it('get non-annotated property', () => {
            const property = lib_2.Reflector(UserController34).getProperty('deprecatedMethod');
            expect(property).toBeUndefined();
        });
    });
});
