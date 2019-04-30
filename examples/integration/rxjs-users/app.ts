import { html, htmlArrayMap, array } from "@fidanjs/runtime";

import { from, Subject } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  pluck,
  startWith,
  filter,
  map,
  concatMap,
  toArray,
  combineLatest
} from "rxjs/operators";

const users = ajax(`https://api.github.com/users?per_page=5`)
  .pipe(
    pluck("response"),
    concatMap(res => res),
    filter((item: any) => {
      return item.id !== 3;
    }),
    toArray()
  )
  .subscribe(res => {
    arr(res);
  });

const A = new Subject();
const B = new Subject();
const C = new Subject();

A.next(1);
B.next(2);
// combineLatest(A, B, ([a, b]: any) => {
//   debugger;
//   C.next(a + b);
// });

C.subscribe(val => {
  console.log(val);
});
C.next(2);

const arr = array([]);

const app = html`
  <div>
    ${htmlArrayMap(
      arr,
      user =>
        html`
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="${user.avatar_url}" />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="subtitle is-6">@${user.login}</p>
                </div>
              </div>
            </div>
          </div>
        `
    )}
  </div>
`;
document.getElementById("main").appendChild(app);
