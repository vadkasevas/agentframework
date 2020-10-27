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
class Compiler {
}
class BaseLayer extends Compiler {
    status() { }
    set getterSetter(value) { }
}
__decorate([
    lib_1.decorateMember({ type: 'getterSetter' }),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], BaseLayer.prototype, "getterSetter", null);
class MiddleLayer extends BaseLayer {
    reset() {
        return false;
    }
    get getter() {
        return this.constructor.name;
    }
    set setter(value) { }
    get getterSetter() {
        return this.constructor.name;
    }
    set value(value) { }
    get value() {
        return this.constructor.name;
    }
}
__decorate([
    lib_1.decorateMember({ require: 'operator' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Boolean)
], MiddleLayer.prototype, "reset", null);
__decorate([
    lib_1.decorateMember({ type: 'getter' }),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], MiddleLayer.prototype, "getter", null);
__decorate([
    lib_1.decorateMember({ type: 'setter' }),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MiddleLayer.prototype, "setter", null);
__decorate([
    lib_1.decorateMember({ type: 'getterSetter' }),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], MiddleLayer.prototype, "getterSetter", null);
__decorate([
    lib_1.decorateMember({ type: 'value' }),
    __metadata("design:type", Date)
], MiddleLayer.prototype, "field", void 0);
__decorate([
    lib_1.decorateMember({ type: 'value' }),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], MiddleLayer.prototype, "value", null);
class Application extends MiddleLayer {
    start() {
        return [];
    }
    stop() { }
}
__decorate([
    lib_1.decorateMember({ require: 'user' }),
    __metadata("design:type", Object)
], Application.prototype, "version", void 0);
__decorate([
    lib_1.decorateMember({ require: 'admin' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Application.prototype, "stop", null);
class CloudApplication extends Application {
}
class StandaloneApplication {
}
describe('2.2. Type members', () => {
    describe('# should able to', () => {
        it('check type properties', () => {
            expect(lib_1.Reflector(StandaloneApplication).hasOwnProperties()).toBeFalse();
            expect(lib_1.Reflector(Compiler).hasOwnProperties()).toBeFalse();
            expect(lib_1.Reflector(BaseLayer).hasOwnProperties()).toBeTrue();
            expect(lib_1.Reflector(MiddleLayer).hasOwnProperties()).toBeTrue();
            expect(lib_1.Reflector(Application).hasOwnProperties()).toBeTrue();
            expect(lib_1.Reflector(CloudApplication).hasOwnProperties()).toBeFalse();
        });
        it('get non-exists type meta', () => {
            const ctorOfStandaloneApplication = lib_1.Reflector(StandaloneApplication);
            expect(ctorOfStandaloneApplication).toBeTruthy();
            expect(ctorOfStandaloneApplication.descriptor).toEqual(jasmine.objectContaining({
                value: StandaloneApplication,
            }));
            expect(ctorOfStandaloneApplication.type).toBe(StandaloneApplication);
            expect(ctorOfStandaloneApplication.declaringType).toBe(StandaloneApplication);
            expect(ctorOfStandaloneApplication.hasOwnAttribute()).toBeFalse();
            expect(ctorOfStandaloneApplication.parameter(0).type).toBeUndefined();
            ctorOfStandaloneApplication.addAttribute({});
            expect(ctorOfStandaloneApplication.hasOwnAttribute()).toBeTrue();
        });
        it('get non-exists property', () => {
            const statusPropertyOfCloudApplication = lib_1.Reflector(StandaloneApplication).property('status');
            expect(statusPropertyOfCloudApplication).toBeTruthy();
            expect(statusPropertyOfCloudApplication.descriptor).toBeUndefined();
            expect(statusPropertyOfCloudApplication.declaringType).toBe(StandaloneApplication);
            expect(statusPropertyOfCloudApplication.type).toBeUndefined();
            expect(statusPropertyOfCloudApplication.hasOwnAttribute()).toBeFalse();
            expect(statusPropertyOfCloudApplication.parameter(0).type).toBeUndefined();
            statusPropertyOfCloudApplication.addAttribute({});
            expect(statusPropertyOfCloudApplication.hasOwnAttribute()).toBeTrue();
            expect(statusPropertyOfCloudApplication.descriptor).toBeUndefined();
        });
        it('get method property', () => {
            expect(lib_1.Reflector(CloudApplication).getOwnProperty('stop')).toBeUndefined();
            expect(lib_1.Reflector(Application).getProperty('stop')).toBeTruthy();
        });
        it('get field property', () => {
            expect(lib_1.Reflector(CloudApplication).getOwnProperty('version')).toBeUndefined();
            expect(lib_1.Reflector(Application).getProperty('version')).toBeTruthy();
        });
        it('get getter property', () => {
            expect(lib_1.Reflector(CloudApplication).getOwnProperty('getter')).toBeUndefined();
            expect(lib_1.Reflector(MiddleLayer).getProperty('getter')).toBeTruthy();
        });
        it('get setter property', () => {
            expect(lib_1.Reflector(CloudApplication).getOwnProperty('setter')).toBeUndefined();
            expect(lib_1.Reflector(MiddleLayer).getProperty('setter')).toBeTruthy();
        });
        it('get getterSetter property', () => {
            expect(lib_1.Reflector(CloudApplication).getOwnProperty('getterSetter')).toBeUndefined();
            expect(lib_1.Reflector(MiddleLayer).getProperty('getterSetter')).toBeTruthy();
        });
        it('get type own properties', () => {
            expect(lib_1.Reflector(CloudApplication).getOwnProperties().length).toBe(0);
            expect(lib_1.Reflector(Application).getOwnProperties().length).toBe(2);
            expect(lib_1.Reflector(Application).getOwnProperties()[0].key).toBe('version');
            expect(lib_1.Reflector(Application).getOwnProperties()[0].type).toBe(Object);
            expect(lib_1.Reflector(Application).getOwnProperties()[1].key).toBe('stop');
            expect(lib_1.Reflector(Application).getOwnProperties()[1].type).toBeUndefined();
            expect(lib_1.Reflector(MiddleLayer).getOwnProperties().length).toBe(6);
            expect(lib_1.Reflector(MiddleLayer).getOwnProperties()[0].key).toBe('reset');
            expect(lib_1.Reflector(MiddleLayer).getOwnProperties()[0].type).toBe(Boolean);
            expect(lib_1.Reflector(BaseLayer).getOwnProperties().length).toBe(1);
            expect(lib_1.Reflector(Compiler).getOwnProperties().length).toBe(0);
        });
        it('get annotated property', () => {
            expect(lib_1.Reflector(Application).getOwnProperty('stop')).toBeTruthy();
            expect(lib_1.Reflector(Application).getProperty('stop')).toBeTruthy();
        });
        it('get annotated property in parent type', () => {
            expect(lib_1.Reflector(Application).getProperty('reset')).toBeTruthy(); // 'reset' method is declared in parent class
        });
        it('find own properties', () => {
            const result = lib_1.Reflector(Application).findOwnProperties(() => true);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(2);
        });
        it('find own properties using inline filter function', () => {
            const fields = lib_1.Reflector(Application).findOwnProperties((property) => {
                return !!(property.kind & lib_1.MemberKinds.Property);
            });
            expect(fields).toBeInstanceOf(Array);
            expect(fields.length).toBe(2);
            expect(fields[0].key).toBe('version');
        });
        it('find own properties using external filter function with filter criteria', () => {
            function IsKind(property, kind) {
                return !!(property.kind & kind);
            }
            const methods = lib_1.Reflector(Application).findOwnProperties(IsKind, lib_1.MemberKinds.Property);
            expect(methods).toBeInstanceOf(Array);
            expect(methods.length).toBe(2);
            expect(methods[0].key).toBe('version');
        });
        it('find all properties', () => {
            const map = lib_1.Reflector(Application).findProperties(() => true);
            expect(map).toBeInstanceOf(Map);
            expect(map.size).toBe(3);
            expect(map.get(lib_1.Reflector(Application))).toBeInstanceOf(Array);
            expect(map.get(lib_1.Reflector(MiddleLayer))).toBeInstanceOf(Array);
            expect(map.get(lib_1.Reflector(BaseLayer))).toBeInstanceOf(Array);
        });
        it('find all properties using inline filter function', () => {
            const map = lib_1.Reflector(Application).findProperties((property) => {
                return !!(property.kind & lib_1.MemberKinds.Property);
            });
            expect(map).toBeInstanceOf(Map);
            expect(map.size).toBe(3);
            expect(map.get(lib_1.Reflector(Application))).toBeInstanceOf(Array);
        });
        it('find all properties using external filter function with filter criteria', () => {
            function IsKind(property, kind) {
                return !!(property.kind & kind);
            }
            const map = lib_1.Reflector(Application).findProperties(IsKind, lib_1.MemberKinds.Property);
            expect(map).toBeInstanceOf(Map);
            expect(map.size).toBe(3);
            expect(map.get(lib_1.Reflector(Application))).toBeInstanceOf(Array);
            expect(map.get(lib_1.Reflector(MiddleLayer))).toBeInstanceOf(Array);
        });
        it('get attribute from static method', () => {
            class StaticMemberTest22 {
                static run() { }
            }
            __decorate([
                lib_1.decorateMember({ a: 1 }),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], StaticMemberTest22, "run", null);
            expect(lib_1.Reflector(StaticMemberTest22).static.property('run').hasOwnAttribute()).toBeTrue();
        });
    });
    describe('# should not able to', () => {
        it('get non-annotated property', () => {
            expect(lib_1.Reflector(Application).getOwnProperty('start')).toBeUndefined();
            expect(lib_1.Reflector(Application).getProperty('start')).toBeUndefined();
        });
        it('get non-annotated property in parent type', () => {
            expect(lib_1.Reflector(Application).getOwnProperty('status')).toBeUndefined();
            expect(lib_1.Reflector(Application).getProperty('status')).toBeUndefined();
        });
        it('get non-exists property', () => {
            expect(lib_1.Reflector(CloudApplication).getOwnProperty('not-exists')).toBeUndefined();
            expect(lib_1.Reflector(CloudApplication).getProperty('not-exists')).toBeUndefined();
            expect(lib_1.Reflector(CloudApplication).getProperty('status')).toBeUndefined();
        });
    });
});
