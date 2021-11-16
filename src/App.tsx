import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MainViewContainer } from './components/pages/MainView/MainViewContainer';
import { CartViewContainer } from './components/pages/CartView/CartViewContainer';
import { PageNotFound } from './components/pages/PageNotFound/PageNotFound';
import { CreateViewContainer } from './components/pages/CreateView/CreateViewContainer';
import { Header } from './components/common/Header/Header';
import { EditViewContainer } from './components/pages/EditView/EditViewContainer';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={MainViewContainer} />
          <Route path="/cart" component={CartViewContainer} />
          <Route path="/products/create" component={CreateViewContainer} />
          <Route path="/products/:id" component={EditViewContainer} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
