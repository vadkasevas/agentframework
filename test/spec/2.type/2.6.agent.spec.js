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
class InjectAttribute {
    constructor(type) {
        this.type = type;
    }
    get interceptor() {
        return this;
    }
    intercept(target, params, receiver) {
        return target.invoke(params, receiver);
    }
}
function inject(type) {
    return lib_1.decorate(new InjectAttribute(type));
}
class Data {
}
describe('2.6. Agent', () => {
    describe('# should able to', () => {
        it('upgrade type to agent', () => {
            let Agent261 = class Agent261 {
            };
            Agent261 = __decorate([
                lib_1.agent()
            ], Agent261);
            expect(Agent261).toBeDefined();
        });
        it('upgrade type with constructor parameter', () => {
            let Agent262 = class Agent262 {
                constructor(data1, data2) { }
            };
            Agent262 = __decorate([
                lib_1.agent(),
                __param(0, inject(Data)), __param(1, inject()),
                __metadata("design:paramtypes", [Object, Data])
            ], Agent262);
            expect(Agent262).toBeDefined();
        });
        it('upgrade type with member', () => {
            let Agent263 = class Agent263 {
                data3() { }
            };
            __decorate([
                inject(Data),
                __metadata("design:type", Object)
            ], Agent263.prototype, "data1", void 0);
            __decorate([
                inject(),
                __metadata("design:type", Data)
            ], Agent263.prototype, "data2", void 0);
            __decorate([
                inject(Data),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], Agent263.prototype, "data3", null);
            Agent263 = __decorate([
                lib_1.agent()
            ], Agent263);
            expect(Agent263).toBeDefined();
        });
        it('upgrade type with member parameter', () => {
            let Agent264 = class Agent264 {
                data3(data) { }
                data4(data) { }
                data5(data1, data2) { }
            };
            __decorate([
                inject(Data),
                __metadata("design:type", Object)
            ], Agent264.prototype, "data1", void 0);
            __decorate([
                inject(),
                __metadata("design:type", Data)
            ], Agent264.prototype, "data2", void 0);
            __decorate([
                inject(Data),
                __param(0, inject(Data)),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], Agent264.prototype, "data3", null);
            __decorate([
                inject(Data),
                __param(0, inject()),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Data]),
                __metadata("design:returntype", void 0)
            ], Agent264.prototype, "data4", null);
            __decorate([
                inject(Data),
                __param(0, inject()), __param(1, inject(Data)),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Data, Object]),
                __metadata("design:returntype", void 0)
            ], Agent264.prototype, "data5", null);
            Agent264 = __decorate([
                lib_1.agent()
            ], Agent264);
            expect(Agent264).toBeDefined();
        });
    });
});
