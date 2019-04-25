import {value, compute, html} from "@fidanjs/runtime";

var A = value(1);
var B = value(2);
var C = compute(()=>A() + B());

var view = html`
  <div>
    A:
    <input
      type="number"
      value="${A}"
      oninput="${e => A(parseInt(e.target.value))}"
    />
    <br />
    B:
    <input
      type="number"
      value="${B}"
      oninput="${e => B(parseInt(e.target.value))}"
    />
    <br />
    C: ${C}
  </div>
`;

document.getElementById("main").appendChild(view);
