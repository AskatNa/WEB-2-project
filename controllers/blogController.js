const connectDB = require('../configs/dbConnection')
const Blog = require('../models/blogModel')
connectDB().then(()=> console.log("Connected for blogs")).catch(() => console.log("Error has occured in blogs"))

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: "Error has occurred" });
    }
};

const getBlogById = async (req, res) => {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: "Invalid blog ID" });
    }
    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });
        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
};

const createBlog = async (req, res) => {
    const { title, body, author } = req.body;
    if (!title || !body || !author) {
        return res.status(400).json({ error: "Title, body, and author are required." });
    }
    try {
        const existingBlog = await Blog.findOne({ title });
        if (existingBlog) {
            return res.status(400).json({ error: "Such blog already exists" });
        }
        const newBlog = new Blog({ title, body, author });
        await newBlog.save();
        res.status(201).json({ message: "Blog created successfully", newBlog });
    } catch (err) {
        res.status(500).json({ error: "Error saving blog post" });
    }
};

const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, body, author } = req.body;

    if (!title || !body || !author) {
        return res.status(400).json({ error: "Title, body, and author are required." });
    }
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: "Invalid blog ID" });
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, { title, body, author }, { new: true });
        if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
        res.status(200).json({ message: "Blog updated successfully", updatedBlog });
    } catch (err) {
        res.status(500).json({ error: "Failed to update blog post" });
    }
};

const deleteBlog = async (req, res) => {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ error: "Invalid blog ID" });
    }

    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete blog post" });
    }
};

module.exports = { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
