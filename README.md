## pasteboard

macOS NSPasteboard API bindings for Deno JIT FFI.

### Usage

```typescript
import { OSXPasteboard } from "jsr:@divy/pasteboard";

const board = new OSXPasteboard();

board.clearContents(); // Clears the pasteboard contents.

board.writeText("Hello World!"); // Write UTF-8 encoded text to the pasteboard.

const text = board.readText();
```

```
deno run --allow-ffi --unstable-ffi example.ts
```

### Design

Depends on the `AppKit.framework` and Objective-C runtime.

Loads `/usr/lib/libobjc.A.dylib` and
`/System/Library/Frameworks/AppKit.framework/AppKit` at startup.

### License

See [LICENSE](./LICENSE).
