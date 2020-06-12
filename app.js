const express = require("express");
const app = express();

const db = require("./db/config.js");

app.use(express.static("public"));
app.use(express.json());

//Parse URL-encoded bodies
app.use(express.urlencoded());

// server will listen for localhost
app.listen(3000, function () {
  console.log("serving todos app on port 3000");
});

app.get("/", (req, res) => {
  res.redirect("/todos");
});

app.get("/todos", (req, res) => {
    console.log(process.env.DB_USER);
  res.render("todos.ejs");
  db.any("SELECT * FROM todolist")
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
});

app.get("/todos/new", (req, res) => {
  res.render("new.ejs");
});

// creating a new todo
app.post("/todos", (req, res) => {
  const todoName = req.body.todoName;
  const todoCategory = req.body.todoCategory;
  console.log(todoName);
  console.log(todoCategory);
  // create a new todo in db here

  res.redirect("/todos");
});

// handling bad routes
app.get("*", (req, res) => {
  res.send("Error 404: Page Not Found");
});
