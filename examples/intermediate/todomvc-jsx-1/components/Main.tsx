import { FidanArray, compute } from "@fidanjs/runtime";
import { jsxArrayMap } from "@fidanjs/jsx/build";
import { Todo } from "../types";
import { TodoItem } from "./TodoItem";
import { todos, allChecked } from "../store";

export const Main = () => {
  return (
    <>
      {todos.size() ? (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={allChecked()}
            onClick={e =>
              todos().forEach(todo => todo.completed(e.target["checked"]))
            }
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul
            className="todo-list"
            {...jsxArrayMap(todos, todo => <TodoItem todo={todo} /> as any)}
          />
        </section>
      ) : (
        ""
      )}
    </>
  );
};
