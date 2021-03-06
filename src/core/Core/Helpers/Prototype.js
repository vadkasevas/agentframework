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
exports.set = exports.getter = exports.define = void 0;
function define(target, key, value) {
    // const config: PropertyDescriptor = Object.assign({ configurable: true, enumerable: true }, value);
    Reflect.defineProperty(target, key, value);
    return value;
}
exports.define = define;
function getter(target, key, value) {
    Reflect.defineProperty(target, key, { value, configurable: true });
    return value;
}
exports.getter = getter;
function set(target, key, value) {
    Reflect.defineProperty(target, key, { value, writable: true, enumerable: true, configurable: true });
    return value;
}
exports.set = set;
