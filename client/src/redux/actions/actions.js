import axios from "axios";

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";

export const CREATE_POKEMON = "CREATE_POKEMON";
export const DELETE_POKEMON = "DELETE_POKEMON";

export const FILTER_TYPES = "FILTER_TYPES";
export const FILTER_POKEMONS_FROM_API = "FILTER_POKEMONS_FROM_API";
export const FILTER_POKEMONS_FROM_DB = "FILTER_POKEMONS_FROM_DB";

export const SORT_BY_ATTACK_ASC = "SORT_BY_ATTACK_ASC";
export const SORT_BY_ATTACK_DESC = "SORT_BY_ATTACK_DESC";
export const SORT_BY_NAME_ASC = "SORT_BY_NAME_ASC";
export const SORT_BY_NAME_DESC = "SORT_BY_NAME_DESC";
export const SORT_BY_SPEED_ASC = "SORT_BY_SPEED_ASC"; 
export const SORT_BY_SPEED_DESC = "SORT_BY_SPEED_DESC"; 

export const CLEAR_FILTERS = "CLEAR_FILTERS";

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
      console.log("Actions-getPokemonByName error", error);
    }
  };
};


// Create pokemon
export const createPokemon = (pokemon) => {
  return async (dispatch) => {
    try {
      return await axios.post(`${URL_POKEMONS}`, pokemon).then((response) => {
        dispatch({ type: CREATE_POKEMON, payload: response.data });
      });
    } catch (error) {
      console.log("Actions-createPokemon error", error);
    }
  };
};


// Delete pokemon
export const deletePokemon = (id) => {
  try {
    return { type: DELETE_POKEMON, payload: id }
  } catch (error) {
    console.log("Actions-deletePokemon error", error);
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


// ----------------- Filtering and Sorting ----------------- //

// Filter by type
export const filterTypes = (type) => {
  return { type: FILTER_TYPES, payload: type };
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
  };
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
  };
};


// Sort by name
export const sortByNameAsc = () => {
  return { type: SORT_BY_NAME_ASC }; 
};

export const sortByNameDesc = () => {
  return { type: SORT_BY_NAME_DESC };
};


// Sort by attack
export const sortByAttackAsc = () => { 
  return { type: SORT_BY_ATTACK_ASC }
};

export const sortByAttackDesc = () => { 
  return { type: SORT_BY_ATTACK_DESC }
};


// Sort by name
export const sortBySpeedAsc = () => {
  return { type: SORT_BY_SPEED_ASC };
};

export const sortBySpeedDesc = () => { 
  return { type: SORT_BY_SPEED_DESC };
};


// Clear filters
export const clearFilters = () => {
  try {
    return { type: CLEAR_FILTERS, payload: [] };
  } catch (error) {
    console.log("Actions-clearFilters error", error);
  }
};
