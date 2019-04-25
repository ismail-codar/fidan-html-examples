import { FidanValue, value, html } from "@fidanjs/runtime";

const count: FidanValue<number> = value(0);

const decrement = () => {
  count(count() - 1);
};

const increment = () => {
  count(count() + 1);
};

let btnIncrement: HTMLButtonElement = null;

const app = html`
  <div>
    <button
      ref="${element => {
        btnDecrement = element;
      }}"
      onclick="${decrement}"
    >
      -
    </button>
    ${count}
    <button
      ref="${element => {
        btnIncrement = element;
      }}"
      onclick="${increment}"
    >
      +
    </button>
  </div>
`;

let btnDecrement: HTMLButtonElement = null;

setInterval(() => {
  console.log(btnIncrement, btnDecrement);
}, 4000);

document.getElementById("main").appendChild(app);
