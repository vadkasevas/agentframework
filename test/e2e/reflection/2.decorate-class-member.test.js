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
const RandomInterceptor_1 = require("../attributes/RandomInterceptor");
const RoundInterceptor_1 = require("../attributes/RoundInterceptor");
const MetadataAttribute_1 = require("../attributes/MetadataAttribute");
class MongoDB {
    connect(a, b) {
        return true;
    }
    logs() { }
    logs2() { }
}
__decorate([
    lib_1.decorateMember(new RandomInterceptor_1.RandomInterceptor()),
    __metadata("design:type", Date)
], MongoDB.prototype, "rnd1", void 0);
__decorate([
    lib_1.decorateMember(new RandomInterceptor_1.RandomInterceptor()),
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Object)
], MongoDB.prototype, "both", void 0);
__decorate([
    lib_1.decorateMember(new MetadataAttribute_1.MetadataAttribute()),
    __metadata("design:type", Object)
], MongoDB.prototype, "books", void 0);
__decorate([
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __param(0, lib_1.decorateParameter(new RoundInterceptor_1.RoundInterceptor())),
    __param(1, lib_1.decorateParameter(new RoundInterceptor_1.RoundInterceptor())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        RegExp]),
    __metadata("design:returntype", Boolean)
], MongoDB.prototype, "connect", null);
__decorate([
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], MongoDB.prototype, "logs", null);
__decorate([
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], MongoDB.prototype, "logs2", null);
describe('Reflection Class Member', () => {
    describe('# should able to', () => {
        it('get method return type', () => {
            expect(lib_1.Reflector(MongoDB)
                .property('connect')
                .getParameters()[0].type).toEqual(Date);
            expect(lib_1.Reflector(MongoDB)
                .property('connect')
                .getParameters()[1].type).toEqual(RegExp);
        });
        it('get method param type', () => {
            expect(lib_1.Reflector(MongoDB).property('connect').type).toBe(Boolean);
        });
        it('get method param type', () => {
            const params = lib_1.Reflector(MongoDB)
                .property('connect')
                .getParameters()
                .map(p => p.type);
            expect(params).toEqual([Date, RegExp]);
        });
        it('get method return type', () => {
            expect(lib_1.Reflector(MongoDB).property('connect').type).toBe(Boolean);
        });
        it('Initializer only', () => {
            const p = lib_1.Reflector(MongoDB).property('books');
            expect(p.hasInterceptor()).toBe(false);
        });
        it('both', () => {
            const p = lib_1.Reflector(MongoDB).property('both');
            expect(p.hasInterceptor()).toBe(true);
        });
        it('Interceptor only', () => {
            const p = lib_1.Reflector(MongoDB).property('logs');
            expect(p.hasInterceptor()).toBe(true);
        });
        it('Interceptor only 2', () => {
            const p = lib_1.Reflector(MongoDB).property('logs2');
            expect(p.hasInterceptor()).toBe(true);
        });
        it('Interceptor only 3', () => {
            const p = lib_1.Reflector(MongoDB).property('logs2');
            expect(p.hasInterceptor()).toBe(true);
        });
        it('Interceptor only 4', () => {
            const p = lib_1.Reflector(MongoDB).property('books');
            expect(p.hasInterceptor()).toBe(false);
        });
        it('Initializer only 1', () => {
            const p = lib_1.Reflector(MongoDB).property('rnd1');
            expect(p.hasInterceptor()).toBe(true);
        });
    });
    describe('# should not able to', () => {
        it('get 3rd param for getter', () => {
            expect(lib_1.Reflector(MongoDB)
                .property('rnd1')
                .getParameters().length).toBe(0);
            expect(lib_1.Reflector(MongoDB)
                .property('rnd1')
                .getParameters()[0]).toBeUndefined();
        });
    });
});
