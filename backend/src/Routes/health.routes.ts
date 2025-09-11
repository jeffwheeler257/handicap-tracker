import { Router } from "express";
import HealthController from "../Controllers/health.controller";

const router = Router();

router.get('/', HealthController.healthCheck);

export default router;