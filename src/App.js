import "./App.css";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import NavMain from "./components/NavMain";
import Products from "./pages/Products";
import ProtectedAdminRoute from "./components/auth/ProtectedAdminRoute";
import CreateTree from "./pages/CreateTree";
import AllTrees from "./pages/AllTrees";
import EditTree from "./pages/EditTree";
import OneTree from "./pages/OneTree";
import Account from "./pages/Account";
import AllUsers from "./pages/AllUsers";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart.jsx";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/account" component={Account} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/product/:id" component={OneTree} />
        <ProtectedAdminRoute exact path="/create-tree" component={CreateTree} />
        <ProtectedAdminRoute exact path="/:id/edit" component={EditTree} />
        <ProtectedAdminRoute exact path="/all-tree" component={AllTrees} />
        <ProtectedAdminRoute exact path="/all-users" component={AllUsers} />
        <Route exact path="/profile" component={Profile} />
        <ProtectedAdminRoute exact path="/cart" component={Cart} />
      </Switch>
    </div>
  );
}

export default App;
