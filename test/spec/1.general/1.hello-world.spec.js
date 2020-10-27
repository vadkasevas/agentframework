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
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
describe('Hello world!', () => {
    describe('# should able to', () => {
        it('run homepage example using @agent decorator', () => {
            class ComponentA {
                constructor() {
                    this.name = 'Agent Framework';
                }
            }
            // @agent decorator will upgrade this class to an agent
            // without @agent decorator the @transit will take no effect
            let ProjectA = class ProjectA {
            };
            __decorate([
                lib_1.transit(),
                __metadata("design:type", ComponentA)
            ], ProjectA.prototype, "component", void 0);
            ProjectA = __decorate([
                lib_1.agent()
            ], ProjectA);
            const project = new ProjectA();
            expect(project).toBeInstanceOf(ProjectA);
            expect(project.component.name).toBe('Agent Framework');
        });
        it('run homepage example using domain api', () => {
            class ComponentA {
                constructor() {
                    this.name = 'Agent Framework';
                }
            }
            class ProjectA {
            }
            __decorate([
                lib_1.transit(),
                __metadata("design:type", ComponentA)
            ], ProjectA.prototype, "component", void 0);
            const domain = new lib_1.InMemoryDomain();
            const project = domain.construct(ProjectA);
            expect(project).toBeInstanceOf(ProjectA);
            expect(project.component.name).toBe('Agent Framework');
        });
        it('run homepage example using CreateAgent api', () => {
            class ComponentA {
                constructor() {
                    this.name = 'Agent Framework';
                }
            }
            class ProjectA {
            }
            __decorate([
                lib_1.transit(),
                __metadata("design:type", ComponentA)
            ], ProjectA.prototype, "component", void 0);
            // CreateAgent() will upgrade ProjectA class to an agent
            // so the @transit will take effects
            // CreateAgent won't create any domain. so @singleton will not work in this example.
            const ProjectA$ = lib_1.CreateAgent(ProjectA);
            const project = new ProjectA$();
            expect(project).toBeInstanceOf(ProjectA);
            expect(project.component.name).toBe('Agent Framework');
        });
    });
});
