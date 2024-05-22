import express from "express";
import { addComment, addLike, createPost, deletePost, removeLike, showPost, showSinglePost, updatePost } from "../controllers/postController.js";
const router = express.Router();



//blog routes
router.post('/post/create',   createPost);
router.get('/posts/show', showPost);
router.get('/post/:id', showSinglePost);
router.delete('/delete/post/:id',  deletePost);
router.put('/update/post/:id',  updatePost);
router.put('/comment/post/:id', addComment);
router.put('/addlike/post/:id', addLike);
router.put('/removelike/post/:id',  removeLike);


export default router