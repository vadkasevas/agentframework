"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../../lib");
describe('5.1. Create domain', () => {
    describe('# should able to', () => {
        it('create domain', () => {
            const domain = new lib_1.InMemoryDomain();
            expect(domain).toBeInstanceOf(lib_1.Domain);
            expect(domain.name).toBe('InMemoryDomain');
            expect(lib_1.IsDomain(domain)).toBeTrue();
            expect(domain.disposed).toBeFalsy();
            domain.dispose();
            expect(domain.disposed).toBeTrue();
            domain.dispose();
            expect(domain.disposed).toBeTrue();
        });
    });
});
