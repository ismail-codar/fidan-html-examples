import { fidan, FidanValue, FidanArray } from "@fidanjs/runtime";

type HeroType = {
  name: string;
  power: number;
};

// utility functions
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// demo grid component
export const DemoGrid = (
  columns: FidanArray<string>,
  heroes: FidanArray<HeroType>,
  filterKey: FidanValue<string>
) => {
  const sortKey = fidan.value("");
  const sortOrders = {};
  columns().forEach(function(key) {
    sortOrders[key] = 1;
  });

  // Reactively compute filteredHeroes by filterKey and sortKey
  const filteredHeroes = fidan.compute(
    () => {
      const _sortKey = sortKey();
      const _filterKey = filterKey();
      let _heroes: HeroType[] = heroes();
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

      return _heroes;
    },
    () => [filterKey, sortKey]
  );

  const sortBy = function(key: string) {
    sortKey(key);
    sortOrders[key] = sortOrders[key] * -1;
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
                  class="${fidan.compute(
                    () => (sortKey() == key ? "active" : ""),
                    () => [sortKey]
                  )}">
                      ${capitalize(key)}
                      <span class="${fidan.compute(
                        () => "arrow " + (sortOrders[key] > 0 ? "asc" : "dsc"),
                        () => [sortKey]
                      )}" >
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
