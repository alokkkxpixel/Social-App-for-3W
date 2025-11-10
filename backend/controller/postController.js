const { validationResult } = require("express-validator");
const Post = require( "../models/Post.js");
const User = require( "../models/User.js");

// Create a new post
module.exports.createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!text && !imageUrl) {
      return res.status(400).json({ message: "Post must have text or image" });
    }

    const post = await Post.create({
      userId: req.user.id,
      text,
      image
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
// getpost by id

module.exports.getPostById = async (req,res) => {

  try {
     
    const { id} = req.params
    console.log(id)

    const post = await Post.findById(id).populate("userId", "username")

    res.json({message:"Post gotted", post})

  } catch (err) {
    res.status(500).json({message:"Server error" , err})
  }
}


// like and unlike 

module.exports.toggleLike = async (req, res) => {
   const error = validationResult(req)

   if(!error.isEmpty()){
     return res.status(400).json({errors:error.array()})
   }

  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

     const alreadyLiked = post.likedBy.some(
      (like) => like.userId && like.userId.toString() === userId.toString()
    );
 
    if (alreadyLiked) {
      // 👎 Unlike → remove userId and decrement count
      post.likedBy = post.likedBy.filter(
        (like) => like.userId && like.userId.toString() !== userId.toString()
      );
      post.likesCount = Math.max(0, post.likesCount - 1);
    } else {
      // 👍 Like → add userId and increment count
      post.likedBy.push({userId});
      post.likesCount += 1;
    }

    await post.save();
    

    res.status(200).json({
      message: alreadyLiked ? "Unliked" : "Liked",
      likesCount: post.likesCount,
      post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// add comment to post

module.exports.addComment = async (req,res) => {

  const error  = validationResult(req)

  if(!error.isEmpty()){
    return res.status(400).json({errors:error.array()})

  }

  const postId =  req.params.id
  const userId = req.user.id

  try {
 
 const {text} = req.body

    const user  = await User.findById(userId)
    const post  = await Post.findById(postId)

    if(!post) {
      return res.status(404).json({message:"post not found"})
    }
   
    const comment = await post.comments.push({
      userId,
      username:user.username,
      text
    })
     
 await post.save()

 res.status(201).json({message:"comment added successfully!",
  comment,
  post
 })

  } catch (err) {
     res.status(500).json({message:"server error"})
  }
  
}