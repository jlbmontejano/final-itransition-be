import { Router } from "express";
import { getMetadata } from "../controllers/metada.controller";

const router = Router();

router.get("/metadata", getMetadata);

export default router;
