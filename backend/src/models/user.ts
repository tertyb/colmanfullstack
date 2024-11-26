import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  password: string;
  username: string;
  image: string
}

const UserSchema = new Schema<IUser>({
  password: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  image: {type: String, required: false}
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
