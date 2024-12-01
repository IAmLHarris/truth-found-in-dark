const express = require("express");
const router = express.Router();
const inhabController = require("../controllers/inhabitants");

// router.get("/", (req, res) => {
//   res.send("Hello! I'm going to be about rocks");
// });

router.get("/", inhabController.getRocks);
router.post("/", inhabController.addRock);

module.exports = router;
