import './App.css';
import './App.scss';
import { Route, Switch } from 'react-router-dom'
import Signup from './pages/Signup';
import FormSignin from './components/auth/FormSignin';
import NavMain from './components/NavMain';
import Products from './pages/Products';
import ProtectedAdminRoute from './components/auth/ProtectedAdminRoute';
import CreateTree from './pages/CreateTree';
import AllTrees from './pages/AllTrees';
import EditTree from './pages/EditTree';
import OneTree from './pages/OneTree';

function App() {
  return (
    <div className="App">
    <NavMain />
    <Switch>
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/signin' component={FormSignin}/>
      <Route exact path='/products' component={Products}/>
      <Route exact path='/product/:id' component={OneTree}/>
      <ProtectedAdminRoute exact path='/create-tree' component={CreateTree} />
      <ProtectedAdminRoute exact path='/:id/edit' component={EditTree} />
      <ProtectedAdminRoute exact path='/all-tree' component={AllTrees} />
    </Switch>
    </div>
  );
}

export default App;
