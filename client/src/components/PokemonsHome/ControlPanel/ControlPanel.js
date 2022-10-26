import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonsFromDb,
  getPokemonsFromApi,
  filterTypes,
  getAllPokemons,
  getAllTypes,
  sortByAttackAsc,
  sortByAttackDesc,
  sortByNameAsc, 
  sortByNameDesc,
  sortBySpeedAsc,
  sortBySpeedDesc,
} from "../../../redux/actions/actions";
import pokemonLogo from "../../../images/pokemon-logo.png";
import "./ControlPanel.css";

const Filters = (props) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [value, setValue] = useState({
    selectOrigin: "", 
    selectType: "",
    selectNameSort: "",
    selectAttackSort: "",
    selectSpeedSort: "",
  });


  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);


  const handleOriginSelection = (e) => {
    setValue({ ...value, selectOrigin: e.target.value })
    if (e.target.value === "All") dispatch(getAllPokemons());
    if (e.target.value === "Existing") dispatch(getPokemonsFromApi());
    if (e.target.value === "Created") dispatch(getPokemonsFromDb());
  };

  const handleTypeSelection = (e) => {
    setValue({ ...value, selectType: e.target.value })
    if (e.target.value === "All") dispatch(getAllPokemons());
    if (e.target.value !== "All") dispatch(filterTypes(e.target.value));
  };

  const handleNameSort = (e) => {
    setValue({ ...value, selectNameSort: e.target.value });
    if (e.target.value === "Asc") dispatch(sortByNameAsc());
    if (e.target.value === "Desc") dispatch(sortByNameDesc());
    props.setOrder(e.target.value); 
  };

  const handleAttackSort = (e) => {
    setValue({ ...value, selectAttackSort: e.target.value })
    if (e.target.value === "Asc") dispatch(sortByAttackAsc()); 
    if (e.target.value === "Desc") dispatch(sortByAttackDesc());
    props.setOrder(e.target.value);
  };

  const handleSpeedSort = (e) => {
    setValue({ ...value, selectSpeedSort: e.target.value })
    if (e.target.value === "Asc") dispatch(sortBySpeedAsc()); 
    if (e.target.value === "Desc") dispatch(sortBySpeedDesc());
    props.setOrder(e.target.value);
  };


  const handleClearFilters = (e) => {
    setValue({
      selectOrigin: "", 
      selectType: "",
      selectNameSort: "",
      selectAttackSort: "",
      selectSpeedSort: "",
    })
    
    dispatch(getAllPokemons());
  }

  
  return (
    <div className="control-panel-container">
      <Link to="/" className="pokemon-logo-container">
        <img src={pokemonLogo} alt="Pokemon logo" className="pokemon-logo" />
      </Link>

      <p className="section-title filter">Filter by:</p>

      {/* Filter by existing pokemon from API or created by the user */}
      <select name="selectOrigin" value={value.selectOrigin} onChange={(e) => handleOriginSelection(e)}>
        <option value="" disabled>Origin</option>
        <option value="All">All</option>
        <option value="Existing">Existing</option>
        <option value="Created">Created</option>
      </select>

      {/* Filter by pokemon type */}
      <select name="selectType" value={value.selectType} onChange={(e) => handleTypeSelection(e)}>
        <option value="" disabled>Type</option>
        <option value="All">All</option>
        {types && types.map((type) => {
          return (
            <option key={type.id} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          );  
        })}
      </select>

      <p className="section-title order">Sort by:</p>

      {/* Sort by name */}
      <select name="selectNameSort" value={value.selectNameSort} onChange={(e) => handleNameSort(e)}>
        <option value="" disabled>Name</option>
        <option value="Asc">Ascending &#40;A-Z&#41;</option>
        <option value="Desc">Descending &#40;Z-A&#41;</option>
      </select>

      {/* Sort by attack */}
      <select name="selectAttackSort" value={value.selectAttackSort} onChange={(e) => handleAttackSort(e)}>
        <option value="" disabled>Attack</option>
        <option value="Asc">Ascending &#40;A-Z&#41;</option>
        <option value="Desc">Descending &#40;Z-A&#41;</option>
      </select>

      {/* Sort by speed */}
      <select name="selectSpeedSort" value={value.selectSpeedSort} onChange={(e) => handleSpeedSort(e)}>
        <option value="" disabled>Speed</option>
        <option value="Asc">Ascending &#40;A-Z&#41;</option>
        <option value="Desc">Descending &#40;Z-A&#41;</option>
      </select>


      <button className="clear-filters-btn" onClick={(e) => handleClearFilters(e)}>
        {/* <ion-icon name="trash"></ion-icon> */}
        <p>Clear filters</p>
      </button>
    </div>
  );
};

export default Filters;
