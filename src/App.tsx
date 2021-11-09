import "./App.css";
import { MainViewContainer } from "./components/MainView/MainViewContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CartViewContainer } from "./components/CartView/CartViewContainer";
import { PageNotFound } from "./components/PageNotFound/MainViewContainer";
import { CreateViewContainer } from "./components/CreateView/CreateViewContainer";
import { Header } from "./components/common/Header/Header";
import { EditViewContainer } from "./components/EditView/EditViewContainer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={MainViewContainer} />
          <Route path="/product/:id" component={CartViewContainer} />
          <Route path="/products/create" component={CreateViewContainer} />
          <Route path="/products/:id" component={EditViewContainer} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
