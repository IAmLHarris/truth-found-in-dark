const { response } = require("express");
const mongodb = require("../helpers/database");

const ObjectId = require("mongodb").ObjectId;

const getRocks = async (req, res) => {
  // #swagger.tags=['Rock']
  mongodb
    .getDatabase()
    .db("project2")
    .collection("rocks")
    .find()
    .toArray((err) => {
      if (err) {
        res
          .status(400)
          .json({ message: err } || "Error occured while getting rocks!");
      }
    })
    .then((rocks) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(rocks);
    });
};

const getPlants = async (req, res) => {
  // #swagger.tags=['Plant']
  mongodb
    .getDatabase()
    .db("project2")
    .collection("plants")
    .find()
    .toArray((err) => {
      if (err) {
        res
          .status(400)
          .json({ message: err } || "Error occured while getting plants!");
      }
    })
    .then((plants) => {
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
    res.status(500).json(response.error || "Error occured while adding rock!");
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
    res.status(500).json(response.error || "Error occured while adding plant!");
  }
};

module.exports = {
  getRocks,
  getPlants,
  addRock,
  addPlant,
};
