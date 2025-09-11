import Round, { RoundInterface } from "../Models/round.model";
import User, { UserInterface } from "../Models/user.model";
import { Types } from 'mongoose';

export interface CreateRoundInput {
  course: string;
  courseRating: number;
  slopeRating: number;
  numberOfHoles: 9 | 18;
  date: Date;
  score: number;
  user: string;
}

export default class RoundService {

    static async createRound(data: CreateRoundInput): Promise<RoundInterface> {
        const round = await Round.create({
            ...data,
            user: new Types.ObjectId(data.user)
        });

        await User.findByIdAndUpdate(
            data.user,
            { $push: {rounds: round._id} },
            { new: true }
        );

        return round;
    }

    static async getRoundById(roundId: string): Promise<RoundInterface | null> {
        if (!Types.ObjectId.isValid(roundId)) return null;
        return Round.findById(roundId).exec();
    }

    static async getRoundsByUserId(userId: string): Promise<RoundInterface[] | null> {
        if (!Types.ObjectId.isValid(userId)) return null;
        return Round.find({ user: userId }).sort({ date: -1 }).exec();
    }

    static async updateRound(roundId: string, update: Partial<RoundInterface>): Promise<RoundInterface | null> {
        if (!Types.ObjectId.isValid(roundId)) return null;
        return Round.findByIdAndUpdate(roundId, update, { new: true, runValidators: true }).exec();
    }

    static async deleteRound(roundId: string): Promise<RoundInterface | null> {
        if (!Types.ObjectId.isValid(roundId)) return null;
        return Round.findByIdAndDelete(roundId).exec();
    }

}