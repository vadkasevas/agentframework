"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassConstructorParameter = exports.ClassMethodParameter = exports.ClassMethod = exports.ClassField = void 0;
const lib_1 = require("../../lib");
exports.ClassField = lib_1.MemberKinds.Property; // | MemberKinds.Field;
exports.ClassMethod = lib_1.MemberKinds.Property; //| MemberKinds.Method;
exports.ClassMethodParameter = lib_1.MemberKinds.Parameter; //| MemberKinds.MethodParameter;
exports.ClassConstructorParameter = lib_1.MemberKinds.Parameter; //| MemberKinds.MethodParameter;
