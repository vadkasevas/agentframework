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
exports.MemberKinds = void 0;
var MemberKinds;
(function (MemberKinds) {
    MemberKinds[MemberKinds["None"] = 0] = "None";
    MemberKinds[MemberKinds["Class"] = 1] = "Class";
    MemberKinds[MemberKinds["Static"] = 2] = "Static";
    MemberKinds[MemberKinds["Property"] = 4] = "Property";
    MemberKinds[MemberKinds["Parameter"] = 8] = "Parameter";
    // Field = 16,
    // Method = 32,
    // Getter = 64,
    // Setter = 128,
    // ConstructorParameter = 256,
    // MethodParameter = 512,
    MemberKinds[MemberKinds["All"] = 65535] = "All";
})(MemberKinds = exports.MemberKinds || (exports.MemberKinds = {}));
