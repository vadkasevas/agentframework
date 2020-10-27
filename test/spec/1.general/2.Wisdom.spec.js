"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Wisdom_1 = require("../../../src/core/Core/Wisdom");
describe('Wisdom!', () => {
    describe('# should able to', () => {
        it('get static class property from wisdom type', () => {
            class A {
            }
            class B extends A {
            }
            class C extends B {
            }
            const tc = Wisdom_1.Wisdom.add(C);
            tc.ccc = 1;
            const tb = Wisdom_1.Wisdom.add(B);
            tb.bbb = 2;
            const ta = Wisdom_1.Wisdom.add(A);
            ta.aaa = 3;
            const t = Wisdom_1.Wisdom.add(Function.prototype);
            t.ooo = 4;
            expect(Reflect.getPrototypeOf(t)).toBeNull();
            expect(tc.ccc).toBe(1);
            expect(tc.bbb).toBe(2);
            expect(tc.aaa).toBe(3);
            expect(tc.ooo).toBe(4);
            expect(tb.ccc).toBeUndefined();
            expect(tb.bbb).toBe(2);
            expect(tb.aaa).toBe(3);
            expect(tb.ooo).toBe(4);
            expect(ta.ccc).toBeUndefined();
            expect(ta.bbb).toBeUndefined();
            expect(ta.aaa).toBe(3);
            expect(ta.ooo).toBe(4);
            expect(t.ccc).toBeUndefined();
            expect(t.bbb).toBeUndefined();
            expect(t.aaa).toBeUndefined();
            expect(t.ooo).toBe(4);
        });
        it('get class property from wisdom type', () => {
            class A {
            }
            class B extends A {
            }
            class C extends B {
            }
            const tc = Wisdom_1.Wisdom.add(C.prototype);
            tc.ccc = 1;
            const tb = Wisdom_1.Wisdom.add(B.prototype);
            tb.bbb = 2;
            const ta = Wisdom_1.Wisdom.add(A.prototype);
            ta.aaa = 3;
            const t = Wisdom_1.Wisdom.add(Object.prototype);
            t.ooo = 4;
            expect(Reflect.getPrototypeOf(t)).toBeNull();
            expect(tc.ccc).toBe(1);
            expect(tc.bbb).toBe(2);
            expect(tc.aaa).toBe(3);
            expect(tc.ooo).toBe(4);
            expect(tb.ccc).toBeUndefined();
            expect(tb.bbb).toBe(2);
            expect(tb.aaa).toBe(3);
            expect(tb.ooo).toBe(4);
            expect(ta.ccc).toBeUndefined();
            expect(ta.bbb).toBeUndefined();
            expect(ta.aaa).toBe(3);
            expect(ta.ooo).toBe(4);
            expect(t.ccc).toBeUndefined();
            expect(t.bbb).toBeUndefined();
            expect(t.aaa).toBeUndefined();
            expect(t.ooo).toBe(4);
        });
    });
});
