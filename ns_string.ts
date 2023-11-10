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
