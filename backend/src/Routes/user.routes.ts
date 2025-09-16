import { Router } from "express";
import UserController from "../Controllers/user.controller";
import { authMiddleware } from "../Middleware/auth.middleware";

const router = Router();

// Public routes
router.post('/', UserController.createUser);
router.post('/login', UserController.loginUser);
router.get('/', UserController.getAllUsers);

// Protected routes
router.get('/me', authMiddleware, UserController.getUser);
router.get('/me/handicap', authMiddleware, UserController.getUserHandicap);
router.put('/me', authMiddleware, UserController.updateUser);
router.delete('/me', authMiddleware, UserController.deleteUser);


export default router;