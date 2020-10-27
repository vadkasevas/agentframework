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
const RoundInterceptor_1 = require("../attributes/RoundInterceptor");
class Calculator {
}
__decorate([
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Number)
], Calculator.prototype, "RoundOnField", void 0);
Reflect.defineProperty(Calculator.prototype, 'RoundOnField', {
    value: 1
});
describe('Interceptor on Field', () => {
    describe('# should able to', () => {
        it('define agent', () => {
            expect(lib_1.IsAgent(Calculator)).toBeFalse();
            expect(lib_1.CreateAgent(Calculator)).toBeTruthy();
        });
        it('re-upgrade agent', () => {
            expect(lib_1.CreateAgent(lib_1.CreateAgent(Calculator))).toBeTruthy();
        });
        it('get the attribute', () => {
            expect(lib_1.Reflector(Calculator)
                .property('RoundOnField')
                .getOwnAttributes(RoundInterceptor_1.RoundInterceptor).length).toBe(1);
        });
        it('create agent', () => {
            const Agent = lib_1.CreateAgent(Calculator);
            const agent = new Agent();
            expect(agent).toBeTruthy();
        });
    });
});
