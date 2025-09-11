import Round, { RoundInterface } from "../Models/round.model";
import User, { UserInterface } from "../Models/user.model";
import { Types } from 'mongoose';

export default class RoundService {

    static async createRound(data: RoundInterface): Promise<RoundInterface> {
        return Round.create(data);
    }

    static async getRoundById(roundId: string): Promise<RoundInterface | null> {
        if (!Types.ObjectId.isValid(roundId)) return null;
        return Round.findById(roundId).populate('user');
    }

    static async getRoundsByUserId(userId: string): Promise<RoundInterface[] | null> {
        if (!Types.ObjectId.isValid(userId)) return null;
        return Round.find({ user: userId }).sort({ date: -1 });
    }

    static async updateRound(roundId: string, update: Partial<RoundInterface>): Promise<RoundInterface | null> {
        if (!Types.ObjectId.isValid(roundId)) return null;
        return Round.findByIdAndUpdate(roundId, update, { new: true, runValidators: true });
    }

    static async deleteRound(roundId: string): Promise<RoundInterface | null> {
        if (!Types.ObjectId.isValid(roundId)) return null;
        return Round.findByIdAndDelete(roundId);
    }

}