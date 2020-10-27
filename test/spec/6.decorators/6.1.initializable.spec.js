"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
describe('6.1. @initializable decorator', () => {
    describe('# should able to', () => {
        it('create static initializable agent', () => {
            var App611_1;
            const domain = new lib_1.InMemoryDomain();
            let App611 = App611_1 = class App611 {
                static [lib_1.ClassInitializer](domain, target, params, receiver) {
                    const app = target.invoke(params, receiver);
                    app.name1 = 'App611$';
                    return app;
                }
            };
            App611 = App611_1 = __decorate([
                lib_1.initializable()
            ], App611);
            const app1 = domain.construct(App611);
            expect(app1).toBeInstanceOf(App611);
            expect(app1.name1).toBe('App611$');
            const app2 = domain.construct(App611);
            expect(app2).toBeInstanceOf(App611);
            expect(app2.name1).toBe('App611$');
            const App611Agent = lib_1.CreateAgent(App611);
            const app3 = new App611Agent();
            expect(app3).toBeDefined();
        });
        it('create initializable agent', () => {
            class Root612 {
                [lib_1.Initializer]() {
                    this.root = 'Base612$';
                }
            }
            class Base612 extends Root612 {
                [lib_1.Initializer]() {
                    this.base = 'Base612$';
                }
            }
            let App612 = class App612 extends Base612 {
                [lib_1.Initializer]() {
                    this.name = 'App612$';
                }
            };
            App612 = __decorate([
                lib_1.initializable()
            ], App612);
            class ServiceBase612 extends Base612 {
                [lib_1.Initializer]() {
                    this.base = 'SericeBase612$';
                }
            }
            let Service612 = class Service612 extends ServiceBase612 {
                [lib_1.Initializer]() {
                    this.name = 'Service612$';
                }
            };
            Service612 = __decorate([
                lib_1.initializable()
            ], Service612);
            const domain = new lib_1.InMemoryDomain();
            const app1 = domain.construct(App612);
            expect(app1).toBeInstanceOf(App612);
            expect(app1.name).toBe('App612$');
            const svc1 = domain.construct(Service612);
            expect(svc1).toBeInstanceOf(Service612);
            expect(svc1.name).toBe('Service612$');
            const domain2 = new lib_1.InMemoryDomain();
            const app2 = domain2.construct(App612);
            expect(app2).toBeInstanceOf(App612);
            expect(app2.name).toBe('App612$');
            const svc2 = domain2.construct(Service612);
            expect(svc2).toBeInstanceOf(Service612);
            expect(svc2.name).toBe('Service612$');
        });
    });
    describe('# should not able to', () => {
        it('create invalid class initializer  agent', () => {
            var _a;
            const domain = new lib_1.InMemoryDomain();
            let App612 = class App612 {
            };
            _a = lib_1.ClassInitializer;
            App612[_a] = {};
            App612 = __decorate([
                lib_1.initializable()
            ], App612);
            expect(() => {
                domain.construct(App612);
            }).toThrowError('ClassInitializerMustFunction');
        });
    });
});
