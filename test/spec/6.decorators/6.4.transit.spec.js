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
describe('6.4. @transit decorator', () => {
    describe('# should able to', () => {
        it('create agent', () => {
            class Service641 {
            }
            let App641 = class App641 {
            };
            __decorate([
                lib_1.transit(),
                __metadata("design:type", Service641)
            ], App641.prototype, "service", void 0);
            __decorate([
                lib_1.transit(Service641),
                __metadata("design:type", Object)
            ], App641.prototype, "service2", void 0);
            App641 = __decorate([
                lib_1.agent()
            ], App641);
            const app = new App641();
            expect(app.service).toBeInstanceOf(Service641);
            expect(app.service2).toBeInstanceOf(Service641);
            expect(app.service2).not.toBe(app.service);
            expect(lib_1.Reflector(App641).property('service').hasOwnAttribute(lib_1.TransitAttribute)).toBeTrue();
        });
        it('create agent with domain', () => {
            class Service642 {
            }
            class App642 {
            }
            __decorate([
                lib_1.transit(),
                __metadata("design:type", Service642)
            ], App642.prototype, "service", void 0);
            __decorate([
                lib_1.transit(Service642),
                __metadata("design:type", Object)
            ], App642.prototype, "service2", void 0);
            const domain = new lib_1.InMemoryDomain();
            const app = domain.construct(App642);
            expect(app.service).toBeInstanceOf(Service642);
            expect(app.service2).toBeInstanceOf(Service642);
            expect(app.service2).not.toBe(app.service);
        });
        it('create agent without Domain', () => {
            class Service643 {
            }
            class App643 {
            }
            __decorate([
                lib_1.transit(),
                __metadata("design:type", Service643)
            ], App643.prototype, "service", void 0);
            __decorate([
                lib_1.transit(),
                __metadata("design:type", Service643)
            ], App643.prototype, "service2", void 0);
            const Agent626 = lib_1.CreateAgent(App643);
            const app626 = new Agent626();
            expect(app626.service).toBeInstanceOf(Service643);
            expect(app626.service2).toBeInstanceOf(Service643);
            expect(app626.service2).not.toBe(app626.service);
        });
    });
    describe('# should not able to', () => {
        it('create transit agent with unknown type', () => {
            let App644 = class App644 {
            };
            __decorate([
                lib_1.transit(),
                __metadata("design:type", void 0)
            ], App644.prototype, "service", void 0);
            App644 = __decorate([
                lib_1.agent()
            ], App644);
            const app = new App644();
            expect(() => {
                expect(app.service).toBeUndefined();
            }).toThrowError('UnknownTransitType');
        });
    });
});
