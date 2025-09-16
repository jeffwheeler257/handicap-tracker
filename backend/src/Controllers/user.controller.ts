import { Response, Request } from "express";
import UserService from "../Services/user.service";
import { AuthRequest } from "../Middleware/auth.middleware";
import { generateToken } from "../Utils/jwt";

export default class UserController {
    
    static async createUser(req: Request, res: Response): Promise<Response>{
        try {
            const data = req.body;
            const user = await UserService.createUser(data);
            return res.status(201).json(user);
        } catch (error) {
            console.error('Error creating user: ', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }
    
    static async getUser(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = req.userId;

            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized'})
            }

            const user = await UserService.getUserById(userId);

            if(!user) {
                return res.status(404).json({message: 'User not found'});
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user: ', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json(users);
        } catch (error){
            console.error('Error fetching users: ', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async updateUser(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = req.userId;

            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized'})
            }

            const data = req.body;
            const user = await UserService.updateUser(userId, data);
            
            if(!user) {
                return res.status(404).json({message: 'User not found'});
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error('Error updating user: ', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async deleteUser(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = req.userId;

            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized'})
            }

            const user = await UserService.deleteUser(userId);
            
            if(!user) {
                return res.status(404).json({message: 'User not found'});
            }

            return res.status(200).json({message: `User ${user.username} successfully deleted`});
        } catch (error) {
            console.error('Error deleting user: ', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async getUserHandicap(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = req.userId;

            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized'})
            }

            const handicap = await UserService.getHandicapByUserId(userId);

            if(!handicap) {
                return res.status(404).json({message: 'Handicap could not be calculated'});
            }

            return res.status(200).json(handicap);
        } catch (error) {
            console.error('Error calculating handicap: ', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async loginUser(req: Request, res: Response): Promise<Response> {
        try {
            const { username, password } = req.body;
            const user = await UserService.loginUser(username, password);

            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const token = generateToken(user.id);
            return res.status(200).json({ token });
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}