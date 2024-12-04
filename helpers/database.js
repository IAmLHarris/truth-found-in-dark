const dotenv = require("dotenv");
dotenv.config();

const MongoClient = require("mongodb").MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    console.log("Database already initiated");
    return callback(null, database);
  }
  MongoClient.connect(process.env.uri)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error("No database!");
  }

  return database;
};

module.exports = { initDb, getDatabase };
