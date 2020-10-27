"use strict";
/* tslint:disable */
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
const fake_1 = require("./fake");
describe('Fake Decorator', () => {
    describe('# should able to', () => {
        it('decorate on method', () => {
            let TestClass = class TestClass {
                testMethod(first, second) {
                    return this;
                }
            };
            __decorate([
                fake_1.fakeClassMemberDecorator(),
                __param(0, fake_1.fakeParameterDecorator()), __param(1, fake_1.fakeParameterDecorator()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Boolean, TestClass]),
                __metadata("design:returntype", TestClass)
            ], TestClass.prototype, "testMethod", null);
            TestClass = __decorate([
                lib_1.agent()
            ], TestClass);
            const test = new TestClass();
            expect(test.testMethod(false)).toEqual(test);
        });
        it('decorate on class', () => {
            let TestClass = class TestClass {
                constructor() {
                    this._testMethod = 'test';
                }
                testMethod() {
                    return this._testMethod;
                }
            };
            TestClass = __decorate([
                lib_1.agent(),
                fake_1.fakeClassDecorator()
            ], TestClass);
            const test = new TestClass();
            expect(test.testMethod()).toEqual('test');
        });
        it('decorate on class method', () => {
            let TestClass = class TestClass {
                constructor() {
                    this._testMethod = 'test';
                }
                testMethod() {
                    return this._testMethod;
                }
            };
            __decorate([
                fake_1.fakeClassMethodDecorator(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], TestClass.prototype, "testMethod", null);
            TestClass = __decorate([
                lib_1.agent()
            ], TestClass);
            const test = new TestClass();
            expect(test.testMethod()).toEqual('test');
        });
        it('decorate on class property', () => {
            let TestClass = class TestClass {
                constructor() {
                    this._testMethod = 'test';
                }
                testMethod() {
                    return this._testMethod;
                }
            };
            __decorate([
                fake_1.fakeClassPropertyDecorator(),
                __metadata("design:type", String)
            ], TestClass.prototype, "_testMethod", void 0);
            TestClass = __decorate([
                lib_1.agent()
            ], TestClass);
            const test = new TestClass();
            expect(test.testMethod()).toEqual('test');
        });
    });
});
