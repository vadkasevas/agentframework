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
describe('4.8. Getter and Setter interceptor', () => {
    describe('# should able to', () => {
        it('set set set get get get value', () => {
            let Class481 = class Class481 {
                set value(n) {
                    this.int = n;
                }
                get value() {
                    return this.int || 0;
                }
            };
            __decorate([
                lib_2.decorateMember({
                    interceptor: {
                        intercept(target, params, receiver) {
                            expect(target.design.descriptor).toBeTruthy();
                            return target.invoke(params, receiver);
                        },
                    },
                }),
                lib_2.decorateMember({
                    interceptor: {
                        intercept(target, params, receiver) {
                            // console.log('before intercept', params);
                            if (typeof params[0] === 'number') {
                                return target.invoke([Math.floor(params[0])], receiver);
                            }
                            return Math.floor(target.invoke(params, receiver));
                        },
                    },
                }),
                __metadata("design:type", Number),
                __metadata("design:paramtypes", [Number])
            ], Class481.prototype, "value", null);
            Class481 = __decorate([
                lib_1.agent()
            ], Class481);
            const instance = new Class481();
            expect(instance).toBeInstanceOf(Class481);
            expect(instance.int).toBeUndefined();
            // console.log();
            // console.log('==================== start write');
            // const d = Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(instance.constructor.prototype), 'both');
            // console.log('type 1111 = ', d?.get?.toString());
            // console.log('type 2222 = ', d?.set?.toString());
            instance.value = 5.5;
            // const d2 = Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(instance), 'both');
            // console.log('type 1111 = ', d2?.get?.toString());
            // console.log('type 2222 = ', d2?.set?.toString());
            expect(instance.int).toBe(5);
            instance.value = 4.5;
            expect(instance.int).toBe(4);
            instance.value = 3.5;
            expect(instance.int).toBe(3);
            instance.int = 5.5;
            expect(instance.value).toBe(5);
            instance.int = 4.5;
            expect(instance.value).toBe(4);
            instance.int = 3.5;
            expect(instance.value).toBe(3);
        });
        it('get get get set set set value', () => {
            let Class482 = class Class482 {
                set value(n) {
                    this.int = n;
                }
                get value() {
                    return this.int || 0;
                }
            };
            __decorate([
                lib_2.decorateMember({
                    interceptor: {
                        intercept(target, params, receiver) {
                            // console.log('before intercept', params);
                            if (typeof params[0] === 'number') {
                                return target.invoke([Math.floor(params[0])], receiver);
                            }
                            return Math.floor(target.invoke(params, receiver));
                        },
                    },
                }),
                __metadata("design:type", Number),
                __metadata("design:paramtypes", [Number])
            ], Class482.prototype, "value", null);
            Class482 = __decorate([
                lib_1.agent()
            ], Class482);
            const instance = new Class482();
            expect(instance).toBeInstanceOf(Class482);
            expect(instance.int).toBeUndefined();
            instance.int = 5.5;
            expect(instance.value).toBe(5);
            instance.int = 4.5;
            expect(instance.value).toBe(4);
            instance.int = 3.5;
            expect(instance.value).toBe(3);
            instance.value = 5.5;
            expect(instance.int).toBe(5);
            instance.value = 4.5;
            expect(instance.int).toBe(4);
            instance.value = 3.5;
            expect(instance.int).toBe(3);
        });
    });
});
