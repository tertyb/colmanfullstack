import mongoose, { Document, Schema } from 'mongoose';
import { CommentSchema, IComment } from './comment.model';

export interface IPost extends Document {
  userId: string;
  text: string;
  date: Date;
  image: string;
  likes: string[];
  comments: IComment[];
}

const PostSchema = new Schema<IPost>({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, required: false },
  likes: {
    type: [String],
    required: false,
    validate: {
      validator:  (likes) => {
        return Array.isArray(likes) && likes.length === new Set(likes).size;
      },
      message: "Likes array must have unique values.",
    },
  },
  comments: { type: [CommentSchema], required: false },
});

const PostModel = mongoose.model<IPost>('Post', PostSchema);

export default PostModel;
