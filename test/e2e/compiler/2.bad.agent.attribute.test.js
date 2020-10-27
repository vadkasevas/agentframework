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
class AgentBadInterceptorAttribute extends lib_1.AgentAttribute {
    beforeDecorate(target, targetKey, descriptor) {
        return true;
    }
    get interceptor() {
        return 1;
    }
}
describe('Compiler got Bad AgentAttribute', () => {
    describe('# should able to', () => {
        it('ignore bad agent', () => {
            const MongoDB$ = lib_1.CreateAgent(MongoDB, new AgentBadInterceptorAttribute());
            const m = new MongoDB$();
            expect(m instanceof MongoDB).toBe(true);
            expect(m instanceof MongoDB$).toBe(true);
            expect(Reflect.getPrototypeOf(m)).toBe(MongoDB$.prototype);
            expect(MongoDB$).toBe(MongoDB);
        });
    });
});
