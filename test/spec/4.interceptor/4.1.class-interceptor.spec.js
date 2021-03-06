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
describe('4.1. Class interceptor', () => {
    describe('# should able to', () => {
        it('intercept class constructor', () => {
            let Class411 = class Class411 {
                constructor(a) {
                    this.a = a;
                }
                Method411() { }
            };
            __decorate([
                lib_1.decorateMember({ role: 'user' }),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Class411.prototype, "Method411", null);
            Class411 = __decorate([
                lib_1.agent(),
                lib_1.decorateClass({
                    interceptor: {
                        intercept(target, params, receiver) {
                            return target.invoke([Math.floor(params[0])], receiver);
                        },
                    },
                }),
                __metadata("design:paramtypes", [Number])
            ], Class411);
            const instance = new Class411(3.5);
            expect(instance).toBeInstanceOf(Class411);
            expect(instance.a).toBe(3);
        });
    });
});
