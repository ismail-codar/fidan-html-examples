import { fidan } from "@fidanjs/runtime";

import "./styles.scss";
import { SvgTree } from "./components/svg-tree";
import { TextAnimation } from "./components/text-animation";

const app = fidan.html`
<div class="wrapper">
    ${TextAnimation({
      textColor: "#A20524",
      overlayColor: "#fdc52c",
      text: "BUILD A BETTER FUTURE"
    })}
    <hr>
    <a href="https://github.com/ebrugulec/text-animation-hooks" 
        target="_blank" style="color:white; font-size:18px">React version</a>
</div>
`;
document.getElementById("main").appendChild(app);
