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
import { NSString } from "./ns_string.ts";

export class OSXPasteboard {
  #CLEAR_CONTENTS = encode("clearContents\0");
  #NS_PASTEBOARD = encode("NSPasteboard\0");
  #GENERAL_PASTEBOARD = encode("generalPasteboard\0");
  #NS_STRING = encode("NSString");
  #STRING_WITH_UTF8_STRING = encode("stringWithUTF8String:\0");
  #SET_STRING_FOR_TYPE = encode("setString:forType:\0");
  #STRING_FOR_TYPE = encode("stringForType:\0");
  #UTF8_STRING = encode("UTF8String\0");

  board: Deno.PointerValue;

  /*
   * Gets the default pasteboard.
   */
  constructor() {
    const pboard = C.objc_msgSend(
      C.objc_getClass(this.#NS_PASTEBOARD),
      C.sel_registerName(this.#GENERAL_PASTEBOARD),
    );
    if (pboard == null) {
      throw new Error("null pasteboard");
    }
    this.board = pboard;
  }

  /*
   * Clear contents of the current pasteboard.
   */
  clearContents() {
    C.objc_msgSend(this.board, C.sel_registerName(this.#CLEAR_CONTENTS));
  }

  /*
   * Write a UTF-8 string to the pasteboard.
   *
   * Returns {true} if successful.
   */
  writeString(msg: string): boolean {
    const input = new NSString(msg);
    const type = new NSString("public.utf8-plain-text");

    const ret = C.objc_msgSend3(
      this.board,
      C.sel_registerName(this.#SET_STRING_FOR_TYPE),
      input.ptr,
      type.ptr,
    );

    return ret;
  }

  /*
   * Reads a UTF-8 string from the pasteboard.
   */
  readString(): string | null {
    const type = new NSString("public.utf8-plain-text");
    const data = C.objc_msgSend4(
      this.board,
      C.sel_registerName(this.#STRING_FOR_TYPE),
      type.ptr,
    );
    if (data == null) {
      return null;
    }

    const c_str = C.objc_msgSend(data, C.sel_registerName(this.#UTF8_STRING));
    return Deno.UnsafePointerView.getCString(c_str!);
  }
}
