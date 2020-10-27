"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
describe('5.4. Domain construct', () => {
    class A {
    }
    class B extends A {
        dispose() {
            this.disposed = true;
        }
    }
    class C extends B {
    }
    let D = class D extends C {
    };
    D = __decorate([
        lib_1.agent()
    ], D);
    class R {
        constructor() {
            return {
                lift() { },
                subscribe() { },
            };
        }
    }
    class P {
        constructor() {
            return new Promise((resolve, reject) => { });
        }
    }
    describe('# should able to', () => {
        it('construct agent', () => {
            const domain = new lib_1.InMemoryDomain();
            const c = domain.construct(C);
            expect(c).toBeInstanceOf(C);
            const c1 = domain.construct(C);
            expect(c).toBe(c1);
            domain.dispose();
        });
        it('construct domain and agent', () => {
            const root = new lib_1.InMemoryDomain();
            const domain = root.construct(lib_1.InMemoryDomain);
            const c = domain.construct(C);
            expect(c).toBeInstanceOf(C);
            const c1 = domain.construct(C);
            expect(c).toBe(c1);
            domain.dispose();
        });
        // it('construct type using helper function', () => {
        //   const domain = new InMemoryDomain();
        //   const c = construct(domain, C);
        //   expect(c).toBeInstanceOf(C);
        //   const c1 = construct(c, C);
        //   expect(c).toBe(c1);
        //   const d = new D();
        //   const d1 = construct(d, C);
        //   expect(d1).not.toBe(c1);
        //   expect(() => {
        //     construct(new A(), C);
        //   }).toThrowError('Domain not found');
        //   domain.dispose();
        // });
        it('construct transit type', () => {
            const domain = new lib_1.InMemoryDomain();
            const c = domain.construct(C);
            expect(c).toBeInstanceOf(C);
            const c1 = domain.construct(C, undefined, true);
            expect(c).not.toBe(c1);
            const c2 = domain.construct(C, undefined, true);
            expect(c).not.toBe(c2);
            expect(c1).not.toBe(c2);
            domain.dispose();
        });
        it('construct Promise', () => {
            const domain = new lib_1.InMemoryDomain();
            expect(() => {
                domain.construct(R);
            }).toThrowError('NotSupportObservableConstructor');
        });
        it('construct Promise', () => {
            const domain = new lib_1.InMemoryDomain();
            expect(() => {
                domain.construct(P);
            }).toThrowError('NotSupportPromiseConstructor');
        });
        it('construct agent', () => {
            const domain = new lib_1.InMemoryDomain();
            expect(() => {
                domain.construct(D);
            }).toThrowError('NotSupportCreateAgentForOtherDomain');
        });
    });
});
