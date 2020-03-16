import React, { useState } from "react";
import Search from "./components/Search";
import Axios from "axios";
import Results from "./components/Results";
import Popup from "./components/Popup";

function App() {
  const [state, setState] = useState({
    s: "",
    results: []
  });
  const apiurl = "http://www.omdbapi.com/?apikey=cc459984";

  const search = e => {
    if (e.key === "Enter") {
      Axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let result = data.Search;
        setState(prevState => {
          return { ...prevState, results: result };
        });
      });
    }
  };

  const handleInput = e => {
    let s = e.target.value;
    setState(prevState => {
      return { ...prevState, s: s };
    });
  };

  const openPopup = id => {
    Axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;
      setState(prevState => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: null };
    });
  };

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />
        {state.selected ? 
          <Popup selected={state.selected} closePopup={closePopup} />
         : null
          }
      </main>
    </div>
  );
}

export default App;
