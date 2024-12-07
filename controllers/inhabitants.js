const { response } = require("express");
const mongodb = require("../helpers/database");

const ObjectId = require("mongodb").ObjectId;

const getRocks = async (req, res) => {
  // #swagger.tags=['Rocks']
  /*
            #swagger.description = 'Gets all rocks'
          */
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
const getRock = async (req, res) => {
  // #swagger.tags=['Rocks']
  /*
            #swagger.description = 'Gets individual rock from database based on ID and displays'
          */

  const rockId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db("project2")
    .collection("rocks")
    .find({ _id: rockId });
  result.toArray().then((rocks) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(rocks[0]);
  });
};

const addRock = async (req, res) => {
  // #swagger.tags=['Rocks']
  //   DOES NOT WORK WITHOUT BODY PARSER
  //   USE IT!!!

  /*
            #swagger.description = 'Adds individual rock from database with 7 notabilities'
          */

  const rock = {
    color: req.body.color,
    location: req.body.location,
    name: req.body.name,
    personality: req.body.personality,
    instrument: req.body.instrument,
    size: req.body.size,
    job: req.body.job,
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

const updateRock = async (req, res) => {
  // #swagger.tags=['Rocks']
  /*
            #swagger.description = 'Edits an individual rock from database'
          */
  const rockId = new ObjectId(req.params.id);
  const rock = {
    color: req.body.color,
    location: req.body.location,
    name: req.body.name,
    personality: req.body.personality,
    instrument: req.body.personality,
    size: req.body.personality,
    job: req.body.personality,
  };

  const result = await mongodb
    .getDatabase()
    .db("project2")
    .collection("rocks")
    .replaceOne({ _id: rockId }, rock);

  if (result.modifiedCount) {
    res.status(204).send();
  } else {
    res.status(500).json("500 Error!");
  }
};

const removeRock = async (req, res) => {
  // #swagger.tags=['Rocks']
  /*
            #swagger.description = 'Deletes individual rock from database based on ID'
          */

  const rockId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db("project2")
    .collection("rocks")
    .deleteOne({ _id: rockId });
  if (result.deletedCount) {
    res.status(204).send();
  } else {
    res.status(500).json("500 Error in deletion!");
  }
};

// ---

const getPlants = async (req, res) => {
  // #swagger.tags=['Plants']

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

const getPlant = async (req, res) => {
  // #swagger.tags=['Plants']
  /*
        #swagger.description = 'Gets individual plant from database based on ID and displays'
      */

  const plantId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db("project2")
    .collection("plants")
    .find({ _id: plantId });
  result.toArray().then((plants) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(plants[0]);
  });
};

const addPlant = async (req, res) => {
  // #swagger.tags=['Plants']

  /*
        #swagger.description = 'Adds individual plant to database'
      */

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

const updatePlant = async (req, res) => {
  // #swagger.tags=['Plants']
  /*
        #swagger.description = 'Edits individual plant from database'
      */
  const plantId = new ObjectId(req.params.id);
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
    .replaceOne({ _id: plantId }, plant);

  if (result.modifiedCount) {
    res.status(204).send();
  } else {
    res.status(500).json("500 Error!");
  }
};

const removePlant = async (req, res) => {
  // #swagger.tags=['Plants']
  /*
        #swagger.description = 'Deletes individual plant from database based on ID'
      */

  const plantId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db("project2")
    .collection("plants")
    .deleteOne({ _id: plantId });
  if (result.deletedCount) {
    res.status(204).send();
  } else {
    res.status(500).json("500 Error in deletion!");
  }
};

module.exports = {
  getRocks,
  addRock,
  getRock,
  updateRock,
  removeRock,
  addPlant,
  getPlants,
  getPlant,
  updatePlant,
  removePlant,
};
