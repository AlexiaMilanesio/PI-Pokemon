import React from "react";
// import icons from "../../images/icons";
import pokemonName from "../../images/pokemon-name-logo.png";
import "./PokemonCard.css";

const PokemonCard = ({ image, name, types }) => {
  return (
    <div className="pokemon-card">
      <img src={pokemonName} alt="Pokemon" className="card-pokemon-name-image"/>
      <img src={image} alt={name} className="pokemon-image"/>
   
      <h4 className="pokemon-name">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h4>
      <div>
        {types && types.map((type, index) => {
          return (
            <div key={index} className="types-container">
              {/* <img src={icons + "/" + type.name + ".svg"} alt="Type logo" /> */}
              <p className="type-name">
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default PokemonCard;
