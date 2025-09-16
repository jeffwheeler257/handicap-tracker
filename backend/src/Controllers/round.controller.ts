import { Response } from "express";
import RoundService from "../Services/round.service";
import { AuthRequest } from "../Middleware/auth.middleware";

export default class RoundController {

    static async createRound(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const roundData = {
                ...req.body,
                user: userId
            };

            const round = await RoundService.createRound(roundData);
            return res.status(201).json(round);
        } catch (error) {
            console.error("Error creating round:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getRoundById(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = req.userId;
            const { id } = req.params;

            const round = await RoundService.getRoundById(id);
            if (!round) {
                return res.status(404).json({ message: "Round not found" });
            }

            if (round.user.toString() !== userId) {
                return res.status(403).json({ message: "Access denied" });
            }

            return res.status(200).json(round);
        } catch (error) {
            console.error("Error fetching round:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getUserRounds(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const rounds = await RoundService.getRoundsByUserId(userId);
            return res.status(200).json(rounds);
        } catch (error) {
            console.error("Error fetching rounds by user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async updateRound(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = req.userId;
            const { id } = req.params;

            const round = await RoundService.getRoundById(id);
            if (!round) {
                return res.status(404).json({ message: "Round not found" });
            }

            if (round.user.toString() !== userId) {
                return res.status(403).json({ message: "Access denied" });
            }

            const updatedRound = await RoundService.updateRound(id, req.body);
            return res.status(200).json(updatedRound);
        } catch (error) {
            console.error("Error updating round:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async deleteRound(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = req.userId;
            const { id } = req.params;

            const round = await RoundService.getRoundById(id);
            if (!round) {
                return res.status(404).json({ message: "Round not found" });
            }

            if (round.user.toString() !== userId) {
                return res.status(403).json({ message: "Access denied" });
            }

            await RoundService.deleteRound(id);
            return res.status(200).json({ message: "Round successfully deleted" });
        } catch (error) {
            console.error("Error deleting round:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}