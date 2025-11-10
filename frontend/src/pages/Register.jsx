import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import API from "../api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();
  const {user , setUser} = useUser()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res =  await API.post("/auth/register", form);
     setUser(res.data.user)
      navigate("/feed");
    } catch {
      alert("Error registering user");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Typography variant="h5" align="center">Register</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField fullWidth label="Username" name="username" margin="normal" onChange={handleChange} />
        <TextField fullWidth label="Email" name="email" margin="normal" onChange={handleChange} />
        <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} />
        <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>Register</Button>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
}
