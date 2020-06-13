const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT || 8081;
const app = express();
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "dist")));
app.use(cors());
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(port);
