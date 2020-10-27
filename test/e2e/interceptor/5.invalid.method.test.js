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
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
const BadRoundAttribute_1 = require("../attributes/BadRoundAttribute");
let Calculator = class Calculator {
    round(val) {
        // console.log('v1', val);
        return val;
    }
    round1(val) {
        // console.log('va2', val);
        return val;
    }
};
__decorate([
    lib_1.decorateMember(new BadRoundAttribute_1.BadRoundAttribute()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Number)
], Calculator.prototype, "round", null);
__decorate([
    lib_1.decorateMember(new BadRoundAttribute_1.BadRoundAttribute()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Number)
], Calculator.prototype, "round1", null);
Calculator = __decorate([
    lib_1.agent()
], Calculator);
describe('Interceptor on Invalid Setter Value', () => {
    describe('# should able to', () => {
        it('define agent', () => {
            expect(lib_1.IsAgent(Calculator)).toBe(true);
            expect(lib_1.IsAgent(lib_1.CreateAgent(Calculator))).toBe(true);
        });
        it('create agent', () => {
            const AC = new Calculator();
            expect(AC.round(23423.324234)).toBe(23423.324234);
            expect(AC.round1(23423.324234)).toBe(23423.324234);
        });
    });
});
