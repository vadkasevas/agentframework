"use strict";
/* tslint:disable */
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
const RoundInterceptor_1 = require("../attributes/RoundInterceptor");
let Calculator = class Calculator {
    round1(num) {
        return num;
    }
    round2(num) {
        return num;
    }
    round3(num) {
        return num;
    }
    round4(num) {
        return num;
    }
};
__decorate([
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Calculator.prototype, "round1", null);
__decorate([
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Calculator.prototype, "round2", null);
__decorate([
    lib_1.decorate(new RoundInterceptor_1.RoundInterceptor(), lib_1.MemberKinds.Property),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Calculator.prototype, "round3", null);
__decorate([
    __param(0, lib_1.decorateParameter(new RoundInterceptor_1.RoundInterceptor())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Calculator.prototype, "round4", null);
Calculator = __decorate([
    lib_1.agent()
], Calculator);
describe('Interceptor', () => {
    describe('# should able to', () => {
        it('detect agent', () => {
            expect(lib_1.IsAgent(Calculator)).toBeTrue();
        });
        it('re-upgrade agent', () => {
            expect(lib_1.IsAgent(lib_1.CreateAgent(Calculator))).toBeTrue();
        });
        it('new instance', () => {
            const ca = new Calculator();
            expect(ca instanceof Calculator).toBe(true);
            expect(Reflect.getPrototypeOf(ca)).toBe(Calculator.prototype);
        });
        it('construct instance', () => {
            const ca = Reflect.construct(Calculator, []);
            expect(ca instanceof Calculator).toBe(true);
            expect(Reflect.getPrototypeOf(ca)).toBe(Calculator.prototype);
        });
        // region round1
        it('get round1 attribute', () => {
            const items = lib_1.Reflector(Calculator)
                .property('round1')
                .getOwnAttributes(RoundInterceptor_1.RoundInterceptor);
            expect(items.length).toBe(1);
        });
        it('get round1 value', () => {
            const ca = new Calculator();
            expect(ca).toBeTruthy();
            expect(ca.round1(1.3)).toBe(1);
        });
        it('get round1 invalid value', () => {
            const ca = new Calculator();
            expect(ca).toBeTruthy();
            expect(ca.round1('text')).toBe(0);
        });
        // endregion
        // region round2
        it('get round2 attribute', () => {
            const items = lib_1.Reflector(Calculator)
                .property('round2')
                .getOwnAttributes(RoundInterceptor_1.RoundInterceptor);
            expect(items.length).toBe(1);
        });
        it('get round2 value', () => {
            const ca = new Calculator();
            expect(ca).toBeTruthy();
            expect(ca.round2(1.3)).toBe(1);
        });
        it('get round2 invalid value', () => {
            const ca = new Calculator();
            expect(ca).toBeTruthy();
            expect(ca.round2('text')).toBe(0);
        });
        // endregion
        // region round3
        it('get round3 attribute', () => {
            const items = lib_1.Reflector(Calculator)
                .property('round3')
                .getOwnAttributes(RoundInterceptor_1.RoundInterceptor);
            expect(items.length).toBe(1);
        });
        it('get round3 value', () => {
            const ca = new Calculator();
            expect(ca).toBeTruthy();
            expect(ca.round3(1.3)).toBe(1);
        });
        it('get round3 invalid value', () => {
            const ca = new Calculator();
            expect(ca).toBeTruthy();
            expect(ca.round3('text')).toBe(0);
        });
        // endregion
        // region round4
        it('get round4 attribute', () => {
            const items = lib_1.Reflector(Calculator)
                .property('round4')
                .getParameters();
            expect(items.length).toBe(1);
        });
        it('get round4 value', () => {
            const ca = new Calculator();
            expect(ca).toBeTruthy();
            expect(ca.round4(1.3)).toBe(1);
        });
        it('get round4 invalid value', () => {
            const ca = new Calculator();
            expect(ca).toBeTruthy();
            expect(ca.round4('text')).toBe(0);
        });
        // endregion
    });
});
