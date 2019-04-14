import { fidan } from "@fidanjs/runtime";

const mainDiv = document.getElementById("main");
var backButton = fidan.html`
<button id="example-back">&lt;-- Back --</button>
<hr>
`;

backButton.querySelector("#example-back").addEventListener("click", () => {
  window.location.href = "/";
});
mainDiv.prepend(backButton);
