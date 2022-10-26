import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions/actions";
import Header from "../Header/Header";
import ControlPanel from "./ControlPanel/ControlPanel";
import PokemonCard from "../PokemonCard/PokemonCard";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";
import Footer from "../Footer/Footer";
import "./PokemonsHome.css";

const PokemonsHome = (props) => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 1000);

  
  // ------------------------- Pagination -------------------------- //

  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPokemon = page * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const pagination = (pageNumber) => setPage(pageNumber); 
  
  // --------------------------------------------------------------- //


  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);


  return (
    <div className="pokemons-container">
      <Header 
        setPage={setPage} 
        setOrder={setOrder} 
        pokemons={pokemons}
      />

      <div className="pokemons-content">
        <ControlPanel 
          setOrder={setOrder} 
        />

        <div className="main-container">
          <div className="cards-container">
            {loading ? <Loading /> 
              : currentPokemons < 1
              ? <p className="pokemon-not-found-message">
                  There're no pokemons with the applied filter. Please, try a different one.
                </p>
                : currentPokemons[0] === "Pokemon not found"
                ? <p className="pokemon-not-found-message">
                    {`${currentPokemons[0]}, please try a different name.`}
                  </p>
                : currentPokemons.map((pokemon) => {
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
            }
          </div>

          {!loading && currentPokemons[0] !== "Pokemon not found" && currentPokemons.length > 1
            ? <Pagination
                pokemonsPerPage={pokemonsPerPage}
                pokemons={pokemons.length}
                pagination={pagination}
                page={page}
              />
            : ""
          }
          
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PokemonsHome;
