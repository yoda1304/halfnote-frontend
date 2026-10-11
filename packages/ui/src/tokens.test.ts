import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { colors } from "./tokens";

test("colors matches the --color-* vars in web globals.css", () => {
  const css = readFileSync(new URL("../../../apps/web/src/app/globals.css", import.meta.url), "utf8");
  const root = css.match(/:root\s*{([^}]*)}/)![1];
  const vars = Object.fromEntries([...root.matchAll(/--color-([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]));
  assert.deepEqual(vars, colors);
});
