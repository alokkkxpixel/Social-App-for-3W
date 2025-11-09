const Post = require( "../models/Post.js");
const User = require( "../models/User.js");

// Create a new post
module.exports.createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!text && !imageUrl) {
      return res.status(400).json({ message: "Post must have text or image" });
    }

    const post = await Post.create({
      userId: req.user.id,
      text,
      imageUrl
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all posts
module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "username").sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
