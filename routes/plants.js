const express = require("express");
const router = express.Router();

const inhabController = require("../controllers/inhabitants");
const validation = require("../middleware/validationmid");

// router.get("/", (req, res) => {
//   res.send("Hello! I'm going to be about plants");
// });

router.get("/", inhabController.getPlants);
router.post("/", validation.check, inhabController.addPlant);

module.exports = router;
