import {
  GET_ALL_POKEMONS,
  GET_ALL_TYPES,
  GET_POKEMON_BY_ID,
  GET_POKEMON_BY_NAME,
  SEARCH_POKEMON, //TODO
  CREATE_POKEMON,
  DELETE_POKEMON,
  FILTER_TYPES,
  FILTER_SPECIAL_TYPES, //TODO
  FILTER_POKEMONS_FROM_API,
  FILTER_POKEMONS_FROM_DB,
  CLEAR_FILTERS,
  SORT_BY_NAME_ASC,
  SORT_BY_NAME_DESC,
  SORT_BY_ATTACK_ASC,
  SORT_BY_ATTACK_DESC,
  SORT_BY_MORE_ATTACK, //TODO
  SORT_BY_SPEED_ASC,
  SORT_BY_SPEED_DESC,
} from "../actions/actions";

const initialState = {
  pokemons: [],
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
        pokemons: [action.payload],
      };

    case SEARCH_POKEMON: //TODO
      return {
        ...state,
        pokemons: state.pokemons.filter((pokemon) => pokemon.name.includes(action.payload))
      };
      
    case CREATE_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
        pokemonsToFilter: [...state.pokemonsToFilter, action.payload],
      };

    case DELETE_POKEMON:
      return {
        ...state,
        pokemons: state.pokemons.filter(pokemon => pokemon.id !== action.payload),
        pokemonsToFilter: state.pokemonsToFilter.filter(pokemon => pokemon.id !== action.payload),
      }

    case FILTER_TYPES:
      let filteredType = state.pokemonsToFilter.filter((pokemon) => {
        if (pokemon.types) {
          // Creamos un array con todos los nombres de los types
          let typeNames = pokemon.types.map((type) => type.name);
          // Preguntamos si el array de types contiene el type seleccionado por el usuario (devuelve true o false)
          return typeNames.includes(action.payload);
        }
        if (pokemon.typeNames) {
          // Si existe el array de type names en el pokemon, vamos a retornar true o false si el type name seleccionado
          // por el usuario está incluido en dicho array (type names)
          return pokemon.typeNames.includes(action.payload);
        }
        return null;
      });
        
      return {
        ...state,
        pokemons: filteredType === "All" ? state.pokemons : filteredType,
      };

    case FILTER_SPECIAL_TYPES: //TODO
      let filteredSpecial = state.pokemons.filter((pokemon) => {
        if (pokemon.types) {
          let typeNames = pokemon.types.map((type) => type.name);
          // console.log(typeNames)
          // console.log(typeNames.includes("fire") || typeNames.includes("water"))
          return typeNames.includes("fire") || typeNames.includes("water");
        }
        if (pokemon.typeNames) { 
          // console.log(pokemon.typeNames.includes("fire") || pokemon.typeNames.includes("water"))
          return pokemon.typeNames.includes("fire") || pokemon.typeNames.includes("water");
        }
        return null;
      }); 

      return {
        ...state,
        pokemons: filteredSpecial === "All" ? state.pokemons : filteredSpecial,
      }
        
    case FILTER_POKEMONS_FROM_API:
      return {
        ...state,
        pokemons: action.payload,
      };
    
    case FILTER_POKEMONS_FROM_DB:
      return {
        ...state,
        pokemons: action.payload,
      };

    case SORT_BY_NAME_ASC:
      return {
        ...state,
        pokemons: state.pokemons.sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        ),
      };

    case SORT_BY_NAME_DESC:
      return {
        ...state,
        pokemons: state.pokemons.sort((a, b) =>
          a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        ),
      };

    case SORT_BY_ATTACK_ASC:
      return {
        ...state,
        pokemons: state.pokemons.sort((a, b) => a.attack - b.attack),
      };

    case SORT_BY_ATTACK_DESC:
      return {
        ...state,
        pokemons: state.pokemons.sort((a, b) => b.attack - a.attack),
      };

    case SORT_BY_MORE_ATTACK: //TODO
      return {
        ...state,
        pokemons: state.pokemons.filter((pokemon) => pokemon.attack >= 50),
      }

    case SORT_BY_SPEED_ASC:
      return {
        ...state,
        pokemons: state.pokemons.sort((a, b) => a.speed - b.speed),
      };

    case SORT_BY_SPEED_DESC:
      return {
        ...state,
        pokemons: state.pokemons.sort((a, b) => b.speed - a.speed),
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        pokemons: action.payload,
        pokemonsToFilter: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
