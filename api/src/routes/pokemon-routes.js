const { Router } = require("express");
const {
  getPokemonsFromApi,
  getPokemonsFromDb,
  getAllPokemons,
  getPokemonById,
  getPokemonByName,
  createPokemon,
} = require("../controllers/pokemon-controller");

const router = Router();


// ---------------------- POKEMON ROUTES ---------------------- //

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const result = await getAllPokemons();
      return res.status(200).send(result);
    }
    
    const result = await getPokemonByName(name);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


// Codeo en vivo
router.get("/prueba", async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      const allPokemons = await getAllPokemons();
      const foundPokemons = allPokemons.filter(pokemon => pokemon.name.includes(name))
      return res.status(200).send(foundPokemons);
    }
  } catch(error) {
    res.status(400).send(error.message);
  }
})


// Filter by origin
router.get("/pokemonsApi", async (req, res) => {
  try {
    const result = await getPokemonsFromApi();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/pokemonsDb", async (req, res) => {
  try {
    const result = await getPokemonsFromDb();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getPokemonById(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.post("/", async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, image, types } = req.body;

    if (!name || !image) // No defaultValue
      return res.status(404).send("Name and image are required to create a new pokemon");

    const result = await createPokemon(
      name, hp, attack, defense, speed, height, weight, image, types
    );
    res.status(201).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});


module.exports = router;
