import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS"; 
export const GET_ALL_TYPES = "GET_ALL_TYPES";

export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";

export const CREATE_POKEMON = "CREATE_POKEMON";

export const FILTER_TYPES = "FILTER_TYPES";
export const FILTER_POKEMONS_FROM_API = "FILTER_POKEMONS_FROM_API";
export const FILTER_POKEMONS_FROM_DB = "FILTER_POKEMONS_FROM_DB";

export const ORDER_BY_NAME_ASC = "ORDER_BY_NAME_ASC";
export const ORDER_BY_NAME_DESC = "ORDER_BY_NAME_DESC";
export const ORDER_BY_ATTACK_ASC = "ORDER_BY_ATTACK_ASC";
export const ORDER_BY_ATTACK_DESC = "ORDER_BY_ATTACK_DESC";

// export const CLEAR_FILTERS = "CLEAR_FILTERS"; 

// Orden extra
// export const ORDER_SPEED_ASC = "ORDER_SPEED_ASC";
// export const ORDER_SPEED_DESC = "ORDER_SPEED_DESC";


const URL_POKEMONS = "http://localhost:3001/pokemon";
const URL_TYPES = "http://localhost:3001/type";


// Get pokemons
export const getAllPokemons = () => {
  return async (dispatch) => {
    try {
      return await axios
        .get(`${URL_POKEMONS}`)
        .then((response) =>
          dispatch({ type: GET_ALL_POKEMONS, payload: response.data })
        );
    } catch (error) {
      console.log("Actions-getAllPokemons error", error);
    }
  };
};

export const getPokemonById = (id) => {
  return async (dispatch) => {
    try {
      return await axios
        .get(`${URL_POKEMONS}/${id}`)
        .then((response) =>
          dispatch({ type: GET_POKEMON_BY_ID, payload: response.data })
        );
    } catch (error) {
      console.log("Actions-getPokemonById error", error);
    }
  };
};

export const getPokemonByName = (name) => {
  return async (dispatch) => {
    try {
      return await axios
        .get(`${URL_POKEMONS}?name=${name}`)
        .then((response) =>
          dispatch({ type: GET_POKEMON_BY_NAME, payload: response.data }) 
        );
    } catch (error) {
      alert("Pokemon not found, try a different name.", error);
      console.log("Actions-getPokemonByName error", error);
    }
  };
};


// Create pokemon
export const createPokemon = (pokemon) => {
  return async (dispatch) => {
    try {
      return await axios
        .post(`${URL_POKEMONS}`, pokemon)
        .then((response) => {
          dispatch({ type: CREATE_POKEMON, payload: response.data })
        })
    } catch (error) {
      console.log("Actions-createPokemon error", error);
    }
  }
};


// Get types
export const getAllTypes = () => {
  return async (dispatch) => {
    try {
      return await axios
        .get(`${URL_TYPES}`)
        .then((response) =>
          dispatch({ type: GET_ALL_TYPES, payload: response.data })
        );
    } catch (error) {
      console.log("Actions-getAllTypes error", error);
    }
  };
};


// ----------------Filtrados y ordenamientos---------------- //
// Filter by type
export const filterTypes = (type) => {
  return { type: FILTER_TYPES, payload: type }
};


// Filter by origin
export const getPokemonsFromApi = () => {
  return async (dispatch) => {
    try {
        return await axios
          .get(`${URL_POKEMONS}/pokemonsApi`)
          .then((response) => 
            dispatch({ type: FILTER_POKEMONS_FROM_API, payload: response.data })
          );
    } catch (error) {
        console.log("Actions-getPokemonsFromApi error", error);
    }
  }
};

export const getPokemonsFromDb = () => {
  return async (dispatch) => {
    try {
        return await axios
          .get(`${URL_POKEMONS}/pokemonsDb`)
          .then((response) => 
            dispatch({ type: FILTER_POKEMONS_FROM_DB, payload: response.data })
          );
    } catch (error) {
        console.log("Actions-getPokemonsFromDb error", error);
    }
  }
};


// Order by name
export const orderByNameAsc = (payload) => {
  return { type: ORDER_BY_NAME_ASC, payload }
};

export const orderByNameDesc = (payload) => {
  return { type: ORDER_BY_NAME_DESC, payload }
};


// Order by attack
export const orderByAttackAsc = () => {
  return async (dispatch) => {
    try {
        return await axios
          .get(`${URL_POKEMONS}/orderAttackAsc`)
          .then((response) => 
            dispatch({ type: ORDER_BY_ATTACK_ASC, payload: response.data })
          );
    } catch (error) {
        console.log("Actions-orderByAttackAsc error", error);
    }
  }
};

export const orderByAttackDesc = () => {
  return async (dispatch) => {
    try {
        return await axios
          .get(`${URL_POKEMONS}/orderAttackDesc`)
          .then((response) => 
            dispatch({ type: ORDER_BY_ATTACK_DESC, payload: response.data })
          );
    } catch (error) {
        console.log("Actions-orderByAttackDesc error", error);
    }
  }
};


// Clear filters
// export const deletePokemonFilter = () => {
//   try {
//     return { type: CLEAR_FILTERS, payload: [] }
//   } catch (error) {
//     console.log("Actions-clearFilters error", error);
//   }
//  }; 
