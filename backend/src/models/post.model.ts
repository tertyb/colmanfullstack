import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  userId: mongoose.Types.ObjectId;
  text: string;
  date: Date;
  image: string;
  likes: mongoose.Types.ObjectId[];
}

const PostSchema = new Schema<IPost>({
  userId: { type: Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, required: false },
  likes: {
    type: [Schema.Types.ObjectId],
    required: false,
    validate: {
      validator:  (likes) => {
        return Array.isArray(likes) && likes.length === new Set(likes).size;
      },
      message: "Likes array must have unique values.",
    },
  },
});

const PostModel = mongoose.model<IPost>('Post', PostSchema);

export default PostModel;
