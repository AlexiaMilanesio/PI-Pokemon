const axios = require("axios");
// Model imports
const { Pokemon, Type } = require("../db");

const url = "https://pokeapi.co/api/v2/pokemon";
const limit = 40;

// Get pokemons
const getPokemonsFromApi = async () => {
  try {
    // Getting array of { name, url } of 40 pokemons
    const pokemonApi = await axios
      .get(`${url}?offset=0&limit=${limit}`)
      .then((response) => response.data.results);

    // Getting array of pokemons info
    const detailedPokemonApi = pokemonApi.map(
      async (p) => await axios.get(`${p.url}`)
    );

    // Solicitudes simultáneas: trae primero la info del pokemon que más rápido responda la petición
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
    console.log("There's been an error while trying to get the pokemons from the API");
    return error.message;
  }
};

const getPokemonsFromDb = async () => {
  try {
    // Guardamos en un array todos los pokemons existentes en la base de datos
    return await Pokemon.findAll({
      include: { // Sequelize JOIN
        model: Type,
        attributes: ["id", "name"],
        through: { attributes: [] }, // Para que no traiga datos de tabla intermedia PokemonType
      },
    });
  } catch (error) {
    console.log("There's been an error while trying to get the pokemons from the DB")
    return error.message;
  }
};

const getAllPokemons = async () => {
  try {
    let pokemonsFromApi = await getPokemonsFromApi();
    let pokemonsFromDb = await getPokemonsFromDb();
    let allPokemons = pokemonsFromApi.concat(pokemonsFromDb);

    return allPokemons;
  } catch (error) {
    console.log("There's been an error while trying to get all pokemons");
    return error.message;
  }
};

// Get pokemon by id
const getPokemonFromApiById = async (idPokemon) => {
  try {
    const detailedPokemonApi = await axios.get(`${url}/${idPokemon}`)
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
    console.log(`Pokemon with id: ${idPokemon} not found in API`);
    return error.message;
  }
};

const getPokemonFromDbById = async (idPokemon) => {
  try {
    const pokemonsFromDb = await Pokemon.findAll({
      where: { id: idPokemon },
      include: {
        model: Type,
        attribute: ["id", "name"],
        through: { attributes: [] },
      },
    });

    return pokemonsFromDb;

    // const pokemonsFromDb = await getPokemonsFromDb();
    // const pokemonFromDbById = await pokemonsFromDb.find({
    //   where: { id: idPokemon }
    // })
    // return pokemonFromDbById;

  } catch (error) {
    console.log(`Pokemon with id: ${idPokemon} not found in DB`);
    return error.message;
  }
};

const getPokemonById = async (idPokemon) => {
  try {
    let pokemonApiById = await getPokemonFromApiById(idPokemon);
    let pokemonDbById = await getPokemonFromDbById(idPokemon);
    let pokemonById;
    
    // TODO BORRAR
    // if (pokemonApiById) return pokemonById = pokemonApiById;
    // if (pokemonDbById) return pokemonById = pokemonDbById;
    // return `Pokemon not found. There's no pokemon with id: ${idPokemon}`;

    if (!pokemonApiById) {
      if (!pokemonDbById) return `Pokemon not found. There's no pokemon with id: ${idPokemon}`;
      pokemonById = pokemonDbById;
    } else {
      pokemonById = pokemonApiById;
    }
    return pokemonById;
  } catch (error) {
    console.log("There's been an error while trying to get pokemon by id");
    return error.message;
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
    return error.message;
  }
};

const getPokemonFromDbByName = async (name) => {
  try {
    return await Pokemon.findAll({
      where: { name },
      include: {
        model: Type,
        attribute: ["id", "name"],
        through: { attributes: [] },
      },
    });
  } catch (error) {
    console.log(`Pokemon ${name} not found in DB`);
    return error.message;
  }
};

const getPokemonByName = async (name) => {
  try {
    let pokemonApiByName = await getPokemonFromApiByName(name);
    let pokemonDbByName = await getPokemonFromDbByName(name);
    let pokemonByName;

    if (!pokemonApiByName) {
      if (!pokemonDbByName)
        return `Pokemon not found. There's no pokemon with name ${name}`;
      pokemonByName = pokemonDbByName;
    } else {
      pokemonByName = pokemonApiByName;
    }
    return pokemonByName;
  } catch (error) {
    console.log("There's been an error while trying to get pokemon by name");
    return error.message;
  }
};

// Create new pokemon
const addNewPokemon = async (name, hp, attack, defense, speed, height, weight, image, types) => {
  try {
    // Creating a new pokemon in DB (at this point, it doesn't have types):
    const newPokemon = await Pokemon.create({
      name, hp, attack, defense, speed, height, weight, image
    });

    // Search types of new pokemon in DB:
    // TODO: preguntar por que "all"
    const newPokemonTypes = await Type.findAll({ 
      where: { name: types },
    });

    // Adding types to new pokemon with sequelize association method "add":
    // (Estos métodos sirven para manejar los datos que vienen del cliente)
    const createdNewPokemon = await newPokemon.addTypes(newPokemonTypes);   
    return createdNewPokemon;
  } catch (error) {
    console.log("There's been an error while while creating your pokemon");
    return error.message;
  }
};

// Order pokemons by speed
const orderAttackAsc = async () => {
  try {
    let allPokemons = await getAllPokemons();
    let pokemonSortedAsc = allPokemons.sort((a, b) => a.attack - b.attack);
    return pokemonSortedAsc;
  } catch (error) {
    console.log("There's been a problem while asc ordering pokemons");
    return error.message;
  }
};

const orderAttackDesc = async () => {
  try {
    let allPokemons = await getAllPokemons();
    let pokemonsSortedDesc = allPokemons.sort((a, b) => b.attack - a.attack);
    return pokemonsSortedDesc;
  } catch (error) {
    console.log("There's been a problem while desc ordering pokemons");
    return error.message;
  }
};


module.exports = {
  getPokemonsFromApi,
  getPokemonsFromDb,
  getAllPokemons,
  getPokemonById,
  getPokemonByName,
  addNewPokemon,
  orderAttackAsc,
  orderAttackDesc
};
