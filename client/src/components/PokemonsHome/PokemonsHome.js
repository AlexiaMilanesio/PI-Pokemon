import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions/actions";
import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";
import PokemonCard from "../PokemonCard/PokemonCard";
import Pagination from "../Pagination/Pagination";
import "./PokemonsHome.css";

const PokemonsHome = (props) => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  // -------------Pagination-------------- //

  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPokemon = page * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const pagination = (pageNumber) => setPage(pageNumber);

  // ------------------------------------ //

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div className="pokemons-container">
      <Header />

      <div className="pokemons-content">
        <ControlPanel 
          setPage={setPage} 
          setOrder={setOrder} 
        />

        <div className="main-container">
          <div className="cards-container">
            {currentPokemons &&
              currentPokemons.map((pokemon) => {
                return (
                  <Link
                    to={`pokemon/${pokemon.id}`}
                    key={pokemon.id}
                    className="pokemon-card-container"
                  >
                    <PokemonCard
                      key={pokemon.id}
                      image={pokemon.image}
                      name={pokemon.name}
                      types={pokemon.types}
                    />
                  </Link>
                );
              })}
          </div>

          <Pagination
            pokemonsPerPage={pokemonsPerPage}
            pokemons={pokemons.length}
            pagination={pagination}
          />
        </div>
      </div>

      <div className="home-footer">
        <p>Created by Zarina Alexía Milanesio</p>
        <p>Henry Student - 2022</p>
      </div>
    </div>
  );
};

export default PokemonsHome;
