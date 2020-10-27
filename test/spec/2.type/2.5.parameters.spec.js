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
let Data251 = class Data251 {
    constructor(model) { }
};
Data251 = __decorate([
    __param(0, lib_1.decorate({ require: 'operator' }, lib_1.MemberKinds.Parameter)),
    __metadata("design:paramtypes", [Date])
], Data251);
let Data252 = class Data252 {
    constructor(model) { }
};
Data252 = __decorate([
    __param(0, lib_1.decorateParameter({ require: 'operator' })),
    __metadata("design:paramtypes", [String])
], Data252);
class BaseLayer24 {
}
let MiddleLayer24 = class MiddleLayer24 extends BaseLayer24 {
    constructor(model) {
        super();
    }
};
MiddleLayer24 = __decorate([
    __param(0, lib_1.decorate({ require: 'operator' }, lib_1.MemberKinds.Parameter)),
    __metadata("design:paramtypes", [String])
], MiddleLayer24);
let Application24 = class Application24 extends MiddleLayer24 {
    constructor(model) {
        super();
    }
};
Application24 = __decorate([
    __param(0, lib_1.decorate({
        require: 'operator',
        interceptor: {
            intercept(target, params, receiver) {
                return target.invoke(params, receiver);
            },
        },
    }, lib_1.MemberKinds.Parameter)),
    __metadata("design:paramtypes", [String])
], Application24);
class CloudApplication24 extends Application24 {
}
describe('2.5. Type parameters', () => {
    describe('# should able to', () => {
        it('get constructor parameters', () => {
            const type = lib_1.Reflector(Data251);
            expect(type.hasInterceptor()).toBeFalse();
            const param0 = type.parameter(0);
            expect(param0).toBeTruthy();
            if (param0) {
                expect(param0.type).toBe(Date);
                expect(param0.declaringType).toBe(Data251);
                expect(param0.kind).toBe(lib_1.MemberKinds.Parameter);
                expect(param0.key).toBe('constructor');
                expect(param0.index).toBe(0);
                expect(param0.name).toBe('0');
                expect(param0.hasOwnInterceptor()).toBeFalse();
                // expect(param0.descriptor).toBeUndefined();
                // expect(param0.hasInterceptor()).toBeFalse();
                // expect(param0.getParameters()).toBeInstanceOf(Array);
                // expect(param0.getParameters().length).toBe(0);
            }
        });
        it('get constructor parameters', () => {
            const param0 = lib_1.Reflector(Data252).parameter(0);
            expect(param0).toBeTruthy();
            if (param0) {
                // expect(param0.type).toBe(String);
                // expect(param0.declaringType).toBe(Data252);
                // expect(param0.kind).toBe(ClassField);
                // expect(param0.key).toBe('model');
                // expect(param0.name).toBe('model');
                // expect(param0.descriptor).toBeUndefined();
                // expect(param0.hasInterceptor()).toBeFalse();
                // expect(param0.getParameters()).toBeInstanceOf(Array);
                // expect(param0.getParameters().length).toBe(0);
            }
        });
        it('get method property', () => {
            const modelField = lib_1.Reflector(CloudApplication24).parameter(0);
            expect(modelField).toBeTruthy();
            // if (modelField) {
            //   expect(modelField.type).toBeUndefined();
            //   expect(modelField.declaringType).toBe(Application24);
            //   expect(modelField.kind).toBe(MemberKinds.Property | MemberKinds.Method);
            //   expect(modelField.name).toBe('stop');
            //   expect(modelField.key).toBe('stop');
            //   expect(modelField.descriptor).toBeInstanceOf(Object);
            //   expect(modelField.hasInterceptor()).toBeFalse();
            //   expect(modelField.getParameters()).toBeInstanceOf(Array);
            //   expect(modelField.getParameters().length).toBe(0);
            // }
        });
        // it('get own method property', () => {
        //   const resetMethod = Reflector(MiddleLayer24).getOwnProperty('reset');
        //   expect(resetMethod).toBeTruthy();
        //   if (resetMethod) {
        //     expect(resetMethod.type).toBe(Boolean);
        //     expect(resetMethod.declaringType).toBe(MiddleLayer24);
        //     expect(resetMethod.kind).toBe(MemberKinds.Property | MemberKinds.Method);
        //     expect(resetMethod.name).toBe('reset');
        //     expect(resetMethod.key).toBe('reset');
        //     expect(resetMethod.descriptor).toBeInstanceOf(Object);
        //     expect(resetMethod.hasInterceptor()).toBeFalse();
        //     expect(resetMethod.hasParameterInterceptor()).toBeFalse();
        //     expect(resetMethod.getParameters()).toBeInstanceOf(Array);
        //     expect(resetMethod.getParameters().length).toBe(0);
        //   }
        // });
        //
        // it('get method property', () => {
        //   const runMethod = Reflector(CloudApplication24).getProperty('run');
        //   expect(runMethod).toBeTruthy();
        //   if (runMethod) {
        //     expect(runMethod.declaringType).toBe(Application24);
        //     expect(runMethod.key).toBe('run');
        //     expect(runMethod.name).toBe('run');
        //     expect(runMethod.type).toBeUndefined();
        //     expect(runMethod.descriptor).toBeInstanceOf(Object);
        //     expect(runMethod.kind).toBe(MemberKinds.Property | MemberKinds.Method);
        //     expect(runMethod.hasInterceptor()).toBeTrue();
        //     expect(runMethod.hasParameterInterceptor()).toBeTrue();
        //     expect(runMethod.getParameters()).toBeInstanceOf(Array);
        //     expect(runMethod.getParameters().length).toBe(1);
        //   }
        // });
        //
        // it('get method parameter', () => {
        //   const runMethod = Reflector(CloudApplication24).getProperty('run');
        //   expect(runMethod).toBeTruthy();
        //   if (runMethod) {
        //     const runMethodParameter = runMethod.getParameters()[0];
        //     expect(runMethodParameter.declaringType).toBe(Application24);
        //     expect(runMethodParameter.key).toBe('run');
        //     expect(runMethodParameter.name).toBe('0');
        //     expect(runMethodParameter.index).toBe(0);
        //     expect(runMethodParameter.type).toBe(Data24);
        //     expect(runMethodParameter.kind).toBe(MemberKinds.Parameter | MemberKinds.MethodParameter);
        //   }
        // });
    });
});
