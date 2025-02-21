import { Router } from "express";
import {
	createTemplate,
	deleteTemplate,
	getTemplate,
	getTemplates,
} from "../controllers/template.controller";
const router = Router();

router.post("/templates", createTemplate);
router.get("/templates/:id", getTemplate);
router.get("/templates", getTemplates);
router.delete("/templates/:id", deleteTemplate);

export default router;
