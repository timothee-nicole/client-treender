import "./App.css";
// import "./App.scss";
import "./style/tailwind.css"
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
import HomePage from "./pages/HomePage";
import HasBasket from "./pages/HasBasket.jsx";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        {/* Account route sends you to SIGN IN or SIGN UP page depending on context */}
        <Route exact path="/account" component={Account} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/product/:id" component={OneTree} />
        <Route exact path="/profile" component={Profile} />
        {/* Protected Route wrapper does not seem to work on this route!!! 27/01/2021 */}
        <ProtectedAdminRoute exact path="/create-tree" component={CreateTree} />
        <ProtectedAdminRoute exact path="/:id/edit" component={EditTree} />
        <ProtectedAdminRoute exact path="/all-tree" component={AllTrees} />
        <ProtectedAdminRoute exact path="/all-users" component={AllUsers} />
        <Route exact path="/cart" component={HasBasket} />
        {/* <Route exact path="/hasBasket" component={Cart} /> */}
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
