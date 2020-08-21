const { Router } = require("express");
const { verifyAdmin } = require("../middlewares/verifyAdmin");

const { getLatestPosts, addPost, updatePost, deletePost } = require(
  "../controllers/postControllers",
);

const router = Router();

router.get("/latest", getLatestPosts);
router.post("/addpost", verifyAdmin, addPost);
router.post("/updatepost/:id", verifyAdmin, updatePost);
router.delete("/deletepost/:id", verifyAdmin, deletePost);

module.exports = router;
