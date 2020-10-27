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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
const lib_2 = require("../../../lib");
const lib_3 = require("../../../lib");
describe('4.5. method parameter interceptor', () => {
    describe('# should able to', () => {
        it('intercept class method and parameter', () => {
            let Class412 = class Class412 {
                calc(a) {
                    return a;
                }
            };
            __decorate([
                lib_2.decorateMember({
                    interceptor: {
                        intercept(target, params, receiver) {
                            return target.invoke(params, receiver);
                        }
                    }
                }),
                __param(0, lib_3.decorateParameter({
                    interceptor: {
                        intercept(target, params, receiver) {
                            return Math.floor(params[target.design.index]);
                        }
                    }
                })),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Number]),
                __metadata("design:returntype", void 0)
            ], Class412.prototype, "calc", null);
            Class412 = __decorate([
                lib_1.agent()
            ], Class412);
            const instance = new Class412();
            expect(instance).toBeInstanceOf(Class412);
            expect(instance.calc(3.6)).toBe(3);
        });
    });
});
