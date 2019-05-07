import {
  value,
  FidanValue,
  FidanArray,
  compute,
  debounce
} from "@fidanjs/runtime";
import { FilterType, Todo } from "./types";

// variables
const STORAGE_KEY = "fidan_todomvc";
const hashFilter = value<FilterType>("");
export const todos = value<Todo[]>([]) as FidanArray<Todo[]>;
export const allChecked = value(false);

const shownTodos: FidanArray<Todo[]> = compute(() => {
  let _todos = todos();
  const filter = hashFilter();
  if (filter !== "") {
    _todos = _todos.filter(todo =>
      filter === "active" ? !todo.completed() : todo.completed()
    ) as any;
  }
  return _todos;
});

// methods
export const addTodo = e => {
  if (e.key === "Enter") {
    const title = e.target.value.trim();
    title &&
      todos().push({
        id: Math.random(),
        title: value(title).depends(() => [saveTodo]),
        editing: value(false),
        completed: value(false).depends(() => [todoCount])
      });
    e.target.value = "";
  }
};

export const updateTodo = (todo: Todo, title: string) => {
  title = title.trim();
  if (title) {
    todo.title(title);
    todo.editing(false);
  } else {
    removeTodo(todo.id);
  }
};
export const removeTodo = id => {
  todos().splice(shownTodos().findIndex(item => item.id == id), 1);
};
const clearCompleted = e => {
  const removes = [];
  todos().forEach(todo => {
    if (todo.completed()) removes.push(todo);
  });
  while (removes.length) todos().splice(todos().indexOf(removes.pop()), 1);
};

// css computations
const footerLinkCss = (waiting: FilterType) =>
  compute(() => (hashFilter() === waiting ? "selected" : ""));

// footer
const todoCount = compute(() => {
  const count = todos().filter(item => !item.completed()).length;
  if (count === 0 && !allChecked()) {
    allChecked(true);
  }
  if (count && allChecked()) {
    allChecked(false);
  }
  return count;
}, [todos.size]);

// router
window.addEventListener("hashchange", () => {
  hashFilter(window.location.hash.substr(2) as FilterType);
});
hashFilter(window.location.hash.substr(2) as FilterType);

// storage
const saveTodo = compute(
  debounce(() => {
    const strTodos = JSON.stringify(todos());
    localStorage.setItem(STORAGE_KEY, strTodos);
  }, 0),
  [todoCount]
);
const _savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
_savedTodos.forEach(item => {
  item.title = value(item.title);
  item.editing = value(false).depends(() => [saveTodo]);
  item.completed = value(item.completed).depends(() => [todoCount]);
});
todos(_savedTodos);
allChecked(todoCount() === 0);
