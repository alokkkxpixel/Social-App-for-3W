import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function Navbar() {
  return (
    <AppBar position="sticky" color="inherit" sx={{ boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">Social</Typography>
        <div>
          <IconButton color="primary"><HomeIcon /></IconButton>
          <IconButton color="primary"><AddBoxIcon /></IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
