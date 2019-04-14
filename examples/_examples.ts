import { fidan } from "@fidanjs/runtime";

const mainDiv = document.getElementById("main");
var backButton = fidan.html`
<button>
&lt;-- Back --
</button>
`;

backButton.firstElementChild.addEventListener("click", () => {
  history.go(-1);
});
mainDiv.prepend(backButton);
