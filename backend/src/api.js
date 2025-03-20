const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello from Netlify Backend!" });
});

app.use("/.netlify/functions/api", router);
module.exports = app;
module.exports.handler = serverless(app);
