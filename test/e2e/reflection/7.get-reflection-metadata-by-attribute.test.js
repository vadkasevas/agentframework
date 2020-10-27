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
const RandomInterceptor_1 = require("../attributes/RandomInterceptor");
const RoundInterceptor_1 = require("../attributes/RoundInterceptor");
class ClassWithTwoInterceptor {
    ClassWithTwoInterceptorMethod1() {
        return 'connected';
    }
}
__decorate([
    lib_1.decorateMember(new RandomInterceptor_1.RandomInterceptor()),
    __metadata("design:type", Object)
], ClassWithTwoInterceptor.prototype, "ClassWithTwoInterceptorField1", void 0);
__decorate([
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClassWithTwoInterceptor.prototype, "ClassWithTwoInterceptorMethod1", null);
describe('Reflection get metadata ', () => {
    describe('# should able to', () => {
        it('detect interceptor', () => {
            expect(Reflect.has(new RandomInterceptor_1.RandomInterceptor(), 'interceptor')).toBeTrue();
        });
        it('detect annotations', () => {
            const results = lib_1.Reflector(ClassWithTwoInterceptor).getOwnProperties();
            expect(results.length).toBe(2);
        });
        it('search current type by interceptor', () => {
            const result = lib_1.Reflector(ClassWithTwoInterceptor).findOwnProperties(p => p.hasInterceptor());
            expect(result).toBeTruthy();
            expect(result.length).toBe(2);
        });
        it('search current and base types by interceptor', () => {
            const result = lib_1.Reflector(ClassWithTwoInterceptor).findProperties(p => p.hasInterceptor());
            expect(result).toBeTruthy();
            expect(result.size).toBe(1);
            for (const layer of result.entries()) {
                expect(layer[1].length).toBe(2);
            }
        });
        it('search by attribute', () => {
            const result = lib_1.Reflector(ClassWithTwoInterceptor).findOwnProperties(p => p.hasOwnAttribute(RandomInterceptor_1.RandomInterceptor));
            expect(result.length).toBe(1);
        });
    });
});
