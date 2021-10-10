import { useState, useEffect } from "react";
import "./App.css";

import Profile from "./Components/Profile";

function App() {
  const [listen, setListen] = useState("");
  const [user, setUser] = useState("");
  const [userState, setUserState] = useState(user);
  const [display, setDisplay] = useState("none");

  const handleChangeInput = (e) => {
    if (e.key === "Enter") {
      setUser(e.target.value);
    }
  };

  const handleChange = (e) => {
    setListen(e.target.value);
  };
  const handleChangeButton = (e) => {
    e.preventDefault();
    if (listen === "") {
      setDisplay("none");
      setTimeout(() => {
        setDisplay("flex");
      }, 100);
    } else {
      setUser(listen);
      setDisplay("none");
    }
  };
  useEffect(() => {
    setUserState(user);
  }, [user]);
  return (
    <div className='App'>
      <header className='App-header animate__slideOutDown'>
        <div className='cont-head'>
          <i className='fab fa-github'></i>
          <h1>OctoProfile</h1>
        </div>
        <form action='' className='cont-search'>
          <button className='icon-search' onClick={handleChangeButton}>
            <i className='fas fa-search'></i>
          </button>
          <input
            className='input-search'
            type='text'
            onChange={handleChange}
            onKeyPress={handleChangeInput}
          />
          <button className='button-search' onClick={handleChangeButton}>
            Search
          </button>
        </form>
        <div
          className='msg-error animate__bounceIn'
          style={{ display: `${display}` }}
        >
          <i className='fas fa-exclamation'></i> No a ingresado ningun nombre de
          usuario
        </div>
      </header>
      <div className='cont-profile'>
        {user === "" ? console.log("J") : <Profile name={userState} />}
      </div>
    </div>
  );
}

export default App;
