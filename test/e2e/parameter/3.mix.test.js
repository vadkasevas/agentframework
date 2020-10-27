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
const InjectAttribute_1 = require("../attributes/InjectAttribute");
class Connection {
    constructor() {
        // expect(arguments.length).toBe(2);
        // expect(arguments[0]).toBe('test');
        // expect(arguments[1]).toBe('default');
        // // console.log('Connection(', arguments[0], ')');
        // expect(Array.prototype.slice.call(arguments, 0)).toEqual(['test', 'default']);
        this.state = 'offline';
        Connection.count++;
    }
}
Connection.count = 0;
class Database {
    constructor() {
        this.state = 'offline';
        // console.log('Database(', arguments, ')');
        // expect(arguments.length).toBe(2);
        // expect(arguments[0]).toBe('test');
        // expect(arguments[1]).toBe('default');
        // expect(arguments[1] instanceof Connection).toBeTruthy();
        Database.count++;
    }
}
Database.count = 0;
let MongoDB = class MongoDB {
    constructor(user, conn) {
        // expect(arguments.length).toBe(2);
        // expect(user).toBe('test');
        // expect(conn).toBeTruthy();
        // expect(conn instanceof Connection).toBeTruthy();
        // console.log('MongoDB(', arguments, ')');
        this.user = user;
        if (conn) {
            this.connection = conn;
        }
    }
};
__decorate([
    lib_1.decorateMember(new InjectAttribute_1.InjectAttribute()),
    __metadata("design:type", Database)
], MongoDB.prototype, "database", void 0);
MongoDB = __decorate([
    lib_1.agent(),
    __param(1, lib_1.decorateParameter(new InjectAttribute_1.InjectAttribute())),
    __metadata("design:paramtypes", [String, Connection])
], MongoDB);
describe('Initializer for Constructor Parameter', () => {
    describe('# should able to', () => {
        // it('create with injected connection', () => {
        //   expect(Connection.count).toBe(0);
        //   const db = new MongoDB('test', 'default' as any);
        //   expect(db).toBeTruthy();
        //   expect(db.user).toBe('test');
        //   expect(db.connection).toBeTruthy();
        //   expect(db.connection).toBeInstanceOf(Connection);
        //   expect(Connection.count).toBe(1);
        // });
        it('create with injected database', () => {
            expect(Database.count).toBe(0);
            const db = new MongoDB('test', 'default');
            expect(db.database).toBeTruthy();
            expect(db.database instanceof Database).toBeTruthy();
            expect(Database.count).toBe(2);
        });
    });
});
