import { createRuntime } from "dom-expressions";
import { compute } from "@fidanjs/runtime";

const nop: any = () => {};

export const jsxRuntime = createRuntime({
  wrap<T>(fn: (prev?: T) => T) {
    compute(fn);
  },
  sample: <T>(fn: () => T) => {
    return fn();
  },
  root: <T>(fn: (dispose: () => void) => T) => {
    return fn(() => {
      return null;
    });
  },
  cleanup: nop
});
