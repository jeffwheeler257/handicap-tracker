import User, { UserInterface } from "../Models/user.model";
import { calculateHandicap } from "./handicap.service";
import { Types } from 'mongoose';

export default class UserService {

    static async createUser(data: { username: string, password: string}): Promise<UserInterface> {
        const user = await User.create({
            username: data.username,
            password: data.password,
            rounds: []
        });
        return user;
    }

    static async getUserById(userId: string): Promise<UserInterface | null> {
        if (!Types.ObjectId.isValid(userId)) return null;
        return User.findById(userId).populate('rounds').exec(); // returns full round json instead of object id
    }

    static async getAllUsers(): Promise<UserInterface[]> {
        return User.find().populate('rounds').exec();
    }

    static async updateUser(userId: string, update: Partial<UserInterface>): Promise<UserInterface | null> {
        if (!Types.ObjectId.isValid(userId)) return null;
        return User.findByIdAndUpdate(userId, update, { new: true, runValidators: true }).exec();
    }

    static async deleteUser(userId: string): Promise<UserInterface | null> {
        if (!Types.ObjectId.isValid(userId)) return null;
        return User.findByIdAndDelete(userId).exec();
    }

    static async getHandicapByUserId(userId: string): Promise<number | null> {
        if (!Types.ObjectId.isValid(userId)) return null;
        const user = await User.findById(userId).populate('rounds').exec();
        if(!user || user.rounds.length < 3) return null;
        const scoreDiffs = user.rounds.map(round => ({
            scoreDifferential: round.scoreDifferential
        }));
        return calculateHandicap(scoreDiffs);
    }
}