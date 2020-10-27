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
/* tslint:disable */
const lib_2 = require("../../../lib");
const MetadataAttribute_1 = require("../attributes/MetadataAttribute");
class Connection {
    constructor() {
        this.state = 'offline';
        Connection.count++;
    }
}
Connection.count = 0;
let MongoDB = class MongoDB {
    constructor(conn) {
        if (conn) {
            this.connection = conn;
        }
    }
};
MongoDB = __decorate([
    lib_1.agent(),
    __param(0, lib_2.decorateParameter(new MetadataAttribute_1.MetadataAttribute())),
    __metadata("design:paramtypes", [Connection])
], MongoDB);
describe('Initializer in Parameter', () => {
    describe('# should able to', () => {
        it('detect agent', () => {
            expect(lib_2.IsAgent(MongoDB)).toBeTrue();
        });
        it('re-upgrade agent', () => {
            expect(lib_2.IsAgent(lib_2.CreateAgent(MongoDB))).toBeTrue();
        });
        it('new instance', () => {
            const db = new MongoDB();
            expect(db instanceof MongoDB).toBe(true);
        });
        it('construct instance', () => {
            const db = Reflect.construct(MongoDB, []);
            expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
            expect(db instanceof MongoDB).toBe(true);
        });
        it('get inject attribute', () => {
            const items = lib_2.Reflector(MongoDB)
                .getParameters()[0]
                .getOwnAttributes(MetadataAttribute_1.MetadataAttribute);
            expect(items.length).toBe(1);
        });
    });
    describe('# should not able to', () => {
        it('get injected value', () => {
            const db = new MongoDB();
            expect(db.connection).toBeUndefined();
        });
    });
});
