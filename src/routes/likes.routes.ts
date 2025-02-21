import { Router } from "express";
import { updateLike } from "../controllers/likes.controller";

const router = Router();

router.put("/likes", updateLike);

export default router;
