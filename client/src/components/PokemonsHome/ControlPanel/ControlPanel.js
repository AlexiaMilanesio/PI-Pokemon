import React, { useEffect } from "react";
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
  clearFilters,
  sortBySpeedAsc,
  sortBySpeedDesc,
} from "../../../redux/actions/actions";
import pokemonLogo from "../../../images/pokemon-logo.png";
import "./ControlPanel.css";

const Filters = (props) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);


  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);


  const handleOriginSelection = (e) => {
    if (e.target.value === "All") dispatch(getAllPokemons());
    if (e.target.value === "Existing") dispatch(getPokemonsFromApi());
    if (e.target.value === "Created") dispatch(getPokemonsFromDb());
    props.setPage(1);
    props.setOrder(e.target.value); // Setting order in local state for combining filters/sorting
  };

  const handleTypeSelection = (e) => {
    if (e.target.value === "All") dispatch(getAllPokemons());
    dispatch(filterTypes(e.target.value));
    props.setPage(1);
    props.setOrder(e.target.value);
  };

  const handleNameSort = (e) => {
    if (e.target.value === "Asc") dispatch(sortByNameAsc());
    if (e.target.value === "Desc") dispatch(sortByNameDesc());
    props.setPage(1);
    props.setOrder(e.target.value); 
  };

  const handleAttackSort = (e) => {
    if (e.target.value === "Asc") dispatch(sortByAttackAsc()); 
    if (e.target.value === "Desc") dispatch(sortByAttackDesc());
    props.setPage(1);
    props.setOrder(e.target.value);
  };

  const handleSpeedSort = (e) => {
    if (e.target.value === "Asc") dispatch(sortBySpeedAsc()); 
    if (e.target.value === "Desc") dispatch(sortBySpeedDesc());
    props.setPage(1);
    props.setOrder(e.target.value);
  };

  const handleClearFilters = (e) => {
    e.preventDefault();
    // Resetting default values of all select html elements
    document.getElementsByTagName("select").selectedIndex = "";
    dispatch(clearFilters());
    dispatch(getAllPokemons());
  }

  
  return (
    <div className="control-panel-container">
      <Link to="/" className="pokemon-logo-container">
        <img src={pokemonLogo} alt="Pokemon logo" className="pokemon-logo" />
      </Link>

      <p className="section-title filter">Filter by:</p>

      <p className="order-filter-name">Origin</p>
      {/* Filter by existing pokemon from API or created by the user */}
      <select onChange={(e) => handleOriginSelection(e)}>
        <option value="" disabled>Select origin</option>
        <option value="All">All</option>
        <option value="Existing">Existing</option>
        <option value="Created">Created</option>
      </select>

      {/* Sort by pokemon type */}
      <p className="order-filter-name">Type</p>
      <select onChange={(e) => handleTypeSelection(e)}>
        <option value="" disabled>Select type</option>
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
      <p className="order-filter-name">Name</p>
      <select onChange={(e) => handleNameSort(e)}>
        <option value="" disabled>Sort by name</option>
        <option value="NotSorted">Not sorted</option>
        <option value="Asc">Ascending &#40;A-Z&#41;</option>
        <option value="Desc">Descending &#40;Z-A&#41;</option>
      </select>

      {/* Sort by attack */}
      <p className="order-filter-name">Attack</p>
      <select onChange={(e) => handleAttackSort(e)}>
        <option value="" disabled>Sort by attack</option>
        <option value="NotSorted">Not sorted</option>
        <option value="Asc">Ascending &#40;A-Z&#41;</option>
        <option value="Desc">Descending &#40;Z-A&#41;</option>
      </select>

      {/* Sort by speed */}
      <p className="order-filter-name">Speed</p>
      <select onChange={(e) => handleSpeedSort(e)}>
        <option value="" disabled>Sort by speed</option>
        <option value="NotSorted">Not sorted</option>
        <option value="Asc">Ascending &#40;A-Z&#41;</option>
        <option value="Desc">Descending &#40;Z-A&#41;</option>
      </select>


      <button className="clear-filters-btn" onClick={(e) => handleClearFilters(e)}>
        <ion-icon name="trash"></ion-icon>
        <p>Clear filters</p>
      </button>
    </div>
  );
};

export default Filters;
