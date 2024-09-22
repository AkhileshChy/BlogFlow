import express from "express";
import { createblog, deleteblog, getblog, getblogs, updateblog } from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/", getblogs);
router.get("/:id", getblog);
router.post("/create", createblog);
router.delete("/:id", deleteblog);
router.put("/:id", updateblog);

export default router;