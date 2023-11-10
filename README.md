## pasteboard

macOS NSPasteboard API bindings for Deno JIT FFI.

### Usage

```typescript
import { OSXPasteboard } from "https://deno.land/x/pasteboard/mod.ts";

// Retrieves the default pasteboard.
const board = new OSXPasteboard();

// Clears the pasteboard contents.
board.clearContents();

// Write UTF-8 encoded text to the pasteboard.
board.writeText("Hello World!");

// Read UTF-8 encoded text from the pasteboard.
const text = board.readText();
```

```
deno run --allow-ffi --unstable example.ts
```

### Design

Depends on the `AppKit.framework` and Objective-C runtime.

Loads `/usr/lib/libobjc.A.dylib` and
`/System/Library/Frameworks/AppKit.framework/AppKit` at startup.

### License

See [LICENSE](./LICENSE).
