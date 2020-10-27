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
class AgentChecker {
    get interceptor() {
        return this;
    }
    beforeDecorate(target, targetKey, descriptor) {
        return true;
    }
    intercept(target, parameters, receiver) {
        expect(typeof receiver).toBe('function');
        return target.invoke(parameters, receiver);
    }
}
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
    lib_1.decorateClass(new AgentChecker()),
    lib_1.agent()
], Calculator);
describe('Interceptor on Constructor', () => {
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
            const ca = Reflect.construct(Calculator, [1, 2, 3]);
            expect(ca instanceof Calculator).toBe(true);
            expect(Reflect.getPrototypeOf(ca)).toBe(Calculator.prototype);
        });
    });
});
