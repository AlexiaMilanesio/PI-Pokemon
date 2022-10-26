const axios = require("axios");
const { Pokemon, Type } = require("../db"); // Model import

const url = "https://pokeapi.co/api/v2/pokemon";
const limit = 40;


// Get pokemons
const getPokemonsFromApi = async () => {
  try {
    const pokemonApi = await axios
      .get(`${url}?offset=0&limit=${limit}`)
      .then((response) => response.data.results);

    const detailedPokemonApi = pokemonApi.map(
      async (p) => await axios.get(`${p.url}`)
    );

    const pokemonsInfo = await axios.all(detailedPokemonApi);

    let pokemonsFromApi = pokemonsInfo.map((p) => {
      return {
        id: p.data.id,
        name: p.data.name,
        hp: p.data.stats[0].base_stat,
        attack: p.data.stats[1].base_stat,
        defense: p.data.stats[2].base_stat,
        speed: p.data.stats[5].base_stat,
        height: p.data.height,
        weight: p.data.weight,
        image: p.data.sprites.other.dream_world.front_default,
        types: p.data.types.map((t) => {
          return { name: t.type.name };
        }),
      };
    });

    return pokemonsFromApi;
  } catch (error) {
    console.log("There's been an error while trying to get the pokemons from the API: " + error);
  }
};


const getPokemonsFromDb = async () => {
  try {
    return await Pokemon.findAll({
      include: { 
        model: Type,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    });
  } catch (error) {
    console.log("There's been an error while trying to get the pokemons from the DB: " + error);
  }
};


const getAllPokemons = async () => {
  try {
    let pokemonsFromApi = await getPokemonsFromApi();
    let pokemonsFromDb = await getPokemonsFromDb();
    let allPokemons = pokemonsFromApi.concat(pokemonsFromDb);

    return allPokemons;
  } catch (error) {
    console.log("There's been an error while trying to get all pokemons: " + error);
  }
};



// Get pokemon by id
const getPokemonFromApiById = async (id) => {
  try {
    const detailedPokemonApi = await axios.get(`${url}/${id}`)
      .then(response => response.data);
      
    if (!detailedPokemonApi) return null;

    return {
      id: detailedPokemonApi.id,
      name: detailedPokemonApi.name,
      hp: detailedPokemonApi.stats[0].base_stat,
      attack: detailedPokemonApi.stats[1].base_stat,
      defense: detailedPokemonApi.stats[2].base_stat,
      speed: detailedPokemonApi.stats[5].base_stat,
      height: detailedPokemonApi.height,
      weight: detailedPokemonApi.weight,
      image: detailedPokemonApi.sprites.other.dream_world.front_default,
      types: detailedPokemonApi.types.map((t) => {
        return { name: t.type.name };
      }),
    };
  } catch (error) {
    console.log(`Pokemon with id: ${id} not found in API`);
  }
};


const getPokemonFromDbById = async (id) => {
  try {
    const pokemonFromDb = await Pokemon.findOne({
      where: { id },
      include: {
        model: Type,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    });

    if (!pokemonFromDb) return null;

    return pokemonFromDb;
  } catch (error) {
    console.log(`Pokemon with id: ${id} not found in DB`);
  }
};


const getPokemonById = async (id) => {
  try {
    let pokemonApiById = await getPokemonFromApiById(id);
    let pokemonDbById = await getPokemonFromDbById(id);
    let pokemonById;
    
    if (!pokemonApiById) {
      if (!pokemonDbById) return "Pokemon not found";
      pokemonById = pokemonDbById;
    } else {
      pokemonById = pokemonApiById;
    }

    return pokemonById;
  } catch (error) {
    console.log("There's been an error while trying to get pokemon by id: " + error);
  }
};



// Get pokemon by name
const getPokemonFromApiByName = async (name) => {
  try {
    const detailedPokemonApi = await axios.get(`${url}/${name}`)
      .then(response => response.data);

    if (!detailedPokemonApi) return null;

    return {
      id: detailedPokemonApi.id,
      name: detailedPokemonApi.name,
      hp: detailedPokemonApi.stats[0].base_stat,
      attack: detailedPokemonApi.stats[1].base_stat,
      defense: detailedPokemonApi.stats[2].base_stat,
      speed: detailedPokemonApi.stats[5].base_stat,
      height: detailedPokemonApi.height,
      weight: detailedPokemonApi.weight,
      image: detailedPokemonApi.sprites.other.dream_world.front_default,
      types: detailedPokemonApi.types.map((t) => {
        return { name: t.type.name };
      }),
    };
  } catch (error) {
    console.log(`Pokemon ${name} not found in API`);
  }
};


const getPokemonFromDbByName = async (name) => {
  try {
    const pokemonFromDb = await Pokemon.findOne({
      where: { name },
      include: {
        model: Type,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    });

    if(!pokemonFromDb) return null;

    return pokemonFromDb;
  } catch (error) {
    console.log(`Pokemon ${name} not found in DB`);
  }
};


const getPokemonByName = async (name) => {
  try {
    let pokemonApiByName = await getPokemonFromApiByName(name);
    let pokemonDbByName = await getPokemonFromDbByName(name);
    let pokemonByName;

    if (!pokemonApiByName) {
      if (!pokemonDbByName) return "Pokemon not found";
      pokemonByName = pokemonDbByName;
    } else {
      pokemonByName = pokemonApiByName;
    }

    return pokemonByName;
  } catch (error) {
    console.log("There's been an error while trying to get pokemon by name: " + error);
  }
};



// Create new pokemon
const createPokemon = async (name, hp, attack, defense, speed, height, weight, image, types) => {
  try {
    const newPokemon = await Pokemon.create({
      name, hp, attack, defense, speed, height, weight, image
    });

    const newPokemonTypes = await Type.findAll({ 
      where: { name: types },
    });

    return await newPokemon.addType(newPokemonTypes);   
  } catch (error) {
    console.log("There's been an error while creating your pokemon: " + error);
  }
};



module.exports = {
  getPokemonsFromApi,
  getPokemonsFromDb,
  getAllPokemons,
  getPokemonById,
  getPokemonByName,
  createPokemon,
};
