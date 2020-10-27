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
const InjectAttribute_1 = require("../attributes/InjectAttribute");
let PostgreSQL = class PostgreSQL {
    constructor() {
        this.connection = 1;
    }
};
__decorate([
    lib_1.decorateMember(new InjectAttribute_1.InjectAttribute()),
    __metadata("design:type", Number)
], PostgreSQL.prototype, "connection", void 0);
PostgreSQL = __decorate([
    lib_1.agent()
], PostgreSQL);
describe('Invalid Initializer', () => {
    describe('# should able to', () => {
        it('detect agent', () => {
            expect(lib_1.IsAgent(PostgreSQL)).toBeTrue();
        });
        it('re-upgrade agent', () => {
            expect(lib_1.IsAgent(lib_1.CreateAgent(PostgreSQL))).toBeTrue();
        });
        it('get inject attribute', () => {
            const type = lib_1.Reflector(PostgreSQL);
            const items = type.property('connection').getOwnAttributes(InjectAttribute_1.InjectAttribute);
            expect(items.length).toBe(1);
        });
        it('new instance', () => {
            const db = new PostgreSQL();
            expect(db instanceof PostgreSQL).toBe(true);
        });
        it('construct instance', () => {
            const db = Reflect.construct(PostgreSQL, []);
            expect(Reflect.getPrototypeOf(db)).toBe(PostgreSQL.prototype);
            expect(db instanceof PostgreSQL).toBe(true);
        });
        it('get original value (not injected)', () => {
            const db = new PostgreSQL();
            // console.log('DB 0', Reflect.getOwnPropertyDescriptor(db, 'connection'));
            // const s1: any = Reflect.getOwnPropertyDescriptor(db.constructor.prototype, 'connection');
            // console.log('DB 1', s1.get.toString());
            // console.log('DB 1', s1.set.toString());
            // const s2: any = Reflect.getOwnPropertyDescriptor(Reflect.getPrototypeOf(db.constructor.prototype), 'connection');
            // console.log('DB 2', s2.get.toString());
            // console.log('DB 2', s2.set.toString());
            expect(db.connection).toBe(1);
        });
    });
});
