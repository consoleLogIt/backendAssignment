const express = require("express");
const router = express.Router();
console.log("route")

router.use('/api',require('./api'))


module.exports = router;