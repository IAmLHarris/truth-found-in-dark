const mongodb = require("../database/database");

const ObjectId = require("mongodb").ObjectId;

const getRocks = async (req, res) => {
  // #swagger.tags=['Rock']
  const result = await mongodb
    .getDatabase()
    .db("project2")
    .collection("rocks")
    .find();
  result.toArray().then((rocks) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(rocks);
  });
};

const getPlants = async (req, res) => {
  // #swagger.tags=['Plant']
  const result = await mongodb
    .getDatabase()
    .db("project2")
    .collection("plants")
    .find();
  result.toArray().then((plants) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(plants);
  });
};

const addRock = async (req, res) => {
  // #swagger.tags=['Rock']
  //   DOES NOT WORK WITHOUT BODY PARSER
  //   USE IT!!!

  const rock = {
    color: req.body.color,
    location: req.body.location,
    name: req.body.name,
    personality: req.body.personality,
  };

  const result = await mongodb
    .getDatabase()
    .db("project2")
    .collection("rocks")
    .insertOne(rock);

  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json("500 Error!");
  }
};

const addPlant = async (req, res) => {
  // #swagger.tags=['Plant']

  const plant = {
    color: req.body.color,
    location: req.body.location,
    name: req.body.name,
    personality: req.body.personality,
  };

  const result = await mongodb
    .getDatabase()
    .db("project2")
    .collection("plants")
    .insertOne(plant);

  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json("500 Error!");
  }
};

module.exports = {
  getRocks,
  getPlants,
  addRock,
  addPlant,
};
