import { FidanArray, arrayMap, beforeCompute } from "@fidanjs/runtime";
import reconcile from "./reconcile";

export const jsxArrayMap = <T>(
  arr: FidanArray<T>,
  renderCallback: (data: T) => DocumentFragment,
  reuseMode?: boolean
) => {
  let parentElement = document.createElement("template") as any;

  beforeCompute(
    arr.$val.innerArray,
    (nextVal, beforeVal) => {
      if (parentElement.tagName === "TEMPLATE" && parentElement.parentElement) {
        const parent = parentElement.parentElement;
        parentElement.remove();
        parentElement = parent;
      }
      reconcile(
        parentElement,
        beforeVal ? beforeVal["innerArray"] : [],
        nextVal,
        item => {
          return renderCallback(item);
        },
        () => {}
      );
    },
    () => [arr]
  );
  return parentElement;
};
