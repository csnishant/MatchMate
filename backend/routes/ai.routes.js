import express from "express";
import { aiSmartFilter } from "../controllers/aiFilter.controller.js";

const router = express.Router();

router.post("/ai-filter", aiSmartFilter);

export default router;
