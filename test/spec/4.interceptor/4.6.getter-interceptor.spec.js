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
describe('4.6. getter interceptor', () => {
    describe('# should able to', () => {
        it('intercept class getter', () => {
            let Class414 = class Class414 {
                get getter() {
                    return this.a;
                }
            };
            __decorate([
                lib_2.decorateMember({
                    interceptor: {
                        intercept(target, params, receiver) {
                            return Math.floor(target.invoke(params, receiver));
                        }
                    }
                }),
                __metadata("design:type", Object),
                __metadata("design:paramtypes", [])
            ], Class414.prototype, "getter", null);
            Class414 = __decorate([
                lib_1.agent()
            ], Class414);
            const instance = new Class414();
            expect(instance).toBeInstanceOf(Class414);
            instance.a = 4.5;
            expect(instance.a).toBe(4.5);
            expect(instance.getter).toBe(4);
            expect(instance.getter).toBe(4);
            expect(instance.getter).toBe(4);
            expect(instance.getter).toBe(4);
            expect(instance.getter).toBe(4);
            expect(instance.getter).toBe(4);
            expect(instance.getter).toBe(4);
            expect(instance.getter).toBe(4);
            expect(instance.getter).toBe(4);
        });
    });
});
