"use strict";
/* Copyright 2016 Ling Zhang

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptable = exports.memorize = exports.IsAgent = exports.GetType = exports.CreateAgent = exports.AgentAttribute = exports.Reflector = exports.decorateParameter = exports.decorateMember = exports.decorateAgent = exports.decorateClass = exports.decorate = exports.MemberKinds = exports.NotImplementedError = void 0;
var NotImplementedError_1 = require("./Core/Error/NotImplementedError");
Object.defineProperty(exports, "NotImplementedError", { enumerable: true, get: function () { return NotImplementedError_1.NotImplementedError; } });
//export { AddAttributeToClass, AddAttributeToMember, AddAttributeToConstructorParameter, AddAttributeToMethodParameter } from './Core/Annotation/AddAttribute';
var MemberKinds_1 = require("./Core/Interfaces/MemberKinds");
Object.defineProperty(exports, "MemberKinds", { enumerable: true, get: function () { return MemberKinds_1.MemberKinds; } });
var decorate_1 = require("./Core/Decorator/decorate");
Object.defineProperty(exports, "decorate", { enumerable: true, get: function () { return decorate_1.decorate; } });
var decorateClass_1 = require("./Core/Decorator/decorateClass");
Object.defineProperty(exports, "decorateClass", { enumerable: true, get: function () { return decorateClass_1.decorateClass; } });
var decorateAgent_1 = require("./Core/Decorator/decorateAgent");
Object.defineProperty(exports, "decorateAgent", { enumerable: true, get: function () { return decorateAgent_1.decorateAgent; } });
var decorateMember_1 = require("./Core/Decorator/decorateMember");
Object.defineProperty(exports, "decorateMember", { enumerable: true, get: function () { return decorateMember_1.decorateMember; } });
var decorateParameter_1 = require("./Core/Decorator/decorateParameter");
Object.defineProperty(exports, "decorateParameter", { enumerable: true, get: function () { return decorateParameter_1.decorateParameter; } });
var Reflector_1 = require("./Core/Reflector");
Object.defineProperty(exports, "Reflector", { enumerable: true, get: function () { return Reflector_1.Reflector; } });
/*************************************
 *   Agent API
 *************************************/
var AgentAttribute_1 = require("./Core/Agent/AgentAttribute");
Object.defineProperty(exports, "AgentAttribute", { enumerable: true, get: function () { return AgentAttribute_1.AgentAttribute; } });
var CreateAgent_1 = require("./Core/Agent/CreateAgent");
Object.defineProperty(exports, "CreateAgent", { enumerable: true, get: function () { return CreateAgent_1.CreateAgent; } });
var Knowledge_1 = require("./Core/Knowledge");
Object.defineProperty(exports, "GetType", { enumerable: true, get: function () { return Knowledge_1.GetType; } });
Object.defineProperty(exports, "IsAgent", { enumerable: true, get: function () { return Knowledge_1.IsAgent; } });
/*************************************
 *   Wisdom
 *************************************/
var Wisdom_1 = require("./Core/Wisdom");
Object.defineProperty(exports, "memorize", { enumerable: true, get: function () { return Wisdom_1.memorize; } });
/*************************************
 *   Static Interceptor
 *************************************/
var interceptable_1 = require("./Core/interceptable");
Object.defineProperty(exports, "interceptable", { enumerable: true, get: function () { return interceptable_1.interceptable; } });
