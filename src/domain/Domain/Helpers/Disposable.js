"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDisposable = void 0;
function IsDisposable(type) {
    if (type && typeof type === 'object' && type['dispose'] && typeof type['dispose'] === 'function') {
        return true;
    }
    return false;
}
exports.IsDisposable = IsDisposable;
