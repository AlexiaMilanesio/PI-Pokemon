const axios = require("axios");
// Model import
const { Type } = require("../db");

const url = "https://pokeapi.co/api/v2/type";


const getTypes = async () => {
  try {
    // Request types to API
    const typesApi = await axios.get(`${url}`);

    let typesList = typesApi.data.results.map((t) => {
      return {
        id: t.url.split("/")[6],
        name: t.name,
      };
    });

    // Adding types to DB if they don't already exist
    typesList.forEach((type) => {
      Type.findOrCreate({
        where: { id: type.id, name: type.name },
      });
    });
    
    // Search for all types in DB and return them
    let types = await Type.findAll();
    return types;
  } catch (error) {
    console.log("There's been an error while getting the types", error);
  }
};


module.exports = { getTypes };
