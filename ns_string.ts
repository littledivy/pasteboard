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

import { C, encode } from "./objc.ts";

export class NSString {
  static CLASS = encode("NSString\0");
  static stringWithUTF8String = encode("stringWithUTF8String:\0");

  ptr: Deno.PointerValue;

  constructor(str: string) {
    this.ptr = C.objc_msgSend2(
      C.objc_getClass(NSString.CLASS),
      C.sel_registerName(NSString.stringWithUTF8String),
      encode(str + "\0"),
    );
  }
}
