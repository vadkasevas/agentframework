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
const AgentChecker_1 = require("../attributes/AgentChecker");
let MongoDB = class MongoDB {
    connect() {
        return 'connected';
    }
    round() { }
};
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
MongoDB = __decorate([
    lib_1.agent(),
    lib_1.decorateClass(new AgentChecker_1.AgentChecker())
], MongoDB);
describe('Decorate Class', () => {
    describe('# should able to', () => {
        it('detect agent', () => {
            expect(lib_1.IsAgent(MongoDB)).toBe(true);
        });
        it('re-upgrade agent', () => {
            expect(lib_1.GetType(lib_1.CreateAgent(MongoDB))).not.toBe(MongoDB);
        });
        it('new instance', () => {
            const db = new MongoDB();
            expect(db instanceof MongoDB).toBe(true);
            expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
        });
        it('construct instance', () => {
            const db = Reflect.construct(MongoDB, []);
            expect(db instanceof MongoDB).toBe(true);
            expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
        });
    });
    describe('# should not able to', () => {
        it('get agent attribute', () => {
            const items = lib_1.Reflector(MongoDB).getOwnAttributes(lib_1.AgentAttribute);
            expect(items.length).toBe(0);
        });
    });
});
