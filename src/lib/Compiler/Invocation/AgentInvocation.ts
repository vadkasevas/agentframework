import { IInvocation } from '../../Core/IInvocation';
import { Type } from '../../Reflection/Type';
import { Reflector } from '../../Reflection/Reflector';

/**
 * @ignore
 * @hidden
 */
export class AgentInvocation implements IInvocation {
  constructor(private readonly _target: Function) {}

  get design(): Type {
    return Reflector(this._target);
  }

  get target(): Function {
    return this._target;
  }

  invoke([target, code, agent]): any {
    if (target === this.target) {
      return target;
    }
    // cheating v8
    const args = [target, 'Reflect', `return ${code}`];
    return Reflect.construct(Function, args)(this.target, agent);
  }
}
