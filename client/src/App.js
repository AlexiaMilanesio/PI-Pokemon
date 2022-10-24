import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import PokemonsHome from "./components/PokemonsHome/PokemonsHome";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";
import AboutPage from "./components/AboutPage/AboutPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/pokemon" component={PokemonsHome} />
          <Route path="/pokemon/:id" component={PokemonDetail} />
          <Route path="/create" component={CreatePokemon} />  
          <Route path="/about" component={AboutPage} />
          <Route path="*" component={NotFoundPage} /> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
