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
        this.state = 'offline';
        expect(typeof arguments[0]).toBe('string');
        // console.log('Connection(', arguments[0], ')');
        Connection.count++;
    }
}
Connection.count = 0;
let MongoDB = class MongoDB {
    constructor(user, conn) {
        expect(conn instanceof Connection).toBeTruthy();
        // console.log('MongoDB(', arguments, ')');
        this.user = user;
        if (conn) {
            this.connection = conn;
        }
    }
};
MongoDB = __decorate([
    lib_1.agent(),
    __param(1, lib_1.decorateParameter(new InjectAttribute_1.InjectAttribute())),
    __metadata("design:paramtypes", [String, Connection])
], MongoDB);
let Redis = class Redis {
    constructor(user, conn1, conn2) {
        expect(conn1 instanceof Connection).toBeTruthy();
        expect(conn2 instanceof Connection).toBeTruthy();
        expect(conn1).not.toBe(conn2);
        // console.log('Redis(', arguments, ')');
        this.user = user;
    }
};
Redis = __decorate([
    lib_1.agent(),
    __param(1, lib_1.decorateParameter(new InjectAttribute_1.InjectAttribute())),
    __param(2, lib_1.decorateParameter(new InjectAttribute_1.InjectAttribute())),
    __metadata("design:paramtypes", [String, Connection,
        Connection])
], Redis);
describe('Initializer for Constructor Parameter', () => {
    describe('# should able to', () => {
        it('create with injected connection', () => {
            expect(Connection.count).toBe(0);
            const db = new MongoDB('test', 'default');
            expect(db).toBeTruthy();
            expect(db.user).toBe('test');
            expect(db.connection).toBeTruthy();
            expect(db.connection instanceof Connection).toBeTruthy();
            expect(Connection.count).toBe(1);
        });
        it('create with 2 injected connection', () => {
            const db = new Redis('test', 'default', 'default2');
            expect(db).toBeTruthy();
        });
    });
});
