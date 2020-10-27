"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptable = void 0;
const decorateAgent_1 = require("./Decorator/decorateAgent");
const InterceptorAttribute_1 = require("./InterceptorAttribute");
function interceptable() {
    return decorateAgent_1.decorateAgent(new InterceptorAttribute_1.InterceptorAttribute());
}
exports.interceptable = interceptable;
