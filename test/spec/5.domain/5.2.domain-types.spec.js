"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
describe('5.2. Domain type', () => {
    class A {
    }
    let B = class B extends A {
    };
    B = __decorate([
        lib_1.agent()
    ], B);
    class C extends B {
    }
    describe('# should able to', () => {
        it('add type', () => {
            const domain = new lib_1.InMemoryDomain();
            domain.addType(A);
            domain.addType(B);
            domain.addType(C);
            domain.addType(A);
            domain.addType(B);
            domain.addType(C);
            expect(domain.getType(A)).toBe(A);
            expect(domain.getType(B)).toBe(B);
            expect(domain.getType(C)).toBe(C);
        });
        it('set type', () => {
            const domain = new lib_1.InMemoryDomain();
            domain.addType(A);
            domain.addType(B);
            domain.addType(C);
            expect(domain.getType(A)).toBe(A);
            expect(domain.getType(B)).toBe(B);
            expect(domain.getType(C)).toBe(C);
            domain.setType(A, C);
            domain.setType(B, C);
            domain.setType(C, C);
            expect(domain.getType(A)).toBe(C);
            expect(domain.getType(B)).toBe(C);
            expect(domain.getType(C)).toBe(C);
        });
        it('remove type', () => {
            const domain = new lib_1.InMemoryDomain();
            domain.removeType(A);
            domain.removeType(B);
            domain.removeType(C);
            domain.addType(C);
            expect(domain.getType(A)).toBe(C);
            expect(domain.getType(B)).toBe(C);
            expect(domain.getType(C)).toBe(C);
            domain.removeType(A);
            domain.removeType(B);
            domain.removeType(C);
            expect(domain.getType(A)).toBeUndefined();
            expect(domain.getType(B)).toBeUndefined();
            expect(domain.getType(C)).toBeUndefined();
        });
        it('has type', () => {
            const domain = new lib_1.InMemoryDomain();
            domain.addType(C);
            expect(domain.hasType(A)).toBeTrue();
            expect(domain.hasType(B)).toBeTrue();
            expect(domain.hasType(C)).toBeTrue();
        });
        it('get type', () => {
            const domain = new lib_1.InMemoryDomain();
            domain.addType(A);
            domain.addType(B);
            domain.addType(C);
            expect(domain.getType(A)).toBe(A);
            expect(domain.getType(B)).toBe(B);
            expect(domain.getType(C)).toBe(C);
        });
        it('get type or throw', () => {
            const domain = new lib_1.InMemoryDomain();
            domain.addType(B);
            expect(domain.getTypeOrThrow(A)).toBe(B);
            expect(domain.getTypeOrThrow(B)).toBe(B);
            expect(() => {
                domain.getTypeOrThrow(C);
            }).toThrowError(lib_1.TypeNotFoundError, 'Type C not found');
        });
    });
});
