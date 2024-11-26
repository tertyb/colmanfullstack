import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  userId: string;
  text: string;
  date: Date;
}

export const CommentSchema = new Schema<IComment>({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: false }
});

 


