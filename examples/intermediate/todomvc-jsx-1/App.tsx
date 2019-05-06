import "../../_examples";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { Info } from "./components/Info";
import { addTodo, todos } from "./store";

const app = (
  <>
    <section className="todoapp">
      <Header addTodo={addTodo} />
      <Main todos={todos} />
      <Footer />
    </section>
    <Info />
  </>
);

document.getElementById("main").appendChild(app as any);
