import { fidan } from "@fidanjs/runtime";

const mousePosition = fidan.inject({ x: 0, y: 0 });

const app = fidan.html`
<div style="width:100%; height:1000px">
    x: ${mousePosition.x}, y:${mousePosition.y}
</div>
`;

document.body.addEventListener("mousemove", e => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
});

document.getElementById("main").appendChild(app);
