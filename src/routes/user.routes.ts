import { Router } from "express";
import {
	deleteUser,
	getUser,
	getUserForms,
	getUsers,
	getUserTemplates,
} from "../controllers/user.controller";

const router = Router();

router.get("/users/:id", getUser);
router.get("/users", getUsers);
router.get("/users/:id/templates", getUserTemplates);
router.get("/users/:id/forms", getUserForms);
router.delete("/users/:id", deleteUser);

export default router;
