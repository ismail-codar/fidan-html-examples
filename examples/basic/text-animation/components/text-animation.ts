import { fidan } from "@fidanjs/runtime";
import { SvgTree } from "./svg-tree";

let containerRef: HTMLElement = null;
const mousePos = fidan.inject({ x: 0, y: 0 });

const handleMouseMove = event => {
  const elem = containerRef;
  const newX = (event.offsetX / elem.clientWidth) * 100;
  const newY = (event.offsetY / elem.clientHeight) * 100;
  mousePos.x = newX;
  mousePos.y = newY;
};

const handleMouseOut = event => {
  mousePos.x = 0;
  mousePos.y = 0;
};

const animatedTextStyle = fidan.compute(
  () => `--maskX: ${mousePos.x};--maskY: ${mousePos.y}`
);

const colorStyle = color => "color:" + color;

export const TextAnimation = ({ textColor, overlayColor, text }) => fidan.html`
<section
    class="animatedTextContainer"
    style="${animatedTextStyle}"
    onmousemove="${handleMouseMove}"
    onmouseout="${handleMouseOut}"
    ref="${element => (containerRef = element)}"
>
    <h1 style="${colorStyle(textColor)}" class="animatedTextContent">
    ${text}
    </h1>
    <h1 style="${colorStyle(overlayColor)}" class="animatedTextContentClone">
    ${text}
    </h1>
    ${SvgTree}
</section>
`;
