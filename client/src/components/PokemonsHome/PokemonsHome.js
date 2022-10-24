import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions/actions";
import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";
import PokemonCard from "../PokemonCard/PokemonCard";
import Pagination from "../Pagination/Pagination";
import Footer from "../Footer/Footer";
import "./PokemonsHome.css";

const PokemonsHome = (props) => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  // -------------------------Pagination-------------------------- //

  const [page, setPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const [order, setOrder] = useState("");
  const indexOfLastPokemon = page * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const pagination = (pageNumber) => setPage(pageNumber); 

  // ------------------------------------------------------------- //

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  console.log(currentPokemons)

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
            {currentPokemons[0] !== "Pokemon not found"
              ? currentPokemons.map((pokemon) => {
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
                })
              : <p className="pokemon-not-found-message">
                  {`${currentPokemons[0]}, please try a different name`}
                </p>
            }
          </div>

          <Pagination
            pokemonsPerPage={pokemonsPerPage}
            pokemons={pokemons.length}
            pagination={pagination}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PokemonsHome;
