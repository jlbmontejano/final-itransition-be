import { Router } from "express";
import { createTopic, deleteTopic } from "../controllers/topic.controller";

const router = Router();

router.post("/topics", createTopic);
router.delete("/topics/:id", deleteTopic);

export default router;
