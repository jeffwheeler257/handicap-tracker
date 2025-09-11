import mongoose, { Schema, Document, Types } from "mongoose";
import { UserInterface } from "./user.model";

export interface RoundInterface extends Document {
    course: string;
    courseRating: number;
    slopeRating: number;
    numberOfHoles: 9 | 18;
    date: Date;
    score: number;
    user: Types.ObjectId;
    scoreDifferential: number;
}

const RoundSchema = new Schema<RoundInterface>(
    {
        course: { type: String, required: true },
        courseRating: { type: Number, required: true },
        slopeRating: { type: Number, required: true },
        numberOfHoles: { type: Number, enum: [9, 18], required: true },
        date: { type: Date, required: true },
        score: { type: Number, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

RoundSchema.virtual('scoreDifferential').get(function (this: RoundInterface) {
    const adjScore: number = this.numberOfHoles === 18 ? this.score : this.score * 2;
    return Math.round(((adjScore - this.courseRating) * 113 / this.slopeRating) * 10) / 10;
});

const Round = mongoose.model<RoundInterface>('Round', RoundSchema);
export default Round;