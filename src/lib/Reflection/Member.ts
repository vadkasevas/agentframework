import { IAttribute, IInitializerAttribute, IInterceptorAttribute } from '../Core/IAttribute';
import { Constructor } from '../Compiler/Constructor';
import { HasInitializer, HasInterceptor } from '../Compiler/Internal/Utils';

/**
 * Access and store attribute and metadata for reflection
 */
export abstract class Member<P> {
  protected readonly parent: P;

  private _attributes: Array<IAttribute> = [];
  private _metadata: Map<string, any> = new Map<string, any>();
  private _hasInterceptor: boolean = false;
  private _hasInitializer: boolean = false;

  protected constructor(parent: P | null) {
    this.parent = parent;
  }

  /**
   * Add an attribute
   * @param {IAttribute} attribute
   */
  addAttribute(attribute: IAttribute): void {
    this._attributes.push(attribute);
    // if the attribute provide a getInterceptor, that means this property may need inject
    // we don't call getInterceptor or getInitializer until user new() the agent class.
    if (HasInterceptor(attribute)) {
      this._hasInterceptor = true;
    }
    if (HasInitializer(attribute)) {
      this._hasInitializer = true;
    }
  }

  /**
   * Return an array of attributes which is instance of giving type
   * @returns {IAttribute[]}
   */
  getAttributes<U1 extends IAttribute>(type?: Constructor<U1>): U1[] {
    if (type) {
      return this._attributes.filter(a => a instanceof type) as Array<U1>;
    } else {
      return this._attributes.slice(0) as Array<U1>;
    }
  }

  /**
   * Return true if this type contains a giving attribute, otherwise false.
   * @param type
   * @returns {boolean}
   */
  hasAttribute<U2 extends IAttribute>(type?: Constructor<U2>): boolean {
    if (type) {
      return this._attributes.some(a => a instanceof type);
    } else {
      return !!this._attributes.length;
    }
  }

  /**
   * Return an array of all the attributes which provide getInterceptor method
   * @returns {IInterceptorAttribute[]}
   */
  getInterceptors(): IInterceptorAttribute[] {
    return this._attributes.filter(HasInterceptor) as IInterceptorAttribute[];
  }

  /**
   * Return an array of all the attributes which provide getInitializer method
   * @returns {IInitializerAttribute[]}
   */
  getInitializers(): IInitializerAttribute[] {
    return this._attributes.filter(HasInitializer) as IInitializerAttribute[];
  }

  /**
   * Return true if any of the attribute provide getInterceptor method
   * @returns {boolean}
   */
  hasInterceptor(): boolean {
    return this._hasInterceptor;
  }

  /**
   * Return true if any of the attribute provide getInitializer method
   *
   * @returns {boolean}
   */
  hasInitializer(): boolean {
    return this._hasInitializer;
  }

  /**
   * Read the metadata generated by tsc
   *
   * @param key
   */
  getMetadata(key: string): any | undefined {
    return this._metadata.get(key);
  }

  /**
   * Add the metadata generated by tsc
   *
   * @param {string} key
   * @param value
   */
  addMetadata(key: string, value: any): void {
    this._metadata.set(key, value);
  }
}
