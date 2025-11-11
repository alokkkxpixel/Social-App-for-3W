import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axiosConfig";
import { Container, Box, Typography, TextField, Button, Divider } from "@mui/material";
import Navbar from "../Components/Navbar";
import PostCard from "../Components/PostCard";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  const fetchPost = async () => {
    try {
      const { data } = await API.get(`/posts/${id}`);
      setPost(data.post || data); // handles both `{ post: {...} }` or `{...}`
    } catch (err) {
      console.error("Failed to fetch post:", err);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      await API.post(`/posts/comment/${id}`, { text: comment });
      setComment("");
      fetchPost();
    } catch (err) {
      console.error("Failed to post comment:", err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) return null;

  return (
    <>
 
      <Container sx={{ mt: 2 }}>
        <PostCard post={post} />

        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" mb={1}>
          Comments ({post.comments?.length || 0})
        </Typography>

        {post.comments?.length ? (
          post.comments.map((c, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.primary">
                {c.username || c.userId?.username || "Unknown User"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {c.text}
              </Typography>
              <Divider sx={{ mt: 1 }} />
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No comments yet.
          </Typography>
        )}

        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained" onClick={handleComment}>
            Send
          </Button>
        </Box>
      </Container>
    </>
  );
}
