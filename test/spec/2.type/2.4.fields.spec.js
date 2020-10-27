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
class Data24 {
}
__decorate([
    lib_1.decorate({ require: 'operator' }, lib_1.MemberKinds.Property),
    __metadata("design:type", String)
], Data24.prototype, "model", void 0);
class BaseLayer24 {
}
class MiddleLayer24 extends BaseLayer24 {
}
__decorate([
    lib_1.decorateMember({ require: 'operator' }),
    __metadata("design:type", String)
], MiddleLayer24.prototype, "model", void 0);
class Application24 extends MiddleLayer24 {
}
__decorate([
    lib_1.decorateMember({ require: 'operator' }),
    __metadata("design:type", String)
], Application24.prototype, "model", void 0);
class CloudApplication24 extends Application24 {
}
describe('2.4. Type fields', () => {
    describe('# should able to', () => {
        it('get field property', () => {
            const modelField = lib_1.Reflector(Data24).getProperty('model');
            expect(modelField).toBeTruthy();
            if (modelField) {
                expect(modelField.type).toBe(String);
                expect(modelField.declaringType).toBe(Data24);
                expect(modelField.kind).toBe(Kinds_1.ClassField);
                expect(modelField.key).toBe('model');
                expect(modelField.descriptor).toBeUndefined();
                expect(modelField.name).toBe('model');
                expect(modelField.hasInterceptor()).toBeFalse();
                expect(modelField.getParameters()).toBeInstanceOf(Array);
                expect(modelField.getParameters().length).toBe(0);
            }
        });
        it('get method property', () => {
            const modelField = lib_1.Reflector(CloudApplication24).getProperty('model');
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
    describe('# should not able to', () => {
        it('decorate non-Static to static property', () => {
            expect(() => {
                class NotAllowStatic {
                    static Run() { }
                }
                __decorate([
                    lib_1.decorate({ a: 1 }, lib_1.MemberKinds.Property),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", []),
                    __metadata("design:returntype", void 0)
                ], NotAllowStatic, "Run", null);
                expect(NotAllowStatic).toBeTruthy();
            }).toThrowError('Object is not allow decorate on static property');
        });
        it('decorate non-static property to static property parameter', () => {
            expect(() => {
                class NotAllowStatic {
                    static Run(name) { }
                }
                __decorate([
                    __param(0, lib_1.decorate({ a: 1 }, lib_1.MemberKinds.Property)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [String]),
                    __metadata("design:returntype", void 0)
                ], NotAllowStatic, "Run", null);
                expect(NotAllowStatic).toBeTruthy();
            }).toThrowError('Object is not allow decorate on method parameters');
        });
        it('decorate non-static parameter to static property parameter', () => {
            expect(() => {
                class NotAllowStatic {
                    static Run(name) { }
                }
                __decorate([
                    __param(0, lib_1.decorate({ a: 1 }, lib_1.MemberKinds.Parameter)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [String]),
                    __metadata("design:returntype", void 0)
                ], NotAllowStatic, "Run", null);
                expect(NotAllowStatic).toBeTruthy();
            }).toThrowError('Object is not allow decorate on static method parameters');
        });
    });
});
