import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from '@mui/icons-material/Logout';
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const {user , logout} = useUser()

  const navigate = useNavigate()

  return (
    <AppBar position="sticky" color="inherit" sx={{ boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">Social</Typography>
       
            {user ? (
 <div>
                <IconButton onClick={()=> navigate("/feed")} color="primary"><HomeIcon /></IconButton>
                <IconButton color="primary"><AddBoxIcon /></IconButton>
                <IconButton onClick={logout} color="primary"><LogoutIcon/></IconButton>
        </div>

            ) :(
                <Typography variant="subtitle1">Welcome, Guest!</Typography>
            )

            
            }
      </Toolbar>
    </AppBar>
  );
}
