import { IAttribute, IInitializerAttribute, IInterceptorAttribute } from '../IAttribute';
import { TypedConstructor } from '../TypedConstructor';
import { HasInitializer, HasInterceptor } from '../../Compiler/Internal/Utils';

/**
 * Access and store attribute and metadata for reflection
 */
export abstract class Reflection<P> {
  protected readonly parent: P | null;

  private _attributes: Array<IAttribute> = [];
  private _metadata: Map<string, any>;
  private _hasInterceptor: boolean;
  private _hasInitializer: boolean;

  protected constructor(parent: P | null) {
    this.parent = parent;
  }
  /**
   * Add an attribute
   * @param {IAttribute} attribute
   */
  addAttribute(attribute: IAttribute): void {
    if (!attribute) {
      throw new TypeError(`Unable to add null attribute`);
    }
    this._attributes.push(attribute);
    // if the attribute provide a getInterceptor, that means this property may need inject
    // we don't call getInterceptor or getInitializer until user new() the agent class.
    this._hasInterceptor = HasInterceptor(attribute);
    this._hasInitializer = HasInitializer(attribute);
  }

  /**
   * Return an array of attributes which is instance of giving type
   * @returns {IAttribute[]}
   */
  getAttributes<U1 extends IAttribute>(type?: TypedConstructor<U1>): U1[] {
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
  hasAttribute<U2 extends IAttribute>(type?: TypedConstructor<U2>): boolean {
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
    return <IInterceptorAttribute[]>this._attributes.filter(HasInterceptor);
  }

  /**
   * Return an array of all the attributes which provide getInitializer method
   * @returns {IInitializerAttribute[]}
   */
  getInitializers(): IInitializerAttribute[] {
    return <IInitializerAttribute[]>this._attributes.filter(HasInitializer);
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
  getMetadata(key: string): any | null {
    if (!this._metadata) {
      return null;
    }
    return this._metadata.get(key);
  }

  /**
   * Add the metadata generated by tsc
   *
   * @param {string} key
   * @param value
   */
  addMetadata(key: string, value: any): void {
    if (!this._metadata) {
      this._metadata = new Map<string, any>();
    }
    this._metadata.set(key, value);
  }
}
