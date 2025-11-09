const express = require( "express");
const dotenv = require( "dotenv");
const cors = require( "cors");
const { connectDB } = require( "./db/db.js");
const authRoutes = require( "./routes/authRoutes.js");
const postRoutes = require( "./routes/postRoutes.js");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
