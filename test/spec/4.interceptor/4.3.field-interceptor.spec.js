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
describe('4.3. field interceptor', () => {
    describe('# should able to', () => {
        it('intercept class field', () => {
            let Class431 = class Class431 {
            };
            __decorate([
                lib_2.decorateMember({
                    interceptor: {
                        intercept(target, params, receiver) {
                            if (typeof params[0] === 'number') {
                                const newParams = [Math.floor(params[0])];
                                // modify parameters
                                return target.invoke(newParams, receiver);
                            }
                            return 0;
                        },
                    },
                }),
                __metadata("design:type", Number)
            ], Class431.prototype, "calc", void 0);
            Class431 = __decorate([
                lib_1.agent()
            ], Class431);
            const setter = new Class431();
            expect(setter).toBeInstanceOf(Class431);
            setter.calc = 3.5;
            expect(setter.calc).toBe(3);
            setter.calc = 3.5;
            expect(setter.calc).toBe(3.5);
            const getter = new Class431();
            expect(getter).toBeInstanceOf(Class431);
            expect(getter.calc).toBe(0);
            setter.calc = 3.5;
            expect(setter.calc).toBe(3.5);
        });
        it('get get set set set class field', () => {
            let Class432 = class Class432 {
            };
            __decorate([
                lib_2.decorateMember({
                    interceptor: {
                        intercept(target, params, receiver) {
                            if (typeof params[0] === 'number') {
                                const newParams = [Math.floor(params[0])];
                                // modify parameters
                                return target.invoke(newParams, receiver);
                            }
                            return 0;
                        },
                    },
                }),
                __metadata("design:type", Number)
            ], Class432.prototype, "value", void 0);
            Class432 = __decorate([
                lib_1.agent()
            ], Class432);
            expect(lib_3.IsAgent(Class432)).toBeTrue();
            const a1 = new Class432();
            expect(a1.value).toBe(0);
            // Reflect.deleteProperty(a1, 'value');
            expect(a1.value).toBe(0);
            // Reflect.deleteProperty(a1, 'value');
            a1.value = 2.99;
            expect(a1.value).toBe(2);
            Reflect.deleteProperty(a1, 'value');
            a1.value = 1.99;
            expect(a1.value).toBe(1);
            Reflect.deleteProperty(a1, 'value');
            a1.value = 0.99;
            expect(a1.value).toBe(0);
            // const desc = Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(a1), 'value');
            // console.log('desc 1 get', desc!.get!.toString());
            // console.log('desc 1 set', desc!.set!.toString());
            //
            // const desc2 = Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(Reflect.getPrototypeOf(a1)), 'value');
            // console.log('desc 2 get', desc2!.get!.toString());
            // console.log('desc 2 set', desc2!.set!.toString());
        });
    });
    it('set set get get get class field', () => {
        let Class432 = class Class432 {
        };
        __decorate([
            lib_2.decorateMember({
                interceptor: {
                    intercept(target, params, receiver) {
                        if (typeof params[0] === 'number') {
                            const newParams = [Math.floor(params[0])];
                            // modify parameters
                            return target.invoke(newParams, receiver);
                        }
                        return 0;
                    },
                },
            }),
            __metadata("design:type", Number)
        ], Class432.prototype, "value", void 0);
        Class432 = __decorate([
            lib_1.agent()
        ], Class432);
        expect(lib_3.IsAgent(Class432)).toBeTrue();
        const a1 = new Class432();
        a1.value = 3.99;
        expect(a1.value).toBe(3);
        Reflect.deleteProperty(a1, 'value');
        a1.value = 2.99;
        expect(a1.value).toBe(2);
        Reflect.deleteProperty(a1, 'value');
        a1.value = 1.99;
        expect(a1.value).toBe(1);
        Reflect.deleteProperty(a1, 'value');
        expect(a1.value).toBe(0);
        Reflect.deleteProperty(a1, 'value');
        expect(a1.value).toBe(0);
        Reflect.deleteProperty(a1, 'value');
        expect(a1.value).toBe(0);
    });
});
