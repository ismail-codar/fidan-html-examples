import { FidanArray, compute } from "@fidanjs/runtime";
import { jsxArrayMap } from "@fidanjs/jsx/build";
import { Todo } from "../types";
import { TodoItem } from "./TodoItem";

export const Main = (props: { todos: FidanArray<Todo[]> }) => {
  const { todos } = props;
  return (
    <>
      {todos.size() ? (
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
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
