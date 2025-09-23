import { Router } from "express";
import RoundController from "../Controllers/round.controller";
import { authMiddleware } from "../Middleware/auth.middleware";

const router = Router();

router.post('/', authMiddleware, RoundController.createRound);
router.get('/user', authMiddleware, RoundController.getUserRounds);
router.get('/:id', authMiddleware, RoundController.getRoundById);
router.put('/:id', authMiddleware, RoundController.updateRound);
router.delete('/:id', authMiddleware, RoundController.deleteRound);

export default router;