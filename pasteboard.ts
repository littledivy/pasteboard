import { C, encode } from "./objc.ts";
import { NSString } from "./ns_string.ts";

export class OSXPasteboard {
  CLEAR_CONTENTS = encode("clearContents\0");
  NS_PASTEBOARD = encode("NSPasteboard\0");
  GENERAL_PASTEBOARD = encode("generalPasteboard\0");
  NS_STRING = encode("NSString");
  STRING_WITH_UTF8_STRING = encode("stringWithUTF8String:\0");
  SET_STRING_FOR_TYPE = encode("setString:forType:\0");
  STRING_FOR_TYPE = encode("stringForType:\0");
  UTF8_STRING = encode("UTF8String\0");

  board: Deno.PointerValue;

  constructor() {
    const pboard = C.objc_msgSend(
      C.objc_getClass(this.NS_PASTEBOARD),
      C.sel_registerName(this.GENERAL_PASTEBOARD),
    );
    if (pboard == null) {
      throw new Error("null pasteboard");
    }
    this.board = pboard;
  }

  clearContents() {
    C.objc_msgSend(this.board, C.sel_registerName(this.CLEAR_CONTENTS));
  }

  writeString(msg: string) {
    const input = new NSString(msg);
    const type = new NSString("public.utf8-plain-text");

    const ret = C.objc_msgSend3(
      this.board,
      C.sel_registerName(this.SET_STRING_FOR_TYPE),
      input.ptr,
      type.ptr,
    );

    return ret;
  }

  readString() {
    const type = new NSString("public.utf8-plain-text");
    const data = C.objc_msgSend4(
      this.board,
      C.sel_registerName(this.STRING_FOR_TYPE),
      type.ptr,
    );
    if (data == null) {
      return null;
    }

    const c_str = C.objc_msgSend(data, C.sel_registerName(this.UTF8_STRING));
    return Deno.UnsafePointerView.getCString(c_str!);
  }
}
