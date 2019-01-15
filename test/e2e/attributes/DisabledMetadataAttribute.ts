import 'jasmine';
import { IAttribute } from '../../../src/lib';

export class DisabledMetadataAttribute implements IAttribute {
  beforeDecorate(
    target: Object | Function,
    targetKey?: string | symbol,
    descriptor?: PropertyDescriptor | number
  ): boolean {
    return false;
  }
}
