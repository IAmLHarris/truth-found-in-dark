const express = require("express");
const router = express.Router();

const inhabController = require("../controllers/inhabitants");
const validation = require("../middleware/validationmid");

// router.get("/", (req, res) => {
//   res.send("Hello! I'm going to be about rocks");
// });

router.get("/", inhabController.getRocks);
router.get("/:id", inhabController.getRock);

router.post("/", validation.rcheck, inhabController.addRock);
router.put("/:id", validation.rcheck, inhabController.updateRock);
router.delete("/:id", inhabController.removeRock);

module.exports = router;
