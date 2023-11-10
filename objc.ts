// Copyright 2023 Divy Srivastava <dj.srivastava23@gmail.com>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/// <reference lib="deno.unstable" />

export const { symbols: C } = Deno.dlopen("/usr/lib/libobjc.A.dylib", {
  objc_msgSend: {
    parameters: ["pointer", "pointer"],
    result: "pointer",
  },
  objc_msgSend2: {
    parameters: ["pointer", "pointer", "buffer"],
    result: "pointer",
    name: "objc_msgSend",
  },
  objc_msgSend3: {
    parameters: ["pointer", "pointer", "pointer", "pointer"],
    result: "bool",
    name: "objc_msgSend",
  },
  objc_msgSend4: {
    parameters: ["pointer", "pointer", "pointer"],
    result: "pointer",
    name: "objc_msgSend",
  },
  objc_getClass: {
    parameters: ["buffer"],
    result: "pointer",
  },
  sel_registerName: {
    parameters: ["buffer"],
    result: "pointer",
  },
});

const enc = new TextEncoder();
export function encode(str: string): Uint8Array {
  return enc.encode(str);
}

Deno.dlopen(
  "/System/Library/Frameworks/AppKit.framework/AppKit",
  {},
);
