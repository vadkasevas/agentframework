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
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
const method_1 = require("./method");
describe('Method Decorator', () => {
    describe('# should able to', () => {
        it('decorate on method', () => {
            let TestMethodDecoratorAtClassMethod = class TestMethodDecoratorAtClassMethod {
                constructor() {
                    this._testMethod = 'test';
                }
                testMethod() {
                    return this._testMethod;
                }
            };
            __decorate([
                method_1.methodDecorator(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], TestMethodDecoratorAtClassMethod.prototype, "testMethod", null);
            TestMethodDecoratorAtClassMethod = __decorate([
                lib_1.agent()
            ], TestMethodDecoratorAtClassMethod);
            const test = new TestMethodDecoratorAtClassMethod();
            expect(test.testMethod()).toEqual('test');
        });
        it('decorate on getter', () => {
            let TestMethodDecoratorAtPropertyGetter = class TestMethodDecoratorAtPropertyGetter {
                constructor() {
                    this._testMethod = 'test';
                }
                get testMethod() {
                    return this._testMethod;
                }
            };
            __decorate([
                method_1.methodDecorator(),
                __metadata("design:type", Object),
                __metadata("design:paramtypes", [])
            ], TestMethodDecoratorAtPropertyGetter.prototype, "testMethod", null);
            TestMethodDecoratorAtPropertyGetter = __decorate([
                lib_1.agent()
            ], TestMethodDecoratorAtPropertyGetter);
            const test = new TestMethodDecoratorAtPropertyGetter();
            expect(test.testMethod).toEqual('test');
        });
        it('decorate on setter', () => {
            let TestMethodDecoratorAtPropertySetter = class TestMethodDecoratorAtPropertySetter {
                set testMethod(value) {
                    this._testMethod = value;
                }
            };
            __decorate([
                method_1.methodDecorator(),
                __metadata("design:type", Number),
                __metadata("design:paramtypes", [Number])
            ], TestMethodDecoratorAtPropertySetter.prototype, "testMethod", null);
            TestMethodDecoratorAtPropertySetter = __decorate([
                lib_1.agent()
            ], TestMethodDecoratorAtPropertySetter);
            const test = new TestMethodDecoratorAtPropertySetter();
            test.testMethod = 123;
            expect(test._testMethod).toEqual(123);
        });
    });
});
