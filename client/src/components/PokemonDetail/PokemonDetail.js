import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePokemon, getPokemonById } from "../../redux/actions/actions";
import Header from "../Header/Header";
import pokemonName from "../../images/pokemon-name-logo.png";
import "./PokemonDetail.css";

const PokemonDetail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const pokemon = useSelector((state) => state.pokemonDetail);
  const pokemonId = props.match.params.id;


  useEffect(() => {
    dispatch(getPokemonById(pokemonId));
  }, [dispatch, pokemonId]);


  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this pokemon?")) {
      dispatch(deletePokemon(id)); // TODO NOT WORKING

      // Redirecting to home page: new entry onto the browser history stack
      history.push("/pokemon"); 
    };
  }


  return (
    <div className="detail-container">
      <Header />

      <div className="detail-content-container">
        <button className="delete-pokemon-btn" onClick={(e) => handleDelete(e)}>Delete</button>

        <div className="pokemon-detail">
          <div className="detail-image-container">
            <img src={pokemonName} alt="Pokemon" className="detail-pokemon-name-image" />
            <img src={`${pokemon.image}`} alt="Pokemon" className="detail-pokemon-image" />
          </div>

          <div className="detail-info-container">
            <div>
              <h4 className="detail-pokemon-name">{pokemon.name}</h4>
              <p className="detail-pokemon-info">Number: <span>{pokemon.id}</span></p>
              <p className="detail-pokemon-info">Hp: <span>{pokemon.hp}</span></p>
              <p className="detail-pokemon-info">Attack: <span>{pokemon.attack}</span></p>
              <p className="detail-pokemon-info">Defense: <span>{pokemon.defense}</span></p>
              <p className="detail-pokemon-info">Speed: <span>{pokemon.speed}</span></p>
              <p className="detail-pokemon-info">Height: <span>{pokemon.height}</span></p>
              <p className="detail-pokemon-info">Weight: <span>{pokemon.weight}</span></p>
              <div className="detail-types-container">
                <p className="types-title">Types: </p> 
                {pokemon.types && pokemon.types.map((type, index) => {
                  return <span key={index} className="detail-pokemon-type">{type.name}</span>;
                })}
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <div className="detail-back-btn-container">
        <Link to="/pokemon" className="link">
          <button className="detail-back-btn">
            <ion-icon name="arrow-round-back"></ion-icon>
            <span>Back</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetail;
