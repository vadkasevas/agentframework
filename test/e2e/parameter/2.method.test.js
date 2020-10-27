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
        Connection.count++;
    }
}
Connection.count = 0;
class Database {
}
class TypeChecker {
    get interceptor() {
        return this;
    }
    intercept(target, parameters, receiver) {
        return target.invoke(parameters, receiver);
    }
}
class TypeFormatter {
    get interceptor() {
        return this;
    }
    intercept(target, parameters, receiver) {
        expect(receiver).toBeInstanceOf(Object);
        return target.invoke(Array.prototype.slice.call(parameters, 0), receiver);
    }
}
let MongoDB = class MongoDB {
    constructor(user) {
        // console.log('MongoDB(', arguments, ')');
        expect(arguments.length).toBe(1);
        expect(arguments[0]).toBe('test');
        this.user = user;
    }
    test11(db) {
        expect(arguments.length).toBe(1);
        expect(db).toBeTruthy();
        expect(db instanceof Database).toBeTruthy();
        return db;
    }
    test12(db) {
        expect(arguments.length).toBe(1);
        expect(db).toBeTruthy();
        expect(db instanceof Database).toBeTruthy();
        return db;
    }
    test21(db) {
        expect(arguments.length).toBe(1);
        expect(db).toBeTruthy();
        expect(db instanceof Database).toBeTruthy();
        return db;
    }
    test22(db) {
        expect(arguments.length).toBe(1);
        expect(db).toBeTruthy();
        expect(db instanceof Database).toBeTruthy();
        return db;
    }
};
__decorate([
    lib_1.decorateMember(new InjectAttribute_1.InjectAttribute()),
    __metadata("design:type", Connection)
], MongoDB.prototype, "connection", void 0);
__decorate([
    lib_1.decorateMember(new TypeChecker()),
    __param(0, lib_1.decorateParameter(new InjectAttribute_1.InjectAttribute())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Database]),
    __metadata("design:returntype", void 0)
], MongoDB.prototype, "test11", null);
__decorate([
    lib_1.decorateMember(new TypeChecker()),
    __param(0, lib_1.decorateParameter(new InjectAttribute_1.InjectAttribute())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Database]),
    __metadata("design:returntype", void 0)
], MongoDB.prototype, "test12", null);
__decorate([
    lib_1.decorateMember(new TypeFormatter()),
    lib_1.decorateMember(new TypeChecker()),
    __param(0, lib_1.decorateParameter(new InjectAttribute_1.InjectAttribute())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Database]),
    __metadata("design:returntype", void 0)
], MongoDB.prototype, "test21", null);
__decorate([
    lib_1.decorateMember(new TypeFormatter()),
    lib_1.decorateMember(new TypeChecker()),
    __param(0, lib_1.decorateParameter(new InjectAttribute_1.InjectAttribute())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Database]),
    __metadata("design:returntype", void 0)
], MongoDB.prototype, "test22", null);
MongoDB = __decorate([
    lib_1.agent(),
    __metadata("design:paramtypes", [String])
], MongoDB);
describe('Initializer for Method Parameter', () => {
    describe('# should able to', () => {
        it('create with injected connection', () => {
            // expect(Connection.count).toBe(0);
            const db = new MongoDB('test');
            expect(db).toBeTruthy();
            expect(db.user).toBe('test');
            expect(db.connection).toBeTruthy();
            expect(db.connection instanceof Connection).toBeTruthy();
            // console.log();
            // console.log('DB 1', db);
            // console.log('DB 2', Reflect.getPrototypeOf(db));
            // console.log('DB 2', Reflect.getPrototypeOf(Reflect.getPrototypeOf(db)));
            // console.log('DB 2', Reflect.getPrototypeOf(Reflect.getPrototypeOf(Reflect.getPrototypeOf(db))));
            // each db.connection will create a new instance
            expect(Connection.count).toBe(2);
        });
        it('call method with inspector and param initializer', () => {
            const db = new MongoDB('test');
            expect(db.test11()).toBeTruthy();
        });
        it('call method with inspector and param initializer', () => {
            const db = new MongoDB('test');
            expect(db.test12()).toBeTruthy();
        });
        it('call method with 2 inspectors and param initializer', () => {
            const db = new MongoDB('test');
            expect(db.test21()).toBeTruthy();
        });
        it('call method with 2 inspectors and param initializer', () => {
            const db = new MongoDB('test');
            expect(db.test22()).toBeTruthy();
        });
    });
});
