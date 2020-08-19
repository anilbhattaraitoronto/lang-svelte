const { Router } = require("express");

const { getLatestPosts } = require("../controllers/postControllers");

const router = Router();

router.get("/latest", getLatestPosts);

module.exports = router;
