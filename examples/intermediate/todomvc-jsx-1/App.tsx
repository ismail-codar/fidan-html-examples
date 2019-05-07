import "../../_examples";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { Info } from "./components/Info";

// https://github.com/tastejs/todomvc-app-template/blob/master/index.html

const App = (
  <>
    <section className="todoapp">
      <Header />
      <Main />
      <Footer />
    </section>
    <Info />
  </>
);

document.getElementById("main").appendChild(App as any);
