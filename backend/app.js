const express = require( "express");
const dotenv = require( "dotenv");
// const cors = require( "cors");
const { connectDB } = require( "./db/db.js");
const authRoutes = require( "./routes/authRoutes.js");
const postRoutes = require( "./routes/postRoutes.js");
const cookieParser = require("cookie-parser");
dotenv.config();
connectDB();

const app = express();
app.use("/uploads", express.static("uploads"));
// app.use(cors({
//     origin: ["http://localhost:5173","https://social-app-for-3-w.vercel.app"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true }
// ));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);


app.post("/test", (req, res) => {
  console.log("", req.body);
  res.json(req.body);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


module.exports = app;