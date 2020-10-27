"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
describe('5.5. Domain resolve', () => {
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
            return new Promise((resolve, reject) => {
                resolve({});
            });
        }
    }
    class E {
        constructor() {
            return new Promise((resolve, reject) => {
                reject(new Error('not ok'));
            });
        }
    }
    describe('# should able to', () => {
        it('resolve type', () => __awaiter(void 0, void 0, void 0, function* () {
            const domain = new lib_1.InMemoryDomain();
            const c1 = yield domain.resolve(C);
            const c = domain.getAgentOrThrow(C);
            expect(c1).toBeInstanceOf(C);
            expect(c1).toBe(c);
            const c2 = yield domain.resolve(C);
            expect(c2).toBeInstanceOf(C);
            expect(c2).toBe(c);
            expect(c1).toBe(c2);
            domain.dispose();
        }));
        it('resolve transit type', () => __awaiter(void 0, void 0, void 0, function* () {
            const domain = new lib_1.InMemoryDomain();
            const c1 = yield domain.resolve(C);
            expect(c1).toBeInstanceOf(C);
            const c = domain.getAgentOrThrow(C);
            expect(c1).toBe(c);
            const c2 = yield domain.resolve(C, undefined, true);
            expect(c2).toBeInstanceOf(C);
            expect(c2).not.toBe(c);
            const c3 = yield domain.resolve(C, undefined, true);
            expect(c3).toBeInstanceOf(C);
            expect(c3).not.toBe(c);
            expect(c3).not.toBe(c2);
            domain.dispose();
        }));
        it('resolve Promise', () => __awaiter(void 0, void 0, void 0, function* () {
            const domain = new lib_1.InMemoryDomain();
            const p1 = yield domain.resolve(P);
            const p2 = yield domain.resolve(P);
            expect(p1).toBeDefined();
            expect(p2).toBe(p1);
        }));
        it('resolve Promise with error', () => __awaiter(void 0, void 0, void 0, function* () {
            const domain = new lib_1.InMemoryDomain();
            expectAsync(domain.resolve(E)).toBeRejectedWithError('not ok');
            expectAsync(domain.resolve(E)).toBeRejectedWithError('not ok');
        }));
        it('resolve transit Promise', () => __awaiter(void 0, void 0, void 0, function* () {
            const domain = new lib_1.InMemoryDomain();
            const ps = yield Promise.all([domain.resolve(P, undefined, true), domain.resolve(P, undefined, true)]);
            expect(ps.length).toBe(2);
            expect(ps[0]).not.toBe(ps[1]);
        }));
        it('resolve transit Promise with error', () => __awaiter(void 0, void 0, void 0, function* () {
            const domain = new lib_1.InMemoryDomain();
            expectAsync(domain.resolve(E, undefined, true)).toBeRejectedWithError('not ok');
            expectAsync(domain.resolve(E, undefined, true)).toBeRejectedWithError('not ok');
            domain.dispose();
        }));
        it('resolve pending agent', (done) => __awaiter(void 0, void 0, void 0, function* () {
            class Async {
                constructor() {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve({});
                        }, 0);
                    });
                }
            }
            class Pending {
                constructor() {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve({
                                dispose() {
                                    done();
                                },
                            });
                        }, 0);
                    });
                }
            }
            const domain = new lib_1.InMemoryDomain();
            expectAsync(domain.resolve(Async)).toBeResolved();
            expectAsync(domain.resolve(Pending)).toBeResolved();
            domain.dispose();
        }));
        it('resolve Observable', () => __awaiter(void 0, void 0, void 0, function* () {
            const domain = new lib_1.InMemoryDomain();
            expectAsync(domain.resolve(R)).toBeRejectedWithError('NotSupportObservableConstructor');
        }));
        it('construct agent', () => {
            const domain = new lib_1.InMemoryDomain();
            expect(() => {
                domain.construct(D);
            }).toThrowError('NotSupportCreateAgentForOtherDomain');
        });
    });
});
