import { Container, Box, TextField, Button, Typography } from "@mui/material";
import Navbar from "../Components/Navbar";
import PostCard from "../Components/PostCard";
import API from "../api/axiosConfig";
import { useEffect, useState } from "react";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  const fetchPosts = async () => {
    const { data } = await API.get("/posts/all");
    setPosts(data);
  };

  const handlePost = async () => {
    await API.post("/posts/create", { text });
    setText("");
    fetchPosts();
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    <>
   
      <Container sx={{ mt: 3 }}>
        <Box sx={{ mb: 3, p: 2, border: "1px solid #ddd", borderRadius: 3 }}>
          <TextField
            fullWidth
            placeholder="What's on your mind?"
            variant="outlined"
            size="small"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={handlePost} sx={{ mt: 1 }} variant="contained" fullWidth>Post</Button>
        </Box>
        {posts.map((post) => <PostCard key={post._id} post={post} onLike={fetchPosts}/>)}
      </Container>
    </>
  );
}
