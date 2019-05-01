import "../../_examples";
import { html } from "@fidanjs/runtime";

import "./styles.scss";
import { TextAnimation } from "./components/text-animation";

const textAnimation = TextAnimation({
  textColor: "#A20524",
  overlayColor: "#fdc52c",
  text: "BUILD A BETTER FUTURE"
});

const app = html`
  <div class="wrapper">
    ${textAnimation}
    <hr />
    <a
      href="https://github.com/ebrugulec/text-animation-hooks"
      target="_blank"
      style="color:white; font-size:18px"
      >React version</a
    >
  </div>
`;
document.getElementById("main").appendChild(app);
