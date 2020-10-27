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
const lib_2 = require("../../../lib");
const lib_3 = require("../../../lib");
describe('4.4. method interceptor', () => {
    let Class441 = class Class441 {
        sum(a, b) {
            return a + b;
        }
    };
    __decorate([
        lib_2.decorateMember({
            interceptor: {
                intercept(target, params, receiver) {
                    return target.invoke([Math.floor(params[0]), Math.floor(params[1])], receiver);
                },
            },
        }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", Number)
    ], Class441.prototype, "sum", null);
    Class441 = __decorate([
        lib_1.agent()
    ], Class441);
    describe('# should able to', () => {
        it('check agent', () => {
            expect(lib_3.IsAgent(Class441));
        });
        it('sum two float number', () => {
            const sum = new Class441();
            expect(sum.sum(1.9, 3.3)).toBe(4);
        });
    });
});
