import {
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  GET_POKEMON_BY_ID,
  GET_POKEMON_BY_NAME,
  CREATE_POKEMON,
  FILTER_TYPES,
  FILTER_POKEMONS_FROM_API,
  FILTER_POKEMONS_FROM_DB,
  SORT_BY_NAME_ASC,
  SORT_BY_NAME_DESC,
  SORT_BY_ATTACK_ASC,
  SORT_BY_ATTACK_DESC,
  SORT_BY_SPEED_ASC,
  SORT_BY_SPEED_DESC,
} from "../actions/actions";

const initialState = {
  pokemons: [],
  filteredPokemons: [],
  pokemonsToFilter: [],
  pokemonDetail: {},
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        filteredPokemons: action.payload,
        pokemonsToFilter: action.payload,
      };


    case GET_ALL_TYPES:
      return {
        ...state,
        types: action.payload,
      };


    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonDetail: action.payload, 
      };


    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        filteredPokemons: [action.payload], 
      };
      

    case CREATE_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
        filteredPokemons: [...state.filteredPokemons, action.payload],
        pokemonsToFilter: [...state.pokemonsToFilter, action.payload],
      };


    case FILTER_TYPES:
      let filteredType = state.pokemonsToFilter.filter((pokemon) => {
        if (pokemon.types) {
          let typeNames = pokemon.types.map((type) => type.name);
          return typeNames.includes(action.payload);
        }
        return null;
      });

      return {
        ...state,
        filteredPokemons: filteredType === "All" ? state.pokemonsToFilter : filteredType, 
      };

      
    case FILTER_POKEMONS_FROM_API:
      return {
        ...state,
        filteredPokemons: action.payload, 
      };
    

    case FILTER_POKEMONS_FROM_DB:
      return {
        ...state,
        filteredPokemons: action.payload, 
      };


    case SORT_BY_NAME_ASC:
      return {
        ...state,
        filteredPokemons: state.filteredPokemons.sort((a, b) => 
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        ),
      };


    case SORT_BY_NAME_DESC:
      return {
        ...state,
        filteredPokemons: state.filteredPokemons.sort((a, b) => 
          a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        ),
      };


    case SORT_BY_ATTACK_ASC:
      return {
        ...state,
        filteredPokemons: state.filteredPokemons.sort((a, b) => a.attack - b.attack), 
      };


    case SORT_BY_ATTACK_DESC:
      return {
        ...state,
        filteredPokemons: state.filteredPokemons.sort((a, b) => b.attack - a.attack), 
      };


    case SORT_BY_SPEED_ASC:
      return {
        ...state,
        filteredPokemons: state.filteredPokemons.sort((a, b) => a.speed - b.speed), 
      };


    case SORT_BY_SPEED_DESC:
      return {
        ...state,
        filteredPokemons: state.filteredPokemons.sort((a, b) => b.speed - a.speed), 
      };


    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
