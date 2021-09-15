
import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop'; 
import Order from './component/Order/Order'
import Inventory from './component/Inventory/Inventory'
import Notfound from './component/Notfound/Notfound';
import ProductDetails from './component/ProductDetails/ProductDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Shipment from './component/Shipment/Shipment';
import Login from './component/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';

export const UserContext=createContext();


function App(props) {
  const [loggedInUser, setLoggedInUser]=useState({});
  console.log(loggedInUser);
  return (
    <UserContext.Provider value = {[loggedInUser ,setLoggedInUser]}> 
    <h1>Email: {loggedInUser.email}</h1>
      <Router>
      <Header></Header>
        <Switch>
          <Route exact path='/'>
            <Shop></Shop>
          </Route>
          <Route path="/shop">
          <Shop></Shop>
          </Route>
          <Route path="/order">
            <Order></Order>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path='/product/:productKey'>
            <ProductDetails></ProductDetails>
          </Route>
          <Route path='*'>
            <Notfound></Notfound>
          </Route>
      </Switch>
      </Router>

      </UserContext.Provider>
  );
}

export default App;
