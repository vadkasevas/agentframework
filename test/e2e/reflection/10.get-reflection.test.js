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
const MetadataAttribute_1 = require("../attributes/MetadataAttribute");
class MongoDB {
    round() { }
}
__decorate([
    lib_1.decorateMember(new RandomInterceptor_1.RandomInterceptor()),
    __metadata("design:type", Date)
], MongoDB.prototype, "random", void 0);
__decorate([
    lib_1.decorateMember(new RandomInterceptor_1.RandomInterceptor()),
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Object)
], MongoDB.prototype, "both", void 0);
__decorate([
    lib_1.decorateMember(new MetadataAttribute_1.MetadataAttribute()),
    __metadata("design:type", Object)
], MongoDB.prototype, "metadata", void 0);
__decorate([
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], MongoDB.prototype, "round", null);
// class Influx {
//   @decorateClassMember(new MetadataAttribute())
//   metadata!: Date;
// }
class Redis {
}
__decorate([
    lib_1.decorateMember(new RandomInterceptor_1.RandomInterceptor()),
    __metadata("design:type", Date)
], Redis.prototype, "random", void 0);
class MySQL {
    round() { }
}
__decorate([
    lib_1.decorateMember(new RandomInterceptor_1.RandomInterceptor()),
    __metadata("design:type", Date)
], MySQL.prototype, "random", void 0);
__decorate([
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], MySQL.prototype, "round", null);
class SQLServer {
    round() { }
}
__decorate([
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], SQLServer.prototype, "round", null);
describe('Reflection', () => {
    describe('# should able to', () => {
        it('get class prototype', () => {
            expect(lib_1.Reflector(MongoDB).type.prototype).toBe(MongoDB.prototype);
        });
    });
    describe('# should not able to', () => {
        it('get agent attribute', () => {
            expect(lib_1.Reflector(MongoDB).getOwnAttributes(lib_1.AgentAttribute).length).toBe(0);
        });
        it('get agent target', () => {
            expect(lib_1.Reflector(MongoDB).type).toBe(MongoDB.prototype.constructor);
        });
        it('get agents', () => {
            expect(lib_1.Reflector(MongoDB).getOwnProperties().length).toBe(4);
        });
        it('get agents', () => {
            expect(lib_1.Reflector(MongoDB).findOwnProperties(p => p.hasInterceptor()).length).toBe(3);
        });
        // it('get no agents', () => {
        //   expect(Reflector(MongoDB).findOwnProperties(p => p.hasParameterInterceptor()).length).toBe(0);
        // });
        // it('get metadata', () => {
        //   expect(Reflector(Influx).hasOwnMetadata()).toBeFalse();
        // });
        it('get Initializer', () => {
            // expect(Reflector(Redis).hasOwnMetadata()).toBeFalse();
            expect(lib_1.Reflector(Redis).hasInterceptor()).toBeFalse();
            // expect(Reflector(Redis).hasParameterInterceptor()).toBeFalse();
        });
        it('get Interceptor', () => {
            // expect(Reflector(SQLServer).hasOwnMetadata()).toBeFalse();
            expect(lib_1.Reflector(SQLServer).hasInterceptor()).toBeFalse();
            // expect(Reflector(SQLServer).hasParameterInterceptor()).toBeFalse();
        });
        it('get Altered', () => {
            // expect(Reflector(MySQL).hasOwnMetadata()).toBeFalse();
            expect(lib_1.Reflector(MySQL).hasInterceptor()).toBeFalse();
            // expect(Reflector(MySQL).hasParameterInterceptor()).toBeFalse();
        });
    });
});
