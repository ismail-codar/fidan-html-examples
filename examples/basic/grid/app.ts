import { fidan } from "@fidanjs/runtime";

// demo grid component
const demoGrid = (
  columns: typeof data.gridColumns,
  heroes: typeof data.gridData,
  filterKey: typeof data.searchQuery
) => {
  const sortKey = fidan.value("");
  const sortOrders = {};
  columns().forEach(function(key) {
    sortOrders[key] = 1;
  });

  const filteredHeroes = fidan.array([]);
  // Reactively compute filteredHeroes by filterKey and sortKey
  fidan.compute(
    () => {
      const _sortKey = sortKey();
      const _filterKey = filterKey();
      let _heroes = heroes() as any[];
      var order = sortOrders[_sortKey] || 1;

      if (_filterKey) {
        _heroes = _heroes.filter(row => {
          return Object.keys(row).some(key => {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(_filterKey) > -1
            );
          });
        });
      }
      if (_sortKey) {
        _heroes = _heroes.slice().sort((a, b) => {
          a = a[_sortKey];
          b = b[_sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }

      filteredHeroes(_heroes);
    },
    filterKey,
    sortKey
  );

  const sortBy = function(key: string) {
    sortKey(key);
    sortOrders[key] = sortOrders[key] * -1;
  };

  const thCssClass = (key: string) => {
    const cssClass = fidan.value("");
    fidan.compute(() => {
      cssClass(sortKey() == key ? "active" : "");
    }, sortKey);
    return cssClass;
  };
  const arrowCssClass = (key: string) => {
    const cssClass = fidan.value("");
    fidan.compute(() => {
      cssClass("arrow " + (sortOrders[key] > 0 ? "asc" : "dsc"));
    }, sortKey);
    return cssClass;
  };

  return fidan.html`
    <table>
        <thead>
            <tr>
            ${fidan.htmlArrayMap(
              columns,
              key => fidan.html`
                <th
                onclick="${() => sortBy(key)}" 
                class="${thCssClass(key)}">
                    ${capitalize(key)}
                    <span class="${arrowCssClass(key)}" >
                    </span>
                </th>
                `
            )}
            </tr>
        </thead>
        <tbody>
            ${fidan.htmlArrayMap(
              filteredHeroes,
              entry => fidan.html`
                <tr>
                ${fidan.htmlArrayMap(
                  columns,
                  key => fidan.html`<td>${entry[key]}</td>`
                )}
                </tr>
                `
            )}
        </tbody>
    </table>
    `;
};

// utility functions
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// app & data
const data = {
  searchQuery: fidan.value(""),
  gridColumns: fidan.array(["name", "power"]),
  gridData: fidan.array([
    { name: "Chuck Norris", power: Infinity },
    { name: "Bruce Lee", power: 9000 },
    { name: "Jackie Chan", power: 7000 },
    { name: "Jet Li", power: 8000 }
  ])
};

const app = fidan.html`
<div>
    <form id="search">
        Search 
        <input 
            name="query"
            oninput="${e => data.searchQuery(e.target.value)}" 
            autocomplete="off">
    </form>
    ${demoGrid(data.gridColumns, data.gridData, data.searchQuery)}
    <hr>
    <a href="https://vuejs.org/v2/examples/grid-component.html" target="_blank">Vue version</a>
</div>
`;
document.getElementById("main").appendChild(app);
