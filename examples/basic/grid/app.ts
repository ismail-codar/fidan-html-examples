import { value, array, html } from "@fidanjs/runtime";
import { DemoGrid } from "./demo-grid";

// app & data
const data = {
  searchQuery: value(""),
  gridColumns: array(["name", "power"]),
  gridData: array([
    { name: "Chuck Norris", power: Infinity },
    { name: "Bruce Lee", power: 9000 },
    { name: "Jackie Chan", power: 7000 },
    { name: "Jet Li", power: 8000 }
  ])
};

const app = html`
  <div>
    <form id="search">
      Search
      <input
        name="query"
        oninput="${e => data.searchQuery(e.target.value)}"
        autocomplete="off"
      />
    </form>
    ${DemoGrid(data.gridColumns, data.gridData, data.searchQuery)}
    <hr />
    <a href="https://vuejs.org/v2/examples/grid-component.html" target="_blank"
      >Vue version</a
    >
  </div>
`;
document.getElementById("main").appendChild(app);
