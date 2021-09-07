import * as React from "react";
import {Route, Switch, Redirect} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { getComicsRequest } from "./state/comics"; 
import Comics from "./components/Comics"
import SingleComic from "./components/SingleComic";

function App() {

const dispatch = useDispatch();
  const [comic, setComic] = React.useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setComic(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getComicsRequest(comic));
  };
  



  return (
    <div className="App">
      <header>
       <img src="https://pa1.narvii.com/6927/973868bc9d5ec592e6aaa7195c7c7a1a3bd115e8r1-500-267_hq.gif"></img>
      </header>
      <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h3>Buscate una peli:</h3>
        <input
          placeholder="Mandale la peli"
          onChange={(e) => handleChange(e)}
        ></input>
      </form>
   
    </div>
      <Switch>
      <Route exact path="/comics" component={Comics}/>
      <Route path ="/comics/:id" component={SingleComic}/>
      <Redirect to="/comics"/>
      </Switch>  
    </div>
  );
}

export default App;
