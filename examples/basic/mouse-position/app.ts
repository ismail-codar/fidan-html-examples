import { inject, html } from "@fidanjs/runtime";

const mousePosition = inject({ x: 0, y: 0 });

const app = html`
  <div style="width:100%; height:1000px">
    x: ${mousePosition.x}, y:${mousePosition.y}
  </div>
`;

document.body.addEventListener("mousemove", e => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
});

document.getElementById("main").appendChild(app);
