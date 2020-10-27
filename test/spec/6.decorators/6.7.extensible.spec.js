"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
describe('6.7. @extensible decorator', () => {
    describe('# should able to', () => {
        it('create extensible class', () => {
            let NoUser = class NoUser {
                constructor() {
                    this.id = 1;
                }
            };
            NoUser = __decorate([
                lib_1.extensible()
            ], NoUser);
            expect(NoUser).toBeDefined();
            const u = new NoUser();
            expect(u).toBeInstanceOf(NoUser);
            expect(u.id).toBe(1);
        });
        it('create extensible class', () => {
            let NoUser = class NoUser {
                constructor() {
                    this.id = 2;
                }
            };
            NoUser = __decorate([
                lib_1.extensible()
            ], NoUser);
            expect(NoUser).toBeDefined();
            const u = new NoUser();
            expect(u).toBeInstanceOf(NoUser);
            expect(u.id).toBe(1);
        });
    });
});
