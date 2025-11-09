const mongoose = require( "mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String },
    imageUrl: { type: String },
    likes: [{ type: String }], // usernames of users who liked
    comments: [
      {
        username: String,
        text: String,
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
