"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainKnowledge = void 0;
const core_1 = require("../../dependencies/core");
/**
 * Knowledge of domain
 */
class DomainKnowledge {
    // key: Constructor | instance, value: Owner Domain
    static get domains() {
        return core_1.memorize(this, 'domains');
    }
    // key: Original Constructor, value: Agent Constructor
    static get agents() {
        return core_1.memorize(this, 'agents');
    }
    // key: Domain & Original Constructor, value: Domain Agent Constructor
    static get domainAgents() {
        return core_1.memorize(this, 'domainAgents');
    }
    // key: string, value: Constructor
    static get extensibles() {
        return core_1.memorize(this, 'extensibles', Map);
    }
    // key: class
    static get initializers() {
        return core_1.memorize(this, 'initializers');
    }
    static GetLocalDomain(domainType) {
        if (this.domain) {
            return this.domain;
        }
        const domain = Reflect.construct(domainType, []);
        this.domain = domain;
        return domain;
    }
    static GetAgent(type) {
        return this.agents.get(type);
    }
    static RememberAgent(type, agent) {
        this.agents.set(type, agent);
    }
    static GetDomain(key) {
        return this.domains.get(key);
    }
    static RememberDomain(key, domain) {
        this.domains.set(key, domain);
    }
    /**
     * Domain agent cache
     */
    static GetDomainAgent(domain, type) {
        // map for all domain specified types
        const types = this.domainAgents.get(domain);
        return types && types.get(type);
    }
    /**
     * Domain agent cache
     */
    static RememberDomainAgent(domain, type, agent) {
        let types = this.domainAgents.get(domain);
        if (!types) {
            types = new Map();
            this.domainAgents.set(domain, types);
        }
        types.set(type, agent);
        types.set(agent, agent);
        // make reverse query easy
        DomainKnowledge.RememberDomain(agent, domain);
    }
    static GetExtensible(key) {
        return this.extensibles.get(key) || undefined;
    }
    static SetExtensible(key, type) {
        this.extensibles.set(key, type);
        return type;
    }
    static HasInitializer(type) {
        return this.initializers.has(type);
    }
    static GetInitializers(type) {
        return this.initializers.get(type);
    }
    static SetInitializers(type, ctor) {
        // console.log('cache', type, typeof type, '====>', ctor);
        this.initializers.set(type, ctor);
    }
}
exports.DomainKnowledge = DomainKnowledge;
