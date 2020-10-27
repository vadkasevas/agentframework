"use strict";
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
describe('6.3. @singleton decorator', () => {
    describe('# should able to', () => {
        it('create singleton agent', () => {
            class Service631 {
            }
            let App631 = class App631 {
            };
            __decorate([
                lib_1.singleton(),
                __metadata("design:type", Service631)
            ], App631.prototype, "service", void 0);
            __decorate([
                lib_1.singleton(Service631),
                __metadata("design:type", Object)
            ], App631.prototype, "service2", void 0);
            App631 = __decorate([
                lib_1.agent()
            ], App631);
            const app = new App631();
            expect(app.service).toBeInstanceOf(Service631);
            expect(app.service2).toBe(app.service);
            expect(lib_1.Reflector(App631).property('service').hasOwnAttribute(lib_1.SingletonAttribute)).toBeTrue();
        });
        it('create singleton agent using domain', () => {
            class Service632 {
            }
            class App632 {
            }
            __decorate([
                lib_1.singleton(),
                __metadata("design:type", Service632)
            ], App632.prototype, "service", void 0);
            __decorate([
                lib_1.singleton(Service632),
                __metadata("design:type", Object)
            ], App632.prototype, "service2", void 0);
            const domain = new lib_1.InMemoryDomain();
            const app = domain.construct(App632);
            expect(app.service).toBeInstanceOf(Service632);
            expect(app.service2).toBe(app.service);
        });
        it('create singleton agent in domain', () => {
            class Service632 {
            }
            class App632 extends lib_1.InMemoryDomain {
            }
            __decorate([
                lib_1.singleton(),
                __metadata("design:type", Service632)
            ], App632.prototype, "service", void 0);
            __decorate([
                lib_1.singleton(Service632),
                __metadata("design:type", Object)
            ], App632.prototype, "service2", void 0);
            const domain = new lib_1.InMemoryDomain();
            const app = domain.construct(App632);
            expect(app.service).toBeInstanceOf(Service632);
            expect(app.service2).toBe(app.service);
        });
    });
    describe('# should not able to', () => {
        it('create singleton agent with unknown type', () => {
            let App633 = class App633 {
            };
            __decorate([
                lib_1.singleton(),
                __metadata("design:type", void 0)
            ], App633.prototype, "service", void 0);
            App633 = __decorate([
                lib_1.agent()
            ], App633);
            const app = new App633();
            expect(() => {
                expect(app.service).toBeUndefined();
            }).toThrowError('UnknownSingletonType');
        });
        it('create singleton agent without Domain', () => {
            class Service634 {
            }
            class App634 {
            }
            __decorate([
                lib_1.singleton(),
                __metadata("design:type", Service634)
            ], App634.prototype, "service", void 0);
            const Agent626 = lib_1.CreateAgent(App634);
            const app626 = new Agent626();
            expect(() => {
                expect(app626.service).toBeUndefined();
            }).toThrowError('NoDomainFoundForSingletonInjection');
        });
        it('create singleton using invalid receiver', () => {
            const domain = new lib_1.InMemoryDomain();
            class Service635 {
            }
            class App635 {
            }
            __decorate([
                lib_1.decorateMember({
                    interceptor: {
                        intercept(target, params, receiver) {
                            return target.invoke([domain], null);
                        },
                    },
                }),
                lib_1.singleton(),
                __metadata("design:type", Service635)
            ], App635.prototype, "service", void 0);
            const app = domain.construct(App635);
            expect(app.service).toBeInstanceOf(Service635);
        });
    });
});
