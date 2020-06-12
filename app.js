const express = require("express");
const app = express();

const db = require("./db/config.js");

// method override for PUT
const methodOverride = require("method-override");

app.use(express.static("public"));
app.use(express.json());
app.use(methodOverride("_method"));

//Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

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
      console.log("Created");
      res.redirect("/todos");
    })
    .catch((error) => {
      res.render("error.ejs", { errorMessage: error.message });
    });
});

// edit route
app.get("/todos/:id/edit", (req, res) => {
  const id = req.params.id;
  db.one({
    text: "select * from todolist where id=$1",
    values: [id],
  })
    .then((data) => {
      res.render("edit.ejs", { data: data });
    })
    .catch((error) => {
      res.render("error.ejs", { errorMessage: error.message });
    });
});

app.put("/todos/:id", (req, res) => {
  const todoName = req.body.todoName;
  const todoCategory = req.body.todoCategory;
  const id = req.params.id;
  db.none({
    text: "update todolist set title=$1, category=$2 where id=$3",
    values: [todoName, todoCategory, id],
  })
    .then(() => {
      res.redirect("/todos");
    })
    .catch((error) => {
      res.render("error.ejs", { errorMessage: error.message });
    });
});


// handling bad routes
app.get("*", (req, res) => {
  res.send("Error 404: Page Not Found");
});
