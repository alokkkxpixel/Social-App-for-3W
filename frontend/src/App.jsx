import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import PostDetail from "./pages/PostDetails";
import "./style.css";
import Navbar from "./Components/Navbar";
import API from "./api/axiosConfig";
import { useEffect } from "react";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await API.get("/test");
        console.log("Backend response:", res.data);
        alert(res.data.message); // shows popup if connected
      } catch (err) {
        console.error("Backend not reachable:", err.message);
        alert("❌ Backend not reachable");
      }
    };
    checkBackend();
  }, []);
    
  return (

  
<>

    <div className="container">
      <Navbar />
    </div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/feed" 
        
        element={
      <ProtectedRoute>

        <Feed />
      </ProtectedRoute>
      
      }
        
        />
        <Route path="/post/:id" element={
          <ProtectedRoute>

            <PostDetail />
          </ProtectedRoute>
          } />
      </Routes>

      </>
  )
}

export default App;
