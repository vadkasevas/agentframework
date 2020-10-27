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
/* tslint:disable */
const lib_1 = require("../../../lib");
const AgentChecker_1 = require("../attributes/AgentChecker");
const RandomInterceptor_1 = require("../attributes/RandomInterceptor");
const RoundInterceptor_1 = require("../attributes/RoundInterceptor");
const MetadataAttribute_1 = require("../attributes/MetadataAttribute");
let Veicle = class Veicle {
    light(name) {
        console.log('turn on', name);
    }
    round() { }
};
__decorate([
    lib_1.decorateMember(new RandomInterceptor_1.RandomInterceptor()),
    __metadata("design:type", Date)
], Veicle.prototype, "random", void 0);
__decorate([
    lib_1.decorateMember(new RandomInterceptor_1.RandomInterceptor()),
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Object)
], Veicle.prototype, "both", void 0);
__decorate([
    lib_1.decorateMember(new MetadataAttribute_1.MetadataAttribute()),
    __metadata("design:type", Object)
], Veicle.prototype, "metadata", void 0);
__decorate([
    lib_1.decorateMember(new RoundInterceptor_1.RoundInterceptor()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], Veicle.prototype, "round", null);
Veicle = __decorate([
    lib_1.agent(),
    lib_1.decorateClass(new AgentChecker_1.AgentChecker())
], Veicle);
class Car extends Veicle {
    start() {
        console.log('start');
    }
}
__decorate([
    lib_1.decorateMember(new RandomInterceptor_1.RandomInterceptor()),
    __metadata("design:type", Date)
], Car.prototype, "random2", void 0);
// z
//     // const f1 = 'f1';
//     // const o1 = { f1 };
//     // Object.setPrototypeOf(o1, A1.prototype);
//     // return Reflect.construct(A.prototype.constructor, [], A1);
//   }
//   class A {
// }
//
// class B extends A1 {
//   f2: string;
//   constructor() {
//     super();
//     this.f2 = 'f2';
//   }
// }
//
// class B1 extends B {
//   constructor() {
//     const prev = super();
//
//     return prev;
//     // const prev = super()
//     // return Reflect.construct(B.prototype.constructor, arguments, prev);
//
//     // return Reflect.construct(B.prototype.constructor, [], B1);
//   }
// }
describe('Nested Agent', () => {
    describe('# should able to', () => {
        it('create nested agent', () => {
            const car = new Car();
            expect(car).toBeTruthy();
        });
        it('get super field', () => {
            const car = new Car();
            expect(typeof car.random).toBe('number');
        });
        it('decorate agent twice', () => {
            const NewCar = lib_1.CreateAgent(Car);
            expect(lib_1.IsAgent(NewCar)).toBeTruthy();
        });
        it('get agent local field', () => {
            const NewCar = lib_1.CreateAgent(Car);
            const car = new NewCar();
            expect(typeof car.random2).toBe('number');
        });
    });
    describe('# should not able to', () => {
        it('get local field', () => {
            const car = new Car();
            expect(typeof car.random2).toBe('undefined');
        });
    });
});
