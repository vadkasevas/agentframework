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
const DisabledMetadataAttribute_1 = require("../attributes/DisabledMetadataAttribute");
class BadAgentAttribute extends lib_1.AgentAttribute {
    get interceptor() {
        return 1;
    }
}
class BadAgentAttribute2 extends lib_1.AgentAttribute {
    get interceptor() {
        return undefined;
    }
}
let MongoDB = class MongoDB {
    constructor() { }
    connect() {
        return 'connected';
    }
};
MongoDB = __decorate([
    lib_1.decorateClass(new BadAgentAttribute()),
    __metadata("design:paramtypes", [])
], MongoDB);
let MySQL = class MySQL {
    constructor() { }
    connect() {
        return 'connected';
    }
};
MySQL = __decorate([
    lib_1.decorateClass(new BadAgentAttribute2()),
    __metadata("design:paramtypes", [])
], MySQL);
const Redis = (function () {
    return class {
    };
})();
describe('Decorate Agent', () => {
    describe('# MongoDB should able to', () => {
        it('detect agent', () => {
            expect(lib_1.IsAgent(MongoDB)).toBe(false);
        });
        it('re-upgrade agent', () => {
            expect(lib_1.CreateAgent(MongoDB, new BadAgentAttribute())).toBe(MongoDB);
        });
        it('upgrade agent with not attribute', () => {
            let SQLServer = class SQLServer {
            };
            SQLServer = __decorate([
                lib_1.decorateClass(new DisabledMetadataAttribute_1.DisabledMetadataAttribute())
            ], SQLServer);
            const SQL = lib_1.CreateAgent(SQLServer, new lib_1.AgentAttribute());
            expect(lib_1.IsAgent(SQL)).toBe(true);
        });
        it('new instance', () => {
            const db = new MongoDB();
            expect(db instanceof MongoDB).toBe(true);
            expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
        });
        it('new instance without name', () => {
            expect(() => {
                lib_1.CreateAgent(Redis);
            }).toThrowError('InvalidConstructor');
        });
        it('construct instance', () => {
            const db = Reflect.construct(MongoDB, []);
            expect(db instanceof MongoDB).toBe(true);
            expect(Reflect.getPrototypeOf(db)).toBe(MongoDB.prototype);
        });
    });
    describe('# MongoDB2 should able to', () => {
        it('detect agent', () => {
            expect(lib_1.IsAgent(MySQL)).toBe(false);
        });
        it('re-upgrade agent', () => {
            expect(lib_1.CreateAgent(MySQL, new BadAgentAttribute())).toBe(MySQL);
        });
        it('new instance', () => {
            const db = new MySQL();
            expect(db instanceof MySQL).toBe(true);
            expect(Reflect.getPrototypeOf(db)).toBe(MySQL.prototype);
        });
        it('construct instance', () => {
            const db = Reflect.construct(MySQL, []);
            expect(db instanceof MySQL).toBe(true);
            expect(Reflect.getPrototypeOf(db)).toBe(MySQL.prototype);
        });
    });
    describe('# should not able to', () => {
        it('get agent attribute', () => {
            const items = lib_1.Reflector(MySQL).getOwnAttributes(lib_1.AgentAttribute);
            expect(items.length).toBe(1);
        });
    });
});
