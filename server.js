const express = require("express");
const cors = require("cors");
const app = express();
const mongodb = require("mongodb");
const dotenv = require("dotenv").config()
const mongoClient = mongodb.MongoClient;
const URL = process.env.DB;
const DB = "batch_37_wd_Tamil";
let users = [];

// console.log(process)
// Midleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.get("/users", async function (req, res) {
  // let qParms = req.query;
  // console.log(qParms);

  // let resUser = [];
  // for (
  //   let index = parseInt(req.query.offset);
  //   index < parseInt(req.query.offset) + parseInt(req.query.limit);
  //   index++
  // ) {
  //   if (users[index]) {
  //     resUser.push(users[index]);
  //   }
  // }

  try {
    // Step 1 : Create a Connection between Nodejs and MongoDB
    const connection = await mongoClient.connect(URL);

    // Step 2 : Select the DB
    const db = connection.db(DB);

    // Step 3 : Select the Collection
    // Step 4 : Do the operation (Create,Update,Read,Delete)
    let resUser = await db.collection("users").find().toArray();

    // Step 5 : Close the connection
    await connection.close();

    res.json(resUser);
  } catch (error) {
    console.log(error);
    // If any error throw error
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/user", async function (req, res) {
  try {
    // Step 1 : Create a Connection between Nodejs and MongoDB
    const connection = await mongoClient.connect(URL);

    // Step 2 : Select the DB
    const db = connection.db(DB);

    // Step 3 : Select the Collection
    // Step 4 : Do the operation (Create,Update,Read,Delete)
    await db.collection("users").insertOne(req.body);

    // Step 5 : Close the connection
    await connection.close();

    res.json({ message: "Data inserted" });
  } catch (error) {
    console.log(error);
    // If any error throw error
    res.status(500).json({ message: "Something went wrong" });
  }

  // req.body.id = users.length + 1;
  // users.push(req.body);
  // res.json({ message: "User Created Successfully" });
});

app.get("/user/:id", async function (req, res) {
  try {
    // Step 1 : Create a Connection between Nodejs and MongoDB
    const connection = await mongoClient.connect(URL);

    // Step 2 : Select the DB
    const db = connection.db(DB);

    // Step 3 : Select the Collection
    // Step 4 : Do the operation (Create,Update,Read,Delete)
    let user = await db.collection("users").findOne({ _id: mongodb.ObjectId(req.params.id) });

    // Step 5 : Close the connection
    await connection.close();

    res.json(user);
  } catch (error) {
    console.log(error);
    // If any error throw error
    res.status(500).json({ message: "Something went wrong" });
  }

  // let userId = req.params.id;
  // let user = users.find((item) => item.id == userId);
  // if (user) {
  //   res.json(user);
  // } else {
  //   res.json({ message: "User not found" });
  // }
});

app.put("/user/:id", async function (req, res) {
  try {
    // Step 1 : Create a Connection between Nodejs and MongoDB
    const connection = await mongoClient.connect(URL);

    // Step 2 : Select the DB
    const db = connection.db(DB);

    // Step 3 : Select the Collection
    // Step 4 : Do the operation (Create,Update,Read,Delete)
    let user = await db.collection("users").findOneAndUpdate({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body })

    // Step 5 : Close the connection
    await connection.close();

    res.json(user);
  } catch (error) {
    console.log(error);
    // If any error throw error
    res.status(500).json({ message: "Something went wrong" });
  }


  // let userId = req.params.id;
  // let userIndex = users.findIndex((item) => item.id == userId);

  // if (userIndex != -1) {
  //   Object.keys(req.body).forEach((item) => {
  //     users[userIndex][item] = req.body[item];
  //   });
  //   res.json({
  //     message: "Done",
  //   });
  // } else {
  //   res.json({
  //     message: "User not found",
  //   });
  // }
});

app.delete("/user/:id", async function (req, res) {
  try {
    // Step 1 : Create a Connection between Nodejs and MongoDB
    const connection = await mongoClient.connect(URL);

    // Step 2 : Select the DB
    const db = connection.db(DB);

    // Step 3 : Select the Collection
    // Step 4 : Do the operation (Create,Update,Read,Delete)
    let user = await db.collection("users").findOneAndDelete({ _id: mongodb.ObjectId(req.params.id) })

    // Step 5 : Close the connection
    await connection.close();

    res.json(user);
  } catch (error) {
    console.log(error);
    // If any error throw error
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(process.env.PORT || 3000);
// URL parameters
// Query Parameters

// nodemon
// npm install -g nodemon
// npm install express
