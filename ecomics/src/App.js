import * as React from "react";
import { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComicsRequest } from "./state/comics";
import Comics from "./components/Comics";
import SingleComic from "./components/SingleComic";
import Search from "./components/Search";
import Carrito from "./components/Carrito";
import MangasFilter from "./components/MangasFilter";
import ComicsFilter from "./components/ComicsFilter";
import LoginUser from "./components/LoginUser";
import { Logout } from "./components/Logout";

import Register from "./components/Register";
import Navbar from "./components/Navbar";
import AdminPage from "./components/AdminPage";
import AdminEdit from "./components/AdminEdit";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  /* const [comic, setComic] = React.useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setComic(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getComicsRequest(comic));
  };
 */
  useEffect(() => {
    dispatch(getComicsRequest(), []);
  });

  return (
    <div className="App">
      <Navbar />
      {console.log("ISLOGGEDIN===>", isLoggedIn)}
      <Switch>
        {/* <Route path="/search" component={Search}/> */}
        <Route exact path="/comics" component={Comics} />
        <Route path="/comics/:id" component={SingleComic} />
        <Route path="/login" component={LoginUser} />
        <Route path="/logout" component={Logout} />

        <Route path="/cart" component={Carrito} />
        <Route path="/register" component={Register} />
         <Route path ="/admin" component={AdminPage}/>
        <Route path="/category/mangas" component={MangasFilter} />
        <Route path="/category/comics" component={ComicsFilter} />
        <Route path ="/edit:id" component={AdminEdit}/>

        <Redirect to="/comics" />
      </Switch>
    </div>
  );
}

export default App;
