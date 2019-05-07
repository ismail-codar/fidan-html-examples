import { compute } from "@fidanjs/runtime";
import { todos, todoCount, hashFilter, clearCompleted } from "../store";
import { FilterType } from "../types";

const footerLinkCss = (waiting: FilterType) =>
  compute(() => (hashFilter() === waiting ? "selected" : ""));

export const Footer = () => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{todoCount}</strong> item
        {compute(() => (todoCount() > 1 ? "s" : ""))}
        left
      </span>
      <ul className="filters">
        <li>
          <a className={footerLinkCss("")} href="#/">
            All
          </a>
        </li>
        <li>
          <a className={footerLinkCss("active")} href="#/active">
            Active
          </a>
        </li>
        <li>
          <a className={footerLinkCss("completed")} href="#/completed">
            Completed
          </a>
        </li>
      </ul>
      {compute(() => todos().length - todoCount() > 0, [todoCount]) ? (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      ) : (
        ""
      )}
    </footer>
  );
};
