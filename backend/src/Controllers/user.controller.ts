import { Response, Request } from "express";
import UserService from "../Services/user.service";

export default class UserController {
    
    static async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);
            
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

    static async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = req.body;
            const user = await UserService.updateUser(id, data);
            
            if(!user) {
                return res.status(404).json({message: 'User not found'});
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error('Error updating user: ', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const user = await UserService.deleteUser(id);
            
            if(!user) {
                return res.status(404).json({message: 'User not found'});
            }

            return res.status(200).json({message: `User ${user.username} succcesfully deleted`});
        } catch (error) {
            console.error('Error deleting user: ', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async getHandicapByUserId(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const handicap = await UserService.getHandicapByUserId(id);

            if(!handicap) {
                return res.status(404).json({message: 'Handicap could not be calculated'});
            }

            return res.status(200).json(handicap);
        } catch (error) {
            console.error('Error calculating handicap: ', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }
}