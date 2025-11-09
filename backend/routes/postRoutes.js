const  express = require( "express");
const  multer = require( "multer");
const  { createPost, getAllPosts } = require( "../controller/postController");
const  { authMiddleware } = require( "../middleware/authMiddleware");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/create", authMiddleware, upload.single("image"), createPost);
router.get("/all", getAllPosts);

module.exports  =  router;
