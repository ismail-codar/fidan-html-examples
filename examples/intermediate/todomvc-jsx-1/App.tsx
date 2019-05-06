import "../../_examples";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { Info } from "./components/Info";

const app = (
  <>
    <section className="todoapp">
      <Header />
      <Main />
      <Footer />
    </section>
    <Info />
  </>
);

document.getElementById("main").appendChild(app as any);
