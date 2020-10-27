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
describe('6.5. @once decorator', () => {
    describe('# should able to', () => {
        it('create agent', () => {
            let count = 0;
            class Service651 {
                constructor() {
                    count++;
                }
            }
            let App651 = class App651 {
                get service() {
                    return new Service651();
                }
            };
            __decorate([
                lib_1.once(),
                __metadata("design:type", Service651),
                __metadata("design:paramtypes", [])
            ], App651.prototype, "service", null);
            App651 = __decorate([
                lib_1.agent()
            ], App651);
            const app = new App651();
            expect(app.service).toBeInstanceOf(Service651);
            expect(app.service).toBe(app.service);
            expect(count).toBe(1);
            expect(lib_1.Reflector(App651).property('service').hasOwnAttribute(lib_1.OnceAttribute)).toBeTrue();
        });
        it('create agent with domain', () => {
            let count = 0;
            class Service652 {
                constructor() {
                    count++;
                }
            }
            class App652 {
                get service() {
                    return new Service652();
                }
            }
            __decorate([
                lib_1.once(),
                __metadata("design:type", Service652),
                __metadata("design:paramtypes", [])
            ], App652.prototype, "service", null);
            const domain = new lib_1.InMemoryDomain();
            const app = domain.construct(App652);
            expect(app.service).toBe(app.service);
            expect(count).toBe(1);
        });
        it('create agent without Domain', () => {
            let count = 0;
            class Service653 {
                constructor() {
                    count++;
                }
            }
            class App653 {
                get service() {
                    return new Service653();
                }
            }
            __decorate([
                lib_1.once(),
                __metadata("design:type", Service653),
                __metadata("design:paramtypes", [])
            ], App653.prototype, "service", null);
            const Agent653 = lib_1.CreateAgent(App653);
            const app653 = new Agent653();
            expect(app653.service).toBeInstanceOf(Service653);
            expect(count).toBe(1);
        });
    });
    describe('# should not able to', () => {
        it('create agent on method', () => {
            let App654 = class App654 {
                find() {
                    return [];
                }
                set value(v) { }
            };
            __decorate([
                lib_1.once(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], App654.prototype, "find", null);
            __decorate([
                lib_1.once(),
                __metadata("design:type", Object),
                __metadata("design:paramtypes", [Object])
            ], App654.prototype, "value", null);
            App654 = __decorate([
                lib_1.agent()
            ], App654);
            const app = new App654();
            expect(() => {
                expect(app.find()).toBeUndefined();
            }).toThrowError('OnceOnlyAvailableOnGetter');
            expect(() => {
                app.value = 1;
            }).toThrowError('OnceOnlyAvailableOnGetter');
        });
    });
});
