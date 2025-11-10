const  express = require( "express");
const  multer = require( "multer");
const  { createPost, getAllPosts, toggleLike, addComment, getPostById } = require( "../controller/postController");
const  { authMiddleware } = require( "../middleware/authMiddleware");
const { body } = require("express-validator");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/create", authMiddleware,
  body("text").isString().withMessage("Text must be a string"),
  body("image").optional(),
  upload.single("image"), createPost);


router.get("/all", getAllPosts);
router.get("/:id", authMiddleware,getPostById)
router.put("/like/:id", authMiddleware , toggleLike )

router.post("/comment/:id", authMiddleware, 
  body("text").isString().withMessage("Comment text must be a string"),

  addComment

)

module.exports  =  router;
