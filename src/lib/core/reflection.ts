import { AgentFeatures } from './compiler';
import { Decoratable } from './decoratable';
import { IsFunction } from './utils';
import { IDesign } from './design';


export class Parameter extends Decoratable {
  
  get type(): any {
    return this.getMetadata('design:type');
  }
  
}


export class Method extends Decoratable {
  
  _maxParameters: number;
  _parameters: Map<number, Parameter>;
  
  constructor(maxParameters: number) {
    super();
    // do not create the map if this method don't have parameter
    // to save memory usage
    if (maxParameters) {
      this._maxParameters = maxParameters;
      this._parameters = new Map<number, Parameter>();
    }
  }
  
  parameters(index: number): Parameter {
    if (!this._maxParameters || index > this._maxParameters) {
      throw new TypeError(`Invalid parameter index: ${index}`)
    }
    let parameter = this._parameters.get(index);
    if (!parameter) {
      parameter = new Parameter();
      this._parameters.set(index, parameter);
    }
    return parameter;
  }
  
}


export class Property extends Decoratable implements IDesign {
  
  _methods: Map<string, Method>;
  
  constructor(private _key: string | symbol, private _descriptor?: PropertyDescriptor) {
    super();
    this._methods = new Map<string, Method>();
    this._methods.set('set', new Method(1));
    this._methods.set('get', new Method(0));
    
    let maxFunctionParameters = 0; // field don't have parameter
    if (_descriptor && _descriptor.value && IsFunction(_descriptor.value)) {
      maxFunctionParameters = _descriptor.value.length;
    }
    this._methods.set('value', new Method(maxFunctionParameters));
  }
  
  value(): Method {
    return this._methods.get('value');
  }
  
  setter(): Method {
    return this._methods.get('set');
  }
  
  getter(): Method {
    return this._methods.get('get');
  }
  
  hasFeatures(features: AgentFeatures) {
    let results;
    if ((features & AgentFeatures.Initializer) === AgentFeatures.Initializer) {
      results = this.hasInitializer() || this.setter().hasInitializer() || this.value().hasInitializer();
    }
    if ((features & AgentFeatures.Interceptor) === AgentFeatures.Interceptor) {
      results = results || this.hasInterceptors() || this.getter().hasInterceptors() || this.value().hasInterceptors();
    }
    return results;
  }
  
  get type(): any {
    return this.getMetadata('design:type');
  }
  
  get paramtypes(): Array<any> {
    return this.getMetadata('design:paramtypes');
  }
  
  get returntype(): any {
    return this.getMetadata('design:returntype');
  }
  
  get targetKey(): string | symbol {
    return this._key;
  }
  
  get descriptor(): PropertyDescriptor | null {
    return this._descriptor;
  }
}

/**
 * Represents a callback function that is used to filter a list of behavior represented in a map of Behavior objects.
 */
export interface PropertyFilter {
  /**
   * @param {Property} value The Behavior object to which the filter is applied.
   * @param filterCriteria An arbitrary object used to filter the list.
   * @returns {boolean} `true` to include the behavior in the filtered list; otherwise false.
   */
  (value: Property, filterCriteria?: any): boolean
}

/**
 * Reflection information for user class
 */
export class Reflection extends Method implements IDesign {
  
  _prototype: object;
  _properties: Map<string | symbol, Property>;
  
  constructor(prototype: object) {
    super(prototype.constructor.length);
    this._prototype = prototype;
    this._properties = new Map<string | symbol, Property>();
  }
  
  /**
   * Return the prototype of reflecting class
   * @returns {Object | Function}
   */
  get type(): object {
    return this._prototype;
  }
  
  /**
   * Return the constructor of reflecting class
   * @returns {any}
   */
  get target(): any {
    return this._prototype.constructor;
  }
  
  get paramtypes(): Array<any> {
    return this.getMetadata('design:paramtypes');
  }
  
  get returntype(): any {
    return this.getMetadata('design:returntype');
  }
  
  
  /**
   * Return property info for specified property key
   * @param {string | symbol} key
   * @param {PropertyDescriptor} descriptor
   * @returns {Property}
   */
  property(key: string | symbol, descriptor?: PropertyDescriptor): Property {
    if (!this._properties.has(key)) {
      descriptor = descriptor || Object.getOwnPropertyDescriptor(this.type, key);
      this._properties.set(key, new Property(key, descriptor))
    }
    return this._properties.get(key);
  }
  
  /**
   * Returns a filtered array of Property objects.
   * @param {PropertyFilter} filter
   * @param filterCriteria
   * @returns {Property[]}
   */
  findProperties(filter: PropertyFilter, filterCriteria?: any): Property[] {
    const properties: Array<Property> = [];
    for (const pair of this._properties.entries()) {
      if (filter(pair[1], filterCriteria)) {
        properties.push(pair[1]);
      }
    }
    return properties;
  }
  
  /**
   * Return all properties
   * @returns {IterableIterator<Property>}
   */
  getProperties(): IterableIterator<Property> {
    return this._properties.values();
  }
  
  /**
   * Add the metadata generated by tsc
   * @param {string} key
   * @param value
   */
  addMetadata(key: string, value: any) {
    super.addMetadata(key, value);
    // apply method parameter type into parameter metadata
    
    if (key === 'design:paramtypes' && value && value.length) {
      
      const types = <Array<any>>value;
      for (let idx = types.length - 1; idx >= 0; idx--) {
        this.parameters(idx).addMetadata('design:type', types[idx]);
      }
      
    }
    
  }
}

