// src/server.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { handleMessage } = require("./utils/messageHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  try {
    const message = req.body;
    console.log("📩 NEW MESSAGE RECEIVED:", message);
    await handleMessage(message);
    res.status(200).send("OK");
  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).send("Error processing message");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
