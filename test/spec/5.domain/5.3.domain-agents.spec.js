"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
describe('5.3. Domain agent', () => {
    class A {
    }
    let B = class B extends A {
        dispose() {
            this.disposed = true;
        }
    };
    B = __decorate([
        lib_1.agent()
    ], B);
    let C = class C extends B {
    };
    C = __decorate([
        lib_1.agent()
    ], C);
    class D extends C {
    }
    describe('# should able to', () => {
        it('find domain agent', () => {
            expect(lib_1.FindDomain(B)).toBeDefined();
        });
        it('add agent', () => {
            const domain = new lib_1.InMemoryDomain();
            domain.addAgent(A, new A());
            domain.addAgent(C, new B());
            domain.addAgent(C, new C());
            domain.addAgent(D, new D());
            expect(domain.getAgent(A)).toBeInstanceOf(A);
            expect(domain.getAgent(B)).toBeInstanceOf(B);
            expect(domain.getAgent(C)).toBeInstanceOf(B);
            expect(domain.getAgent(D)).toBeInstanceOf(C);
            domain.dispose();
        });
        it('add explicit agent', () => {
            const domain = new lib_1.InMemoryDomain();
            domain.addAgent(B, new B(), true);
            expect(domain.getAgent(A)).toBeUndefined();
            expect(domain.getAgent(B)).toBeInstanceOf(B);
            domain.dispose();
        });
        it('set agent', () => {
            const domain = new lib_1.InMemoryDomain();
            domain.setAgent(A, new B());
            expect(domain.getAgent(A)).toBeInstanceOf(B);
            domain.dispose();
        });
        it('remove agent', () => {
            const domain = new lib_1.InMemoryDomain();
            const agent = new B();
            domain.addAgent(B, agent);
            domain.removeAgent(A, agent);
            expect(domain.getAgent(A)).toBeUndefined();
            expect(domain.getAgent(B)).toBeInstanceOf(B);
            agent.dispose();
            domain.dispose();
        });
        it('remove non-existing agent', () => {
            const domain = new lib_1.InMemoryDomain();
            const agent = new B();
            domain.addAgent(B, agent);
            domain.removeAgent(A, new A());
            expect(domain.getAgent(A)).toBeInstanceOf(B);
            expect(domain.getAgent(B)).toBeInstanceOf(B);
            domain.dispose();
        });
        it('has agent', () => {
            const domain = new lib_1.InMemoryDomain();
            const agent = new B();
            domain.addAgent(B, agent);
            expect(domain.hasAgent(A)).toBeTrue();
            expect(domain.hasAgent(B)).toBeTrue();
            expect(domain.hasAgent(C)).toBeFalse();
            domain.dispose();
        });
        it('get agent', () => {
            const domain = new lib_1.InMemoryDomain();
            const agent = new B();
            domain.addAgent(B, agent);
            expect(domain.getAgent(A)).toBeInstanceOf(B);
            expect(domain.getAgent(B)).toBeInstanceOf(B);
            expect(domain.getAgent(C)).toBeUndefined();
            domain.dispose();
        });
        it('get agent or throw', () => {
            const domain = new lib_1.InMemoryDomain();
            const agent = new B();
            domain.addAgent(B, agent);
            expect(domain.getAgentOrThrow(A)).toBeInstanceOf(B);
            expect(domain.getAgentOrThrow(B)).toBeInstanceOf(B);
            expect(() => {
                domain.getAgentOrThrow(C);
            }).toThrowError(lib_1.AgentNotFoundError, 'Agent InMemoryDomain__C$ not found');
            expect(() => {
                domain.getAgentOrThrow(D);
            }).toThrowError('Agent D not found');
            domain.dispose();
        });
    });
});
