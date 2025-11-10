import { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import API from "../api/axiosConfig";
import PostCard from "../Components/PostCard";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const res = await API.get("/posts/all");
    console.log(res.data)
    setPosts(res.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Social Feed</Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} key={post._id}>
            <PostCard post={post} onLike={getPosts} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
