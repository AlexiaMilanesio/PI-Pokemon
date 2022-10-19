import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonsFromDb,
  getPokemonsFromApi,
  filterTypes,
  getAllPokemons,
  getAllTypes,
  orderByAttackAsc,
  orderByAttackDesc,
  orderByNameAsc, 
  orderByNameDesc,
} from "../../redux/actions/actions";
import pokemonLogo from "../../images/pokemon-logo.png";
import "./ControlPanel.css";

const Filters = (props) => {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTypes());
  }, [dispatch]);

  const handleOriginSelection = (e) => {
    e.preventDefault();
    if (e.target.value === "All") dispatch(getAllPokemons());
    if (e.target.value === "Existing") dispatch(getPokemonsFromApi());
    if (e.target.value === "Created") dispatch(getPokemonsFromDb());
    props.setPage(1);
  };

  const handleTypeSelection = (e) => {
    e.preventDefault();
    dispatch(filterTypes(e.target.value));
    props.setPage(1);
  };

  const handleNameOrder = (e) => {
    e.preventDefault();
    if (e.target.value === "Asc") dispatch(orderByNameAsc());
    else if (e.target.value === "Desc") dispatch(orderByNameDesc());
    props.setPage(1);
    props.setOrder(e.target.value); // Si lo borro se rompe
  };

  const handleAttackOrder = (e) => {
    e.preventDefault();
    if (e.target.value === "Asc") {
      dispatch(orderByAttackAsc());
      props.setPage(1);
      props.setOrder(e.target.value); // Si lo borro funciona igual
    };
    if (e.target.value === "Desc") {
      dispatch(orderByAttackDesc());
      props.setPage(1);
      props.setOrder(e.target.value); // Si lo borro funciona igual
    };
  };

  return (
    <div className="control-panel-container">
      <Link to="/" className="pokemon-logo-container">
        <img src={pokemonLogo} alt="Pokemon logo" className="pokemon-logo" />
      </Link>

      <p className="section-title filter">Filter by:</p>
      {/* Filter by existing pokemon/from API or created by the user */}
      <select value="" onChange={(e) => handleOriginSelection(e)}>
        <option value="" disabled>Select origin</option>
        <option value="All">All</option>
        <option value="Existing">Existing</option>
        <option value="Created">Created</option>
      </select>

      {/* Filter by pokemon type */}
      <select value="" onChange={(e) => handleTypeSelection(e)}>
        <option value="" disabled>Select type</option>
        {types && types.map((type) => {
          return (
            <option key={type.id} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          );
        })}
      </select>


      <p className="section-title">Order by:</p>
      {/* Order by name */}
      <select value="" onChange={(e) => handleNameOrder(e)}>
        <option value="" disabled>Order by name</option>
        <option value="Asc">Ascending &#40;A-Z&#41;</option>
        <option value="Desc">Descending &#40;Z-A&#41;</option>
      </select>

      {/* Order by attack */}
      <select value="" onChange={(e) => handleAttackOrder(e)}>
        <option value="" disabled>Order by attack</option>
        <option value="Asc">Ascending &#40;A-Z&#41;</option>
        <option value="Desc">Descending &#40;Z-A&#41;</option>
      </select>

      <button className="clear-filters-btn">
        <ion-icon name="trash"></ion-icon>
        Clear filters
      </button>
    </div>
  );
};

export default Filters;
