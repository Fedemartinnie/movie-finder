import mongoose, { Document, Schema } from 'mongoose';

export interface IFavorite extends Document {
  userId: string;
  movieId: String;
  moviePosterURL: string;
}

const FavoriteSchema: Schema = new Schema({
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
  moviePosterURL: { type: String, required: true }
});

export default mongoose.model<IFavorite>('Favorite', FavoriteSchema);
