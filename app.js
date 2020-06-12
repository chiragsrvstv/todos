const express = require("express");
const app = express();

app.use(express.static("public"));

// server will listen for localhost
app.listen(3000, function () {
  console.log("serving todos app on port 3000");
});

app.get('/', (req, res) => {
    res.redirect('/todos')
})

app.get("/todos", (req, res) => {
    res.render("todos.ejs")
})

