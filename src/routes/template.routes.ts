import { Router } from "express";
import {
	createTemplate,
	deleteTemplate,
	getTemplate,
	getTemplateQuestions,
	getTemplates,
} from "../controllers/template.controller";
const router = Router();

router.post("/templates", createTemplate);
router.get("/templates/:id", getTemplate);
router.get("/templates", getTemplates);
router.get("/templates/:id/questions", getTemplateQuestions);
router.delete("/templates/:id", deleteTemplate);

export default router;
