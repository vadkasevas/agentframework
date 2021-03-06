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
const MetadataAttribute_1 = require("../attributes/MetadataAttribute");
/**
 *   Constructor = 1,
 ConstructorParameter = 2,
 Field = 4,
 Method = 8,
 MethodParameter = 16,
 Getter = 32,
 Setter = 64
 */
const a = new MetadataAttribute_1.MetadataAttribute();
const AllTargets = lib_1.MemberKinds.Class | lib_1.MemberKinds.Parameter | lib_1.MemberKinds.Property;
describe('decorate() and All Target', () => {
    describe('# should able to', () => {
        it('decorate agent', () => {
            let MongoDB = class MongoDB {
                constructor(p1, p2) { }
                round(p1, p2) { }
                get dob() {
                    return new Date();
                }
                set date(d) {
                    console.log('set', d);
                }
            };
            __decorate([
                lib_1.decorate(a, AllTargets),
                __metadata("design:type", Date)
            ], MongoDB.prototype, "random", void 0);
            __decorate([
                lib_1.decorate(a, AllTargets),
                __param(1, lib_1.decorate(a, AllTargets)),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, Date]),
                __metadata("design:returntype", Object)
            ], MongoDB.prototype, "round", null);
            __decorate([
                lib_1.decorate(a, AllTargets),
                __metadata("design:type", Date),
                __metadata("design:paramtypes", [])
            ], MongoDB.prototype, "dob", null);
            __decorate([
                lib_1.decorate(a, AllTargets),
                __metadata("design:type", Date),
                __metadata("design:paramtypes", [Date])
            ], MongoDB.prototype, "date", null);
            MongoDB = __decorate([
                lib_1.decorate(a, AllTargets),
                __param(1, lib_1.decorate(a, AllTargets)),
                __metadata("design:paramtypes", [Number, Date])
            ], MongoDB);
            const MongoDB$ = lib_1.CreateAgent(MongoDB);
            expect(MongoDB$).not.toBe(MongoDB);
            expect(lib_1.IsAgent(MongoDB$)).toBeTruthy();
        });
        it('decorate class field 2', () => {
            function MongoDB() { }
            Reflect.defineProperty(MongoDB.prototype, 'random', { value: 1 });
            const descr = Reflect.getOwnPropertyDescriptor(MongoDB.prototype, 'random');
            // another kind of class and decorator
            lib_1.decorate(a, AllTargets)(MongoDB.prototype, 'random', descr);
        });
        it('not decorate agent', () => {
            let MongoDB = class MongoDB {
                constructor(p1, p2) { }
                round(p1, p2) { }
                get dob() {
                    return new Date();
                }
                set date(d) {
                    console.log('set', d);
                }
            };
            __decorate([
                lib_1.decorate(a, lib_1.MemberKinds.Property),
                __metadata("design:type", Date)
            ], MongoDB.prototype, "random", void 0);
            __decorate([
                lib_1.decorate(a, lib_1.MemberKinds.Property),
                __param(1, lib_1.decorate(a, lib_1.MemberKinds.Parameter)),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [String, Date]),
                __metadata("design:returntype", Object)
            ], MongoDB.prototype, "round", null);
            __decorate([
                lib_1.decorate(a, lib_1.MemberKinds.Property),
                __metadata("design:type", Date),
                __metadata("design:paramtypes", [])
            ], MongoDB.prototype, "dob", null);
            __decorate([
                lib_1.decorate(a, lib_1.MemberKinds.Property),
                __metadata("design:type", Date),
                __metadata("design:paramtypes", [Date])
            ], MongoDB.prototype, "date", null);
            MongoDB = __decorate([
                lib_1.decorate(a, lib_1.MemberKinds.Class),
                __param(1, lib_1.decorate(a, lib_1.MemberKinds.Parameter)),
                __metadata("design:paramtypes", [Number, Date])
            ], MongoDB);
            const MongoDB$ = lib_1.CreateAgent(MongoDB);
            expect(MongoDB$).not.toBe(MongoDB);
            expect(lib_1.IsAgent(MongoDB$)).toBeTruthy();
        });
    });
});
