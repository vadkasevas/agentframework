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
const a = new MetadataAttribute_1.MetadataAttribute();
const noTarget = lib_1.MemberKinds.None;
describe('decorate() and Not Allowed Target', () => {
    describe('# should not able to', () => {
        it('decorate constructor', () => {
            expect(() => {
                let MongoDB = class MongoDB {
                };
                MongoDB = __decorate([
                    lib_1.decorate(a, noTarget)
                ], MongoDB);
                expect(MongoDB).toBeTruthy();
            }).toThrowError('MetadataAttribute is not allow decorate on class');
        });
        it('decorate class field', () => {
            expect(() => {
                class MongoDB {
                }
                __decorate([
                    lib_1.decorate(a, noTarget),
                    __metadata("design:type", Date)
                ], MongoDB.prototype, "random", void 0);
                expect(MongoDB).toBeTruthy();
            }).toThrowError('MetadataAttribute is not allow decorate on property');
        });
        it('decorate class non-function field', () => {
            expect(() => {
                function MongoDB() { }
                Reflect.defineProperty(MongoDB.prototype, 'random', { value: 1 });
                const descr = Reflect.getOwnPropertyDescriptor(MongoDB.prototype, 'random');
                // another kind of class and decorator
                lib_1.decorate(a, noTarget)(MongoDB.prototype, 'random', descr);
            }).toThrowError('MetadataAttribute is not allow decorate on property');
        });
        it('decorate constructor parameter', () => {
            expect(() => {
                let MongoDB = class MongoDB {
                    constructor(p1, p2) { }
                };
                MongoDB = __decorate([
                    __param(1, lib_1.decorate(a, noTarget)),
                    __metadata("design:paramtypes", [Number, Date])
                ], MongoDB);
                expect(MongoDB).toBeTruthy();
            }).toThrowError('MetadataAttribute is not allow decorate on constructor parameters');
        });
        it('decorate method', () => {
            expect(() => {
                class MongoDB {
                    round(p1, p2) { }
                }
                __decorate([
                    lib_1.decorate(a, noTarget),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [String, Date]),
                    __metadata("design:returntype", Object)
                ], MongoDB.prototype, "round", null);
                expect(MongoDB).toBeTruthy();
            }).toThrowError('MetadataAttribute is not allow decorate on property');
        });
        it('decorate method parameter', () => {
            expect(() => {
                class MongoDB {
                    round(p1, p2) { }
                }
                __decorate([
                    __param(1, lib_1.decorate(a, noTarget)),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [String, Date]),
                    __metadata("design:returntype", Object)
                ], MongoDB.prototype, "round", null);
                expect(MongoDB).toBeTruthy();
            }).toThrowError('MetadataAttribute is not allow decorate on method parameters');
        });
        it('decorate getter', () => {
            expect(() => {
                class MongoDB {
                    get dob() {
                        return new Date();
                    }
                }
                __decorate([
                    lib_1.decorate(a, noTarget),
                    __metadata("design:type", Date),
                    __metadata("design:paramtypes", [])
                ], MongoDB.prototype, "dob", null);
                expect(MongoDB).toBeTruthy();
            }).toThrowError('MetadataAttribute is not allow decorate on property');
        });
        it('decorate setter', () => {
            expect(() => {
                class MongoDB {
                    set date(d) {
                        console.log('set', d);
                    }
                }
                __decorate([
                    lib_1.decorate(a, noTarget),
                    __metadata("design:type", Date),
                    __metadata("design:paramtypes", [Date])
                ], MongoDB.prototype, "date", null);
                expect(MongoDB).toBeTruthy();
            }).toThrowError('MetadataAttribute is not allow decorate on property');
        });
    });
});
