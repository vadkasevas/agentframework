import { Type } from './Type';
import { Parameter } from './Parameter';
import { IsNumber } from '../Internal/Utils';

/**
 * Method
 */
export class Method<P> extends Type<P> {
  private readonly _maxParameters: number;
  private readonly _parameters: Map<number, Parameter<Method<P>>>;
  private _parametersArray: Array<[number, Parameter<Method<P>>]>;

  constructor(parent: P | null, maxParameters: number) {
    super(parent);
    // prevent access parameter outside the boundary
    if (IsNumber(maxParameters)) {
      this._maxParameters = maxParameters;
    }
    this._parameters = new Map<number, Parameter<Method<P>>>();
  }

  parameterCount(): number {
    return this._maxParameters;
  }

  parameter(index: number): Parameter<Method<P>> {
    // throw error if out of bound
    if (IsNumber(this._maxParameters) && index > this._maxParameters) {
      throw new TypeError(`Invalid parameter index: ${index}`);
    }
    let parameter = this._parameters.get(index);
    if (!parameter) {
      parameter = new Parameter(this);
      this._parameters.set(index, parameter);
      delete this._parametersArray;
    }
    return parameter;
  }

  getParameters(): Array<[number, Parameter<Method<P>>]> {
    if (!this._parametersArray) {
      this._parametersArray = Array.from(this._parameters.entries());
    }
    return this._parametersArray;
  }

  hasParameterInterceptor(): boolean {
    return this.getParameters().some(([, p]) => p.hasInterceptor());
  }

  hasParameterInitializer(): boolean {
    return this.getParameters().some(([, p]) => p.hasInitializer());
  }

  get paramtypes(): Array<any> {
    return this.getMetadata('design:paramtypes');
  }

  get returntype(): any {
    return this.getMetadata('design:returntype');
  }
}