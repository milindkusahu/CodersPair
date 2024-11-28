const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Home");
});

app.get("/test", (req, res) => {
  res.send("Hello from Test");
});

app.listen(PORT, () => {
  console.log("Server is successfully listening on port", PORT);
});
