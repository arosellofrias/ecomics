import * as React from "react";
import { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComicsRequest } from "./state/comics";
import Comics from "./components/Comics";
import SingleComic from "./components/SingleComic";
import Carrito from "./components/Carrito";
import LoginUser from "./components/LoginUser";
import Logout from "./components/Logout";
import Ordenes from "./components/Ordenes"
import AdminUsers from './components/AdminUsers'
import SingleOrder from "./components/SingleOrder"
import Error from './components/Error';


import Register from "./components/Register";
import Navbar from "./components/Navbar";
import AdminPage from "./components/AdminPage";
import AdminEdit from "./components/AdminEdit";
import Admin from "./components/Admin"
import AdminCategories from "./components/AdminCategories"
import CategoriesIndex from "./components/CategoriesIndex"
import CategoriaPorNombre from "./components/CategoriaPorNombre"

import AdminCreateProduct from "./components/AdminCreateProduct";

import Checkout from "./components/Checkout";


function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  
  useEffect(() => {
    dispatch(getComicsRequest(), []);
  });

  return (
    <div className="App">
      <Navbar />
      {console.log("ISLOGGEDIN===>", isLoggedIn)}
      <Switch>
        <Route exact path="/" component={Comics}/>
        <Route exact path="/comics" component={Comics} />
        <Route path="/comics/:id" component={SingleComic} />
        <Route path="/checkout" component={Checkout}/ >
        <Route path="/login" component={LoginUser} />
        <Route path="/logout" component={Logout} />
        <Route path="/cart" component={Carrito} />
        <Route path="/register" component={Register} />
        <Route exact path="/admin" component={Admin}/>
        <Route exact path="/admin/productos" component={AdminPage}/>
        <Route path= "/admin/users" component={AdminUsers}/>
        <Route path="/admin/categories" component={AdminCategories} />
        <Route path= "/admin/create" component={AdminCreateProduct}/>
        <Route exact path="/category" component={CategoriesIndex} />
        <Route exact path="/category/:nombre" component={CategoriaPorNombre} />
        <Route path ="/edit/:id" component={AdminEdit}/>
        <Route path ="/order" component={Ordenes} />
        <Route path="/singleOrder/:orderId" component={SingleOrder} />
        <Route path="/404" component={Error}/>

        <Redirect to="/404"/>
      </Switch>
    </div>
  );
}

export default App;
