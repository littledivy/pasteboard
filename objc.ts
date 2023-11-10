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
