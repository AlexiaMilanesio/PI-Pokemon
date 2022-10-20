import React from "react";
import pokemonName from "../../images/pokemon-name-logo.png";
import "./PokemonCard.css";

const PokemonCard = ({ image, name, types }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemonName} alt="Pokemon" className="card-pokemon-name-image"/>
      <img src={image} alt={name} className="pokemon-image"/>
   
      <h4 className="pokemon-name">{name}</h4>
      {/*  
        CSS -----> text-transform: capitalize;   
        HTML ----> {name.charAt(0).toUpperCase() + name.slice(1)}  
      */}
      <div>
        {types && types.map((type, index) => {
          return (
            <div key={index} className="types-container">
              <p className="type-name">{type.name}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default PokemonCard;
