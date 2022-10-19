const { Router } = require('express');
// Routers imports:
const pokemonRoute = require("./pokemon-routes");
const typeRoute = require("./type-routes");

const router = Router();

// Routers configuration
router.use("/pokemon", pokemonRoute);
router.use("/type", typeRoute);

module.exports = router;