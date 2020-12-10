import './App.css';
import { Route, Switch } from 'react-router-dom'
import Signup from './pages/Signup';
import FormSignin from './components/auth/FormSignin';
import NavMain from './components/NavMain';
import Products from './pages/Products';

function App() {
  return (
    <div className="App">
    <NavMain />
    <Switch>
      <Route exact path='/signup' component={Signup}/>
      <Route exact path='/signin' component={FormSignin}/>
      <Route exact path='/products' component={Products}/>
    </Switch>
    </div>
  );
}

export default App;
