const express = require("express");
const router = express.Router();

const inhabController = require("../controllers/inhabitants");
const validation = require("../middleware/validationmid");

// router.get("/", (req, res) => {
//   res.send("Hello! I'm going to be about plants");
// });

router.get("/", inhabController.getPlants);
router.get("/:id", inhabController.getPlant);

router.post("/", validation.check, inhabController.addPlant);
router.put("/:id", validation.check, inhabController.updatePlant);
router.delete("/:id", inhabController.removePlant);

module.exports = router;
