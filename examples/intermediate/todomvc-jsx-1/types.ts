import { FidanValue } from "@fidanjs/runtime";

export type FilterType = "" | "active" | "completed";
export interface Todo {
  id: number;
  title: FidanValue<string>;
  editing: FidanValue<boolean>;
  completed: FidanValue<boolean>;
}
