import mongoose, { Schema, Document, Types } from 'mongoose';
import { RoundInterface } from './round.model';
import bcrypt from 'bcryptjs';

export interface UserInterface extends Document {
  username: string;
  password: string;
  rounds: RoundInterface[];
  comparePassword(userPassword: string): Promise<boolean>;
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

// Password hashing
UserSchema.pre<UserInterface>('save', async function (next) {
  if(!this.isModified('password')) return next;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<UserInterface>('User', UserSchema);
export default User;