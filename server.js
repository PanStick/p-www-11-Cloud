var express = require("express");
var bodyParser = require("body-parser");
var users = require("./userDatabase");

var app = express();

// var parser = bodyParser.urlencoded();
var parser = bodyParser.json();

app.use(parser);

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  

app.get("/users", function (req, res) {
  users.getUsers((err, data) => {
    console.log("data: ", data);
    res.end(JSON.stringify(data));
  });
});

app.get("/add_user", function (req, res) {
  const { first_name, last_name } = req.query;
  users.addUser(req.query.first_name, req.query.last_name);
  res.redirect(
    `/profile?first_name=${encodeURIComponent(
      first_name
    )}&last_name=${encodeURIComponent(last_name)}`
  );
});

app.get("/profile", (req, res) => {
  const firstName = req.query.first_name || "Unknown";
  const lastName = req.query.last_name || "User";

  res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Profile</title></head>
        <body>
          <h1>Hello ${firstName} ${lastName}!</h1>
          <a href="/">Go back</a>
        </body>
      </html>
    `);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);
