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
describe('4.7. setter interceptor', () => {
    describe('# should able to', () => {
        it('intercept class setter', () => {
            let Class414 = class Class414 {
                set setter(n) {
                    this.a = n;
                }
            };
            __decorate([
                lib_2.decorateMember({
                    interceptor: {
                        intercept(target, params, receiver) {
                            return target.invoke([Math.floor(params[0])], receiver);
                        }
                    }
                }),
                __metadata("design:type", Number),
                __metadata("design:paramtypes", [Number])
            ], Class414.prototype, "setter", null);
            Class414 = __decorate([
                lib_1.agent()
            ], Class414);
            const instance = new Class414();
            expect(instance).toBeInstanceOf(Class414);
            expect(instance.a).toBeUndefined();
            instance.setter = 5.5;
            expect(instance.a).toBe(5);
            instance.setter = 6.5;
            expect(instance.a).toBe(6);
            instance.setter = 7.5;
            expect(instance.a).toBe(7);
            instance.setter = 8.5;
            expect(instance.a).toBe(8);
            instance.setter = 9.5;
            expect(instance.a).toBe(9);
            instance.setter = 10.5;
            expect(instance.a).toBe(10);
        });
    });
});
