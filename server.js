const express = require("express");
const cors = require("cors")
const app = express();

let users = [];

// Midleware
app.use(express.json());
app.use(cors({
  origin : "http://localhost:3001"
}))

app.get("/users", function (req, res) {
  let qParms = req.query
  console.log(qParms)

  let resUser = []
  for (let index = parseInt(req.query.offset); index < parseInt(req.query.offset) + parseInt(req.query.limit); index++) {
    if(users[index]){
      resUser.push(users[index])
    }
  }

  res.json(resUser);
});

app.post("/user", function (req, res) {
  req.body.id = users.length + 1;
  users.push(req.body);
  res.json({ message: "User Created Successfully" });
});

app.get("/user/:id", function (req, res) {
  let userId = req.params.id;
  let user = users.find((item) => item.id == userId);
  if (user) {
    res.json(user);
  } else {
    res.json({ message: "User not found" });
  }
});

app.put("/user/:id", function (req, res) {
  let userId = req.params.id;
  let userIndex = users.findIndex((item) => item.id == userId);

  if (userIndex != -1) {
    Object.keys(req.body).forEach((item) => {
      users[userIndex][item] = req.body[item];
    });
    res.json({
      message: "Done",
    });
  } else {
    res.json({
      message: "User not found",
    });
  }
});

app.delete("/user/:id", function (req, res) {
  let userId = req.params.id;
  let userIndex = users.findIndex((item) => item.id == userId);
  if (userIndex != -1) {
    users.splice(userIndex, 1);
    res.json({
      message: "User Deleted",
    });
  } else {
    res.json({
      message: "User not found",
    });
  }
});

app.listen(3000);

// URL parameters
// Query Parameters


// nodemon
// npm install -g nodemon
// npm install express