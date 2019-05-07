import { Todo } from "../types";
import { compute } from "@fidanjs/runtime";
import { removeTodo, updateTodo } from "../store";

const editItemCss = (todo: Todo) =>
  compute(() => {
    const classes = [];
    todo.completed() && classes.push("completed");
    todo.editing() && classes.push("editing");
    return classes.join(" ");
  });

export const TodoItem = (props: { todo: Todo }) => {
  const { todo } = props;
  return (
    <li
      className={editItemCss(todo)}
      onDoubleClick={(e: any) => {
        todo.editing(true);
        e.target.parentElement.parentElement.lastElementChild.focus();
      }}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed()}
          onChange={e => {
            todo.completed(e.target.checked);
          }}
        />
        <label>{todo.title()}</label>
        <button className="destroy" onClick={e => removeTodo(todo.id)} />
      </div>
      <input
        className="edit"
        value={todo.title()}
        onKeyPress={e => {
          if (e.key === "Enter") {
            updateTodo(todo, e.target["value"]);
          }
        }}
        onBlur={e => updateTodo(todo, e.target.value)}
      />
    </li>
  );
};
