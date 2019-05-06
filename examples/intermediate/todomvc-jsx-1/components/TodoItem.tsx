import { Todo } from "../types";
import { compute } from "@fidanjs/runtime";
import { removeTodo } from "../store";

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
    <li className={editItemCss(todo)}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed()}
          onChange={e => {
            todo.completed(e.target.checked);
          }}
        />
        <label>{todo.title}</label>
        <button className="destroy" onClick={e => removeTodo(todo.id)} />
      </div>
      <input className="edit" value="Rule the web" />
    </li>
  );
};
