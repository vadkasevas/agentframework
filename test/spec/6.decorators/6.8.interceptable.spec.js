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
describe('6.8. @interceptable decorator', () => {
    describe('# should able to', () => {
        it('create static initializable agent', () => {
            /**
             * static interceptor require agent attribute, create proxy on top of user code
             */
            let App681 = class App681 {
                static run(n) {
                    return n;
                }
            };
            __decorate([
                lib_1.decorateMember({
                    interceptor: {
                        intercept(target, params, receiver) {
                            return Math.floor(params[0]);
                        },
                    },
                }),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], App681, "run", null);
            App681 = __decorate([
                lib_1.agent(),
                lib_1.interceptable()
            ], App681);
            expect(App681.run(1.5)).toBe(1);
        });
        it('create static initializable agent without properties', () => {
            /**
             * static interceptor require agent attribute, create proxy on top of user code
             */
            let App682 = class App682 {
            };
            App682 = __decorate([
                lib_1.agent(),
                lib_1.interceptable()
            ], App682);
            expect(App682).toBeTruthy();
        });
        it('create static initializable agent', () => {
            let App683 = class App683 {
                static run(n) {
                    return n;
                }
            };
            App683 = __decorate([
                lib_1.decorateAgent({
                    name: 'cool',
                })
            ], App683);
            expect(lib_1.Reflector(App683).static.hasOwnAttribute()).toBeTrue();
        });
    });
    describe('# should not able to', () => {
        it('create static initializable agent', () => {
            let App685 = class App685 {
                static run(n) {
                    return n;
                }
            };
            App685 = __decorate([
                lib_1.decorateAgent({
                    beforeDecorate() {
                        return false;
                    },
                })
            ], App685);
            expect(lib_1.Reflector(App685).static.hasOwnAttribute()).toBeFalse();
        });
    });
});
