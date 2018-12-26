import { Method } from './Method';
import { IsFunction } from '../Utils';
import { AgentFeatures, hasFeature } from '../AgentFeatures';
import { Reflection } from './Reflection';

/**
 * Property
 */
export class Property<P> extends Reflection<P> {
  protected readonly parent: P;

  constructor(parent: P, private _key: PropertyKey, private _descriptor?: PropertyDescriptor) {
    super(parent);
  }

  get value(): Method<Property<P>> {
    let maxFunctionParameters = 0,
      _descriptor = this._descriptor; // field don't have parameter
    if (_descriptor && _descriptor.value && IsFunction(_descriptor.value)) {
      maxFunctionParameters = _descriptor.value.length;
    }
    const value = new Method(this, maxFunctionParameters);
    Reflect.defineProperty(this, 'value', { value });
    return value;
  }

  get setter(): Method<Property<P>> {
    const value = new Method(this, 1);
    Reflect.defineProperty(this, 'setter', { value });
    return value;
  }

  get getter(): Method<Property<P>> {
    const value = new Method(this, 0);
    Reflect.defineProperty(this, 'setter', { value });
    return value;
  }

  hasFeatures(features: AgentFeatures): boolean {
    let results;
    if (hasFeature(features, AgentFeatures.Initializer)) {
      results = this.hasInitializer() || this.setter.hasInitializer() || this.value.hasInitializer();
    }
    if (hasFeature(features, AgentFeatures.Interceptor)) {
      results =
        results ||
        this.hasInterceptor() ||
        this.getter.hasInterceptor() ||
        this.value.hasInterceptor() ||
        this.value.hasParameterInterceptor() ||
        this.value.hasParameterInitializer();
    }
    return results || false;
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

  get targetKey(): PropertyKey {
    return this._key;
  }

  get descriptor(): PropertyDescriptor | undefined {
    return this._descriptor;
  }

  /**
   * Add the metadata generated by tsc
   * @param {string} key
   * @param value
   */
  addMetadata(key: string, value: any) {
    super.addMetadata(key, value);

    // apply method parameter type into parameter metadata
    if (this._descriptor) {
      if (this._descriptor.value) {
        // this is a method
        if (key === 'design:paramtypes' && value && value.length) {
          this.value.addMetadata('design:paramtypes', value);
          const types = value as Array<any>;
          for (let idx = types.length - 1; idx >= 0; idx--) {
            this.value.parameter(idx).addMetadata('design:type', types[idx]);
          }
        } else if (key === 'design:returntype') {
          this.value.addMetadata('design:returntype', value);
        }
      }

      if (this._descriptor.get) {
        if (key === 'design:type') {
          this.getter.addMetadata('design:returntype', value);
        }
      }

      if (this._descriptor.set) {
        if (key === 'design:paramtypes' && value && value.length) {
          this.setter.addMetadata('design:paramtypes', value);
          const types = value as Array<any>;
          for (let idx = types.length - 1; idx >= 0; idx--) {
            this.setter.parameter(idx).addMetadata('design:type', types[idx]);
          }
        }
      }
    } else {
      // this is field
      if (key === 'design:type' && value) {
        const types = value as Array<any>;
        this.value.addMetadata('design:returntype', types[0]);
      }
    }
  }
}
