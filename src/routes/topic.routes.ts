import { Router } from "express";
import {
	createTopic,
	deleteTopic,
	getTopic,
	getTopics,
} from "../controllers/topic.controller";

const router = Router();

router.post("/topics", createTopic);
router.get("/topics/:id", getTopic);
router.get("/topics", getTopics);
router.delete("/topics/:id", deleteTopic);

export default router;
