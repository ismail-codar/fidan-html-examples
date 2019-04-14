import { fidan } from "@fidanjs/runtime";

const count = fidan.value(0);

const decrement = () => {
  count(count() - 1);
};

const increment = () => {
  count(count() + 1);
};

const app = fidan.html`
<div>
    <button onclick="${decrement}"> - </button>
    ${count}
    <button onclick="${increment}"> + </button>
</div>
`;

document.getElementById("main").appendChild(app);
