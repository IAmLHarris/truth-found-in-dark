const express = require("express");
const router = express.Router();

const inhabController = require("../controllers/inhabitants");
const validation = require("../middleware/validationmid");

const { authentication } = require("../middleware/authenticate");

// router.get("/", (req, res) => {
//   res.send("Hello! I'm going to be about rocks");
// });

router.get("/", inhabController.getRocks);
router.get("/:id", inhabController.getRock);

router.post("/", authentication, validation.rcheck, inhabController.addRock);
router.put(
  "/:id",
  authentication,
  validation.rcheck,
  inhabController.updateRock
);
router.delete("/:id", authentication, inhabController.removeRock);

module.exports = router;
