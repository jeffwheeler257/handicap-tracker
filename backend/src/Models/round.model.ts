import mongoose, { Schema, Document } from "mongoose";

interface RoundInterface extends Document {
    course: string;
    courseRating: number;
    slopeRating: number;
    numberOfHoles: 9 | 18;
    date: Date;
    score: number;
    scoreDifferential?: number;
}

const RoundSchema = new Schema<RoundInterface>(
    {
        course: { type: String, required: true },
        courseRating: { type: Number, required: true },
        slopeRating: { type: Number, required: true },
        numberOfHoles: { type: Number, enum: [9, 18], required: true },
        date: { type: Date, required: true },
        score: { type: Number, required: true },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

RoundSchema.virtual('scoreDifferential').get(function (this: RoundInterface) {
    return Math.round(((this.score - this.courseRating) * 113 / this.slopeRating) * 10) / 10;
});

const Round = mongoose.model<RoundInterface>('Round', RoundSchema);
export default Round;