import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../../redux/actions/actions";
import "./Header.css";

const Header = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");


  const handleChange = (e) => {
    setName(e.target.value.toLowerCase());
  };


  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getPokemonByName(name));
    setName("");
  };


  return (
    <div className="header-container">

      {/* NavBar */}
      <div className="nav-container">
        <Link to="/pokemon" className="link">
          <button className="nav-btn">
            <ion-icon name="home" className="nav-icon"></ion-icon>
            <span>Home</span>
          </button>
        </Link>
        <Link to="/create" className="link">
          <button className="nav-btn">
            <ion-icon name="create" className="nav-icon"></ion-icon>
            <span>Create</span>
          </button>
        </Link>
        <Link to="/about" className="link">
          <button className="nav-btn">
            <ion-icon name="information-circle" className="nav-icon"></ion-icon>
            <span>About</span>
          </button>
        </Link>
      </div>

      {/* SearchBar */}
      <div className="search-engine-container">
        <input
          type="search" 
          placeholder="Search pokemon"
          className="search-input"
          name="name"
          value={name}
          onChange={(e) => handleChange(e)}
        />
        <button 
          type="submit" 
          className="search-pokemon-btn" 
          onClick={(e) => handleSearch(e)}
        >
          Search
        </button>
      </div>

    </div>
  );
};

export default Header;
