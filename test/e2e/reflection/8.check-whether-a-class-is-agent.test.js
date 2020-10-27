"use strict";
/* tslint:disable */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
let AgentClass = class AgentClass {
};
AgentClass = __decorate([
    lib_1.agent()
], AgentClass);
class NormalClass {
}
describe('Reflection Helper', () => {
    describe('# should able to', () => {
        it('create a new agent from existing agent', () => {
            expect(lib_1.CreateAgent(AgentClass)).toBeTruthy();
        });
        it('create a new agent from existing class', () => {
            expect(lib_1.CreateAgent(NormalClass)).toBeTruthy();
        });
        it('check agent', () => {
            expect(lib_1.IsAgent(AgentClass)).toBe(true);
        });
        it('check class', () => {
            expect(lib_1.IsAgent(NormalClass)).toBe(false);
        });
        it('get origin type of an agent', () => {
            expect(lib_1.GetType(AgentClass).prototype).toBe(Object.getPrototypeOf(Object.getPrototypeOf(AgentClass.prototype)));
        });
        it('get origin type of the upgraded class', () => {
            expect(lib_1.GetType(lib_1.CreateAgent(NormalClass))).toBe(NormalClass);
        });
        it('get origin type of the upgraded agent', () => {
            expect(lib_1.GetType(lib_1.CreateAgent(AgentClass))).not.toBe(AgentClass);
        });
    });
});
