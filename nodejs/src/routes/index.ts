import express from "express";
import * as blogPostApi from "./blogposts";

const router = express.Router();

router.get("/blog", blogPostApi.list); // list
router.post("/blog", blogPostApi.create); // create
router.get("/blog/:id", blogPostApi.read); // read
router.post("/blog/:id", blogPostApi.update); // update
router.delete("/blog/:id", blogPostApi.deleteBlogPost); // delete

//comments
router.get("/blog/:id/comment", blogPostApi.comments); // read
router.get("/blog/:id/comment/count", blogPostApi.commentsCounts); // read
router.post("/blog/:id/comment", blogPostApi.createComment); // create comment
router.post("/blog/:id/comment/:id_comment", blogPostApi.updateComment); // update comment
export default router;