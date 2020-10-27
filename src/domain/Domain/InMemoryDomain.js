"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDomain = void 0;
const ConstructDomainAgent_1 = require("./Factory/ConstructDomainAgent");
const TypeNotFoundError_1 = require("./Errors/TypeNotFoundError");
const AgentNotFoundError_1 = require("./Errors/AgentNotFoundError");
// import { InitializeDomainAgent } from './Factory/InitializeDomainAgent';
const Domain_1 = require("./Domain");
const IsPromise_1 = require("./Helpers/IsPromise");
const IsObservable_1 = require("./Helpers/IsObservable");
/**
 * In memory domain
 */
class InMemoryDomain extends Domain_1.Domain {
    /**
     * Default constructor for this domain
     */
    constructor() {
        super();
        // privates
        /**
         * Unique types in this domain
         */
        this._types = new Map(); // type-type mapping
        this._agents = new Map(); // type-instance mapping
        this._pendingAgents = new Map();
    }
    /**
     * Check if have agent
     */
    hasAgent(type) {
        return this._agents.has(type);
    }
    /**
     * Get agent of giving type, return undefined if don't have
     */
    getAgent(type) {
        return this._agents.has(type) ? this._agents.get(type) : undefined;
    }
    /**
     * Get agent of giving type, throw an error if don't have
     */
    getAgentOrThrow(type) {
        const agent = this.getAgent(type);
        if (!agent) {
            throw new AgentNotFoundError_1.AgentNotFoundError(type);
        }
        return agent;
    }
    /**
     * Check if have type registered
     */
    hasType(type) {
        return this._types.has(type);
    }
    /**
     * Get constructor for current type, return undefined if don't have
     */
    getType(type) {
        return this._types.has(type) ? this._types.get(type) : undefined;
    }
    /**
     * Get constructor for current type, throw an error if don't have
     */
    getTypeOrThrow(type) {
        const resolvedType = this.getType(type);
        if (!resolvedType) {
            throw new TypeNotFoundError_1.TypeNotFoundError(type);
        }
        return resolvedType;
    }
    //region Factory
    /**
     * Inject an agent
     */
    construct(target, params, transit) {
        if (!transit) {
            const exists = this.getAgent(target);
            if (exists !== undefined) {
                return exists;
            }
        }
        // find extended type
        const type = this.getType(target) || target;
        // console.log('construct', target.name, 'from', type.name);
        const agent = ConstructDomainAgent_1.ConstructDomainAgent(this, type, params || []);
        // console.log('AGENT ====>', agent.constructor.name);
        // note: to prevent human mistake
        // do not allow construct promise or observable using constructor
        if (IsPromise_1.IsPromise(agent)) {
            // drop agent
            throw new Error('NotSupportPromiseConstructor');
        }
        if (IsObservable_1.IsObservable(agent)) {
            throw new Error('NotSupportObservableConstructor');
        }
        // no need register instance with domain
        // DomainCore.SetDomain(agent, this);
        if (!transit) {
            // register agent to domain only if not transit
            this.addAgent(type, agent);
        }
        // InitializeDomainAgent(type, agent);
        return agent;
    }
    /**
     * Resolve and inject an agent using factory method
     */
    resolve(target, params, transit) {
        try {
            if (!transit) {
                const exists = this.getAgent(target);
                if (exists !== undefined) {
                    return Promise.resolve(exists);
                }
                const pending = this._pendingAgents.get(target);
                if (IsPromise_1.IsPromise(pending)) {
                    return pending;
                }
            }
            // find extended type
            const type = this.getType(target) || target;
            const newCreated = ConstructDomainAgent_1.ConstructDomainAgent(this, type, params || []);
            if (IsPromise_1.IsPromise(newCreated)) {
                if (!transit) {
                    this._pendingAgents.set(type, newCreated);
                }
                return newCreated.then((newCreatedAgent) => {
                    // no need register instance with domain
                    // DomainCore.SetDomain(newCreatedAgent, this);
                    if (!transit) {
                        this.addAgent(type, newCreatedAgent);
                        this._pendingAgents.delete(type);
                    }
                    // InitializeDomainAgent(type, newCreatedAgent);
                    return newCreatedAgent;
                }, (err) => {
                    if (!transit) {
                        this._pendingAgents.delete(type);
                    }
                    throw err;
                });
            }
            else if (IsObservable_1.IsObservable(newCreated)) {
                // TODO: add observable support later version
                throw new Error('NotSupportObservableConstructor');
            }
            else {
                // no need register instance with domain
                // DomainCore.SetDomain(newCreated, this);
                if (!transit)
                    this.addAgent(type, newCreated);
                // InitializeDomainAgent(type, newCreated);
                return Promise.resolve(newCreated);
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }
    //endregion
    //region Manage Types in this Domain
    /**
     * Register type
     */
    addType(type) {
        let base = type.prototype;
        // this._types.add(<ClassConstructor<T>>type);
        while (base && base.constructor !== Object) {
            const ctor = base.constructor;
            if (!this._types.has(ctor)) {
                this._types.set(ctor, type);
            }
            base = Reflect.getPrototypeOf(base);
        }
    }
    /**
     * Replace type
     */
    setType(type, replacement) {
        // this._types.add(replacement);
        this._types.set(type, replacement);
    }
    /**
     * Delete type mapping for giving type
     */
    removeType(type) {
        this._types.delete(type);
    }
    // /**
    //  * Get all registered types in this domain
    //  */
    // getTypes(): Array<Class> {
    //   const types: Array<Class> = [];
    //   const uniqueTypes = new Set(types);
    //   for (const type of this._types.values()) {
    //     if (!uniqueTypes.has(type)) {
    //       uniqueTypes.add(type);
    //       types.push(type);
    //     }
    //   }
    //   return types;
    // }
    /**
     * Add an agent
     */
    addAgent(type, agent, explicit) {
        if (!this._agents.has(type)) {
            this._agents.set(type, agent);
        }
        if (explicit)
            return;
        let base = type.prototype;
        while (base && base.constructor !== Object) {
            const ctor = base.constructor;
            if (!this._agents.has(ctor)) {
                this._agents.set(ctor, agent);
            }
            base = Reflect.getPrototypeOf(base);
        }
    }
    /**
     * Set agent instance
     */
    setAgent(type, agent) {
        this._agents.set(type, agent);
    }
    // /**
    //  * Replace agent, throw error if origin agent not match
    //  */
    // replaceAgent<T extends AgentIdentifier>(type: T, origin: Agent<T>, replace: Agent<T>): void {
    //   if (!this._agents.has(type)) {
    //     throw new Error('OriginAgentNotFound');
    //   }
    //   if (this._agents.get(type) !== origin) {
    //     throw new Error('OriginAgentNotMatch');
    //   }
    //   this._agents.set(type, replace);
    // }
    /**
     * Delete agent. do nothing if agent not match
     */
    removeAgent(type, agent) {
        if (this._agents.has(type) && this._agents.get(type) === agent) {
            this._agents.delete(type);
            // do not dispose because this agent may used by others
            return true;
        }
        return false;
    }
    //endregion
    // public beforeDecorate(attribute: IAttribute, target: Function): boolean {
    //   return true;
    // }
    // /**
    //  * Get all registered agents in this domain
    //  */
    // getAgents(): Iterable<any> {
    //   return this._agents.values();
    // }
    /**
     * Dispose this domain and all created agents
     */
    dispose() {
        if (this.disposed) {
            return;
        }
        this.disposing = true;
        const disposables = new Set();
        for (const agent of this._agents.values()) {
            disposables.add(agent);
        }
        for (const agent of disposables.keys()) {
            if (typeof agent === 'object' && agent != null && typeof agent.dispose === 'function') {
                //  only dispose the agent of current domain
                agent.dispose();
            }
        }
        for (const promise of this._pendingAgents.values()) {
            promise.then((agent) => {
                if (typeof agent === 'object' && agent != null && typeof agent.dispose === 'function') {
                    // only dispose the agent of current domain
                    agent.dispose();
                }
            });
        }
        disposables.clear();
        this._pendingAgents.clear();
        this._agents.clear();
        this._types.clear();
        this.disposed = true;
    }
}
exports.InMemoryDomain = InMemoryDomain;
