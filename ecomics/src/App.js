import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComicsRequest } from "./state/comics";

function App() {

const dispatch = useDispatch();
  const comics = useSelector((state) => state.comics);

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
      <header className="App-header">
       <img src="https://pa1.narvii.com/6927/973868bc9d5ec592e6aaa7195c7c7a1a3bd115e8r1-500-267_hq.gif"></img>
      </header>
      <div>
      <form className="search" onSubmit={(e) => handleSubmit(e)}>
        <h3>Buscate una peli:</h3>
        <input
          placeholder="Mandale la peli"
          onChange={(e) => handleChange(e)}
        ></input>
      </form>
      <div className="container row">
          {comics.map((singleComic) => (
            console.log("1", singleComic),
            console.log("ID", singleComic.id),
            console.log("TITLE", singleComic.title),
            console.log("DESCRIPTION",typeof singleComic.description),
        <div className=" col-md-3">
        <div className="card" style={{ width: 250 }}>
          <img src={singleComic.collectionURI} className="card-img-top" alt="..."></img>
          <div className="card-body">
            <h5 className="card-title">{singleComic.title}</h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Description:{singleComic.description}</li>
            <li className="list-group-item">ID: {singleComic.id}</li>
          </ul>
          <div className="card-body">
      
              <button>+ Info</button>
    
            <button className="card-link">Add to Favourite</button>
          </div>
        </div>
      </div>
          ))}
          </div>
   
    </div>

    </div>
  );
}

export default App;
