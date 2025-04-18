import { Router } from "express";
import { sendContactEmail } from "../controllers/contact.controller";

const router = Router();

router.post("/contact", sendContactEmail);

export default router;
