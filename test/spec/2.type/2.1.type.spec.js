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
class Storage {
}
class Compiler {
}
let BaseLayer = class BaseLayer {
    constructor(storage) { }
};
BaseLayer = __decorate([
    __param(0, lib_1.decorateParameter({})),
    __metadata("design:paramtypes", [Storage])
], BaseLayer);
let MiddleLayer = class MiddleLayer extends BaseLayer {
    constructor(compiler) {
        super();
    }
};
MiddleLayer = __decorate([
    __param(0, lib_1.decorateParameter({
        interceptor: {
            intercept(target, params, receiver) {
                return target.invoke(params, receiver);
            },
        },
    })),
    __metadata("design:paramtypes", [Compiler])
], MiddleLayer);
let Application = class Application extends MiddleLayer {
};
Application = __decorate([
    lib_1.decorateClass({
        interceptor: {
            intercept(target, params, receiver) {
                return target.invoke(params, receiver);
            },
        },
    })
], Application);
class CloudApplication extends Application {
    but() {
        return 1;
    }
}
describe('2.1. Type', () => {
    describe('# should able to', () => {
        it('get type', () => {
            expect(lib_1.Reflector(CloudApplication).type).toBe(CloudApplication);
        });
        it('get declaringType', () => {
            expect(lib_1.Reflector(CloudApplication).declaringType).toBe(CloudApplication);
        });
        it('get kind', () => {
            expect(lib_1.Reflector(CloudApplication).kind).toBe(lib_1.MemberKinds.Class);
        });
        it('get name', () => {
            expect(lib_1.Reflector(CloudApplication).name).toBe('CloudApplication');
        });
        it('get key', () => {
            expect(lib_1.Reflector(CloudApplication).key).toBe('constructor');
        });
        it('get descriptor', () => {
            expect(lib_1.Reflector(CloudApplication).descriptor).toEqual(jasmine.objectContaining({
                value: CloudApplication,
            }));
        });
        it('get descriptor for annotated class', () => {
            expect(lib_1.Reflector(Application).descriptor).toEqual(jasmine.objectContaining({
                value: Application,
            }));
        });
        // it('check constructor parameter', () => {
        //   expect(Reflector(Application).hasParameterInterceptor()).toBeFalse();
        //   expect(Reflector(MiddleLayer).hasParameterInterceptor()).toBeTrue();
        //   expect(Reflector(BaseLayer).hasParameterInterceptor()).toBeFalse();
        //   expect(Reflector(Compiler).hasParameterInterceptor()).toBeFalse();
        // });
        it('get constructor parameter', () => {
            expect(lib_1.Reflector(Application).getParameter(0)).toBeUndefined();
            expect(lib_1.Reflector(MiddleLayer).getParameter(0)).toBeTruthy();
            expect(lib_1.Reflector(BaseLayer).getParameter(0)).toBeTruthy();
            expect(lib_1.Reflector(Compiler).getParameter(0)).toBeUndefined();
        });
        it('get constructor parameters', () => {
            expect(lib_1.Reflector(Application).getParameters().length).toBe(0);
            expect(lib_1.Reflector(MiddleLayer).getParameters().length).toBe(1);
            expect(lib_1.Reflector(BaseLayer).getParameters().length).toBe(1);
            expect(lib_1.Reflector(Compiler).getParameters().length).toBe(0);
        });
        it('get constructor parameter declared by class parameter decorator', () => {
            const constructorParameter = lib_1.Reflector(MiddleLayer).getParameters()[0];
            expect(constructorParameter).toBeTruthy();
            expect(constructorParameter.declaringType).toBe(MiddleLayer);
            expect(constructorParameter.key).toBe('constructor');
            expect(constructorParameter.name).toBe('0');
            expect(constructorParameter.index).toBe(0);
            expect(constructorParameter.type).toBe(Compiler);
            expect(constructorParameter.kind & lib_1.MemberKinds.Parameter).toBeTruthy();
        });
        it('get constructor parameter declared by parameter decorator', () => {
            const constructorParameter = lib_1.Reflector(BaseLayer).getParameters()[0];
            expect(constructorParameter).toBeTruthy();
            expect(constructorParameter.declaringType).toBe(BaseLayer);
            expect(constructorParameter.key).toBe('constructor');
            expect(constructorParameter.name).toBe('0');
            expect(constructorParameter.index).toBe(0);
            expect(constructorParameter.type).toBe(Storage);
            expect(constructorParameter.kind & lib_1.MemberKinds.Parameter).toBeTruthy();
        });
        it('get types (self and parents)', () => {
            const types = lib_1.Reflector(CloudApplication).findTypes();
            expect(types).toBeInstanceOf(Array);
            expect(types.length).toBe(4);
            expect(types[0]).toBe(lib_1.Reflector(CloudApplication));
            expect(types[1]).toBe(lib_1.Reflector(Application));
            expect(types[2]).toBe(lib_1.Reflector(MiddleLayer));
            expect(types[3]).toBe(lib_1.Reflector(BaseLayer));
        });
        it('find types using filter function', () => {
            const types = lib_1.Reflector(Application).findTypes((type) => {
                return type.name.endsWith('Layer');
            });
            expect(types).toBeInstanceOf(Array);
            expect(types.length).toBe(2);
            expect(types[0]).toBe(lib_1.Reflector(MiddleLayer));
            expect(types[1]).toBe(lib_1.Reflector(BaseLayer));
        });
        it('find types using filter function with filter criteria', () => {
            function EndWith(type, filterCriteria) {
                return type.name.endsWith(filterCriteria);
            }
            const types = lib_1.Reflector(Application).findTypes(EndWith, 'Layer');
            expect(types).toBeInstanceOf(Array);
            expect(types.length).toBe(2);
            expect(types[0]).toBe(lib_1.Reflector(MiddleLayer));
            expect(types[1]).toBe(lib_1.Reflector(BaseLayer));
        });
        it('check attribute', () => {
            const types = lib_1.Reflector(CloudApplication).findTypes();
            expect(types).toBeInstanceOf(Array);
            expect(types.length).toBe(4);
            expect(types[0].hasOwnInterceptor()).toBeFalse();
            expect(types[1].hasOwnInterceptor()).toBeTrue();
            expect(types[2].hasOwnInterceptor()).toBeFalse();
            expect(types[3].hasOwnInterceptor()).toBeFalse();
        });
        it('annotate static method', () => {
            class TempClass21 {
                static Create(param) { }
            }
            __decorate([
                lib_1.decorateMember({ a: 1 }),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], TempClass21, "Create", null);
            expect(lib_1.Reflector(TempClass21).static.hasOwnProperties()).toBeTrue();
        });
        it('annotate static method parameter', () => {
            class TempClass21 {
                static Create(param) { }
            }
            __decorate([
                __param(0, lib_1.decorateParameter({ a: 1 })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], TempClass21, "Create", null);
            expect(lib_1.Reflector(TempClass21).static.property('Create').parameter(0).type).toBe(Number);
        });
    });
});
