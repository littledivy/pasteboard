import { OSXPasteboard } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.178.0/testing/asserts.ts";

Deno.test("pasteboard", () => {
  const board = new OSXPasteboard();
  board.clearContents();
  board.writeString("Hello, world!");
  const str = board.readString();
  assertEquals(str, "Hello, world!");
});
