import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  accessToken: string;
  email: string;
  name: string;
  lastname: string;  
  nickname: string;
  profileImage: string;
  refreshTokens: string;
}

const UserSchema: Schema = new Schema({
  accessToken: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  profileImage: { type: String, required: true },
  nickname: { type: String, required: false },
  refreshTokens: { type: String }
});

export default mongoose.model<IUser>('User', UserSchema);
