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
describe('6.2. @inject decorator', () => {
    describe('# should able to', () => {
        it('create inject agent', () => {
            let Service621 = class Service621 {
            };
            Service621 = __decorate([
                lib_1.agent()
            ], Service621);
            let App621 = class App621 {
            };
            __decorate([
                lib_1.inject(),
                __metadata("design:type", Service621)
            ], App621.prototype, "service", void 0);
            App621 = __decorate([
                lib_1.agent()
            ], App621);
            const service = new Service621();
            const app = new App621();
            expect(app.service).toBe(service);
            expect(lib_1.Reflector(App621).property('service').hasOwnAttribute(lib_1.InjectAttribute)).toBeTrue();
        });
        it('create inject agent using domain', () => {
            class Service622 {
            }
            class App622 {
            }
            __decorate([
                lib_1.inject(),
                __metadata("design:type", Service622)
            ], App622.prototype, "service", void 0);
            const domain = new lib_1.InMemoryDomain();
            const service = domain.construct(Service622);
            const app = domain.construct(App622);
            expect(app.service).toBe(service);
        });
    });
    describe('# should not able to', () => {
        it('inject non-existing agent', () => {
            let Service623 = class Service623 {
            };
            Service623 = __decorate([
                lib_1.agent()
            ], Service623);
            let App623 = class App623 {
            };
            __decorate([
                lib_1.inject(),
                __metadata("design:type", Service623)
            ], App623.prototype, "service", void 0);
            App623 = __decorate([
                lib_1.agent()
            ], App623);
            const app = new App623();
            expect(() => {
                expect(app.service).toBeUndefined();
            }).toThrowError('Agent InMemoryDomain__Service623$ not found');
        });
        it('inject non-existing agent using domain', () => {
            class Service624 {
            }
            class App624 {
            }
            __decorate([
                lib_1.inject(),
                __metadata("design:type", Service624)
            ], App624.prototype, "service", void 0);
            const domain = new lib_1.InMemoryDomain();
            const app = domain.construct(App624);
            expect(() => {
                expect(app.service).toBeUndefined();
            }).toThrowError('Agent Service624 not found');
        });
        it('inject unknown', () => {
            let App625 = class App625 {
            };
            __decorate([
                lib_1.inject(),
                __metadata("design:type", void 0)
            ], App625.prototype, "service", void 0);
            App625 = __decorate([
                lib_1.agent()
            ], App625);
            const app = new App625();
            expect(() => {
                expect(app.service).toBeUndefined();
            }).toThrowError('UnknownInjectType');
        });
        it('inject without Domain', () => {
            class Service626 {
            }
            class App626 {
            }
            __decorate([
                lib_1.inject(),
                __metadata("design:type", Service626)
            ], App626.prototype, "service", void 0);
            const Agent626 = lib_1.CreateAgent(App626);
            const app626 = new Agent626();
            expect(() => {
                expect(app626.service).toBeUndefined();
            }).toThrowError('NoDomainFoundForInjection');
        });
    });
});
