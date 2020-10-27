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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
const lib_2 = require("../../../lib");
const lib_3 = require("../../../lib");
describe('4.4. constructor parameter interceptor', () => {
    describe('# should able to', () => {
        it('intercept class constructor', () => {
            let Class411 = class Class411 {
                constructor(a) {
                    this.a = a;
                }
            };
            Class411 = __decorate([
                lib_1.agent(),
                lib_2.decorateClass({
                    interceptor: {
                        intercept(target, params, receiver) {
                            return target.invoke(params, receiver);
                        }
                    }
                }),
                __param(0, lib_3.decorateParameter({
                    interceptor: {
                        intercept(target, params, receiver) {
                            return Math.floor(params[target.design.index]);
                        }
                    }
                })),
                __metadata("design:paramtypes", [Number])
            ], Class411);
            const instance = new Class411(3.5);
            expect(instance).toBeInstanceOf(Class411);
            expect(instance.a).toBe(3);
        });
    });
});
