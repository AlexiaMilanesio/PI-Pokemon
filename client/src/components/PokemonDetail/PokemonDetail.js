import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "../../redux/actions/actions";
import NavBar from "../Header/NavBar/NavBar";
import Loading from "../Loading/Loading";
import pokemonName from "../../images/pokemon-name-logo.png";
import "./PokemonDetail.css";

const PokemonDetail = (props) => {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonDetail);
  const pokemonId = props.match.params.id;
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 1500);


  useEffect(() => {
    dispatch(getPokemonById(pokemonId));
  }, [dispatch, pokemonId]);

  
  return (
    <div className="detail-container">
      <NavBar />

      {loading ? <Loading />
        : <div className="detail-content-container">
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
      }

      {loading ? ""
        : <div className="detail-back-btn-container">
          <Link to="/pokemon" className="link">
            <button className="detail-back-btn">
              {/* <ion-icon name="arrow-round-back"></ion-icon> */}
              <span>&#60; Back</span>
            </button>
          </Link>
        </div>
      }
    </div>
  );
};

export default PokemonDetail;
