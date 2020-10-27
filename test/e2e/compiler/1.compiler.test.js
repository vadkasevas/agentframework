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
const AgentTrackerAttribute_1 = require("../attributes/AgentTrackerAttribute");
class Connection {
    constructor() {
        this.state = 'offline';
        Connection.count++;
    }
}
Connection.count = 0;
class Database {
}
__decorate([
    lib_1.decorateMember(new InjectAttribute_1.InjectAttribute()),
    __metadata("design:type", Connection)
], Database.prototype, "connection", void 0);
class MongoDB extends Database {
    run(cmd) {
        return 8.5;
    }
}
let MySQL = class MySQL extends Database {
    run(cmd) {
        return 3.1;
    }
};
MySQL = __decorate([
    lib_1.agent()
], MySQL);
class Redis extends Database {
    run(cmd) {
        return 1.9;
    }
}
describe('Compiler', () => {
    describe('# should able to', () => {
        it('create using factory', () => {
            const MongoDB$ = lib_1.CreateAgent(MongoDB);
            const db = new MongoDB$();
            expect(db).toBeInstanceOf(MongoDB);
            expect(db).toBeInstanceOf(MongoDB$);
            expect(Reflect.getPrototypeOf(db)).toBe(MongoDB$.prototype);
            expect(Reflect.getPrototypeOf(MongoDB$.prototype)).toBe(MongoDB.prototype);
        });
        it('create using custom factory', () => {
            const MongoDB$ = lib_1.CreateAgent(MongoDB, new AgentTrackerAttribute_1.AgentTrackerAttribute());
            expect(lib_1.IsAgent(MongoDB$)).toBeFalse();
            const db = new MongoDB$();
            expect(db).toBeInstanceOf(MongoDB);
            expect(db).toBeInstanceOf(MongoDB$);
        });
        it('create using decorator', () => {
            const MySQL$ = lib_1.CreateAgent(MySQL);
            expect(lib_1.IsAgent(MySQL$)).toBeTrue();
            const db = new MySQL$();
            expect(db).not.toBeInstanceOf(MySQL);
            expect(db).toBeInstanceOf(MySQL$);
        });
        it('create using custom decorator', () => {
            const Redis$ = lib_1.CreateAgent(Redis, new AgentTrackerAttribute_1.AgentTrackerAttribute());
            const db = new Redis$();
            expect(db).toBeInstanceOf(Redis);
            expect(db).toBeInstanceOf(Redis$);
            expect(Redis$).toBe(Redis);
        });
    });
});
