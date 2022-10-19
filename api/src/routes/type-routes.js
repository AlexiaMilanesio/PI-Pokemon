const { Router } = require("express");
const { getTypes } = require("../controllers/type-controller");

const router = Router();

// TYPES ROUTES
router.get("/", async (req, res) => {
  try {
    const result = await getTypes();
    res.status(200).send(result);
  } catch (error) {
    return error.message;
  }
});

module.exports = router;
