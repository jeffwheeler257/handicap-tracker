import { Router } from "express";
import RoundController from "../Controllers/round.controller";

const router = Router();

router.post('/', RoundController.createRound);
router.get('/:id', RoundController.getRoundById);
router.get('/user/:id', RoundController.getRoundsByUserId);
router.put('/:id', RoundController.updateRound);
router.delete('/:id', RoundController.deleteRound);

export default router;