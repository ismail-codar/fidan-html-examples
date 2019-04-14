import { fidan } from "@fidanjs/runtime";

const mainDiv = document.getElementById("main");
var backButton = fidan.html`
<button>
&lt;-- Back --
</button>
`;

backButton.firstElementChild.addEventListener("click", () => {
  window.location.href = "/";
});
mainDiv.prepend(backButton);
