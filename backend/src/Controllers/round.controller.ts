import { Response, Request } from "express";
import RoundService from "../Services/round.service";
import Round from "../Models/round.model";

export default class RoundController {

    static async createRound(req: Request, res: Response): Promise<Response>{
        try {
            const data = req.body;
            const round = await RoundService.createRound(data);
            return res.status(201).json(round);
        } catch (error) {
            console.error('Error creating round: ', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async getRoundById(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params;
            const round = await RoundService.getRoundById(id);
                        
            if(!round) {
                return res.status(404).json({message: 'Round not found'});
            }
            
            return res.status(200).json(round);
        } catch (error) {
            console.error('Error fetching round: ', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async getRoundsByUserId(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params;
            const rounds = await RoundService.getRoundsByUserId(id);

            if(!rounds) {
                return res.status(404).json({message: 'User not found or invalid ID'});
            }

            return res.status(200).json(rounds);
        } catch (error) {
            console.error('Error fetching rounds by user: ', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async updateRound(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params;
            const data = req.body;
            const round = await RoundService.updateRound(id, data);
                        
            if(!round) {
                return res.status(404).json({message: 'Round not found'});
            }
            
            return res.status(200).json(round);
        } catch (error) {
            console.error('Error updating round: ', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async deleteRound(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params;
            const round = await RoundService.deleteRound(id);
                        
            if(!round) {
                return res.status(404).json({message: 'Round not found'});
            }
            
            return res.status(200).json({message: `Round successfully deleted`});
        } catch (error) {
            console.error('Error deleting round: ', error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

}