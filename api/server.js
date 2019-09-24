require("dotenv").config();
const express = require("express");
const cors = require("cors");

const server = express();

// routes
const adsRouter = require("../routes/adsRoutes.js");
const authRoutes = require("../routes/authRoutes.js");
const userRoutes = require("../routes/userRoutes.js");

server.use(cors());
server.use(express.json());

server.use("/api/ads", adsRouter);
server.use("/api/auth", authRoutes);
server.use("/api/users", userRoutes);

server.get("/", (req, res) => {
  res.status(200).json({ message: "API up.." });
});

module.exports = server;
