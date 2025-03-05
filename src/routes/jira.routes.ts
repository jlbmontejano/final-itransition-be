import { Router } from "express";
import { createTicket, getUserTickets } from "../controllers/jira.controller";

const router = Router();

router.post("/tickets", createTicket);
router.get("/tickets/:email", getUserTickets);

export default router;
