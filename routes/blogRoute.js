const express = require("express");
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require("../controllers/blogController");
const router = express.Router();
const path = require('path')
const {isAuthenticated} = require("../middlewares/authMiddleware");

router.get("/page", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../view/blog.html"));
});
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
