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
  db.any("SELECT * FROM todolist")
    .then((data) => {
      // console.log(data);
      res.render("todos.ejs", { data: data });
    })
    .catch((error) => {
      const errorMessage = "DATABASE NOT CONNECTED: " + error.message;
      res.render("error.ejs", { errorMessage: errorMessage });
    });
});

app.get("/todos/new", (req, res) => {
  res.render("new.ejs");
});

// creating a new todo
app.post("/todos", (req, res) => {
  const todoName = req.body.todoName;
  const todoCategory = req.body.todoCategory;

  // insert a new todo in db here
  db.none({
    text: "INSERT INTO todoList(title, category) VALUES($1, $2)",
    values: [todoName, todoCategory],
  })
    .then(() => {
      console.log("Created")
    })
    .catch((error) => {
      res.render("error.ejs", { errorMessage: error.message });
    });
  res.redirect("/todos");
});

// handling bad routes
app.get("*", (req, res) => {
  res.send("Error 404: Page Not Found");
});
