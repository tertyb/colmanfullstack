import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  userId: string;
  text: string;
  date: Date;
}

export const CommentSchema = new Schema<string>({
  userId: { type: String, required: true, unique: true },
  text: { type: String, required: true, unique: true },
  date: { type: Date, required: false }
});

 


