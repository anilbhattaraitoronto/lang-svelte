const { Router } = require("express");
const { verifyAdmin } = require("../middlewares/verifyAdmin");

const { getLatestPosts, addPost, updatePost, deletePost } = require(
  "../controllers/postControllers",
);

const router = Router();

router.get("/latest", getLatestPosts);
router.post("/addpost", verifyAdmin, addPost);
router.put("/updatepost", verifyAdmin, updatePost);
router.delete("/deletepost", verifyAdmin, deletePost);

module.exports = router;
