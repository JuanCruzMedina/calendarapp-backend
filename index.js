const path = require("path");

const express = require("express");
require("dotenv").config(); // read .env file
const cors = require("cors");
const { dbConnection } = require("./database/config");

const { PORT } = process.env;

const app = express(); // create express server

dbConnection();

app.use(cors());

app.use(express.static("public")); // middleware

app.use(express.json()); // read & parse body

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
