import mongoose, { Document, Schema } from 'mongoose';
import { CommentSchema, IComment } from './comment.model';

export interface IPost extends Document {
  userId: string;
  text: string;
  image: string;
  date: Date;
  likes: string[];
  comments: IComment[];
}

const PostSchema = new Schema<string>({
  userId: { type: String, required: true, unique: true },
  text: { type: String, required: true, unique: true },
  image: { type: String, required: false },
  date: { type: Date, required: false },
  likes: { type: [String], required: false },
  comments: { type: [CommentSchema], required: false },
});

const PostModel = mongoose.model<string>('Post', PostSchema);

export default PostModel;
