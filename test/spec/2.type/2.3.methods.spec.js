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
const Kinds_1 = require("../Kinds");
class ParamAttribute {
    get interceptor() {
        return this;
    }
    intercept(target, params, receiver) {
        return target.invoke(params, receiver);
    }
}
class Data23 {
}
class BaseLayer23 {
    status() {
        throw new Error();
    }
}
class MiddleLayer23 extends BaseLayer23 {
    reset(s) {
        throw new Error();
    }
}
__decorate([
    lib_1.decorateMember({ require: 'operator' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Boolean)
], MiddleLayer23.prototype, "reset", null);
class Application23 extends MiddleLayer23 {
    start() {
        throw new Error();
    }
    stop() {
        throw new Error();
    }
    run(data) {
        throw new Error();
    }
}
__decorate([
    lib_1.decorateMember({ require: 'admin' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Application23.prototype, "stop", null);
__decorate([
    __param(0, lib_1.decorateParameter(new ParamAttribute())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Data23]),
    __metadata("design:returntype", void 0)
], Application23.prototype, "run", null);
class CloudApplication23 extends Application23 {
}
describe('2.3. Type methods', () => {
    describe('# should able to', () => {
        it('get not annotated method property', () => {
            const startMethod = lib_1.Reflector(CloudApplication23).getProperty('start');
            expect(startMethod).toBeUndefined();
        });
        it('get not annotated method property', () => {
            const startMethod = lib_1.Reflector(CloudApplication23).property('start');
            expect(startMethod).toBeTruthy();
            if (startMethod) {
                expect(startMethod.hasOwnAttribute()).toBeFalse();
                expect(startMethod.hasInterceptor()).toBeFalse();
                expect(startMethod.getOwnAttribute(ParamAttribute)).toBeUndefined();
                expect(startMethod.getOwnAttributes(ParamAttribute)).toEqual([]);
            }
        });
        it('get method property', () => {
            const stopMethod = lib_1.Reflector(CloudApplication23).getProperty('stop');
            expect(stopMethod).toBeTruthy();
            if (stopMethod) {
                expect(stopMethod.type).toBeUndefined();
                expect(stopMethod.declaringType).toBe(Application23);
                expect(stopMethod.kind).toBe(Kinds_1.ClassMethod);
                expect(stopMethod.name).toBe('stop');
                expect(stopMethod.key).toBe('stop');
                expect(stopMethod.descriptor).toBeInstanceOf(Object);
                expect(stopMethod.hasInterceptor()).toBeFalse();
                expect(stopMethod.getParameters()).toBeInstanceOf(Array);
                expect(stopMethod.getParameters().length).toBe(0);
                expect(stopMethod.hasOwnAttribute()).toBeTrue();
                expect(stopMethod.getOwnAttribute(ParamAttribute)).toBeUndefined();
                expect(stopMethod.getOwnAttributes(ParamAttribute)).toEqual([]);
            }
        });
        it('get own method property', () => {
            const resetMethod = lib_1.Reflector(MiddleLayer23).getOwnProperty('reset');
            expect(resetMethod).toBeTruthy();
            if (resetMethod) {
                expect(resetMethod.type).toBe(Boolean);
                expect(resetMethod.declaringType).toBe(MiddleLayer23);
                expect(resetMethod.kind).toBe(Kinds_1.ClassMethod);
                expect(resetMethod.name).toBe('reset');
                expect(resetMethod.key).toBe('reset');
                expect(resetMethod.descriptor).toBeInstanceOf(Object);
                expect(resetMethod.hasInterceptor()).toBeFalse();
                expect(resetMethod.hasOwnAttribute()).toBeTrue();
                expect(resetMethod.getOwnAttribute(ParamAttribute)).toBeUndefined();
                expect(resetMethod.getOwnAttributes(ParamAttribute)).toEqual([]);
                // expect(resetMethod.hasParameterInterceptor()).toBeFalse();
                expect(resetMethod.getParameters()).toBeInstanceOf(Array);
                expect(resetMethod.getParameters().length).toBe(0);
            }
        });
        it('get method property', () => {
            const runMethod = lib_1.Reflector(CloudApplication23).getProperty('run');
            expect(runMethod).toBeTruthy();
            if (runMethod) {
                expect(runMethod.declaringType).toBe(Application23);
                expect(runMethod.key).toBe('run');
                expect(runMethod.name).toBe('run');
                expect(runMethod.type).toBeUndefined();
                expect(runMethod.descriptor).toBeInstanceOf(Object);
                expect(runMethod.kind).toBe(Kinds_1.ClassMethod);
                expect(runMethod.hasInterceptor()).toBeTrue();
                // expect(runMethod.hasParameterInterceptor()).toBeTrue();
                expect(runMethod.getParameters()).toBeInstanceOf(Array);
                expect(runMethod.getParameters().length).toBe(1);
                expect(runMethod.hasOwnAttribute()).toBeFalse();
                expect(runMethod.getOwnAttribute(ParamAttribute)).toBeUndefined();
                expect(runMethod.getOwnAttributes(ParamAttribute).length).toBe(0);
            }
        });
        it('get method parameter', () => {
            const runMethod = lib_1.Reflector(CloudApplication23).getProperty('run');
            expect(runMethod).toBeTruthy();
            if (runMethod) {
                const runMethodParameter = runMethod.parameter(0);
                expect(runMethodParameter.declaringType).toBe(Application23);
                expect(runMethodParameter.key).toBe('run');
                expect(runMethodParameter.name).toBe('0');
                expect(runMethodParameter.index).toBe(0);
                expect(runMethodParameter.type).toBe(Data23);
                expect(runMethodParameter.kind).toBe(Kinds_1.ClassMethodParameter);
                expect(runMethodParameter.hasOwnAttribute()).toBeTrue();
                expect(runMethodParameter.getOwnAttribute(ParamAttribute)).toBeInstanceOf(ParamAttribute);
                expect(runMethodParameter.getOwnAttributes(ParamAttribute).length).toBe(1);
            }
        });
    });
});
