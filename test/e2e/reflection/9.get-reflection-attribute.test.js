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
const RandomInterceptor_1 = require("../attributes/RandomInterceptor");
const RoundInterceptor_1 = require("../attributes/RoundInterceptor");
class MongoDB {
    connect() {
        return 'connected';
    }
}
__decorate([
    lib_1.decorateMember(new RandomInterceptor_1.RandomInterceptor()),
    __metadata("design:type", Object)
], MongoDB.prototype, "rnd1", void 0);
__decorate([
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MongoDB.prototype, "connect", null);
describe('Reflection get attribute ', () => {
    describe('# should able to', () => {
        it('get all attributes', () => {
            expect(lib_1.Reflector(MongoDB).getOwnAttributes().length).toBe(0);
        });
        it('check specified attribute', () => {
            expect(lib_1.Reflector(MongoDB)
                .property('connect')
                .hasOwnAttribute(RandomInterceptor_1.RandomInterceptor)).toBe(false);
        });
        it('check all attributes', () => {
            expect(lib_1.Reflector(MongoDB).hasOwnAttribute()).toBe(false);
        });
        it('check not attributes', () => {
            expect(lib_1.Reflector(MongoDB)
                .property('rnd1')
                .hasOwnAttribute()).toBe(true);
        });
    });
});
