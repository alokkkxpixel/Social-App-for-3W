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
  
    // async function fetchDATA() {

    //   const token = localStorage.getItem("token")

    //   if(!token){
    //     return <Navigate to="/login" />
    //   }
    
    // try {
    //    const res = await API.get("/auth/me")
    //     console.log(res.data);
    // } catch (err) {
    // console.log(err)     
    // }
     
      
    // }


    // useEffect(() => {
    //   fetchDATA()
    
    
    // }, [])
    
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
