const { Router } = require("express");
const { getTypes } = require("../controllers/type-controller");

const router = Router();


// ---------------------- TYPE ROUTES ---------------------- //

router.get("/", async (req, res) => {
  try {
    const result = await getTypes();
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


module.exports = router;
