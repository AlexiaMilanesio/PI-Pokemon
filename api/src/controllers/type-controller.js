const axios = require("axios");
const { Type } = require("../db");

const url = "https://pokeapi.co/api/v2/type";


const getTypes = async () => {
  try {
    const typesApi = await axios.get(`${url}`);

    let typesList = typesApi.data.results.map((t) => {
      return {
        id: t.url.split("/")[6],
        name: t.name,
      };
    });

    typesList.forEach((type) => {
      Type.findOrCreate({
        where: { id: type.id, name: type.name },
      });
    });
    
    let types = await Type.findAll();
    return types;
  } catch (error) {
    console.log("There's been an error while getting the types: " + error);
  }
};


module.exports = { getTypes };
