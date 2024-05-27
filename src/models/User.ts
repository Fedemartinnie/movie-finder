import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  accessToken: string;
  email: string;
  name: string;
  lastname: string;
  profileImage: string;
}

const UserSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  profileImage: { type: String, required: true },
  refreshTokens: { type: [String], default: [] },
  favorites: { type: [String], default: [] }
});

export default mongoose.model<IUser>('User', UserSchema);
