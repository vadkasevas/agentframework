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
const property_1 = require("./property");
let TestPropertyDecoratorAgentClass = class TestPropertyDecoratorAgentClass {
    constructor() {
        this.test = 'test';
        this._unused = 999;
        this._activated = true;
    }
    get activated() {
        return this._activated;
    }
    set activated(value) {
        this._activated = value;
    }
    checkTest() {
        return true;
    }
    undecorated() {
        return this._unused;
    }
};
__decorate([
    property_1.propertyDecorator(),
    property_1.propertyDecorator(),
    __metadata("design:type", String)
], TestPropertyDecoratorAgentClass.prototype, "test", void 0);
__decorate([
    property_1.propertyDecorator(),
    __metadata("design:type", Boolean)
], TestPropertyDecoratorAgentClass.prototype, "_activated", void 0);
TestPropertyDecoratorAgentClass = __decorate([
    lib_1.agent()
], TestPropertyDecoratorAgentClass);
describe('PropertyDecorator', () => {
    describe('# should able to', () => {
        // TSC is not smart enough to check @PropertyDecorator() errors
        it('decorate on method', () => {
            let TestDecoratePropertyDecoratorToClassMethodAgentClass = class TestDecoratePropertyDecoratorToClassMethodAgentClass {
                testMethod() {
                    return 'test';
                }
            };
            __decorate([
                property_1.propertyDecorator(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], TestDecoratePropertyDecoratorToClassMethodAgentClass.prototype, "testMethod", null);
            TestDecoratePropertyDecoratorToClassMethodAgentClass = __decorate([
                lib_1.agent()
            ], TestDecoratePropertyDecoratorToClassMethodAgentClass);
            expect(TestDecoratePropertyDecoratorToClassMethodAgentClass).toBeTruthy();
        });
        it('decorate on getter', () => {
            let TestDecoratePropertyDecoratorToClassGetterAgentClass = class TestDecoratePropertyDecoratorToClassGetterAgentClass {
                get method() {
                    return 'test';
                }
            };
            __decorate([
                property_1.propertyDecorator(),
                __metadata("design:type", Object),
                __metadata("design:paramtypes", [])
            ], TestDecoratePropertyDecoratorToClassGetterAgentClass.prototype, "method", null);
            TestDecoratePropertyDecoratorToClassGetterAgentClass = __decorate([
                lib_1.agent()
            ], TestDecoratePropertyDecoratorToClassGetterAgentClass);
            expect(TestDecoratePropertyDecoratorToClassGetterAgentClass).toBeTruthy();
        });
        it('decorate on setter', () => {
            let TestDecoratePropertyDecoratorToClassSetterAgentClass = class TestDecoratePropertyDecoratorToClassSetterAgentClass {
                set method(value) {
                    this._method = value;
                }
            };
            __decorate([
                property_1.propertyDecorator(),
                __metadata("design:type", String)
            ], TestDecoratePropertyDecoratorToClassSetterAgentClass.prototype, "_method", void 0);
            __decorate([
                property_1.propertyDecorator(),
                __metadata("design:type", String),
                __metadata("design:paramtypes", [String])
            ], TestDecoratePropertyDecoratorToClassSetterAgentClass.prototype, "method", null);
            TestDecoratePropertyDecoratorToClassSetterAgentClass = __decorate([
                lib_1.agent()
            ], TestDecoratePropertyDecoratorToClassSetterAgentClass);
            expect(TestDecoratePropertyDecoratorToClassSetterAgentClass).toBeTruthy();
        });
        it('decorate on setter twice', () => {
            class NotAllowDecorateOnSetter {
                set method(value) {
                    this._method = value;
                }
            }
            __decorate([
                property_1.propertyDecorator(),
                __metadata("design:type", String)
            ], NotAllowDecorateOnSetter.prototype, "_method", void 0);
            __decorate([
                property_1.propertyDecorator(),
                __metadata("design:type", String),
                __metadata("design:paramtypes", [String])
            ], NotAllowDecorateOnSetter.prototype, "method", null);
            expect(NotAllowDecorateOnSetter).toBeTruthy();
        });
    });
    describe('# should able to', () => {
        it('call decorated class member', () => {
            const agent = new TestPropertyDecoratorAgentClass();
            expect(agent.activated).toEqual(true);
        });
        it('call decorated prototype member', () => {
            const agent = new TestPropertyDecoratorAgentClass();
            expect(agent.test).toEqual('test');
        });
        it('call undecorated class member', () => {
            const agent = new TestPropertyDecoratorAgentClass();
            expect(agent.activated).toEqual(true);
        });
        it('call undecorated prototype member', () => {
            const agent = new TestPropertyDecoratorAgentClass();
            expect(agent.undecorated()).toEqual(999);
        });
    });
});
