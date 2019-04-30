import { FidanArray, arrayMap } from "@fidanjs/runtime";

export const jsxArrayMap = <T>(
  arr: FidanArray<T>,
  renderCallback: (data: T) => DocumentFragment,
  options?: {
    useCloneNode: boolean;
    reuseMode?: boolean;
  }
) => {
  // arrayMap(arr as any, parentElement, nextElement, renderCallback);
  //   var items = arr();
  //   for (var i = 0; i < items.length; i++) {}
};
