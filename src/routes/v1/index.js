const express = require("express");

const apiDocs = require("./docs");
const authRoutes = require("./auth");
const userRoutes = require("./user");

const router = express.Router();

router.use("/docs", apiDocs);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

module.exports = router;
