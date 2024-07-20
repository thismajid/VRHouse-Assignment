const express = require("express");

const apiDocs = require("./doc.route");
const authRoutes = require("./auth.route");

const router = express.Router();

router.use("/docs", apiDocs);
router.use("/auth", authRoutes);

module.exports = router;
