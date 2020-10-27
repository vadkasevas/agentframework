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
class Base {
    get age() {
        return 1.2;
    }
}
__decorate([
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Base.prototype, "age", null);
let Calculator = class Calculator extends Base {
    get age() {
        return 1.5;
    }
};
__decorate([
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], Calculator.prototype, "age", null);
Calculator = __decorate([
    lib_1.agent()
], Calculator);
describe('Duplicate Interceptors', () => {
    describe('# should able to', () => {
        it('define agent', () => {
            expect(lib_1.IsAgent(Calculator)).toBeTrue();
        });
        it('re-upgrade agent', () => {
            expect(lib_1.IsAgent(lib_1.CreateAgent(Calculator))).toBeTrue();
        });
    });
});
