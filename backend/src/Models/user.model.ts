import mongoose, { Schema, Document, Types } from 'mongoose';
import { RoundInterface } from './round.model';

export interface UserInterface extends Document {
  username: string;
  password: string;
  rounds: RoundInterface[];
}

const UserSchema = new Schema<UserInterface>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rounds: [{ type: Schema.Types.ObjectId, ref: 'Round' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model<UserInterface>('User', UserSchema);
export default User;