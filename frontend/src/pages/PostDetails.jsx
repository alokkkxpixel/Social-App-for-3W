import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import API from "../api/axiosConfig";
import CommentCard from "../Components/commentCard";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  const getPost = async () => {
    const res = await API.get(`/posts/${id}`);
    setPost(res.data);
  };

  const addComment = async () => {
    await API.post(`/posts/comment/${id}`, { text: comment });
    setComment("");
    getPost();
  };

  useEffect(() => {
    getPost();
  }, []);

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h6" gutterBottom>{post.text}</Typography>
      {post.comments?.map((c, i) => (
        <CommentCard key={i} comment={c} />
      ))}
      <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          label="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="contained" onClick={addComment}>Send</Button>
      </Box>
    </Container>
  );
}
