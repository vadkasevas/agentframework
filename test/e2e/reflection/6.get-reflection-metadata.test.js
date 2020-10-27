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
const OnDemandTypeInfo_1 = require("../../../src/core/Core/Reflection/OnDemandTypeInfo");
const NotSupportedError_1 = require("../../../src/core/Core/Error/NotSupportedError");
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
describe('Reflection get metadata ', () => {
    describe('# should able to', () => {
        it('search by feature', () => {
            expect(lib_1.Reflector(MongoDB).property('rnd2').type).toBeUndefined();
        });
    });
    describe('# should no able to', () => {
        it('new Reflector', () => {
            const fn = lib_1.Reflector;
            expect(new fn(MongoDB)).toBeInstanceOf(OnDemandTypeInfo_1.OnDemandTypeInfo);
        });
        it('Reflector number', () => {
            expect(() => {
                lib_1.Reflector(1);
            }).toThrowError(NotSupportedError_1.NotSupportedError, 'Reflector(number) is not supported');
        });
        it('Reflector null', () => {
            expect(() => {
                lib_1.Reflector(null);
            }).toThrowError(NotSupportedError_1.NotSupportedError, 'Reflector(null) is not supported');
        });
        it('Reflector object', () => {
            expect(() => {
                lib_1.Reflector({});
            }).toThrowError(lib_1.NotImplementedError, 'Reflector(Object {}) is not implemented yet');
        });
        it('Reflector static', () => {
            expect(lib_1.Reflector(MongoDB).static.type).toBe(MongoDB);
        });
        it('Reflector class prototype', () => {
            expect(lib_1.Reflector(MongoDB.prototype)).toBe(lib_1.Reflector(MongoDB));
        });
        it('Reflector prototype ', () => {
            expect(lib_1.Reflector(MongoDB).prototype).toBe(lib_1.Reflector(MongoDB));
        });
        it('Reflector instance', () => {
            const m = new MongoDB();
            expect(() => {
                lib_1.Reflector(m);
            }).toThrowError(lib_1.NotImplementedError, 'Reflector(MongoDB {}) is not implemented yet');
        });
    });
});
