export function FindExtendedClass(target: Function, receiver: Function): Array<Function> {
  // console.log('\n');
  // console.log('target', target, '=====>', receiver);
  let prototype: object = receiver.prototype;
  const extend: Array<Function> = [];
  while (prototype && prototype.constructor !== target) {
    extend.unshift(prototype.constructor);
    prototype = Reflect.getPrototypeOf(prototype);
  }
  return extend;
}
